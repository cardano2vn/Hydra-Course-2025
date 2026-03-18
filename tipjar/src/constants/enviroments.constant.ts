import { Network } from "@meshsdk/core"

const APP_MNEMONIC = process.env.APP_MNEMONIC || ""
const BLOCKFROST_API_KEY = process.env.BLOCKFROST_API_KEY || ""
const APP_NETWORK: Network = "preview"
const APP_NETWORK_ID = APP_NETWORK === "preview" ? 0 : 1
const HYDRA_HTTP_URL = process.env.HYDRA_HTTP_URL || ""
const HYDRA_HTTP_URL_SUB = process.env.HYDRA_HTTP_URL_SUB || ""

export {
    APP_MNEMONIC,
    BLOCKFROST_API_KEY,
    APP_NETWORK,
    APP_NETWORK_ID,
    HYDRA_HTTP_URL,
    HYDRA_HTTP_URL_SUB
}
