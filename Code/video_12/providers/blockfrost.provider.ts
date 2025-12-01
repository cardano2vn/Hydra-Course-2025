import { BlockfrostProvider } from "@meshsdk/core";

export const blockfrostProvider = new BlockfrostProvider(process.env.BLOCKFROST_API_KEY as string)