<div align="center">

<img src="https://www.cardano2vn.io/_next/static/media/loading.db59b266.png" width="120" alt="Hydra Logo" />

# **Khắc phục sự cố Hydra Nodes**

**Phân tích chi tiết các lỗi thường gặp trong quá trình vận hành Hydra Nodes, lý giải cơ chế gây lỗi ở từng tầng hệ thống và hướng dẫn cách xử lý đúng chuẩn để đảm bảo hoạt động ổn định và liên tục**

[![Ubuntu](https://img.shields.io/badge/Ubuntu-22.04-orange?logo=ubuntu)](https://ubuntu.com/)
[![Cardano Node](https://img.shields.io/badge/Cardano%20Node-9.0.0%2B-blue?logo=cardano)](https://github.com/IntersectMBO/cardano-node)
[![Hydra Ready](https://img.shields.io/badge/Hydra-Ready-green?logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDBGRjAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAtMThjLTQuNDEgMC04IDMuNTktOCA4czMuNTkgOCA4IDggOC0zLjU5IDgtOHptMC0xNGMtMy4zMSAwLTYgMi42OS02IDZzMi42OSA2IDYgNiA2LTIuNjkgNi02em0wLTEyYy0yLjIxIDAtNCAxLjc5LTQgNHMxLjc5IDQgNCA0IDQtMS43OSA0LTQtMS43OSA0LTQgNHptMC0xMGMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjkgMi0yLTJ6Ii8+PC9zdmc+)](https://hydra.family)
[![Systemd](https://img.shields.io/badge/Systemd-Service-blue?logo=systemd)](https://systemd.io/)
[![License: MIT](https://img.shields.io/badge/License-CC--BY--SA%204.0-yellow.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

---

</div>

# Mithril không đúng phiên bản với Hydra Node



# Cardano Node Shutdown

```bash

hydra_version=0.22.4
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
 --listen 0.0.0.0:5001 \
 --api-host 0.0.0.0 \
 --peer 127.0.0.1:5002 \
 --hydra-verification-key credentials/bob-hydra.vk \
 --cardano-verification-key credentials/bob-node.vk
```

```bash
{"timestamp":"2025-11-06T06:32:17.501506047Z","threadId":7,"namespace":"HydraNode-\"alice-node2\"","message":{"directChain":{"contents":{"tag":"BeginInitialize"},"tag":"Wallet"},"tag":"DirectChain"}}
bearer closed: "<socket: 23> closed when reading data, waiting on next header True"
```

# Các Node chưa được kết nối với nhau

```bash
tmux new -t alice-node
```

```bash
websocat ws://127.0.0.1:4001 | jq
```

```bash
{
  "networkInfo": {
    "networkConnected": false,
    "peersInfo": {}
  },
  "seq": 334,
  "tag": "NetworkDisconnected",
  "timestamp": "2025-11-06T06:29:22.061788575Z"
}
```

# Các host với Port cấu hình không đúng

```bash
{
  "networkInfo": {
    "networkConnected": false,
    "peersInfo": {}
  },
  "seq": 334,
  "tag": "NetworkDisconnected",
  "timestamp": "2025-11-06T06:29:22.061788575Z"
}
```

# Alice & Bob Node không đủ tiền


