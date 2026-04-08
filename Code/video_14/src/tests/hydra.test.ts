import { APP_MNEMONIC, APP_NETWORK_ID, HYDRA_HTTP_URL, HYDRA_HTTP_URL_SUB } from "~/constants/enviroments";
import { blockfrostProvider } from "~/providers/cardano";
import { HydraTxBuilder } from "~/txbuilders/hydra.txbuilder";
import { MeshWallet } from "@meshsdk/core";
import { HydraProvider } from "@meshsdk/hydra";
import sodium from "libsodium-wrappers-sumo";

describe("This is testcase for managing and interacting with the Hydra Head", function () {
    let meshWallet: MeshWallet;
    const isCreator: boolean = true;
    let hydraProvider: HydraProvider;
    let owner: string;

    beforeEach(async function () {
        await sodium.ready;
        meshWallet = new MeshWallet({
            accountIndex: 0,
            networkId: APP_NETWORK_ID,
            fetcher: blockfrostProvider,
            submitter: blockfrostProvider,
            key: {
                type: "mnemonic",
                words: APP_MNEMONIC?.split(" "),
            },
        });

        hydraProvider = new HydraProvider({
            httpUrl: isCreator ? HYDRA_HTTP_URL : HYDRA_HTTP_URL_SUB,
        });

        owner = "addr_test1qrr879mjnxd3gjqjdgjxkwzfcnvcgsve927scqk5fc3gfs2hs03pn7uhujentyhzq3ays72u4xtfrlahyjalujhxufsqdeezc0";
    });

    jest.setTimeout(60_000_000_000);

    describe("Common and basic state management in hydra head", function () {
        it("Init", async function () {
            return;
            try {
                const hydraTxBuilder = new HydraTxBuilder({
                    meshWallet: meshWallet,
                    hydraProvider: hydraProvider,
                    owner: owner,
                    minimumTip: 10_000_000,
                });
                await hydraTxBuilder.init();
            } catch (error) {
                console.log(error);
            }
        });

        it("Close", async function () {
            return;
            try {
                const hydraTxBuilder = new HydraTxBuilder({
                    meshWallet: meshWallet,
                    hydraProvider: hydraProvider,
                    owner: owner,
                    minimumTip: 10_000_000,
                });
                await hydraTxBuilder.close();
            } catch (error) {
                console.log(error);
            }
        });

        it("Fanout", async function () {
            return;
            try {
                const hydraTxBuilder = new HydraTxBuilder({
                    meshWallet: meshWallet,
                    hydraProvider: hydraProvider,
                    owner: owner,
                    minimumTip: 10_000_000,
                });
                await hydraTxBuilder.fanout();
            } catch (error) {
                console.log(error);
            }
        });
    });

    describe("Implement full fund lifecycle within Hydra Head (commit funds into head and decommit then back to main chain)", function () {
        it("Commit Empty", async function () {
            return;
            try {
                const hydraTxBuilder = new HydraTxBuilder({
                    meshWallet: meshWallet,
                    hydraProvider: hydraProvider,
                    owner: owner,
                    minimumTip: 10_000_000,
                });
                await hydraTxBuilder.initialize();
                const unsignedTx = await hydraTxBuilder.commit({});
                const signedTx = await meshWallet.signTx(unsignedTx, true);
                const txHash = await meshWallet.submitTx(signedTx);
                await new Promise<void>(function (resolve, reject) {
                    blockfrostProvider.onTxConfirmed(txHash, () => {
                        console.log("https://preview.cexplorer.io/tx/" + txHash);
                        resolve();
                    });
                });
            } catch (error) {
                console.log(error);
            }
        });

        it("Commit UTxO", async function () {
            return;
            try {
                const hydraTxBuilder = new HydraTxBuilder({
                    meshWallet: meshWallet,
                    hydraProvider: hydraProvider,
                    owner: owner,
                    minimumTip: 10_000_000,
                });

                const utxo = (await meshWallet.getUtxos())[6];

                console.log(utxo);
                await hydraTxBuilder.initialize();

                const unsignedTx = await hydraTxBuilder.commit({
                    utxo: utxo,
                });

                const signedTx = await meshWallet.signTx(unsignedTx, true);
                const txHash = await meshWallet.submitTx(signedTx);
                await new Promise<void>(function (resolve, reject) {
                    blockfrostProvider.onTxConfirmed(txHash, () => {
                        console.log("https://preview.cexplorer.io/tx/" + txHash);
                        resolve();
                    });
                });
            } catch (error) {
                console.log(error);
            }
        });

        it("Commit Script UTxO", async function () {
            return;
            try {
                const hydraTxBuilder = new HydraTxBuilder({
                    meshWallet: meshWallet,
                    hydraProvider: hydraProvider,
                    owner: owner,
                    minimumTip: 10_000_000,
                });

                const utxo = (await blockfrostProvider.fetchAddressUTxOs(hydraTxBuilder.spendAddress))[1];

                await hydraTxBuilder.initialize();
                const unsignedTx = await hydraTxBuilder.commit({
                    utxo: utxo,
                    blueprint: true,
                });

                const signedTx = await meshWallet.signTx(unsignedTx, true);
                const txHash = await meshWallet.submitTx(signedTx);
                await new Promise<void>(function (resolve, reject) {
                    blockfrostProvider.onTxConfirmed(txHash, () => {
                        console.log("https://preview.cexplorer.io/tx/" + txHash);
                        resolve();
                    });
                });
            } catch (error) {
                console.log(error);
            }
        });

        it("Increment Commit UTxO", async function () {
            return;
            try {
                const hydraTxBuilder = new HydraTxBuilder({
                    meshWallet: meshWallet,
                    hydraProvider: hydraProvider,
                    owner: owner,
                    minimumTip: 10_000_000,
                });

                const utxo = (await meshWallet.getUtxos())[1];

                await hydraTxBuilder.initialize();
                const unsignedTx = await hydraTxBuilder.deposit({
                    utxo: utxo,
                });
                return;
                const signedTx = await meshWallet.signTx(unsignedTx, true);
                const txHash = await meshWallet.submitTx(signedTx);
                await new Promise<void>(function (resolve, reject) {
                    blockfrostProvider.onTxConfirmed(txHash, () => {
                        console.log("https://preview.cexplorer.io/tx/" + txHash);
                        resolve();
                    });
                });
            } catch (error) {
                console.log(error);
            }
        });

        it("Decommit Commit UTxO", async function () {
            return;
            try {
                const hydraTxBuilder = new HydraTxBuilder({
                    meshWallet: meshWallet,
                    hydraProvider: hydraProvider,
                    owner: owner,
                    minimumTip: 10_000_000,
                });

                const utxo = (await hydraProvider.fetchAddressUTxOs(await meshWallet.getChangeAddress()))[0];

                await hydraTxBuilder.initialize();
                const unsignedTx = await hydraTxBuilder.decommit({
                    utxo: utxo,
                });

                const signedTx = await meshWallet.signTx(unsignedTx, true);
                await hydraProvider.publishDecommit({
                    cborHex: signedTx,
                    description: "",
                    type: "Tx ConwayEra",
                });
            } catch (error) {
                console.log(error);
            }
        });
    });

    describe("Transaction processing in hydra from basic to advanced.", function () {
        it("Tip", async function () {
            return;
            try {
                const hydraTxBuilder = new HydraTxBuilder({
                    meshWallet: meshWallet,
                    hydraProvider: hydraProvider,
                    owner: owner,
                    minimumTip: 10_000_000,
                });

                await hydraTxBuilder.initialize();
                const unsignedTx = await hydraTxBuilder.tip({
                    amount: String(Number(10000000)),
                });

                const signedTx = await meshWallet.signTx(unsignedTx, false);
                const txHash = await hydraTxBuilder.hydraProvider.submitTx(signedTx);
            } catch (error) {
                console.log(error);
            }
        });
        it("Claim", async function () {
            return;
            try {
                const hydraTxBuilder = new HydraTxBuilder({
                    meshWallet: meshWallet,
                    hydraProvider: hydraProvider,
                    owner: owner,
                    minimumTip: 10_000_000,
                });

                await hydraTxBuilder.initialize();
                const unsignedTx = await hydraTxBuilder.claim();
                const signedTx = await meshWallet.signTx(unsignedTx, false);
                const txHash = await hydraTxBuilder.hydraProvider.submitTx(signedTx);
            } catch (error) {
                console.log(error);
            }
        });
    });
});
