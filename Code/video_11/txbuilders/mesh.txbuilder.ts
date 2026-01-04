import { deserializeAddress, ForgeScript, mConStr0, resolveScriptHash, stringToHex, UTxO } from "@meshsdk/core";
import { MeshAdapter } from "@/adapters/mesh.adapter";
import { APP_NETWORK } from "@/constants/enviroments.constant";

export class MeshTxBuilder extends MeshAdapter {
    /**
     * @description Mint (signup) a new asset or update its metadata on-chain.
     * If the asset does not exist, it will be minted. If it exists, its datum will be updated.
     *
     * @param {Object} param
     * @param {string} param.assetName - The name of the asset to mint or update.
     * @param {Record<string, string | number>} param.metadata - Metadata to be attached to the asset.
     *
     * @returns {Promise<string>} An unsigned transaction in CBOR hex format.
     *
     * @throws {Error} - Throws if wallet UTxOs or collateral cannot be retrieved.
     */
    lock = async ({ assetName, metadata }: { assetName: string; metadata: Record<string, string | number> }): Promise<string> => {
        const { utxos, collateral, walletAddress } = await this.getWalletForTx();

        const forgingScript = ForgeScript.withOneSignature(walletAddress);
        const policyId = resolveScriptHash(forgingScript);
        const utxo = await this.getAddressUTXOAsset(this.spendAddress, policyId + stringToHex(assetName));

        const unsignedTx = this.meshTxBuilder;

        if (!utxo) {
            unsignedTx
                .mint("1", policyId, stringToHex(assetName))
                .mintingScript(forgingScript)

                .txOut(this.spendAddress, [{ unit: policyId + stringToHex(assetName), quantity: "1" }])
                .txOutInlineDatumValue(mConStr0([JSON.stringify(metadata)]));
        } else {
            unsignedTx
                .spendingPlutusScriptV3()
                .txIn(utxo.input.txHash, utxo.input.outputIndex)
                .txInInlineDatumPresent()
                .txInRedeemerValue(mConStr0([]))
                .txInScript(this.spendScriptCbor)
                .txOut(this.spendAddress, [
                    {
                        unit: policyId + stringToHex(assetName),
                        quantity: "1",
                    },
                ])
                .txOutInlineDatumValue(mConStr0([JSON.stringify(metadata)]));
        }

        unsignedTx
            .selectUtxosFrom(utxos)
            .changeAddress(walletAddress)
            .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
            .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
            .setNetwork(APP_NETWORK);
        return await unsignedTx.complete();
    };

    /**
     * @description Burn (signout) an existing asset.
     * If the asset UTxO is not found, an error is thrown.
     *
     * @param {Object} param
     * @param {string} param.assetName - The name of the asset to burn.
     *
     * @returns {Promise<string>} An unsigned transaction in CBOR hex format.
     *
     * @throws {Error} - Throws if the asset UTxO is not found.
     */
    unlock = async ({ assetName }: { assetName: string }): Promise<string> => {
        const { utxos, collateral, walletAddress } = await this.getWalletForTx();
        const forgingScript = ForgeScript.withOneSignature(walletAddress);
        const policyId = resolveScriptHash(forgingScript);
        const utxo = await this.getAddressUTXOAsset(this.spendAddress, policyId + stringToHex(assetName));
        const unsignedTx = this.meshTxBuilder;
        if (!utxo) {
            throw new Error("UTxO not found.");
        } else {
            unsignedTx
                .spendingPlutusScriptV3()
                .txIn(utxo.input.txHash, utxo.input.outputIndex)
                .txInInlineDatumPresent()
                .txInRedeemerValue(mConStr0([]))
                .txInScript(this.spendScriptCbor)
                .mint("-1", policyId, stringToHex(assetName))
                .mintingScript(forgingScript);
        }

        unsignedTx
            .changeAddress(walletAddress)
            .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
            .selectUtxosFrom(utxos)
            .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
            .setNetwork(APP_NETWORK);
        return await unsignedTx.complete();
    };

}