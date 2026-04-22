"use server";

import { MeshWallet, stringToHex } from "@meshsdk/core";
import { APP_NETWORK_ID } from "~/constants/enviroments";
import { blockfrostFetcher, blockfrostProvider } from "~/providers/cardano";
import { Transaction } from "~/types";

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

export const getWithdraw = async function ({ walletAddress, page = 1, limit = 5 }: { walletAddress: string; page?: number; limit?: number }) {
    if (!walletAddress || walletAddress.trim() === "") {
        throw new Error("Wallet address is not found !");
    }
    const addressTransactions: Array<{
        tx_hash: string;
        tx_index: number;
        block_height: number;
        block_time: number;
    }> = await blockfrostFetcher.fetchAddressTransactions(walletAddress);
    const data = await Promise.all(
        addressTransactions.map(async function ({ tx_hash, block_time }) {
            const transactionUTxO: Transaction = await blockfrostFetcher.fetchTransactionsUTxO(tx_hash);

            const hasHydraHeadV1 = transactionUTxO.inputs.some((input) =>
                input.amount.some((asset) => asset.unit.endsWith(stringToHex("HydraHeadV1"))),
            );
            if (hasHydraHeadV1) {
                const outputAddress = transactionUTxO.outputs.find((output) => output.address === walletAddress);
                const amount = outputAddress ? outputAddress.amount.find((asset) => asset.unit === "lovelace")?.quantity || null : null;
                return {
                    type: "Withdraw",
                    status: "Complete",
                    datetime: block_time,
                    txHash: tx_hash,
                    address: walletAddress,
                    amount: amount,
                };
            }
        }),
    );
    const filteredData = data.filter((item) => item !== null && item !== undefined);
    const dataSlice = filteredData.slice((page - 1) * limit, page * limit);

    return {
        data: dataSlice,
        totalItem: filteredData.length,
        totalPages: Math.ceil(filteredData.length / limit),
        currentPage: page,
    };
};
