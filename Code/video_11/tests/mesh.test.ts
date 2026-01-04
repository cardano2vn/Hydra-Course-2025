import { MeshWallet } from "@meshsdk/core";
import { blockfrostProvider } from "@/providers/cardano.provider";
import { MeshTxBuilder } from "@/txbuilders/mesh.txbuilder";

describe("This is testcase Lock and Unlock with Helloworld Validator", function () {
    let meshWallet: MeshWallet;
    beforeEach(async function () {
        meshWallet = new MeshWallet({
            networkId: 0,
            fetcher: blockfrostProvider,
            submitter: blockfrostProvider,
            key: {
                type: "mnemonic",
                // words: process.env.APP_MNEMONIC?.split(" ") || [],
                words: process.env.ALICE_APP_MNEMONIC?.split(" ") || [],

                // words: process.env.BOB_APP_MNEMONIC?.split(" ") || [],
            },
        });
    });
    jest.setTimeout(600000000);

    test("Lock", async function () {});

    test("Un Lock", async function () {});

    test("Removes", async function () {});
});