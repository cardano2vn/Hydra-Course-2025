<div align="center">

<img src="https://www.cardano2vn.io/_next/static/media/loading.db59b266.png" width="120" alt="Hydra Logo" />

# **Vận hành Hydra Head**

**Quy trình vận hành Hydra bao gồm ba nhóm hoạt động cốt lõi: khởi chạy, quản lý, và quan sát. Đảm bảo Hydra Head được hình thành đúng chuẩn On-Chain, vận hành hiệu quả Off-Chain, và duy trì sự minh bạch trong toàn bộ vòng đời của Head.**

[![Ubuntu](https://img.shields.io/badge/Ubuntu-22.04-orange?logo=ubuntu)](https://ubuntu.com/)
[![Cardano Node](https://img.shields.io/badge/Cardano%20Node-10.5.1-blue?logo=cardano)](https://github.com/IntersectMBO/cardano-node)
[![Hydra Ready](https://img.shields.io/badge/Hydra-1.0.0-green?logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDBGRjAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAtMThjLTQuNDEgMC04IDMuNTktOCA4czMuNTkgOCA4IDggOC0zLjU5IDgtOHptMC0xNGMtMy4zMSAwLTYgMi42OS02IDZzMi42OSA2IDYgNiA2LTIuNjkgNi02em0wLTEyYy0yLjIxIDAtNCAxLjc5LTQgNHMxLjc5IDQgNCA0IDQtMS43OSA0LTQtMS43OSA0LTQgNHptMC0xMGMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjkgMi0yLTJ6Ii8+PC9zdmc+)](https://hydra.family)
[![Systemd](https://img.shields.io/badge/Systemd-Service-blue?logo=systemd)](https://systemd.io/)
[![License: MIT](https://img.shields.io/badge/License-CC--BY--SA%204.0-yellow.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

---

</div>

# Khởi động Head (Initial Head)

> **Mục tiêu**: Khởi tạo một Hydra Head mới với một `headId` duy nhất, đạt được đồng thuận giữa tất cả participant, và chuyển trạng thái từ `Idle` → `HeadIsInitializing` → sẵn sàng để **Commit UTxO**.

> **Ngữ cảnh ngắn gọn**: Hydra Head là một channel off-chain giữa những participant trên mạng Cardano. Trước khi commit tiền vào Head, Head phải được khởi tạo thành công và tất cả participant phải thỏa thuận tham gia.

---

## Kiểm tra điều kiện tiên quyết (Trước khi gửi Init)

**Ý tưởng**: Nếu một node không chạy, không kết nối được P2P, hoặc API bị lỗi, lệnh `Init` sẽ không khởi tạo Head. Ta kiểm tra từng mục một cách tuần tự.

### 1. Node đang chạy

- **Mục đích**: Xác nhận các tiến trình `hydra-node` (mỗi participant một tiến trình) đang hoạt động trên máy.
- **Lệnh**:

```bash
ps aux | grep hydra-node

# Kết Quả Đạt Được
root       12000  6.5  1.0 1073854160 132680 pts/3 Sl+ Nov17  92:48 hydra-node --node-id bob-node2 --persistence-dir persistence-bob2 --cardano-signing-key credentials/bob-node.sk --hydra-signing-key credentials/bob-hydra.sk --hydra-scripts-tx-id 08fea9f21fec08d47dd56cd632ece001616b247f6e2e893f98dcf1e69ddb58d0,c6ba286b501c076ee494b4686e681c5aab8f903d930e8366dcbca1c3530264ee,ed6b3ff639fb99b18916dd14b9837d893b1a053af38a27f604a7cdf543b86f6c --ledger-protocol-parameters protocol-parameters.json --testnet-magic 2 --node-socket ./node.socket --api-port 4002 --listen 127.0.0.1:5002 --api-host 0.0.0.0 --peer 127.0.0.1:5001 --hydra-verification-key credentials/alice-hydra.vk --cardano-verification-key credentials/alice-node.vk
root       37955 17.0  1.1 1073854020 140924 pts/2 Sl+ 08:24   6:22 hydra-node --node-id alice-node2 --persistence-dir persistence-alice2 --cardano-signing-key credentials/alice-node.sk --hydra-signing-key credentials/alice-hydra.sk --hydra-scripts-tx-id 08fea9f21fec08d47dd56cd632ece001616b247f6e2e893f98dcf1e69ddb58d0,c6ba286b501c076ee494b4686e681c5aab8f903d930e8366dcbca1c3530264ee,ed6b3ff639fb99b18916dd14b9837d893b1a053af38a27f604a7cdf543b86f6c --ledger-protocol-parameters protocol-parameters.json --testnet-magic 2 --node-socket ./node.socket --api-port 4001 --listen 127.0.0.1:5001 --api-host 0.0.0.0 --peer 127.0.0.1:5002 --hydra-verification-key credentials/bob-hydra.vk --cardano-verification-key credentials/bob-node.vk
root       38434  0.0  0.0   7080  2048 pts/0    S+   09:01   0:00 grep --color=auto hydra-node
```

- **Giải thích**: `ps aux` liệt kê tiến trình, `grep hydra-node` lọc tiến trình tên chứa `hydra-node`.
- **Kết quả mong đợi**: Bạn sẽ thấy ít nhất 2 tiến trình nếu đang chạy ví dụ `Alice` và `Bob`. Dòng tiến trình thường chứa cấu hình hoặc file config mà node dùng (phần này giúp xác định node nào đang sử dụng port nào).
- **Nếu không thấy**: Kiểm tra cách bạn khởi node (systemd/service, docker, hay chạy trực tiếp). Khởi lại tiến trình và xem log.

### 2. API HTTP (health)

- **Mục đích**: Đảm bảo HTTP API nội bộ của hydra-node đang trả lời.
- **Lệnh**:

```bash
curl -s http://127.0.0.1:4001/health | jq
```

- **Giải thích**: Endpoint `/health` thường trả `{"status":"ok"}`. Tham số `-s` cho `curl` im lặng, `jq` định dạng JSON.
- **Nếu lỗi**: Có thể hydra-node chưa bind port, service đang crash, hoặc port khác (4002, 4003...). Kiểm tra file cấu hình hoặc log.

### 3. Kết nối P2P / Network

- **Mục đích**: Hydra nodes liên lạc với nhau qua P2P; nếu network không kết nối Head không thể khởi tạo đồng thuận.
- **Lệnh**:

```bash
websocat ws://127.0.0.1:4001 | jq '.networkInfo'
```

- **Giải thích**: Gửi kết nối WebSocket tới node và quan sát trường `networkInfo` trong luồng sự kiện. Trường `"networkConnected": true` cho biết node đã kết nối với peers.
- **Nếu `false`**: Kiểm tra cấu hình peer discovery, địa chỉ peers, hoặc firewall.

### 4. Trạng thái Head hiện tại

- **Mục đích**: Đảm bảo Head vẫn ở trạng thái `Idle` trước khi gửi `Init` (nếu đã có head đang chạy, server có thể từ chối tạo head mới hoặc hành xử khác tuỳ triển khai).
- **Lệnh**:

```bash
websocat ws://127.0.0.1:4001 | jq 'select(.tag == "Greetings")'
```

- **Giải thích**: Thao tác này lắng nghe luồng sự kiện WebSocket và lọc message có `tag` là `Greetings` (message khởi tạo/giới thiệu node thường chứa `headStatus`).
- **Kết quả mong đợi**: `"headStatus": "Idle"` — node sẵn sàng khởi tạo Head.

---

## Gửi lệnh Init

### 1. Lắng nghe luồng WebSocket (từ một terminal)

```bash
websocat ws://127.0.0.1:4001 | jq
```

- **Mục đích**: Xem tất cả sự kiện từ node trong thời gian thực — rất hữu ích để quan sát phản hồi ngay sau khi gửi `Init`.
- **Lưu ý**: Bạn có thể mở nhiều terminal cho từng participant (4001, 4002, ...).

### 2. Gửi lệnh Init bằng WebSocket (một lần)

```bash
echo '{ "tag": "Init" }' | websocat "ws://127.0.0.1:4001?history=no"
```

- **Giải thích**:
  - `echo '{ "tag": "Init" }'` tạo payload JSON.
  - `websocat "ws://... ?history=no"` gửi một kết nối WebSocket để gửi payload và thoát ngay (không giữ lịch sử luồng). Một số hydra-node có cờ history/no-history để tránh gửi toàn bộ log trước đó.
- **Thay thế**: Nếu bạn dùng `websocat` tương tác (stdin), có thể paste JSON vào và gửi.

---

## Phản hồi và giải thích từng trường

Dưới đây là một **ví dụ điển hình** khi `Init` thành công. (Bản thân giá trị là ví dụ — `headId` và `vkey` sẽ khác thực tế.)

```json
{
  "headId": "200264c48a64b9731b5d4fdb57ae1f1f9314c8a2f74e2b8475281156",
  "parties": [
    {
      "vkey": "75944646ac58771a88496a2a951c24481ac9554cc5c7af12fb7b596345b9ab27"
    },
    {
      "vkey": "37f06d9d5b6c4bebc5680c17e3f425419416ced292906373c89374cdd46c7d43"
    }
  ],
  "seq": 128,
  "tag": "HeadIsInitializing",
  "timestamp": "2025-11-06T05:11:58.58827555Z"
}
```

### Giải thích từng trường:

- `headId`:

  - Là **ID duy nhất** của Head vừa tạo. Được tạo từ hash/identifier nội bộ của hydra-node.
  - Dùng để tham chiếu Head sau này (commit, close, snapshot...).

- `parties`:

  - Danh sách public keys (vkey) của các participant đã đồng ý tham gia Head. Thứ tự có thể quan trọng tuỳ triển khai (ví dụ: thứ tự quyết định UTxO distribution ban đầu trong một số protocol).
  - Các `vkey` giúp xác minh chữ ký khi tiến hành commit hoặc giao dịch on-head.

- `seq`:

  - Số sequence (số phiên/step nội bộ) — thể hiện phiên bản hiện tại của trạng thái head. Dùng để track changes và đảm bảo không có race condition.

- `tag`:

  - Loại message/trạng thái. `HeadIsInitializing` thông báo rằng Head vừa được khởi tạo và hiện đang trong giai đoạn đồng bộ nội bộ trước khi cho phép `Commit`.

- `timestamp`:
  - Thời điểm node báo trạng thái (UTC, theo chuẩn ISO 8601). Hữu ích cho audit và debug (so sánh logs giữa các node).

---

## Kiểm tra sau khi nhận `HeadIsInitializing`

1. **So sánh headId trên tất cả participant**: Mở luồng WebSocket trên từng máy và xác nhận mọi node báo cùng `headId`.
2. **Xác nhận parties**: Kiểm tra `vkey` có trùng khớp với danh sách participant mà bạn mong đợi (Alice/Bob/...).
3. **Chờ trạng thái sẵn sàng để Commit**: Một số triển khai sẽ gửi một message tiếp theo như `ReadyToCommit` hoặc chuyển trạng thái sang `Open`. Đọc tài liệu node của bạn để biết tên message chính xác.

---

# Cam kết tiền cho Head

## 1. Alice cam kết tiền cho Head

```bash
cardano-cli query utxo --testnet-magic 2 \
  --address $(cat credentials/alice-funds.addr)
```

```bash
{
    "d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df#2": {
        "address": "addr_test1vr3drx4gwmus3q6n2k6sdws0sp634lsjwukneut7yp966qqnk388d",
        "datum": null,
        "datumhash": null,
        "inlineDatum": null,
        "inlineDatumRaw": null,
        "referenceScript": null,
        "value": {
            "lovelace": 100000000
        }
    }
}
```

```bash
cardano-cli query utxo --testnet-magic 2 \
  --address $(cat credentials/alice-funds.addr) \
  --out-file alice-commit-utxo.json
```

```bash
cat alice-commit-utxo.json
```

```bash
{
    "d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df#2": {
        "address": "addr_test1vr3drx4gwmus3q6n2k6sdws0sp634lsjwukneut7yp966qqnk388d",
        "datum": null,
        "datumhash": null,
        "inlineDatum": null,
        "inlineDatumRaw": null,
        "referenceScript": null,
        "value": {
            "lovelace": 100000000
        }
    }
}
```

```bash
curl -X POST 127.0.0.1:4001/commit \
  --data @alice-commit-utxo.json \
  > alice-commit-tx.json
```
































cat alice-commit-tx.json

```bash
{
    "cborHex":"84a800d90102838258207db7280c05ee5cc27e1498b698fa2229413a25ec9064e590c5e0d9fe4e9e26f202825820c77a74d266501d5b99dd6ee574a09a41d55887741ef11e38e01f76bfa2cc379303825820d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df020dd9010281825820c77a74d266501d5b99dd6ee574a09a41d55887741ef11e38e01f76bfa2cc37930312d901028182582008fea9f21fec08d47dd56cd632ece001616b247f6e2e893f98dcf1e69ddb58d0000182a300581d7061458bc2f297fff3cc5df6ac7ab57cefd87763b0b7bd722146a1035c01821a06099bc8a1581c200264c48a64b9731b5d4fdb57ae1f1f9314c8a2f74e2b8475281156a1581c876b0329e68608eb49596d74b21eabf925b96e43419b2619b83cb61f01028201d81858afd8799f582037f06d9d5b6c4bebc5680c17e3f425419416ced292906373c89374cdd46c7d439fd8799fd8799f5820d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df02ff583cd8799fd8799fd8799f581ce2d19aa876f908835355b506ba0f80751afe12772d3cf17e204bad00ffd87a80ffa140a1401a05f5e100d87980d87a80ffffff581c200264c48a64b9731b5d4fdb57ae1f1f9314c8a2f74e2b8475281156ff82581d60876b0329e68608eb49596d74b21eabf925b96e43419b2619b83cb61f1a0576666a021a001d449b0ed9010281581c876b0329e68608eb49596d74b21eabf925b96e43419b2619b83cb61f0b5820de9ee9cb3038891e9380efcf2a008d3fe988165943271b76eb1f90428e0074ff07582012e5af821e4510d6651e57185b4dae19e8bd72bf90a8c1e6cd053606cbc46514a200d9010281825820d654bb7c27fad3cccd3082b4c6e029785760375fd249611a48114bb7637d186b58400803c1c1cca9eeca3fec6439c86085e27d28516c15ceccf4a4e5e51a76a780b50a215503b96a51328eba3de7b7f23f69a5459ba8865b52e6088f27b50fc0570205a182000082d87a9f9fd8799f5820d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df02ffffff821a00fbc5201b00000002540be400f5d90103a100a119d90370487964726156312f436f6d6d69745478",
    "description":"",
    "txId":"0200c57cc2fe1b27584b35c4421acdc0d194a10a9cda11d087f724c4fe0e2ddf",
    "type":"Tx ConwayEra"
}
```

```bash
cardano-cli latest transaction sign \
  --tx-file alice-commit-tx.json \
  --signing-key-file credentials/alice-funds.sk \
  --out-file alice-commit-tx-signed.json
```

```bash
cat alice-commit-tx-signed.json
```

```bash
{
    "type": "Tx ConwayEra",
    "description": "Ledger Cddl Format",
    "cborHex": "84a800d90102838258207db7280c05ee5cc27e1498b698fa2229413a25ec9064e590c5e0d9fe4e9e26f202825820c77a74d266501d5b99dd6ee574a09a41d55887741ef11e38e01f76bfa2cc379303825820d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df020dd9010281825820c77a74d266501d5b99dd6ee574a09a41d55887741ef11e38e01f76bfa2cc37930312d901028182582008fea9f21fec08d47dd56cd632ece001616b247f6e2e893f98dcf1e69ddb58d0000182a300581d7061458bc2f297fff3cc5df6ac7ab57cefd87763b0b7bd722146a1035c01821a06099bc8a1581c200264c48a64b9731b5d4fdb57ae1f1f9314c8a2f74e2b8475281156a1581c876b0329e68608eb49596d74b21eabf925b96e43419b2619b83cb61f01028201d81858afd8799f582037f06d9d5b6c4bebc5680c17e3f425419416ced292906373c89374cdd46c7d439fd8799fd8799f5820d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df02ff583cd8799fd8799fd8799f581ce2d19aa876f908835355b506ba0f80751afe12772d3cf17e204bad00ffd87a80ffa140a1401a05f5e100d87980d87a80ffffff581c200264c48a64b9731b5d4fdb57ae1f1f9314c8a2f74e2b8475281156ff82581d60876b0329e68608eb49596d74b21eabf925b96e43419b2619b83cb61f1a0576666a021a001d449b0ed9010281581c876b0329e68608eb49596d74b21eabf925b96e43419b2619b83cb61f0b5820de9ee9cb3038891e9380efcf2a008d3fe988165943271b76eb1f90428e0074ff07582012e5af821e4510d6651e57185b4dae19e8bd72bf90a8c1e6cd053606cbc46514a200d9010282825820d654bb7c27fad3cccd3082b4c6e029785760375fd249611a48114bb7637d186b58400803c1c1cca9eeca3fec6439c86085e27d28516c15ceccf4a4e5e51a76a780b50a215503b96a51328eba3de7b7f23f69a5459ba8865b52e6088f27b50fc05702825820b01a386e6d45e1651eda684715e7201139790e2d46a42cbd2882d9434a25a75a58406502531286afe9a93eb12c9aa7bf4cee025ffdf7e25bf5be23afbd0db2b0587b557bbbbf03cce32822c8a0734a068225fd71e642ca487c47eb9331f3d3ce370905a182000082d87a9f9fd8799f5820d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df02ffffff821a00fbc5201b00000002540be400f5d90103a100a119d90370487964726156312f436f6d6d69745478"
}
```

```bash
cardano-cli latest transaction submit --testnet-magic 2 --tx-file alice-commit-tx-signed.json
```

```bash
Transaction successfully submitted. Transaction hash is:
{"txhash":"0200c57cc2fe1b27584b35c4421acdc0d194a10a9cda11d087f724c4fe0e2ddf"}
```

```bash
curl -s 127.0.0.1:4001/snapshot/utxo | jq
```

```bash
{
  "d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df#2": {
    "address": "addr_test1vr3drx4gwmus3q6n2k6sdws0sp634lsjwukneut7yp966qqnk388d",
    "datum": null,
    "datumhash": null,
    "inlineDatum": null,
    "inlineDatumRaw": null,
    "referenceScript": null,
    "value": {
      "lovelace": 100000000
    }
  }
}
```

## 1. Bob cam kết tiền cho Head

```bash
cardano-cli query utxo --testnet-magic 2 \
  --address $(cat credentials/bob-funds.addr)
```

```bash
{
    "d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df#3": {
        "address": "addr_test1vzhl786xyy5hplz2p47qnydnla0gvqx05q2dw0shcecrjgc4hj3jy",
        "datum": null,
        "datumhash": null,
        "inlineDatum": null,
        "inlineDatumRaw": null,
        "referenceScript": null,
        "value": {
            "lovelace": 100000000
        }
    }
}
```

```bash
cardano-cli query utxo --testnet-magic 2 \
  --address $(cat credentials/bob-funds.addr) \
  --out-file bob-commit-utxo.json
```

```bash
cat bob-commit-utxo.json
```

```bash
{
    "d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df#3": {
        "address": "addr_test1vzhl786xyy5hplz2p47qnydnla0gvqx05q2dw0shcecrjgc4hj3jy",
        "datum": null,
        "datumhash": null,
        "inlineDatum": null,
        "inlineDatumRaw": null,
        "referenceScript": null,
        "value": {
            "lovelace": 100000000
        }
    }
}
```

```bash
curl -X POST 127.0.0.1:4001/commit \
  --data @bob-commit-utxo.json \
  > bob-commit-tx.json
```

cat bob-commit-tx.json

```bash
{
    "cborHex":"84a800d90102838258207db7280c05ee5cc27e1498b698fa2229413a25ec9064e590c5e0d9fe4e9e26f202825820c77a74d266501d5b99dd6ee574a09a41d55887741ef11e38e01f76bfa2cc379303825820d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df020dd9010281825820c77a74d266501d5b99dd6ee574a09a41d55887741ef11e38e01f76bfa2cc37930312d901028182582008fea9f21fec08d47dd56cd632ece001616b247f6e2e893f98dcf1e69ddb58d0000182a300581d7061458bc2f297fff3cc5df6ac7ab57cefd87763b0b7bd722146a1035c01821a06099bc8a1581c200264c48a64b9731b5d4fdb57ae1f1f9314c8a2f74e2b8475281156a1581c876b0329e68608eb49596d74b21eabf925b96e43419b2619b83cb61f01028201d81858afd8799f582037f06d9d5b6c4bebc5680c17e3f425419416ced292906373c89374cdd46c7d439fd8799fd8799f5820d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df02ff583cd8799fd8799fd8799f581ce2d19aa876f908835355b506ba0f80751afe12772d3cf17e204bad00ffd87a80ffa140a1401a05f5e100d87980d87a80ffffff581c200264c48a64b9731b5d4fdb57ae1f1f9314c8a2f74e2b8475281156ff82581d60876b0329e68608eb49596d74b21eabf925b96e43419b2619b83cb61f1a0576666a021a001d449b0ed9010281581c876b0329e68608eb49596d74b21eabf925b96e43419b2619b83cb61f0b5820de9ee9cb3038891e9380efcf2a008d3fe988165943271b76eb1f90428e0074ff07582012e5af821e4510d6651e57185b4dae19e8bd72bf90a8c1e6cd053606cbc46514a200d9010281825820d654bb7c27fad3cccd3082b4c6e029785760375fd249611a48114bb7637d186b58400803c1c1cca9eeca3fec6439c86085e27d28516c15ceccf4a4e5e51a76a780b50a215503b96a51328eba3de7b7f23f69a5459ba8865b52e6088f27b50fc0570205a182000082d87a9f9fd8799f5820d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df02ffffff821a00fbc5201b00000002540be400f5d90103a100a119d90370487964726156312f436f6d6d69745478",
    "description":"",
    "txId":"0200c57cc2fe1b27584b35c4421acdc0d194a10a9cda11d087f724c4fe0e2ddf",
    "type":"Tx ConwayEra"
}
```

```bash
cardano-cli latest transaction sign \
  --tx-file bob-commit-tx.json \
  --signing-key-file credentials/bob-funds.sk \
  --out-file bob-commit-tx-signed.json
```

```bash
cat bob-commit-tx-signed.json
```

```bash
{
    "type": "Tx ConwayEra",
    "description": "Ledger Cddl Format",
    "cborHex": "84a800d90102838258207db7280c05ee5cc27e1498b698fa2229413a25ec9064e590c5e0d9fe4e9e26f202825820c77a74d266501d5b99dd6ee574a09a41d55887741ef11e38e01f76bfa2cc379303825820d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df020dd9010281825820c77a74d266501d5b99dd6ee574a09a41d55887741ef11e38e01f76bfa2cc37930312d901028182582008fea9f21fec08d47dd56cd632ece001616b247f6e2e893f98dcf1e69ddb58d0000182a300581d7061458bc2f297fff3cc5df6ac7ab57cefd87763b0b7bd722146a1035c01821a06099bc8a1581c200264c48a64b9731b5d4fdb57ae1f1f9314c8a2f74e2b8475281156a1581c876b0329e68608eb49596d74b21eabf925b96e43419b2619b83cb61f01028201d81858afd8799f582037f06d9d5b6c4bebc5680c17e3f425419416ced292906373c89374cdd46c7d439fd8799fd8799f5820d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df02ff583cd8799fd8799fd8799f581ce2d19aa876f908835355b506ba0f80751afe12772d3cf17e204bad00ffd87a80ffa140a1401a05f5e100d87980d87a80ffffff581c200264c48a64b9731b5d4fdb57ae1f1f9314c8a2f74e2b8475281156ff82581d60876b0329e68608eb49596d74b21eabf925b96e43419b2619b83cb61f1a0576666a021a001d449b0ed9010281581c876b0329e68608eb49596d74b21eabf925b96e43419b2619b83cb61f0b5820de9ee9cb3038891e9380efcf2a008d3fe988165943271b76eb1f90428e0074ff07582012e5af821e4510d6651e57185b4dae19e8bd72bf90a8c1e6cd053606cbc46514a200d9010282825820d654bb7c27fad3cccd3082b4c6e029785760375fd249611a48114bb7637d186b58400803c1c1cca9eeca3fec6439c86085e27d28516c15ceccf4a4e5e51a76a780b50a215503b96a51328eba3de7b7f23f69a5459ba8865b52e6088f27b50fc05702825820b01a386e6d45e1651eda684715e7201139790e2d46a42cbd2882d9434a25a75a58406502531286afe9a93eb12c9aa7bf4cee025ffdf7e25bf5be23afbd0db2b0587b557bbbbf03cce32822c8a0734a068225fd71e642ca487c47eb9331f3d3ce370905a182000082d87a9f9fd8799f5820d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df02ffffff821a00fbc5201b00000002540be400f5d90103a100a119d90370487964726156312f436f6d6d69745478"
}
```

```bash
cardano-cli latest transaction submit --testnet-magic 2 --tx-file bob-commit-tx-signed.json
```

```bash
Transaction successfully submitted. Transaction hash is:
{"txhash":"0200c57cc2fe1b27584b35c4421acdc0d194a10a9cda11d087f724c4fe0e2ddf"}
```

```bash
curl -s 127.0.0.1:4001/snapshot/utxo | jq
```

```bash
{
  "d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df#2": {
    "address": "addr_test1vr3drx4gwmus3q6n2k6sdws0sp634lsjwukneut7yp966qqnk388d",
    "datum": null,
    "datumhash": null,
    "inlineDatum": null,
    "inlineDatumRaw": null,
    "referenceScript": null,
    "value": {
      "lovelace": 100000000
    }
  },
  "d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df#3": {
    "address": "addr_test1vzhl786xyy5hplz2p47qnydnla0gvqx05q2dw0shcecrjgc4hj3jy",
    "datum": null,
    "datumhash": null,
    "inlineDatum": null,
    "inlineDatumRaw": null,
    "referenceScript": null,
    "value": {
      "lovelace": 100000000
    }
  }
}
```

# Thực hiện giao dịch

1. Thực hiện giao dịch cơ bản

```bash
curl -s 127.0.0.1:4001/snapshot/utxo | jq
```

```bash
{
  "d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df#2": {
    "address": "addr_test1vr3drx4gwmus3q6n2k6sdws0sp634lsjwukneut7yp966qqnk388d",
    "datum": null,
    "datumhash": null,
    "inlineDatum": null,
    "inlineDatumRaw": null,
    "referenceScript": null,
    "value": {
      "lovelace": 100000000
    }
  },
  "d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df#3": {
    "address": "addr_test1vzhl786xyy5hplz2p47qnydnla0gvqx05q2dw0shcecrjgc4hj3jy",
    "datum": null,
    "datumhash": null,
    "inlineDatum": null,
    "inlineDatumRaw": null,
    "referenceScript": null,
    "value": {
      "lovelace": 100000000
    }
  }
}
```

```bash
curl -s 127.0.0.1:4001/snapshot/utxo \
  | jq "with_entries(select(.value.address == \"$(cat credentials/alice-funds.addr)\"))" \
  > utxo.json
```

```bash
 cat utxo.json
```

```bash
{
  "d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df#2": {
    "address": "addr_test1vr3drx4gwmus3q6n2k6sdws0sp634lsjwukneut7yp966qqnk388d",
    "datum": null,
    "datumhash": null,
    "inlineDatum": null,
    "inlineDatumRaw": null,
    "referenceScript": null,
    "value": {
      "lovelace": 100000000
    }
  }
}
```

Xây dựng giao dịch

```bash
LOVELACE=1000000
cardano-cli latest transaction build-raw \
  --tx-in $(jq -r 'to_entries[0].key' < utxo.json) \
  --tx-out $(cat credentials/bob-funds.addr)+${LOVELACE} \
  --tx-out $(cat credentials/alice-funds.addr)+$(jq "to_entries[0].value.value.lovelace - ${LOVELACE}" < utxo.json) \
  --fee 0 \
  --out-file tx.json
```

```bash
cat tx.json
```

```bash
{
    "type": "Tx ConwayEra",
    "description": "Ledger Cddl Format",
    "cborHex": "84a300d9010281825820d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df02018282581d60afff1f46212970fc4a0d7c0991b3ff5e8600cfa014d73e17c67039231a000f424082581d60e2d19aa876f908835355b506ba0f80751afe12772d3cf17e204bad001a05e69ec00200a0f5f6"
}
```

```bash
cardano-cli latest transaction sign \
  --tx-body-file tx.json \
  --signing-key-file credentials/alice-funds.sk \
  --out-file tx-signed.json
```

```bash
cat tx-signed.json
```

```bash
{
    "type": "Tx ConwayEra",
    "description": "Ledger Cddl Format",
    "cborHex": "84a300d9010281825820d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df02018282581d60afff1f46212970fc4a0d7c0991b3ff5e8600cfa014d73e17c67039231a000f424082581d60e2d19aa876f908835355b506ba0f80751afe12772d3cf17e204bad001a05e69ec00200a100d9010281825820b01a386e6d45e1651eda684715e7201139790e2d46a42cbd2882d9434a25a75a5840437a05a6da5b99c1baf142909d90235f7b740e347d3ca2ab18380216bd7259bf13877697ece5c4476cc9991b8754bf51d7df2c14b254d3185fad8fc61f7cd70ef5f6"
}
```

```bash
cat tx-signed.json | jq -c '{tag: "NewTx", transaction: .}' | websocat "ws://127.0.0.1:4001?history=no"
```

or

```bash
websocat ws://127.0.0.1:4001 | jq
cat tx-signed.json | jq -c '{tag: "NewTx", transaction: .}'
```

Kiếm tra UTxO

```bash
curl -s 127.0.0.1:4001/snapshot/utxo | jq
```

```bash
{
  "904e33a4c066dbae9efd3916c2727bd544ffbc09171f37af9e92a87dad0279c2#0": {
    "address": "addr_test1vzhl786xyy5hplz2p47qnydnla0gvqx05q2dw0shcecrjgc4hj3jy",
    "datum": null,
    "datumhash": null,
    "inlineDatum": null,
    "inlineDatumRaw": null,
    "referenceScript": null,
    "value": {
      "lovelace": 1000000
    }
  },
  "904e33a4c066dbae9efd3916c2727bd544ffbc09171f37af9e92a87dad0279c2#1": {
    "address": "addr_test1vr3drx4gwmus3q6n2k6sdws0sp634lsjwukneut7yp966qqnk388d",
    "datum": null,
    "datumhash": null,
    "inlineDatum": null,
    "inlineDatumRaw": null,
    "referenceScript": null,
    "value": {
      "lovelace": 99000000
    }
  },
  "d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df#3": {
    "address": "addr_test1vzhl786xyy5hplz2p47qnydnla0gvqx05q2dw0shcecrjgc4hj3jy",
    "datum": null,
    "datumhash": null,
    "inlineDatum": null,
    "inlineDatumRaw": null,
    "referenceScript": null,
    "value": {
      "lovelace": 100000000
    }
  }
}
```

2. Giao dịch Mint Token

```bash
# Lấy UTXO của Alice
curl -s 127.0.0.1:4001/snapshot/utxo

# Lọc UTXO của Alice
curl -s 127.0.0.1:4001/snapshot/utxo \
  | jq "with_entries(select(.value.address == \"$(cat credentials/alice-funds.addr)\"))" \
  > utxo.json
```

```bash
cat utxo.json
```

```bash
{
  "904e33a4c066dbae9efd3916c2727bd544ffbc09171f37af9e92a87dad0279c2#1": {
    "address": "addr_test1vr3drx4gwmus3q6n2k6sdws0sp634lsjwukneut7yp966qqnk388d",
    "datum": null,
    "datumhash": null,
    "inlineDatum": null,
    "inlineDatumRaw": null,
    "referenceScript": null,
    "value": {
      "lovelace": 99000000
    }
  }
}
```

```bash
echo '{ "type": "all", "scripts": [ { "type": "sig", "keyHash": "'"$(cardano-cli latest address key-hash --payment-verification-key-file credentials/alice-funds.vk)"'" } ] }' > policy.script
```

```bash
cat policy.script
```

```bash
{
    "type": "all",
    "scripts": [
        {
            "type": "sig",
            "keyHash": "e2d19aa876f908835355b506ba0f80751afe12772d3cf17e204bad00"
        }
    ]
}
```

```bash
cardano-cli latest transaction policyid --script-file policy.script > policy.id
```

```bash
cat > metadata.json <<EOF
{
  "721": {
    "$(cat policy.id)": {
      "MYTOKEN": {
        "name": "My Token",
        "description": "Test token minted by Alice",
        "ticker": "MYT"
      }
    }
  }
}
EOF
```

```bash
LOVELACE=3000000
TOKEN_AMOUNT=1000
TOKEN_NAME_HEX="4d59544f4b454e"  # MYTOKEN
POLICY_ID=$(cat policy.id)
ASSET="$TOKEN_AMOUNT $POLICY_ID.$TOKEN_NAME_HEX"
TXIN=$(jq -r 'to_entries[0].key' utxo.json)
ALICE_LOVELACE=$(jq -r 'to_entries[0].value.value.lovelace' utxo.json)

cardano-cli latest transaction build-raw \
  --tx-in "$TXIN" \
  --tx-out "$(cat credentials/alice-funds.addr)+$LOVELACE+$ASSET" \
  --tx-out "$(cat credentials/alice-funds.addr)+0" \
  --mint "$ASSET" \
  --minting-script-file policy.script \
  --metadata-json-file metadata.json \
  --fee 0 \
  --out-file tx.json
```

```bash
cardano-cli latest transaction sign \
  --tx-body-file tx.json \
  --signing-key-file credentials/alice-funds.sk \
  --out-file tx-signed.json
```

```bash
cat tx-signed.json | jq -c '{tag: "NewTx", transaction: .}' | websocat "ws://127.0.0.1:4001?history=no"
```

3. Giao dịch Lock & UnLock với hợp đồng thông minh

# Đóng Head

```bash
{ "tag": "Close" }
```

```bash
echo '{ "tag": "Close" }' | websocat "ws://127.0.0.1:4001?history=no"
```

```bash
{
  "env": {
    "configuredPeers": "127.0.0.1:5002=http://127.0.0.1:5002",
    "contestationPeriod": 600,
    "depositPeriod": 3600,
    "otherParties": [
      {
        "vkey": "75944646ac58771a88496a2a951c24481ac9554cc5c7af12fb7b596345b9ab27"
      }
    ],
    "participants": [
      "876b0329e68608eb49596d74b21eabf925b96e43419b2619b83cb61f",
      "912716b9443ea3153bc0213548a06f7b269bd51714636a010edcb04d"
    ],
    "party": {
      "vkey": "37f06d9d5b6c4bebc5680c17e3f425419416ced292906373c89374cdd46c7d43"
    },
    "signingKey": "af9355ebc44cfe0fb431c1e7d9f67ff3e4fa82605c79ffb20718a22256dbf03a"
  },
  "headStatus": "Closed",
  "hydraHeadId": "200264c48a64b9731b5d4fdb57ae1f1f9314c8a2f74e2b8475281156",
  "hydraNodeVersion": "1.0.0-b5e33b55e9fba442c562f82cec6c36b1716d9847",
  "me": {
    "vkey": "37f06d9d5b6c4bebc5680c17e3f425419416ced292906373c89374cdd46c7d43"
  },
  "networkInfo": {
    "networkConnected": true,
    "peersInfo": {
      "127.0.0.1:5002": true
    }
  },
  "snapshotUtxo": {
    "904e33a4c066dbae9efd3916c2727bd544ffbc09171f37af9e92a87dad0279c2#0": {
      "address": "addr_test1vzhl786xyy5hplz2p47qnydnla0gvqx05q2dw0shcecrjgc4hj3jy",
      "datum": null,
      "datumhash": null,
      "inlineDatum": null,
      "inlineDatumRaw": null,
      "referenceScript": null,
      "value": {
        "lovelace": 1000000
      }
    },
    "904e33a4c066dbae9efd3916c2727bd544ffbc09171f37af9e92a87dad0279c2#1": {
      "address": "addr_test1vr3drx4gwmus3q6n2k6sdws0sp634lsjwukneut7yp966qqnk388d",
      "datum": null,
      "datumhash": null,
      "inlineDatum": null,
      "inlineDatumRaw": null,
      "referenceScript": null,
      "value": {
        "lovelace": 99000000
      }
    },
    "d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df#3": {
      "address": "addr_test1vzhl786xyy5hplz2p47qnydnla0gvqx05q2dw0shcecrjgc4hj3jy",
      "datum": null,
      "datumhash": null,
      "inlineDatum": null,
      "inlineDatumRaw": null,
      "referenceScript": null,
      "value": {
        "lovelace": 100000000
      }
    }
  },
  "tag": "Greetings"
}
```

```bash
{ "tag": "Fanout" }
```

```bash
echo '{ "tag": "Fanout" }' | websocat "ws://127.0.0.1:4001?history=no"
```
