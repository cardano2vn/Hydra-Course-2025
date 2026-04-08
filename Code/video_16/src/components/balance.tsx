"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { Button } from "./ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { number } from "zod";
import { CommitSchema } from "~/lib/schema";
import { useWallet } from "~/hooks/use-wallet";
import { useQueryClient } from "@tanstack/react-query";
import { UTxO } from "@meshsdk/core";
import { DECIMAL_PLACE } from "~/constants/common";
import { toast } from "sonner";
import { claim, commit, decommit, fanout, publishDecommit, submitHydraTx } from "~/services/hydra.service";
import { submitTx } from "~/services/mesh.service";
import { deleteProposal } from "~/services/tipjar.service";
import CountUp from "react-countup";

type Commit = z.infer<typeof CommitSchema>;

const Balance = ({
    walletUtxos,
    headUtxos,
    status,
    recents,
    isLoadingRecent,
}: {
    walletUtxos: Array<{ txHash: string; amount: number; outputIndex: number }>;
    headUtxos: Array<UTxO>;
    status: string;
    recents: Array<{ address: string; amount: number }>;
    isLoadingRecent: boolean;
}) => {
    const [activeTab, setActiveTab] = useState<"commit" | "decommit" | "close & fanout">("commit");
    const { address, signTx, getUtxos } = useWallet();
    const queryClient = useQueryClient();
    const [isLoadingFanout, setIsLoadingFanout] = useState(false);
    const [isLoadingClaim, setIsLoadingClaim] = useState(false);
    const [selectedDecommitValue, setSelectedDecommitValue] = useState<string>("");

    const {
        register: commitRegister,
        handleSubmit: handleCommitSubmit,
        formState: { errors: commitErrors, isSubmitting: isSubmittingCommit },
        setValue: setCommitValue,
        reset: resetCommit,
    } = useForm<Commit>({
        resolver: zodResolver(CommitSchema),
        defaultValues: { txHash: "", outputIndex: 0, amount: 0 },
    });

    const {
        register: decommitRegister,
        handleSubmit: handleDecommitSubmit,
        formState: { errors: decommitErrors, isSubmitting: isSubmittingDecommit },
        setValue: setDecommitValue,
        reset: resetDecommit,
    } = useForm<Commit>({
        resolver: zodResolver(CommitSchema),
        defaultValues: { txHash: "", outputIndex: 0, amount: 0 },
    });

    const handleSelectCommit = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const value = e.target.value;
            if (value) {
                const parsed = JSON.parse(value);
                setCommitValue("txHash", parsed.txHash);
                setCommitValue("outputIndex", parsed.outputIndex);
                setCommitValue("amount", Number(parsed.amount));
            } else {
                resetCommit();
            }
        },
        [setCommitValue, resetCommit],
    );

    const handleSelectDecommit = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            const value = event.target.value;
            setSelectedDecommitValue(value);
            if (value) {
                const { txHash, outputIndex, amount } = JSON.parse(value);
                setDecommitValue("txHash", txHash);
                setDecommitValue("outputIndex", outputIndex);
                setDecommitValue("amount", Number(amount));
            } else {
                resetDecommit();
            }
        },
        [setDecommitValue, resetDecommit],
    );

    const onCommit = useCallback(
        async (data: Commit) => {
            if (!address || !data) return;
            try {
                const utxo = (await getUtxos()).find((utxo) => utxo.input.txHash === data.txHash && utxo.input.outputIndex === data.outputIndex);
                if (!utxo) {
                    toast.error("Selected UTxO not found in your wallet.");
                    return;
                }
                const unsignedTx = await commit({
                    utxo: utxo,
                    address: address as string,
                    isCreator: true,
                });
                const signedTx = await signTx(unsignedTx);
                await submitTx({ signedTx });

                toast.success("Success committed to the head");
                await Promise.allSettled([
                    queryClient.invalidateQueries({ queryKey: ["fetch-utxo-hydra", address] }),
                    queryClient.invalidateQueries({ queryKey: ["fetch-utxo-commit", address] }),
                    queryClient.invalidateQueries({ queryKey: ["fetch-status-hydra"] }),
                ]);
            } catch (error) {
                toast.error("An error eccured while submitting your proposal.");
            } finally {
                resetCommit();
            }
        },
        [address, signTx],
    );

    const onClaim = useCallback(async () => {
        if (!address) {
            toast.error("Please connect your wallet");
            return;
        }
        try {
            setIsLoadingClaim(true);
            const unsignedTx = await claim({ address: address as string, isCreator: true });
            const signedTx = await signTx(unsignedTx);
            await submitHydraTx({ address: address as string, signedTx, isCreator: true });
            toast.success("Claim completed successfully!");
            await Promise.allSettled([
                queryClient.invalidateQueries({ queryKey: ["fetch-utxo-hydra", address] }),
                queryClient.invalidateQueries({ queryKey: ["fetch-utxo-commit", address] }),
                queryClient.invalidateQueries({ queryKey: ["fetch-status-hydra"] }),
            ]);
        } catch (error) {
            toast.success("Claim completed successfully!");
        } finally {
            setIsLoadingClaim(false);
        }
    }, [address, signTx, queryClient]);

    const onDecommit = useCallback(
        async (data: Commit) => {
            if (!address || !data) return;
            try {
                const utxo = headUtxos?.find((utxo) => utxo.input.txHash === data.txHash && utxo.input.outputIndex === data.outputIndex);
                if (!utxo) {
                    toast.error("Selected UTxO not found in Hydra. Please select a valid UTxO.");
                }
                const unsignedTx = await decommit({
                    address: address as string,
                    utxo: utxo as UTxO,
                    isCreator: false,
                });
                const signedTx = await signTx(unsignedTx);
                await publishDecommit({ address: address as string, signedTx, isCreator: false });

                toast.success("Successfully decommitted from the head!");
                await Promise.allSettled([
                    queryClient.invalidateQueries({ queryKey: ["fetch-utxo-hydra", address] }),
                    queryClient.invalidateQueries({ queryKey: ["fetch-utxo-commit", address] }),
                    queryClient.invalidateQueries({ queryKey: ["fetch-status-hydra"] }),
                ]);
            } catch (error) {
                toast.error("An error occurred while submitting your proposal. Please try again.");
            }
        },
        [address, signTx, headUtxos, queryClient],
    );

    const onFanout = useCallback(async () => {
        if (!address) {
            toast.error("Please connect your wallet");
            return;
        }
        try {
            setIsLoadingFanout(true);
            await deleteProposal(address as string);
            await fanout({ address: address as string, isCreator: true });
            toast.success("Fanout complete sucessfully");

            await Promise.allSettled([
                queryClient.invalidateQueries({ queryKey: ["fetch-utxo-hydra", address] }),
                queryClient.invalidateQueries({ queryKey: ["fetch-utxo-commit", address] }),
                queryClient.invalidateQueries({ queryKey: ["fetch-status-hydra"] }),
            ]);
        } catch (error) {
            toast.success("Fanout complete sucessfully");
        } finally {
            setIsLoadingFanout(false);
        }
    }, [address, signTx, queryClient]);

    return (
        <motion.div
            className="mx-auto rounded-2xl border border-blue-200/50 bg-white p-6 shadow-lg dark:border-blue-900/30 dark:bg-slate-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header Balance + Withdraw Button */}
            <div className="rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 p-4 dark:from-blue-900/50 dark:to-purple-900/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <motion.div className="rounded-full bg-white/90 p-2 dark:bg-slate-800/90" whileHover={{ scale: 1.1 }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6 text-blue-600 dark:text-blue-400"
                            >
                                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                                <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                            </svg>
                        </motion.div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Balance Tipped</p>
                            <motion.p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                                {isLoadingRecent ? (
                                    "0,0000"
                                ) : (
                                    <CountUp
                                        start={0}
                                        end={Number(recents?.reduce((total, recent) => total + recent.amount, 0) / DECIMAL_PLACE) || 0}
                                        duration={2.75}
                                        separator=" "
                                        decimals={4}
                                        decimal=","
                                    />
                                )}{" "}
                                ADA
                            </motion.p>
                        </div>
                    </div>

                    <Button className="bg-blue-600 hover:bg-blue-700" disabled={status !== "OPEN" || isLoadingClaim} onClick={onClaim}>
                        {isLoadingClaim ? "Processing Claim..." : "Claim"}
                    </Button>
                </div>
            </div>

            {/* Tab Navigation - chỉ hiện khi OPEN */}
            {status === "OPEN" && (
                <div className="mt-6 flex border-b border-gray-200 dark:border-slate-700">
                    {(["commit", "decommit", "close & fanout"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 text-sm font-medium transition-all relative capitalize ${
                                activeTab === tab ? "text-blue-600 dark:text-blue-400" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                            }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute bottom-0 left-1/2 h-0.5 w-10 -translate-x-1/2 bg-blue-600 rounded"
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}

            <AnimatePresence mode="wait">
                {status !== "OPEN" ? (
                    <motion.div
                        key="closed-state"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-6"
                    >
                        <div className="rounded-lg bg-blue-50/80 p-4 dark:bg-slate-800/80">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                To retrieve your assets, please connect your wallet and use the Withdraw button above.
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    <>
                        {activeTab === "commit" && (
                            <motion.div
                                key="commit"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="mt-6"
                            >
                                <form className="space-y-4" onSubmit={handleCommitSubmit(null!)}>
                                    <div className="relative">
                                        <label className="absolute -top-2 left-3 bg-white dark:bg-slate-900 px-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                                            Select ADA to Commit
                                        </label>
                                        <select
                                            onChange={handleSelectCommit}
                                            className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 px-4 focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">-- Select UTXO from wallet --</option>
                                            {walletUtxos.map((utxo, index) => {
                                                return (
                                                    <option key={index} value={JSON.stringify(utxo)}>
                                                        {Number(utxo.amount) / DECIMAL_PLACE} ADA
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button className="w-full bg-blue-600 text-white" disabled={isSubmittingCommit}>
                                                Commit to Head
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Confirm Commit</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    You are about to commit {commitErrors.amount ? "" : "selected amount"} ADA into the Hydra Head.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleCommitSubmit(onCommit)}>Confirm Commit</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </form>
                            </motion.div>
                        )}
                        {activeTab === "decommit" && (
                            <motion.div
                                key="decommit"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="mt-6"
                            >
                                <form onSubmit={handleDecommitSubmit(null!)} className="space-y-4">
                                    <div className="relative">
                                        <label className="absolute -top-2 left-3 bg-white dark:bg-slate-900 px-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                                            Select ADA to Decommit
                                        </label>
                                        <select
                                            onChange={handleSelectDecommit}
                                            value={selectedDecommitValue}
                                            className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 px-4 focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">-- Select UTXO from Head --</option>
                                            {headUtxos?.map((utxo) => {
                                                return (
                                                    <option
                                                        key={`${utxo.input.txHash}-${utxo.input.outputIndex}`}
                                                        value={JSON.stringify({
                                                            txHash: utxo.input.txHash,
                                                            outputIndex: utxo.input.outputIndex,
                                                            amount: utxo.output.amount.find((u) => u.unit === "lovelace")?.quantity,
                                                        })}
                                                    >
                                                        {Number(utxo.output.amount.find((u) => u.unit === "lovelace")?.quantity)}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        {decommitErrors.txHash && <p className="text-red-500 text-xs mt-1">{decommitErrors.txHash?.message}</p>}
                                    </div>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                className="w-full bg-orange-600 hover:bg-orange-700"
                                                type="button"
                                                disabled={isSubmittingDecommit}
                                            >
                                                Decommit from Head
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Confirm Decommit</AlertDialogTitle>
                                                <AlertDialogDescription>This UTXO will be moved back to your Layer 1 wallet.</AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleDecommitSubmit(onDecommit)} disabled={isSubmittingDecommit}>
                                                    {isSubmittingDecommit ? "Processing..." : "Confirm Decommit"}
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </form>
                            </motion.div>
                        )}
                        {activeTab === "close & fanout" && (
                            <motion.div
                                key="fanout"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="mt-6 text-center"
                            >
                                <div className="rounded-xl bg-purple-50 dark:bg-purple-900/30 p-8 space-y-4">
                                    <div>
                                        <p className="mb-6 text-lg font-medium text-purple-800 dark:text-purple-200">
                                            Fanout will distribute all funds to participants according to the final snapshot.
                                        </p>
                                        <Button
                                            size="lg"
                                            className="bg-purple-600 hover:bg-purple-700 w-full"
                                            onClick={onFanout}
                                            disabled={isLoadingFanout}
                                        >
                                            {isLoadingFanout ? "Processing Close & Fanout..." : "Close & Fanout"}
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Balance;
