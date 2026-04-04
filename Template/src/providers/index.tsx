"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { ReactNode } from "react";
import BlockchainProvider from "./blockchain";
import { Toaster } from "~/components/ui/sonner";

export default function Provider({ children, session }: { children: ReactNode; session: SessionProviderProps["session"] }) {
    const queryClient = new QueryClient();

    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <BlockchainProvider>
                    {children}
                    <Toaster />
                </BlockchainProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
}
