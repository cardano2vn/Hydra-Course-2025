import { MeshAdapter } from "~/adapter/mesh.adapter";
import { APP_NETWORK } from "~/constants/enviroments";
import { deserializeAddress, mConStr0, mConStr1 } from "@meshsdk/core";

export class MeshTxBuilder extends MeshAdapter {
    tip = async ({ amount }: { amount: string }): Promise<string> => {
        const { utxos, collateral, walletAddress } = await this.getWalletForTx();

        const utxo = (await this.fetcher.fetchAddressUTxOs(this.spendAddress))[0];

        const unsignedTx = this.meshTxBuilder;

        if (utxo) {
            const datumList = this.convertDatum(utxo.output.plutusData as string);
            const existing = datumList.find((datum) => datum.address === walletAddress);

            if (existing) {
                existing.amount += Number(amount);
            } else {
                datumList.push({
                    address: walletAddress,
                    amount: Number(amount),
                });
            }

            console.log(datumList);
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
                ])
                .txOutInlineDatumValue(mConStr0(datumList.map((datum) => mConStr0([datum.address, datum.amount]))));
        } else {
            unsignedTx
                .txOut(this.spendAddress, [
                    {
                        unit: "lovelace",
                        quantity: amount,
                    },
                ])
                .txOutInlineDatumValue(mConStr0([mConStr0([walletAddress, Number(amount)])]));
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
        console.log(utxo);

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
