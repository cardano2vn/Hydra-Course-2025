import { deserializeAddress, ForgeScript, mConStr0, resolveScriptHash, stringToHex, UTxO } from "@meshsdk/core";
import { MeshAdapter } from "@/adapters/mesh.adapter";
import { APP_NETWORK } from "@/constants/enviroments.constant";

export class MeshTxBuilder extends MeshAdapter {
    lock = async (): Promise<string> => {
        const { utxos, collateral, walletAddress } = await this.getWalletForTx();

        const unsignedTx = this.meshTxBuilder
            .txOut(this.spendAddress, [
                {
                    unit: "lovelace",
                    quantity: "1000000"
                }
            ])
            .txOutDatumHashValue(mConStr0([deserializeAddress(walletAddress).pubKeyHash]))
            .selectUtxosFrom(utxos)
            .changeAddress(walletAddress)
            .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
            .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
            .setNetwork(APP_NETWORK);
        return await unsignedTx.complete();
    };

    unlock = async (): Promise<string> => {
        const { utxos, collateral, walletAddress } = await this.getWalletForTx();
        const utxo = (await this.fetcher.fetchAddressUTxOs(this.spendAddress))[0];
        const unsignedTx = this.meshTxBuilder
            .spendingPlutusScript('V3')
            .txIn(
                utxo.input.txHash,
                utxo.input.outputIndex,
                utxo.output.amount,
                utxo.output.address,
            )
            .txInScript(this.spendScriptCbor)
            .txInRedeemerValue(mConStr0([stringToHex("Hello, World!")]))
            .txInDatumValue(mConStr0([deserializeAddress(walletAddress).pubKeyHash]))
            .changeAddress(walletAddress)
            .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
            .selectUtxosFrom(utxos)
            .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
            .setNetwork(APP_NETWORK);
        return await unsignedTx.complete();
    };

}