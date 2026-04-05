"use client";

import { memo, useCallback, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet } from "./icons";
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
import { CommitSchema, TipSchema } from "~/lib/schema"; // thêm DecommitSchema
import z from "zod";
import Image from "next/image";
import { images } from "~/public/images";
import CountUp from "react-countup";
import { UTxO } from "@meshsdk/core";
import { useWallet } from "~/hooks/use-wallet";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUTxOsCommit, submitTx } from "~/services/mesh.service";
import { DECIMAL_PLACE } from "~/constants/common";
import { commit, decommit, getUTxOsFromHydra, publishDecommit, submitHydraTx, tip } from "~/services/hydra.service";
import { toast } from "sonner";

type Commit = z.infer<typeof CommitSchema>;
type TipForm = z.infer<typeof TipSchema>;
type Decommit = z.infer<typeof CommitSchema>;

const FormTip = function ({
    tipAddress,
    status,
    recents,
    isLoadingRecent,
}: {
    tipAddress: string;
    status: string;
    recents: Array<{ address: string; amount: number }>;
    isLoadingRecent: boolean;
}) {
    const [amount, setAmount] = useState<string>("");
    const decommitFormRef = useRef<HTMLFormElement>(null);
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState<"tip" | "commit" | "decommit" | "close" | "fanout">("tip");
    const [selectedCommitValue, setSelectedCommitValue] = useState<string>("");
    const [selectedDecommitValue, setSelectedDecommitValue] = useState<string>("");
    const { address, getUtxos, signTx } = useWallet();
    const { data: utxosCommit, isLoading: isLoadingUtxosCommit } = useQuery({
        queryKey: ["fetch-utxo-commit", address],
        queryFn: () => getUTxOsCommit({ walletAddress: address as string }),
        enabled: !!address,
    });

    const { data: utxosFromHydra, isLoading: isLoadingUtxosFromHydra } = useQuery({
        queryKey: ["fetch-utxo-hydra", address],
        queryFn: () => getUTxOsFromHydra(address as string),
        enabled: !!address,
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        reset: resetCommit,
    } = useForm<Commit>({
        resolver: zodResolver(CommitSchema),
        defaultValues: { txHash: "", outputIndex: 0, amount: 0 },
    });

    const {
        register: registerSend,
        handleSubmit: handleSubmitSend,
        formState: { errors: errorsSend, isSubmitting: isSubmittingSend },
        setValue: setValueSend,
        reset: resetTip,
    } = useForm<TipForm>({
        resolver: zodResolver(TipSchema),
        defaultValues: { amount: 0 },
    });

    const {
        register: registerDecommit,
        handleSubmit: handleFormSubmitDecommit,
        formState: { errors: errorsDecommit, isSubmitting: isSubmittingDecommit },
        setValue: setValueDecommit,
        reset: resetDecommit,
    } = useForm<Decommit>({
        resolver: zodResolver(CommitSchema),
        defaultValues: { txHash: "", outputIndex: 0, amount: 0 },
    });

    const handleChangeTip = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            if (/^\d*\.?\d{0,6}$/.test(value) && Number(value) >= 0) {
                setAmount(value);
                setValueSend("amount", Number(value), { shouldValidate: true });
            }
        },
        [setValueSend],
    );

    const handleSelectCommit = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            const value = event.target.value;
            setSelectedCommitValue(value);
            if (value) {
                const value = event.target.value;
                const parsed = JSON.parse(value);
                setValue("txHash", parsed.txHash);
                setValue("outputIndex", parsed.outputIndex);
                setValue("amount", parsed.amount);
            } else {
                resetCommit();
            }
        },
        [setValue, resetCommit],
    );

    const handleSelectDecommit = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            const value = event.target.value;
            setSelectedDecommitValue(value);
            if (value) {
                const { txHash, outputIndex, amount } = JSON.parse(value);
                setValueDecommit("txHash", txHash);
                setValueDecommit("outputIndex", outputIndex);
                setValueDecommit("amount", Number(amount));
            } else {
                resetDecommit();
            }
        },
        [setValueDecommit, resetDecommit],
    );

    const handleSubmitCommit = useCallback(
        async (data: Commit) => {
            if (!address || !data) return;
            try {
                const utxo = (await getUtxos()).find((utxo) => utxo.input.txHash === data.txHash && utxo.input.outputIndex === data.outputIndex);
                if (!utxo) {
                    toast.error("Selected UTxO not found in your wallet. Please select a valid UTxO.");
                    return;
                }
                const unsignTx = await commit({
                    address: address as string,
                    utxo: utxo,
                    isCreator: false,
                });
                const signedTx = await signTx(unsignTx);
                await submitTx({ signedTx: signedTx });

                toast.success("Successfully committed to the head!");

                await Promise.allSettled([
                    queryClient.invalidateQueries({ queryKey: ["fetch-utxo-hydra", address] }),
                    queryClient.invalidateQueries({ queryKey: ["fetch-utxo-commit", address] }),
                    queryClient.invalidateQueries({ queryKey: ["fetch-status-hydra"] }),
                ]);
            } catch (error) {
                toast.error("An error occurred while submitting your proposal. Please try again.");
            }
        },
        [address, signTx],
    );

    const onSubmitSend = useCallback(
        async function (data: TipForm) {
            try {
                if (!tipAddress) {
                    toast.error("Invalid tip address. Please check and try again.");
                    return;
                }
                if (!data.amount || data.amount <= 0) {
                    toast.error("Please enter a valid tip amount greater than 0.");
                    return;
                }

                const unsignedTx = await tip({
                    address: address as string,
                    tipAddress: tipAddress as string,
                    amount: data.amount * DECIMAL_PLACE,
                    isCreator: false,
                });
                const signedTx = await signTx(unsignedTx);
                await submitHydraTx({ address: address as string, signedTx, isCreator: false });
                toast.success("Tip sent successfully!");
                resetTip();

                await Promise.allSettled([
                    queryClient.invalidateQueries({ queryKey: ["fetch-utxo-hydra", address] }),
                    queryClient.invalidateQueries({ queryKey: ["fetch-utxo-commit", address] }),
                    queryClient.invalidateQueries({ queryKey: ["fetch-status-hydra"] }),
                ]);
            } catch (error) {
                toast.success("Tip sent successfully!");
                resetTip();
            }
        },
        [address, signTx, tipAddress, queryClient],
    );

    const handleSubmitDecommit = useCallback(
        async (data: Decommit) => {
            if (!address || !data) return;
            try {
                const utxo = utxosFromHydra?.find((utxo) => utxo.input.txHash === data.txHash && utxo.input.outputIndex === data.outputIndex);
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
        [address, signTx, utxosFromHydra, queryClient],
    );
    return (
        <motion.div
            className="rounded-2xl border border-blue-200/50 bg-white p-6 shadow-lg dark:border-blue-900/30 dark:bg-slate-900"
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            initial="hidden"
            animate="visible"
        >
            {/* Header Balance */}
            <div className="rounded-lg flex items-center justify-between bg-gradient-to-r from-blue-100 to-purple-100 p-4 dark:from-blue-900/50 dark:to-purple-900/50">
                <div className="flex items-center gap-3">
                    <motion.div
                        className="rounded-full bg-white/90 p-2 dark:bg-slate-800/90"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    </motion.div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Balance On Hydra</p>
                        <motion.p
                            className="text-xl font-semibold text-blue-600 dark:text-blue-400"
                            variants={{
                                initial: { opacity: 0, x: -10 },
                                animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
                            }}
                            initial="initial"
                            animate="animate"
                        >
                            {false ? (
                                "0.00"
                            ) : (
                                <CountUp
                                    start={0}
                                    end={
                                        Number(
                                            utxosFromHydra
                                                ?.filter((utxo) => utxo.output.address === address)
                                                .reduce((total, utxo) => {
                                                    const lovelace = Number(utxo.output.amount.find((a) => a.unit === "lovelace")?.quantity || 0);
                                                    return total + lovelace;
                                                }, 0),
                                        ) / DECIMAL_PLACE
                                    }
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
                <div className="flex items-center gap-3">
                    <motion.div
                        className="rounded-full bg-white/90 p-2 dark:bg-slate-800/90"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    </motion.div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total ADA Tipped</p>
                        <motion.p
                            className="text-xl font-semibold text-blue-600 dark:text-blue-400"
                            variants={{
                                initial: { opacity: 0, x: -10 },
                                animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
                            }}
                            initial="initial"
                            animate="animate"
                        >
                            {isLoadingRecent ? (
                                "0.00"
                            ) : (
                                <CountUp
                                    start={0}
                                    end={(Number(recents?.find((recent) => recent.address === address)?.amount) || 0) / DECIMAL_PLACE}
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
            </div>

            {isLoadingUtxosCommit ? (
                <div className="mt-4 text-center">
                    <motion.div
                        className="h-5 w-5 border-2 border-t-transparent border-blue-600 rounded-full mx-auto"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                </div>
            ) : (
                <>
                    {status === "OPEN" && (
                        <div className="mt-6 flex border-b border-gray-200 dark:border-slate-700">
                            {(["tip", "commit", "decommit"] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-3 text-sm font-medium transition-all relative ${
                                        activeTab === tab
                                            ? "text-blue-600 dark:text-blue-400"
                                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
                                    }`}
                                >
                                    {tab === "tip" && "💸 Tip"}
                                    {tab === "commit" && "📥 Commit"}
                                    {tab === "decommit" && "📤 Decommit"}

                                    {activeTab === tab && (
                                        <motion.div className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600" layoutId="activeTab" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                    <AnimatePresence mode="wait">
                        {status !== "OPEN" ? (
                            <motion.div
                                key="initial-commit"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <form onSubmit={handleSubmit(handleSubmitCommit)} className="mt-4 flex flex-col">
                                    <motion.div
                                        className="relative"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.2 }}
                                    >
                                        <label
                                            htmlFor="initialCommit"
                                            className="absolute z-10 -top-2 left-3 rounded-xl bg-white dark:bg-slate-900/50 px-1 text-sm font-medium text-gray-700 dark:text-gray-200 transition-all"
                                        >
                                            Select ADA to Initial Commit
                                        </label>
                                        <select
                                            id="initialCommit"
                                            onChange={handleSelectCommit}
                                            value={selectedCommitValue}
                                            className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 px-4 text-base text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors disabled:opacity-50"
                                            aria-label="Select ADA amount to commit"
                                        >
                                            <option value="">-- Select amount --</option>
                                            {utxosCommit?.map((utxo) => {
                                                return (
                                                    <option key={`${utxo.txHash}-${utxo.outputIndex}`} value={JSON.stringify(utxo)}>
                                                        {Number(utxo.amount) / DECIMAL_PLACE}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        {errors.txHash && (
                                            <motion.p
                                                className="text-red-500 text-xs mt-1 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded"
                                                initial={{ x: -10, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
                                            >
                                                {errors.txHash?.message}
                                            </motion.p>
                                        )}
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.3 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="mt-6 w-full rounded-md bg-blue-600 dark:bg-blue-600 py-3 px-8 text-base font-semibold text-white dark:text-white shadow-lg hover:bg-blue-700 dark:hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                        >
                                            {isSubmitting ? (
                                                <motion.div
                                                    className="h-5 w-5 border-2 border-t-transparent border-white rounded-full mx-auto"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                />
                                            ) : (
                                                "Commit"
                                            )}
                                        </Button>
                                    </motion.div>
                                </form>
                            </motion.div>
                        ) : (
                            <>
                                {activeTab === "tip" && (
                                    <motion.div
                                        key="tip"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="mt-4"
                                    >
                                        <form
                                            onSubmit={handleSubmitSend(onSubmitSend)}
                                            className="rounded-lg bg-blue-50/80 p-4 dark:bg-slate-800/80 flex flex-col gap-4"
                                        >
                                            <motion.div
                                                className="relative"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: 0.2 }}
                                            >
                                                <label
                                                    htmlFor="tipAmount"
                                                    className="absolute z-10 -top-2 left-3 rounded-xl bg-white dark:bg-slate-800 px-1 text-sm font-medium text-gray-700 dark:text-gray-200 transition-all"
                                                >
                                                    Tip Amount (ADA)
                                                </label>
                                                <input
                                                    id="tipAmount"
                                                    type="number"
                                                    step="0.1"
                                                    min="0"
                                                    {...registerSend("amount", {
                                                        valueAsNumber: true,
                                                        setValueAs: (v) => (v === "" ? undefined : Number(v)),
                                                    })}
                                                    onChange={handleChangeTip}
                                                    placeholder="0.00"
                                                    className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 px-4 text-base text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors disabled:opacity-50"
                                                    aria-label="Enter tip amount"
                                                />
                                                {errorsSend.amount && (
                                                    <motion.p
                                                        className="text-red-500 text-xs mt-1 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded"
                                                        initial={{ x: -10, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
                                                    >
                                                        {errorsSend?.amount?.message}
                                                    </motion.p>
                                                )}
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: 0.3 }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Button
                                                    type="submit"
                                                    disabled={isSubmittingSend}
                                                    className="w-full rounded-md bg-blue-600 dark:bg-blue-600 py-3 px-8 text-base font-semibold text-white dark:text-white shadow-lg hover:bg-blue-700 dark:hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                                >
                                                    {isSubmittingSend ? (
                                                        <motion.div
                                                            className="h-5 w-5 border-2 border-t-transparent border-white rounded-full mx-auto"
                                                            animate={{ rotate: 360 }}
                                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                        />
                                                    ) : (
                                                        "Send Tip"
                                                    )}
                                                </Button>
                                            </motion.div>
                                        </form>
                                    </motion.div>
                                )}

                                {activeTab === "commit" && (
                                    <motion.div
                                        key="commit"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="mt-4"
                                    >
                                        <form
                                            onSubmit={handleSubmit(handleSubmitCommit)}
                                            className="flex flex-col gap-4 rounded-lg bg-blue-50/80 p-4 dark:bg-slate-800/80"
                                        >
                                            <motion.div
                                                className="relative"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: 0.2 }}
                                            >
                                                <label
                                                    htmlFor="commitUtxo"
                                                    className="absolute z-10 -top-2 left-3 rounded-xl bg-white dark:bg-slate-800 px-1 text-sm font-medium text-gray-700 dark:text-gray-200 transition-all"
                                                >
                                                    Select UTXO to Commit
                                                </label>
                                                <select
                                                    id="commitUtxo"
                                                    onChange={handleSelectCommit}
                                                    value={selectedCommitValue}
                                                    className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 px-4 text-base text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors disabled:opacity-50"
                                                    aria-label="Select UTXO from wallet to commit"
                                                >
                                                    <option value="">-- Select amount from wallet --</option>
                                                    {utxosCommit?.map((utxo) => {
                                                        return (
                                                            <option key={`${utxo.txHash}-${utxo.outputIndex}`} value={JSON.stringify(utxo)}>
                                                                {Number(utxo.amount) / DECIMAL_PLACE}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                                {errors.txHash && (
                                                    <motion.p
                                                        className="text-red-500 text-xs mt-1 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded"
                                                        initial={{ x: -10, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
                                                    >
                                                        {errors.txHash?.message}
                                                    </motion.p>
                                                )}
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: 0.3 }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full rounded-md bg-blue-600 dark:bg-blue-600 py-3 px-8 text-base font-semibold text-white dark:text-white shadow-lg hover:bg-blue-700 dark:hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                                >
                                                    {isSubmitting ? (
                                                        <motion.div
                                                            className="h-5 w-5 border-2 border-t-transparent border-white rounded-full mx-auto"
                                                            animate={{ rotate: 360 }}
                                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                        />
                                                    ) : (
                                                        "Commit to Head"
                                                    )}
                                                </Button>
                                            </motion.div>
                                        </form>
                                    </motion.div>
                                )}

                                {activeTab === "decommit" && (
                                    <motion.div
                                        key="decommit"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="mt-4"
                                    >
                                        <form
                                            ref={decommitFormRef}
                                            onSubmit={handleFormSubmitDecommit(handleSubmitDecommit!)}
                                            className="flex flex-col gap-4 rounded-lg bg-blue-50/80 p-4 dark:bg-slate-800/80"
                                        >
                                            <motion.div
                                                className="relative"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: 0.2 }}
                                            >
                                                <label
                                                    htmlFor="decommitUtxo"
                                                    className="absolute z-10 -top-2 left-3 rounded-xl bg-white dark:bg-slate-800 px-1 text-sm font-medium text-gray-700 dark:text-gray-200 transition-all"
                                                >
                                                    Select UTXO to Decommit
                                                </label>
                                                <select
                                                    id="decommitUtxo"
                                                    onChange={handleSelectDecommit}
                                                    value={selectedDecommitValue}
                                                    className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 px-4 text-base text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors disabled:opacity-50"
                                                    aria-label="Select UTXO from Head to decommit"
                                                >
                                                    <option value="">-- Select UTXO from Head --</option>
                                                    {utxosFromHydra?.map((utxo) => {
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
                                                {errorsDecommit.txHash && (
                                                    <motion.p
                                                        className="text-red-500 text-xs mt-1 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded"
                                                        initial={{ x: -10, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
                                                    >
                                                        {errorsDecommit.txHash?.message}
                                                    </motion.p>
                                                )}
                                            </motion.div>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.3, delay: 0.3 }}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <Button
                                                            type="button"
                                                            className="w-full rounded-md bg-orange-600 dark:bg-orange-600 py-3 px-8 text-base font-semibold text-white dark:text-white shadow-lg hover:bg-orange-700 dark:hover:bg-orange-700 disabled:opacity-50 transition-colors"
                                                            disabled={isSubmittingDecommit}
                                                        >
                                                            {isSubmittingDecommit ? (
                                                                <motion.div
                                                                    className="h-5 w-5 border-2 border-t-transparent border-white rounded-full mx-auto"
                                                                    animate={{ rotate: 360 }}
                                                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                                />
                                                            ) : (
                                                                "Decommit"
                                                            )}
                                                        </Button>
                                                    </motion.div>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="rounded-2xl">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Confirm Decommit</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This will move the selected UTXO back to your L1 wallet. The Head remains open.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => decommitFormRef.current?.requestSubmit()}
                                                            disabled={isSubmittingDecommit}
                                                        >
                                                            {isSubmittingDecommit ? "Decommitting..." : "Confirm Decommit"}
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </form>
                                    </motion.div>
                                )}
                            </>
                        )}
                    </AnimatePresence>
                </>
            )}
        </motion.div>
    );
};

export default memo(FormTip);
