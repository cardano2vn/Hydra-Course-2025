import { blockfrostProvider } from "~/providers/cardano";
import {
    applyParamsToScript,
    deserializeAddress,
    deserializeDatum,
    IFetcher,
    MeshTxBuilder,
    MeshWallet,
    mPubKeyAddress,
    PlutusScript,
    scriptAddress,
    serializeAddressObj,
    serializePlutusScript,
    UTxO,
} from "@meshsdk/core";
import plutus from "../../contract/plutus.json";
import { APP_NETWORK_ID } from "~/constants/enviroments";
import { serialize } from "v8";

export class MeshAdapter {
    protected spendAddress: string;
    protected spendCompileCode: string;
    protected spendScriptCbor: string;
    protected spendScript: PlutusScript;
    protected fetcher: IFetcher;
    protected meshWallet: MeshWallet;
    protected meshTxBuilder: MeshTxBuilder;

    constructor({ meshWallet = null!, owner, minimumTip }: { meshWallet: MeshWallet; owner: string; minimumTip: number }) {
        this.meshWallet = meshWallet;
        this.fetcher = blockfrostProvider;
        this.meshTxBuilder = new MeshTxBuilder({
            fetcher: this.fetcher,
            evaluator: blockfrostProvider,
        });
        this.spendCompileCode = this.readValidator("tipjar.tipjar.spend");
        this.spendScriptCbor = applyParamsToScript(this.spendCompileCode, [
            mPubKeyAddress(deserializeAddress(owner).pubKeyHash, deserializeAddress(owner).stakeCredentialHash),
            minimumTip,
        ]);
        this.spendScript = {
            code: this.spendScriptCbor,
            version: "V3",
        };
        this.spendAddress = serializeAddressObj(
            scriptAddress(
                deserializeAddress(serializePlutusScript(this.spendScript, undefined, APP_NETWORK_ID, false).address).scriptHash,
                "",
                false,
            ),
            APP_NETWORK_ID,
        );
    }

    protected getWalletForTx = async (): Promise<{
        utxos: UTxO[];
        collateral: UTxO;
        walletAddress: string;
    }> => {
        const utxos = await this.meshWallet.getUtxos();
        const collaterals = await this.meshWallet.getCollateral();
        const walletAddress = await this.meshWallet.getChangeAddress();

        if (!utxos || utxos.length === 0) {
            throw new Error("No UTxOs found in getWalletForTx method");
        }

        if (!collaterals || collaterals.length === 0) {
            throw new Error("No collateral found in getWalletForTx method");
        }

        if (!walletAddress) {
            throw new Error("No wallet address found in getWalletForTx method");
        }

        return {
            utxos: utxos,
            collateral: collaterals[0],
            walletAddress: walletAddress,
        };
    };

    protected readValidator = function (title: string): string {
        const validator = plutus.validators.find(function (validator) {
            return validator.title === title;
        });

        if (!validator) {
            throw new Error(`${validator} title not found.`);
        }

        return validator.compiledCode;
    };

    protected convertDatum = function (plutusData: string): Array<{ address: string; amount: number }> {
        const datum = deserializeDatum(plutusData);

        const result = datum.fields.map((item: any) => {
            const addressHex = item.fields[0].bytes;
            const address = Buffer.from(addressHex, "hex").toString("utf8");
            const amount = item.fields[1].int;

            return { address, amount: Number(amount) };
        });

        return result;
    };
}
