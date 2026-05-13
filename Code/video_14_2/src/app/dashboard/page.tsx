"use client";

import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Tipper from "~/components/tipper";
import Status from "~/components/status";
import Balance from "~/components/balance";
import Info from "~/components/info";
import Recent from "~/components/recent";
import Withdraw from "~/components/withdraw";
import Loading from "~/components/loading";
import { images } from "~/public/images";
import { CreatorSchema } from "~/lib/schema";
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
} from "~/components/ui/alert-dialog";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useWallet } from "~/hooks/use-wallet";
import { commit, getRecent, getStatus, getUTxOsFromHydra } from "~/services/hydra.service";
import { getUTxOsCommit, submitTx } from "~/services/mesh.service";
import { DECIMAL_PLACE } from "~/constants/common";
import { toast } from "sonner";
import { blockfrostProvider } from "~/providers/cardano";
import { createProposal } from "~/services/tipjar.service";

type Form = z.infer<typeof CreatorSchema>;

export default function Dashboard() {
    const { status: sessionStatus } = useSession();
    const { address, signTx, getUtxos } = useWallet();
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    if (sessionStatus === "unauthenticated") {
        redirect("/login");
    }
    const { data: utxosFromHydra, isLoading: isLoadingUtxosFromHydra } = useQuery({
        queryKey: ["fetch-utxo-hydra", address],
        queryFn: () => getUTxOsFromHydra(address as string),
        enabled: !!address,
    });

    const { data: utxosCommit, isLoading: isLoadingUtxosCommit } = useQuery({
        queryKey: ["fetch-utxo-commit", address],
        queryFn: () => getUTxOsCommit({ walletAddress: address as string }),
        enabled: !!address,
    });

    const { data: headStatus, isLoading: isLoadingHeadStatus } = useQuery({
        queryKey: ["fetch-status-hydra"],
        queryFn: () => getStatus(),
    });

    const { data: recents, isLoading: isLoadingRecent } = useQuery({
        queryKey: ["fetch-recent-hydra"],
        queryFn: () => getRecent({ address: address as string }),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
        watch,
    } = useForm<Form>({
        resolver: zodResolver(CreatorSchema),
        defaultValues: {
            title: "",
            description: "",
            author: "",
            image: "",
            startDate: "",
            endDate: "",
            participants: 2,
            adaCommit: undefined,
        },
    });

    const formValues = watch();

    const onSubmit = useCallback(
        async (data: Form) => {
            if (!address || !data.adaCommit) return;
            try {
                setLoading(true);
                const utxo = (await getUtxos()).find(
                    (utxo) => utxo.input.txHash === data.adaCommit.txHash && utxo.input.outputIndex === data.adaCommit.outputIndex,
                );
                if (!utxo) {
                    toast.error("Selected UTxO not found in your wallet. Please select a valid UTxO.");
                    return;
                }
                const unsignTx = await commit({
                    address: address as string,
                    utxo: utxo,
                    isCreator: true,
                });
                const signedTx = await signTx(unsignTx);
                await submitTx({ signedTx: signedTx });

                await createProposal({
                    title: data.title,
                    description: data.description,
                    author: data.author,
                    image: data.image as string,
                    address: address as string,
                    participants: data.participants,
                });

                toast.success("Your proposal has been successfully registered!");

                await Promise.allSettled([
                    queryClient.invalidateQueries({ queryKey: ["fetch-utxo-hydra", address] }),
                    queryClient.invalidateQueries({ queryKey: ["fetch-utxo-commit", address] }),
                    queryClient.invalidateQueries({ queryKey: ["fetch-status-hydra"] }),
                ]);
            } catch (error) {
                toast.error("An error occurred while submitting your proposal. Please try again.");
            } finally {
                setLoading(false);
            }
        },
        [address, signTx, headStatus],
    );

    const formInputs = useMemo(
        () => [
            { id: "title", label: "Title", type: "text", placeholder: "Enter your title" },
            { id: "description", label: "Description", type: "textarea", placeholder: "Enter your description", rows: 4 },
            { id: "author", label: "Author", type: "text", placeholder: "Enter your author name" },
            { id: "image", label: "Image URL", type: "text", placeholder: "Enter your image URL" },
            { id: "startDate", label: "Start Date", type: "date" },
            { id: "endDate", label: "End Date", type: "date" },
            { id: "participants", label: "Max Participants", type: "number", placeholder: "Enter max number of participants", min: 1, max: 1000 },
        ],
        [],
    );

    if (headStatus === "IDLE" || utxosFromHydra?.length === 0) {
        return (
            <motion.aside
                className="container mx-auto py-8 px-4 pt-24"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.2, ease: "easeOut" },
                    },
                }}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-7xl mx-auto space-y-6 px-4 py-8">
                    <motion.section
                        className="w-full mb-6"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                        }}
                    >
                        <Status
                            title="There is now a head available for you to access and below is the current state of your head"
                            loading={isLoadingHeadStatus}
                            data={headStatus as string}
                        />
                    </motion.section>
                    <motion.section
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.2, ease: "easeOut" },
                            },
                        }}
                    >
                        <div className="space-y-6 flex flex-col">
                            <motion.div
                                className="w-full max-w-2xl mx-auto rounded-xl h-full bg-white dark:bg-slate-900/50 p-6 shadow-md shadow-blue-200/30 dark:shadow-blue-900/30 border-l-4 border-blue-500 dark:border-blue-600"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                                }}
                            >
                                <form className="space-y-6" onSubmit={null!}>
                                    {formInputs.map(({ id, label, type, placeholder, rows, min, max }, index) => (
                                        <motion.div
                                            key={id}
                                            className="relative"
                                            variants={{
                                                hidden: { opacity: 0, y: 20 },
                                                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                                            }}
                                            transition={{ delay: 0.2 + index * 0.1 }}
                                        >
                                            <label
                                                htmlFor={id}
                                                className="absolute rounded-xl z-10 -top-2 left-3 bg-white dark:bg-slate-900/50 px-1 text-sm font-medium text-gray-700 dark:text-gray-200 transition-all"
                                            >
                                                {label}
                                            </label>
                                            {type === "textarea" ? (
                                                <textarea
                                                    {...register(id as keyof Form)}
                                                    id={id}
                                                    rows={rows}
                                                    placeholder={placeholder}
                                                    className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 px-4 text-base text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors disabled:opacity-50"
                                                    disabled={isSubmitting}
                                                />
                                            ) : (
                                                <input
                                                    {...register(id as keyof Form, { valueAsNumber: type === "number" })}
                                                    id={id}
                                                    type={type}
                                                    placeholder={placeholder}
                                                    min={min}
                                                    max={max}
                                                    className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 px-4 text-base text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors disabled:opacity-50"
                                                    disabled={isSubmitting}
                                                />
                                            )}
                                            {errors[id as keyof Form] && (
                                                <motion.p
                                                    className="text-red-500 text-xs mt-1 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded"
                                                    initial={{ x: -10, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
                                                >
                                                    {errors[id as keyof Form]?.message}
                                                </motion.p>
                                            )}
                                        </motion.div>
                                    ))}
                                    <motion.div
                                        className="relative"
                                        variants={{
                                            hidden: { opacity: 0, y: 20 },
                                            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                                        }}
                                        transition={{ delay: 0.8 }}
                                    >
                                        <label
                                            htmlFor="adaCommit"
                                            className="absolute rounded-xl z-10 -top-2 left-3 bg-white dark:bg-slate-900/50 px-1 text-sm font-medium text-gray-700 dark:text-gray-200 transition-all"
                                        >
                                            Select ADA Commit
                                        </label>
                                        <Controller
                                            name="adaCommit"
                                            control={control}
                                            rules={{ required: "Please select an ADA amount" }}
                                            render={({ field }) => (
                                                <select
                                                    id="adaCommit"
                                                    className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 px-4 text-base text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors disabled:opacity-50"
                                                    disabled={isSubmitting}
                                                    value={field.value ? JSON.stringify(field.value) : ""}
                                                    onChange={(e) => field.onChange(e.target.value ? JSON.parse(e.target.value) : undefined)}
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
                                            )}
                                        />
                                        {errors.adaCommit && (
                                            <motion.p
                                                className="text-red-500 text-xs mt-1 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded"
                                                initial={{ x: -10, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
                                            ></motion.p>
                                        )}
                                    </motion.div>
                                    <motion.div
                                        className="bg-white dark:bg-slate-900/50 pt-4"
                                        variants={{
                                            hidden: { opacity: 0, y: 20 },
                                            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                                        }}
                                        transition={{ delay: 0.9 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button
                                                    disabled={isSubmitting}
                                                    className="w-full rounded-md bg-blue-500 dark:bg-blue-600 py-3 px-8 text-base font-semibold text-white dark:text-white shadow-lg hover:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                                >
                                                    {isSubmitting ? "Submitting..." : "Register"}
                                                </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Confirm Proposal Registration</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        You need to commit more than 10 ADA to register as a proposal. This amount will be refunded
                                                        when the session ends.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={handleSubmit(onSubmit)}>
                                                        {isSubmitting ? "Committing..." : "Commit"}
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </motion.div>
                                </form>
                            </motion.div>
                        </div>
                        <motion.div
                            className="space-y-6 flex flex-col"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                            }}
                        >
                            <div className="h-full min-h-[calc(100%)]">
                                <Tipper
                                    title={formValues.title || "Open source dynamic assets (Token/NFT) generator (CIP68)"}
                                    image={formValues.image || images.logo}
                                    author={formValues.author || "Cardano2vn"}
                                    slug=""
                                    datetime={new Date().toLocaleString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                    participants={2}
                                />
                            </div>
                        </motion.div>
                    </motion.section>
                </div>
            </motion.aside>
        );
    }

    if (Number(utxosFromHydra?.length) > 0) {
        return (
            <motion.aside
                className="container mx-auto py-8 px-4 pt-24"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.2, ease: "easeOut" },
                    },
                }}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-7xl mx-auto space-y-6 px-4 py-8">
                    <motion.section
                        className="w-full mb-6"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                        }}
                    >
                        <Status
                            title="There is now a head available for you to access and below is the current state of your head"
                            loading={isLoadingHeadStatus}
                            data={headStatus as string}
                        />
                    </motion.section>
                    <motion.section
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.2, ease: "easeOut" },
                            },
                        }}
                    >
                        <div className="space-y-6 flex flex-col">
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                                }}
                            >
                                {utxosFromHydra && utxosCommit && (
                                    <Balance
                                        isLoadingRecent={isLoadingRecent}
                                        recents={recents!}
                                        status={headStatus as string}
                                        headUtxos={utxosFromHydra!}
                                        walletUtxos={utxosCommit!}
                                    />
                                )}
                            </motion.div>
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                                }}
                            >
                                <Info link={`${window.location}/tipper/${address}`} />
                            </motion.div>
                        </div>
                        <motion.div
                            className="space-y-6 flex flex-col"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                            }}
                        >
                            <Recent recents={recents!} isLoading={isLoadingRecent} />
                        </motion.div>
                    </motion.section>
                    <motion.div
                        className="w-full"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                        }}
                    >
                        <Withdraw walletAddress={address as string} />
                    </motion.div>
                </div>
            </motion.aside>
        );
    }

    return <Loading />;
}
