"use server";

import { MeshWallet, UTxO } from "@meshsdk/core";
import { HydraProvider } from "@meshsdk/hydra";
import { APP_NETWORK_ID, HYDRA_HTTP_URL, HYDRA_HTTP_URL_SUB } from "~/constants/enviroments";
import { blockfrostProvider } from "~/providers/cardano";
import { HydraTxBuilder } from "~/txbuilders/hydra.txbuilder";

export const commit = async function ({ address, utxo, isCreator = false }: { address: string; utxo: UTxO; isCreator: boolean }) {
    try {
        const meshWallet = new MeshWallet({
            networkId: APP_NETWORK_ID,
            fetcher: blockfrostProvider,
            submitter: blockfrostProvider,
            key: {
                type: "address",
                address: address,
            },
        });

        const hydraProvider = new HydraProvider({
            httpUrl: isCreator ? HYDRA_HTTP_URL : HYDRA_HTTP_URL_SUB,
        });

        const hydraTxBuilder = new HydraTxBuilder({
            meshWallet: meshWallet,
            hydraProvider: hydraProvider,
            owner: address,
            minimumTip: 2_000_000,
        });

        await hydraTxBuilder.initialize();
        if ((await getStatus()) === "IDLE") {
            await hydraTxBuilder.init();
        }

        if ((await getStatus()) === "OPEN") {
            return await hydraTxBuilder.deposit({
                utxo: utxo,
            });
        }

        console.log("commit");

        return await hydraTxBuilder.commit({ utxo });
    } catch (error) {
        throw error;
    }
};

export const decommit = async function ({ address, utxo, isCreator = false }: { address: string; utxo: UTxO; isCreator: boolean }) {
    try {
        const meshWallet = new MeshWallet({
            networkId: APP_NETWORK_ID,
            fetcher: blockfrostProvider,
            submitter: blockfrostProvider,
            key: {
                type: "address",
                address: address,
            },
        });

        const hydraProvider = new HydraProvider({
            httpUrl: isCreator ? HYDRA_HTTP_URL : HYDRA_HTTP_URL_SUB,
        });

        const hydraTxBuilder = new HydraTxBuilder({
            meshWallet: meshWallet,
            hydraProvider: hydraProvider,
            owner: address,
            minimumTip: 2_000_000,
        });

        await hydraTxBuilder.initialize();

        const utxos = await hydraProvider.fetchUTxOs(utxo.input.txHash, utxo.input.outputIndex);

        if (!utxos || utxos.length === 0 || hydraProvider.getStatus() !== "OPEN") {
            throw new Error("Cannot Decommit UTxO.");
        }

        return await hydraTxBuilder.decommit({ utxo });
    } catch (error) {
        throw error;
    }
};

export const tip = async function ({
    tipAddress,
    address,
    amount,
    isCreator = false,
}: {
    tipAddress: string;
    address: string;
    amount: number;
    isCreator: boolean;
}) {
    try {
        const meshWallet = new MeshWallet({
            networkId: APP_NETWORK_ID,
            fetcher: blockfrostProvider,
            submitter: blockfrostProvider,
            key: {
                type: "address",
                address: address,
            },
        });

        const hydraProvider = new HydraProvider({
            httpUrl: isCreator ? HYDRA_HTTP_URL : HYDRA_HTTP_URL_SUB,
        });

        const hydraTxBuilder = new HydraTxBuilder({
            meshWallet: meshWallet,
            hydraProvider: hydraProvider,
            owner: tipAddress,
            minimumTip: 2_000_000,
        });

        await hydraTxBuilder.initialize();

        return await hydraTxBuilder.tip({ amount: String(amount) });
    } catch (error) {
        throw error;
    }
};

export const claim = async function ({ address, isCreator = false }: { address: string; isCreator: boolean }) {
    try {
        const meshWallet = new MeshWallet({
            networkId: APP_NETWORK_ID,
            fetcher: blockfrostProvider,
            submitter: blockfrostProvider,
            key: {
                type: "address",
                address: address,
            },
        });

        const hydraProvider = new HydraProvider({
            httpUrl: isCreator ? HYDRA_HTTP_URL : HYDRA_HTTP_URL_SUB,
        });

        const hydraTxBuilder = new HydraTxBuilder({
            meshWallet: meshWallet,
            hydraProvider: hydraProvider,
            owner: address,
            minimumTip: 2_000_000,
        });

        await hydraTxBuilder.initialize();

        return await hydraTxBuilder.claim();
    } catch (error) {
        throw error;
    }
};

