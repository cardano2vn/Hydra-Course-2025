"use client";

import Info from "~/components/info";
import Recent from "~/components/recent";
import FormTip from "~/components/form-tip";
import Status from "~/components/status";
import Withdraw from "~/components/withdraw";
import { useParams } from "next/navigation";
import { getRecent, getStatus } from "~/services/hydra.service";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
    const params = useParams();
    const { data: headStatus, isLoading: isLoadingHeadStatus } = useQuery({
        queryKey: ["fetch-status-hydra"],
        queryFn: () => getStatus(),
    });

    const { data: recents, isLoading: isLoadingRecent } = useQuery({
        queryKey: ["fetch-recent-hydra"],
        queryFn: () => getRecent({ address: params.address as string }),
    });

    return (
        <aside className="container mx-auto py-8 px-4 pt-24">
            <div className="max-w-7xl mx-auto space-y-6 px-4 py-8">
                <section className="w-full mb-6">
                    <Status
                        title="There is now a head available for you to access and below is the current state of your head"
                        loading={isLoadingHeadStatus}
                        data={headStatus as string}
                    />
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6 flex flex-col">
                        <FormTip
                            tipAddress={params.address as string}
                            status={headStatus as string}
                            recents={recents!}
                            isLoadingRecent={isLoadingRecent}
                        />
                        <Info link={`${window.location}/tipper/${params.address}`} />
                    </div>
                    <div className="space-y-6 flex flex-col">
                        <Recent recents={recents!} isLoading={isLoadingRecent} />
                    </div>
                </section>

                <div className="w-full">
                    <Withdraw walletAddress={params.address as string} />
                </div>
            </div>
        </aside>
    );
}
