import { HydraAdapter } from "~/adapter/hydra.adapter";
import { APP_NETWORK } from "~/constants/enviroments";
import { deserializeAddress, mConStr0, mConStr1 } from "@meshsdk/core";

export class HydraTxBuilder extends HydraAdapter {
    tip = async ({ amount }: { amount: string }): Promise<string> => {
        const { utxos, collateral, walletAddress } = await this.getWalletForHydraTx();

        const utxo = (await this.hydraProvider.fetchAddressUTxOs(this.spendAddress))[0];

        const unsignedTx = this.hydraTxBuilder;

        if (utxo) {
            const datum = this.convertDatum(utxo.output.plutusData as string);
            const existing = datum.find((d) => d.address === walletAddress);

            if (existing) {
                existing.amount += Number(amount);
            } else {
                datum.push({
                    address: walletAddress,
                    amount: Number(amount),
                });
            }
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
                .txOutInlineDatumValue(mConStr0(datum.map((d) => mConStr0([d.address, d.amount]))));
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
            .setFee("0")
            .txInCollateral(collateral.input.txHash, collateral.input.outputIndex)
            .setNetwork(APP_NETWORK);

        return await unsignedTx.complete();
    };

    claim = async (): Promise<string> => {
        const { utxos, collateral, walletAddress } = await this.getWalletForHydraTx();
        const utxo = (await this.hydraProvider.fetchAddressUTxOs(this.spendAddress))[0];

        const unsignedTx = this.hydraTxBuilder
            .spendingPlutusScriptV3()
            .txIn(utxo.input.txHash, utxo.input.outputIndex)
            .txInInlineDatumPresent()
            .txInRedeemerValue(mConStr1([]))
            .txInScript(this.spendScriptCbor)
            .txOut(walletAddress, utxo.output.amount)

            .changeAddress(walletAddress)
            .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
            .selectUtxosFrom(utxos)
            .setFee("0")
            .txInCollateral(collateral.input.txHash, collateral.input.outputIndex)
            .setNetwork(APP_NETWORK);

        return await unsignedTx.complete();
    };
}
