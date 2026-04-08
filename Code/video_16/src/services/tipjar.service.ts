"use server";

import prisma from "~/lib/prisma";

export async function createProposal({
    title,
    description,
    image,
    address,
    participants,
    author,
}: {
    title: string;
    description: string;
    image: string;
    address: string;
    participants: number;
    author: string;
}) {
    try {
        await prisma.proposal.create({
            data: {
                title: title,
                description: description,
                image: image,
                address: address,
                author: author,
                participants: participants,
            },
        });
    } catch (error) {
        throw error;
    }
}

export async function getAllProposals({ page = 1, limit = 6, address }: { page?: number; limit?: number; address: string }) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
        prisma.proposal.findMany({
            where: {
                address: {
                    not: address,
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: limit,
        }),
        prisma.proposal.count({
            where: { address: { not: address } },
        }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
        data,
        totalPages,
        total,
    };
}

export async function getProposalByAddress(address: string) {
    const data = await prisma.proposal.findFirst({
        where: {
            address: address,
        },
    });

    return data;
}

export async function deleteProposal(address: string) {
    await prisma.proposal.deleteMany({ where: { address } });
}