export const submitHydraTx = async function ({ address, signedTx, isCreator = false }: { address: string; signedTx: string; isCreator: boolean }) {
    try {
        const meshWallet = new MeshWallet({
            networkId: APP_NETWORK_ID,
            fetcher: blockfrostProvider,
            submitter: blockfrostProvider,
            key: {
                type: "address",
                address: address,
            },
        });

        const hydraProvider = new HydraProvider({
            httpUrl: isCreator ? HYDRA_HTTP_URL : HYDRA_HTTP_URL_SUB,
        });

        const hydraTxBuilder = new HydraTxBuilder({
            meshWallet: meshWallet,
            hydraProvider: hydraProvider,
            owner: address,
            minimumTip: 2_000_000,
        });

        await hydraTxBuilder.initialize();

        await hydraProvider.submitTx(signedTx);
    } catch (error) {
        throw error;
    }
};

export const publishDecommit = async function ({ address, signedTx, isCreator = false }: { address: string; signedTx: string; isCreator: boolean }) {
    try {
        const meshWallet = new MeshWallet({
            networkId: APP_NETWORK_ID,
            fetcher: blockfrostProvider,
            submitter: blockfrostProvider,
            key: {
                type: "address",
                address: address,
            },
        });

        const hydraProvider = new HydraProvider({
            httpUrl: isCreator ? HYDRA_HTTP_URL : HYDRA_HTTP_URL_SUB,
        });

        const hydraTxBuilder = new HydraTxBuilder({
            meshWallet: meshWallet,
            hydraProvider: hydraProvider,
            owner: address,
            minimumTip: 2_000_000,
        });

        await hydraTxBuilder.initialize();

        await hydraProvider.publishDecommit({
            cborHex: signedTx,
            description: "",
            type: "Tx ConwayEra",
        });
    } catch (error) {
        throw error;
    }
};

export const fanout = async function ({ address, isCreator = false }: { address: string; isCreator: boolean }) {
    try {
        const meshWallet = new MeshWallet({
            networkId: APP_NETWORK_ID,
            fetcher: blockfrostProvider,
            submitter: blockfrostProvider,
            key: {
                type: "address",
                address: address,
            },
        });

        const hydraProvider = new HydraProvider({
            httpUrl: isCreator ? HYDRA_HTTP_URL : HYDRA_HTTP_URL_SUB,
        });

        const hydraTxBuilder = new HydraTxBuilder({
            meshWallet: meshWallet,
            hydraProvider: hydraProvider,
            owner: address,
            minimumTip: 2_000_000,
        });

        await hydraTxBuilder.initialize();

        if ((await getStatus()) === "OPEN") {
            await hydraTxBuilder.close();
        }

        if ((await getStatus()) === "FANOUT_POSSIBLE") {
            await hydraTxBuilder.fanout();
        }
    } catch (error) {
        throw error;
    }
};

export const getStatus = async function () {
    const hydraProvider = new HydraProvider({
        httpUrl: HYDRA_HTTP_URL || HYDRA_HTTP_URL_SUB,
    });

    return String((await hydraProvider.get("head"))?.tag).toUpperCase();
};

export const getUTxOsFromHydra = async function (walletAddress: string) {
    const hydraProvider = new HydraProvider({
        httpUrl: HYDRA_HTTP_URL || HYDRA_HTTP_URL_SUB,
    });

    return await hydraProvider.fetchAddressUTxOs(walletAddress);
};

export const getRecent = async function ({ address }: { address: string }) {
    try {
        const meshWallet = new MeshWallet({
            networkId: APP_NETWORK_ID,
            fetcher: blockfrostProvider,
            submitter: blockfrostProvider,
            key: {
                type: "address",
                address: address,
            },
        });

        const hydraProvider = new HydraProvider({
            httpUrl: HYDRA_HTTP_URL || HYDRA_HTTP_URL_SUB,
        });

        const hydraTxBuilder = new HydraTxBuilder({
            meshWallet: meshWallet,
            hydraProvider: hydraProvider,
            owner: address,
            minimumTip: 2_000_000,
        });

        await hydraTxBuilder.initialize();

        const utxo = (await hydraProvider.fetchAddressUTxOs(hydraTxBuilder.spendAddress)).find((utxo) => utxo.output.plutusData);

        return hydraTxBuilder.convertDatum(utxo?.output.plutusData as string);
    } catch (error) {
        throw error;
    }
};
