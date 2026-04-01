import { MeshAdapter } from "~/adapter/mesh.adapter";
import { APP_NETWORK } from "~/constants/enviroments";
import { deserializeAddress, mConStr0, mConStr1 } from "@meshsdk/core";

export class MeshTxBuilder extends MeshAdapter {
    tip = async ({ amount }: { amount: string }): Promise<string> => {
        const { utxos, collateral, walletAddress } = await this.getWalletForTx();

        const utxo = (await this.fetcher.fetchAddressUTxOs(this.spendAddress))[0];

        const unsignedTx = this.meshTxBuilder;

        if (utxo) {
            unsignedTx
                .spendingPlutusScriptV3()
                .txIn(utxo.input.txHash, utxo.input.outputIndex)
                .txInScript(this.spendScriptCbor)
                .txInInlineDatumPresent()
                .txInRedeemerValue(mConStr0([]))

                .txOut(this.spendAddress, [
                    {
                        unit: "lovelace",
                        quantity: String(
                            utxo.output.amount.reduce((total, asset) => {
                                if (asset.unit === "lovelace") {
                                    return total + Number(asset.quantity);
                                }
                                return total;
                            }, Number(amount)),
                        ),
                    },
                ]);
        } else {
            unsignedTx.txOut(this.spendAddress, [
                {
                    unit: "lovelace",
                    quantity: amount,
                },
            ]);
        }

        unsignedTx
            .selectUtxosFrom(utxos)
            .changeAddress(walletAddress)
            .txInCollateral(collateral.input.txHash, collateral.input.outputIndex)
            .setNetwork(APP_NETWORK);

        return await unsignedTx.complete();
    };

    claim = async (): Promise<string> => {
        const { utxos, collateral, walletAddress } = await this.getWalletForTx();
        const utxo = (await this.fetcher.fetchAddressUTxOs(this.spendAddress))[0];

        const unsignedTx = this.meshTxBuilder
            .spendingPlutusScriptV3()
            .txIn(utxo.input.txHash, utxo.input.outputIndex)
            .txInInlineDatumPresent()
            .txInRedeemerValue(mConStr1([]))
            .txInScript(this.spendScriptCbor)
            .txOut(walletAddress, utxo.output.amount)

            .changeAddress(walletAddress)
            .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
            .selectUtxosFrom(utxos)
            .txInCollateral(collateral.input.txHash, collateral.input.outputIndex)
            .setNetwork(APP_NETWORK);

        return await unsignedTx.complete();
    };
}
