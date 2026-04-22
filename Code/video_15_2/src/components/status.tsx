"use client";

import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { Warn } from "./icons";

interface StatusProps {
    title: string;
    data: string;
    loading: boolean;
}

const Status: React.FC<StatusProps> = ({ title, data, loading }) => {
    return (
        <motion.div
            className="relative flex w-full items-center gap-4 rounded-lg border-l-4 border-blue-400 bg-gradient-to-r from-blue-50 to-white p-4 shadow-md dark:border-blue-600 dark:from-blue-900/30 dark:to-gray-900"
            variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
            }}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                className="flex-shrink-0 text-blue-500 dark:text-blue-400"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Warn className="h-5 w-5" />
            </motion.div>
            <div className="min-w-0 flex-1">
                <motion.p
                    className="truncate text-sm font-medium text-blue-700 dark:text-blue-200"
                    variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
                    }}
                    transition={{ delay: 0.2 }}
                >
                    {title}
                </motion.p>
                <motion.div
                    className="flex items-center gap-2 text-xs font-bold uppercase text-blue-600 dark:text-blue-300"
                    variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
                    }}
                    transition={{ delay: 0.3 }}
                >
                    Status:{" "}
                    {loading ? (
                        <ClipLoader color="#3b82f6" size={14} />
                    ) : (
                        <span className="rounded-md bg-blue-100 px-2 py-1 dark:bg-blue-800/50">{data}</span>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Status;
