import { HydraAdapter } from "@/adapters/hydra.adapter";
import { APP_NETWORK } from "@/constants/enviroments.constant";
import { deserializeAddress, mConStr0, mConStr1 } from "@meshsdk/core";

export class HydraTxBuilder extends HydraAdapter {
    tip = async({ amount }: { amount: string}): Promise<string> => {
        const { utxos, collateral, walletAddress } = await this.getWalletForHydraTx()   
        
        const utxo = (await this.hydraProvider.fetchAddressUTxOs(this.spendAddress))[0]
        
        const unsignedTx = this.hydraTxBuilder;

        if(utxo) {
            unsignedTx
                .spendingPlutusScriptV3()
                .txIn(utxo.input.txHash, utxo.input.outputIndex)
                .txInScript(this.spendScriptCbor)
                .txInInlineDatumPresent()
                .txInRedeemerValue(mConStr0([]))

                .txOut(this.spendAddress, [
                    {
                        unit: "lovelace",
                        quantity: String(utxo.output.amount.reduce((total, asset) => {
                            if(asset.unit === "lovelace") {
                                return total + Number(asset.quantity);
                            }
                            return total
                        }, Number(amount)))
                    }
                ])
        } else {
            unsignedTx
                .txOut(this.spendAddress, [
                    {
                        unit: "lovelace",
                        quantity: amount
                    }
                ])
        }

        unsignedTx
            .selectUtxosFrom(utxos)
            .changeAddress(walletAddress)
            .setFee("0")
            .txInCollateral(collateral.input.txHash, collateral.input.outputIndex)
            .setNetwork(APP_NETWORK)

        return await unsignedTx.complete();
    }

    claim = async(): Promise<string> => {
        const { utxos, collateral, walletAddress } = await this.getWalletForHydraTx()
        const utxo = (await this.hydraProvider.fetchAddressUTxOs(this.spendAddress))[0]

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
            .setNetwork(APP_NETWORK)

        return await unsignedTx.complete()
    }
}