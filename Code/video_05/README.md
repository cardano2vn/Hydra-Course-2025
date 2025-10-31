<div align="center">

<img src="https://www.cardano2vn.io/_next/static/media/loading.db59b266.png" width="120" alt="Hydra Logo" />

# **Cài đặt và Cấu hình Hydra Node**

**Hướng dẫn sẵn sàng triển khai để triển khai một nút Cardano được đồng bộ hóa hoàn toàn trên Ubuntu — nền tảng thiết yếu để chạy tính năng mở rộng Hydra Layer 2.**

[![Ubuntu](https://img.shields.io/badge/Ubuntu-22.04-orange?logo=ubuntu)](https://ubuntu.com/)
[![Cardano Node](https://img.shields.io/badge/Cardano%20Node-9.0.0%2B-blue?logo=cardano)](https://github.com/IntersectMBO/cardano-node)
[![Hydra Ready](https://img.shields.io/badge/Hydra-Ready-green?logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDBGRjAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAtMThjLTQuNDEgMC04IDMuNTktOCA4czMuNTkgOCA4IDggOC0zLjU5IDgtOHptMC0xNGMtMy4zMSAwLTYgMi42OS02IDZzMi42OSA2IDYgNiA2LTIuNjkgNi02em0wLTEyYy0yLjIxIDAtNCAxLjc5LTQgNHMxLjc5IDQgNCA0IDQtMS43OSA0LTQtMS43OSA0LTQgNHptMC0xMGMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjkgMi0yLTJ6Ii8+PC9zdmc+)](https://hydra.family)
[![Systemd](https://img.shields.io/badge/Systemd-Service-blue?logo=systemd)](https://systemd.io/)
[![License: MIT](https://img.shields.io/badge/License-CC--BY--SA%204.0-yellow.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

---

</div>

## Bước 1

```bash
sudo wget -qO /usr/local/bin/websocat https://github.com/vi/websocat/releases/latest/download/websocat.x86_64-unknown-linux-musl

sudo chmod a+x /usr/local/bin/websocat

websocat --version
```

```bash
HYDRA_VERSION=1.0.0
curl -L -O https://github.com/cardano-scaling/hydra/releases/download/${HYDRA_VERSION}/hydra-x86_64-linux-${HYDRA_VERSION}.zip
unzip -d bin hydra-x86_64-linux-${HYDRA_VERSION}.zip
```

```bash
export PATH="$HOME/bin:$PATH"
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

## Bước 2

```bash
mkdir -p credentials

cardano-cli address key-gen \
  --verification-key-file credentials/alice-node.vk \
  --signing-key-file credentials/alice-node.sk

cardano-cli address build \
  --verification-key-file credentials/alice-node.vk \
  --out-file credentials/alice-node.addr \
  --testnet-magic 2

cardano-cli address key-gen \
  --verification-key-file credentials/alice-funds.vk \
  --signing-key-file credentials/alice-funds.sk

cardano-cli address build \
  --verification-key-file credentials/alice-funds.vk \
  --out-file credentials/alice-funds.addr \
  --testnet-magic 2
```

```bash
mkdir -p credentials

cardano-cli address key-gen \
  --verification-key-file credentials/bob-node.vk \
  --signing-key-file credentials/bob-node.sk

cardano-cli address build \
  --verification-key-file credentials/bob-node.vk \
  --out-file credentials/bob-node.addr \
  --testnet-magic 2

cardano-cli address key-gen \
  --verification-key-file credentials/bob-funds.vk \
  --signing-key-file credentials/bob-funds.sk

cardano-cli address build \
  --verification-key-file credentials/bob-funds.vk \
  --out-file credentials/bob-funds.addr \
  --testnet-magic 2
```

## Bước 3

```bash
hydra-node gen-hydra-key --output-file credentials/alice-hydra
```

```bash
hydra-node gen-hydra-key --output-file credentials/bob-hydra
```

## Bước 4

```bash
cardano-cli query protocol-parameters  --testnet-magic 2 \
  | jq '.txFeeFixed = 0 |.txFeePerByte = 0 | .executionUnitPrices.priceMemory = 0 | .executionUnitPrices.priceSteps = 0' \
  > protocol-parameters.json
```

## Bước 5

```bash
hydra_version=1.0.0
hydra-node \
  --node-id "alice-node2" \
  --persistence-dir persistence-alice2 \
  --cardano-signing-key credentials/alice-node.sk \
  --hydra-signing-key credentials/alice-hydra.sk \
  --hydra-scripts-tx-id $(curl https://raw.githubusercontent.com/cardano-scaling/hydra/master/hydra-node/networks.json | jq -r ".preview.\"${hydra_version}\"") \
  --ledger-protocol-parameters protocol-parameters.json \
  --testnet-magic 2 \
  --node-socket $CARDANO_NODE_SOCKET_PATH \
  --api-port 4001 \
  --listen 127.0.0.1:5001 \
  --api-host 0.0.0.0 \
  --peer 127.0.0.1:5002 \
  --hydra-verification-key credentials/bob-hydra.vk \
  --cardano-verification-key credentials/bob-node.vk
```

```bash
hydra_version=1.0.0
hydra-node \
  --node-id "bob-node2" \
  --persistence-dir persistence-bob2 \
  --cardano-signing-key credentials/bob-node.sk \
  --hydra-signing-key credentials/bob-hydra.sk \
  --hydra-scripts-tx-id $(curl https://raw.githubusercontent.com/cardano-scaling/hydra/master/hydra-node/networks.json | jq -r ".preview.\"${hydra_version}\"") \
  --ledger-protocol-parameters protocol-parameters.json \
  --testnet-magic 2 \
  --node-socket $CARDANO_NODE_SOCKET_PATH \
  --api-port 4002 \
  --listen 127.0.0.1:5002 \
  --api-host 0.0.0.0 \
  --peer 127.0.0.1:5001 \
  --hydra-verification-key credentials/alice-hydra.vk \
  --cardano-verification-key credentials/alice-node.vk
```

```bash
{
  "env": {
    "configuredPeers": "127.0.0.1:5002=http://127.0.0.1:5002",
    "contestationPeriod": 600,
    "depositPeriod": 3600,
    "otherParties": [
      {
        "vkey": "83f2fd62b43bbdf48d5d8ebf2a3b47947f948c16523a91243c4f20be3e7f42cc"
      }
    ],
    "participants": [
      "2f4bf50ad4d34612b294e3874b67b104c1277624decc0dca4ff1ea51",
      "7f6da1a391a7502ae8fbbbeb6a7176a7978d09bd6b30581aa3633e40"
    ],
    "party": {
      "vkey": "82529d9386ce980edfdb7127505e21c17c6e3535cc349d696ac4418042797149"
    },
    "signingKey": "f614fece1548db881ce3d43cc10a98f9c481640662cea1772a81a653f5d539af"
  },
  "headStatus": "Idle",
  "hydraNodeVersion": "1.0.0-b5e33b55e9fba442c562f82cec6c36b1716d9847",
  "me": {
    "vkey": "82529d9386ce980edfdb7127505e21c17c6e3535cc349d696ac4418042797149"
  },
  "networkInfo": {
    "networkConnected": true,
    "peersInfo": {
      "127.0.0.1:5002": true
    }
  },
  "tag": "Greetings"
}
```
