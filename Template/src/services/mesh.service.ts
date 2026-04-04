"use server";

import { MeshWallet } from "@meshsdk/core";
import { APP_NETWORK_ID } from "~/constants/enviroments";
import { blockfrostProvider } from "~/providers/cardano";

export const submitTx = async function ({ signedTx }: { signedTx: string }) {
    try {
        const txHash = await blockfrostProvider.submitTx(signedTx);

        await new Promise<void>((resolve, reject) => {
            blockfrostProvider.onTxConfirmed(txHash, () => {
                resolve();
            });
        });
    } catch (error) {
        throw error;
    }
};

export const getUTxOsCommit = async function ({ walletAddress }: { walletAddress: string }) {
    try {
        const meshWallet = new MeshWallet({
            networkId: APP_NETWORK_ID,
            fetcher: blockfrostProvider,
            submitter: blockfrostProvider,
            key: {
                type: "address",
                address: walletAddress,
            },
        });
        const utxos = await meshWallet.getUtxos();

        return utxos.map(function (utxo) {
            return {
                txHash: utxo.input.txHash,
                outputIndex: utxo.input.outputIndex,
                amount: Number(utxo.output.amount.find((a) => a.unit === "lovelace")?.quantity),
            };
        });
    } catch (error) {
        throw error;
    }
};
