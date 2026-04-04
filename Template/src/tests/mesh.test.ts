import { APP_MNEMONIC, APP_NETWORK_ID } from "~/constants/enviroments";
import { blockfrostProvider } from "~/providers/cardano";
import { MeshTxBuilder } from "~/txbuilders/mesh.txbuilder";
import { MeshWallet } from "@meshsdk/core";

describe("This is testcase Tip and Cliam with Tipjar validator", function () {
    let meshWallet: MeshWallet;
    let owner: string;

    // 0: alice => owner => addr_test1qz45qtdupp8g30lzzr684m8mc278s284cjvawna5ypwkvq7s8xszw9mgmwpxdyakl7dgpfmzywctzlsaghnqrl494wnqhgsy3g
    // 1: bob => tipper => addr_test1qr39uar0u87xrmptw0f8ryx5mp3scvc3pkehp57yj5zhugxdgese6p77sy9hk0rqc5wqd6n8vmfyqq9f7sdfz9dm0azqzmmdew
    // 2: carol => tipper => addr_test1qqy0z4ekhv8gcnmvkeakkaher82rlrx2yu9y79cjf4r704pqg73fhf002takqewlvjcy39dellyumg43f08uea0p6mps7pw77f
    // 3: eve => tipper => addr_test1qrpfhvwrmq0y27k2elu0seh65w6kwyxxee6sq7f9d2ax62e8wm6fj2y63rp3kql4skhu2wyt0uml07w2pggzpzh95ugqk9j5d9

    beforeEach(async function () {
        meshWallet = new MeshWallet({
            accountIndex: 0,
            networkId: APP_NETWORK_ID,
            fetcher: blockfrostProvider,
            submitter: blockfrostProvider,
            key: {
                type: "mnemonic",
                words: APP_MNEMONIC.split(" ") || [],
            },
        });
        owner = "addr_test1qrr879mjnxd3gjqjdgjxkwzfcnvcgsve927scqk5fc3gfs2hs03pn7uhujentyhzq3ays72u4xtfrlahyjalujhxufsqdeezc0";

        console.log(await meshWallet.getChangeAddress());
    });

    jest.setTimeout(6_000_000);

    test("Tip", async function () {
        return;
        const meshTxBuilder: MeshTxBuilder = new MeshTxBuilder({
            meshWallet: meshWallet,
            owner: owner,
            minimumTip: 10_000_000,
        });
        const unsignedTx: string = await meshTxBuilder.tip({
            amount: "123456789",
        });
        const signedTx = await meshWallet.signTx(unsignedTx, true);
        const txHash = await meshWallet.submitTx(signedTx);
        await new Promise<void>(function (resolve, reject) {
            blockfrostProvider.onTxConfirmed(txHash, () => {
                console.log("https://preview.cexplorer.io/tx/" + txHash);
                resolve();
            });
        });
    });

    test("Claim", async function () {
        return;
        const meshTxBuilder: MeshTxBuilder = new MeshTxBuilder({
            meshWallet: meshWallet,
            owner: owner,
            minimumTip: 10_000_000,
        });
        const unsignedTx: string = await meshTxBuilder.claim();
        const signedTx = await meshWallet.signTx(unsignedTx, true);
        const txHash = await meshWallet.submitTx(signedTx);
        await new Promise<void>(function (resolve, reject) {
            blockfrostProvider.onTxConfirmed(txHash, () => {
                console.log("https://preview.cexplorer.io/tx/" + txHash);
                resolve();
            });
        });
    });
});
