import { blockfrostProvider } from "~/providers/cardano";
import {
    applyParamsToScript,
    deserializeAddress,
    deserializeDatum,
    IFetcher,
    mConStr0,
    mConStr2,
    mConStr3,
    MeshTxBuilder,
    MeshWallet,
    mPubKeyAddress,
    PlutusScript,
    scriptAddress,
    serializeAddressObj,
    serializePlutusScript,
    UTxO,
} from "@meshsdk/core";
import { HydraInstance, HydraProvider } from "@meshsdk/hydra";
import plutus from "../../contract/plutus.json";
import { APP_NETWORK, APP_NETWORK_ID } from "~/constants/enviroments";

export class HydraAdapter {
    public meshTxBuilder!: MeshTxBuilder;
    public hydraTxBuilder!: MeshTxBuilder;
    public hydraInstance!: HydraInstance;
    public hydraProvider: HydraProvider;
    public spendAddress: string;
    protected spendCompileCode: string;
    protected spendScriptCbor: string;
    protected spendScript: PlutusScript;
    protected fetcher: IFetcher;
    protected meshWallet: MeshWallet;

    constructor({
        meshWallet,
        hydraProvider,
        owner,
        minimumTip,
    }: {
        meshWallet: MeshWallet;
        hydraProvider: HydraProvider;
        owner: string;
        minimumTip: number;
    }) {
        this.meshWallet = meshWallet;
        this.fetcher = blockfrostProvider;
        this.hydraProvider = hydraProvider;
        this.hydraInstance = new HydraInstance({
            submitter: blockfrostProvider,
            provider: this.hydraProvider,
            fetcher: blockfrostProvider,
        });

        this.meshTxBuilder = new MeshTxBuilder({
            fetcher: this.fetcher,
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
            scriptAddress(deserializeAddress(serializePlutusScript(this.spendScript, undefined, APP_NETWORK_ID).address).scriptHash, "", false),
            APP_NETWORK_ID,
        );
    }

    public async initialize(): Promise<void> {
        await this.connect();
        const protocolParameters = await this.hydraProvider.fetchProtocolParameters();
        this.hydraTxBuilder = new MeshTxBuilder({
            params: protocolParameters,
            fetcher: this.hydraProvider,
            submitter: this.hydraProvider,
            isHydra: true,
        });
    }

    public connect = async () => {
        try {
            await this.hydraProvider.connect();
        } catch (error) {
            throw error;
        }
    };

    public disconnect = async () => {
        try {
            await this.hydraProvider.disconnect();
        } catch (error) {
            throw error;
        }
    };

    public init = async () => {
        try {
            await this.connect();
            await this.hydraProvider.init();
        } catch (error) {
            throw error;
        }
    };

    public close = async () => {
        try {
            await this.connect();
            await this.hydraProvider.close();
        } catch (error) {
            throw error;
        }
    };

    public fanout = async () => {
        try {
            await this.connect();
            await this.hydraProvider.fanout();
        } catch (error) {
            throw error;
        }
    };

    public commit = async ({ utxo, blueprint = false }: { utxo?: UTxO; blueprint?: boolean }) => {
        if (!utxo) {
            return await this.hydraInstance.commitEmpty();
        }

        const { walletAddress, utxos, collateral } = await this.getWalletForTx();

        const unsignedTx = this.meshTxBuilder
            .selectUtxosFrom(utxos)
            .txInCollateral(collateral.input.txHash, collateral.input.outputIndex)
            .changeAddress(walletAddress)
            .setFee("0")
            .setNetwork(APP_NETWORK);

        if (utxo && blueprint) {
            unsignedTx
                .spendingPlutusScriptV3()
                .txIn(utxo.input.txHash, utxo.input.outputIndex)
                .txInInlineDatumPresent()
                .txInRedeemerValue(mConStr0([]))
                .txInScript(this.spendScriptCbor);
        } else {
            unsignedTx.txIn(utxo.input.txHash, utxo.input.outputIndex);
        }

        if (utxo.output.plutusData) {
            unsignedTx.txOut(utxo.output.address, utxo.output.amount).txOutInlineDatumValue(utxo.output.plutusData, "CBOR");
        }

        const cborHex = await unsignedTx.complete();

        return await this.hydraInstance.commitBlueprint(utxo.input.txHash, utxo.input.outputIndex, {
            cborHex: cborHex,
            description: "",
            type: "Tx ConwayEra",
        });
    };

    public deposit = async ({ utxo, blueprint = false }: { utxo?: UTxO; blueprint?: boolean }) => {
        if (!utxo) {
            return await this.hydraInstance.commitEmpty();
        }

        const { walletAddress, utxos, collateral } = await this.getWalletForTx();

        const unsignedTx = this.meshTxBuilder
            .selectUtxosFrom(utxos)
            .txInCollateral(collateral.input.txHash, collateral.input.outputIndex)
            .changeAddress(walletAddress)
            .setFee("0")
            .setNetwork(APP_NETWORK);
        await this.hydraProvider.subscribeSnapshotUtxo();

        if (utxo && blueprint) {
            unsignedTx
                .spendingPlutusScriptV3()
                .txIn(utxo.input.txHash, utxo.input.outputIndex)
                .txInInlineDatumPresent()
                .txInRedeemerValue(mConStr0([]))
                .txInScript(this.spendScriptCbor);
        } else {
            unsignedTx.txIn(utxo.input.txHash, utxo.input.outputIndex);
        }

        if (utxo.output.plutusData) {
            unsignedTx.txOut(utxo.output.address, utxo.output.amount).txOutInlineDatumValue(utxo.output.plutusData, "CBOR");
        }

        const cborHex = await unsignedTx.complete();

        return await this.hydraInstance.incrementalBlueprintCommit(utxo.input.txHash, utxo.input.outputIndex, {
            cborHex: cborHex,
            description: "",
            type: "Tx ConwayEra",
        });
    };

    public decommit = async ({ utxo, blueprint = false }: { utxo: UTxO; blueprint?: boolean }) => {
        const { walletAddress, utxos, collateral } = await this.getWalletForHydraTx();

        const unsignedTx = this.hydraTxBuilder
            .selectUtxosFrom(utxos)
            .txInCollateral(collateral.input.txHash, collateral.input.outputIndex)
            .changeAddress(walletAddress)
            .setFee("0")
            .setNetwork(APP_NETWORK);

        if (utxo && blueprint) {
            unsignedTx
                .spendingPlutusScriptV3()
                .txIn(utxo.input.txHash, utxo.input.outputIndex)
                .txInInlineDatumPresent()
                .txInRedeemerValue(mConStr0([]))
                .txInScript(this.spendScriptCbor);
        } else {
            unsignedTx.txIn(utxo.input.txHash, utxo.input.outputIndex);
        }

        if (utxo.output.plutusData) {
            unsignedTx.txOut(utxo.output.address, utxo.output.amount).txOutInlineDatumValue(utxo.output.plutusData, "CBOR");
        }

        return await unsignedTx.complete();
    };

    protected readValidator = function (title: string): string {
        const validator = plutus.validators.find(function (validator) {
            return validator.title === title;
        });

        if (!validator) {
            throw new Error(`${title} validator not found.`);
        }
        return validator.compiledCode;
    };

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

    protected getWalletForHydraTx = async (): Promise<{
        utxos: UTxO[];
        collateral: UTxO;
        walletAddress: string;
    }> => {
        const walletAddress = await this.meshWallet.getChangeAddress();
        const utxos = await this.hydraProvider.fetchAddressUTxOs(walletAddress);
        const collaterals = utxos.filter(function (utxo) {
            const lovelace = utxo.output.amount.find((a) => a.unit === "lovelace");
            if (!lovelace) return false;
            const amount = Number(lovelace.quantity);
            if (amount < 5_000_000) return false;
            return utxo.output.amount.length === 1;
        });

        if (!utxos || utxos.length === 0) {
            throw new Error("No UTxOs found in getWalletForTx method");
        }

        if (!collaterals || collaterals.length === 0) {
            const unsignedTx = await this.hydraTxBuilder
                .txOut(walletAddress, [{ unit: "lovelace", quantity: "5000000" }])
                .selectUtxosFrom(utxos)
                .changeAddress(walletAddress)
                .setFee("0")
                .setNetwork(APP_NETWORK)
                .complete();
            const signedTx = await this.meshWallet.signTx(unsignedTx, true);
            await this.hydraProvider.submitTx(signedTx);
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

    public convertDatum = function (plutusData: string): Array<{ address: string; amount: number }> {
        const datum = deserializeDatum(plutusData || "");

        const result = datum.fields.map((item: any) => {
            const addressHex = item.fields[0].bytes;
            const address = Buffer.from(addressHex, "hex").toString("utf8");
            const amount = item.fields[1].int;

            return { address, amount: Number(amount) };
        });

        return result;
    };
}
