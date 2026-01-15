import { MeshAdapter } from "@/adapters/mesh.adapter";
import { DECIMAL_PLACE } from "@/constants/common.constant";
import { APP_NETWORK } from "@/constants/enviroments.constant";
import { mConStr0 } from "@meshsdk/core";



export class MeshTxBuilder extends MeshAdapter {
    tip = async ({address, amount = DECIMAL_PLACE}: {
        address: string; amount: number
    }): Promise<string> => {
        const {utxos, walletAddress, collateral} = await this.getWalletForTx()

        const utxo = this.getUTxOOnlyLovelace(utxos, amount);

        const unsignedTx = this.meshTxBuilder
            .txIn(utxo.input.txHash, utxo.input.outputIndex)
            .txOut(address, [
                {
                    unit: "lovelace",
                    quantity: String(amount * DECIMAL_PLACE),
                },
            ])
            .txOutInlineDatumValue(
                mConStr0([
                    JSON.stringify({
                        walletAddress: walletAddress,
                        datetime: Date.now().toString(),
                    }),
                ]),
            )
            .changeAddress(walletAddress)
            .selectUtxosFrom(utxos)
            .setNetwork(APP_NETWORK);

        return await unsignedTx.complete();
    }

    // claim = async(): Promise<string> => {
    //     const {utxos, walletAddress, collateral} = await this.getWalletForTx()
    // } 
}