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

## 📌 Giới thiệu

Hydra Head là giải pháp Layer-2 của Cardano, cho phép thực hiện các giao dịch Off-Chain nhanh chóng, giảm tải cho blockchain chính, đồng thời vẫn duy trì tính bảo mật và minh bạch. Vận hành Hydra Head không chỉ là việc mở một Head mới mà còn bao gồm toàn bộ vòng đời của nó: từ khởi tạo, commit tài sản, thực thi giao dịch Off-Chain, đến đóng Head và xử lý tranh chấp.

Phần này sẽ hướng dẫn bạn cách vận hành một Hydra Head một cách an toàn và hiệu quả, bao gồm:

- Khởi chạy Head: Thiết lập kết nối và khởi động Hydra Head giữa các Thành viên Tham gia, đảm bảo mọi node sẵn sàng cho giao dịch.
- Quản lý giao dịch Off-Chain: Thực hiện giao dịch trong môi trường Layer-2, giám sát số dư và trạng thái của Head để đảm bảo tính toàn vẹn.
- Đóng Head và xử lý tranh chấp: Áp dụng cơ chế Close và Fanout, đảm bảo tài sản được trả về On-Chain một cách minh bạch và an toàn.
- Giám sát và minh bạch: Theo dõi toàn bộ hoạt động của Head để phát hiện sớm lỗi hoặc bất thường, đồng thời ghi nhận các sự kiện quan trọng trong vòng đời Head.

Như vậy, vận hành Hydra Head không chỉ là kỹ thuật mà còn là quá trình quản lý vòng đời tài sản và giao dịch trong môi trường Layer-2 một cách an toàn, hiệu quả.

---

## 🎯 Mục tiêu

1. Hiểu rõ vòng đời Hydra Head: Nắm các trạng thái chính: Idle → Init → Commit → Open → Close → Fanout. Nhận biết các điểm mốc quan trọng trên On-Chain và Off-Chain.
2. Thiết lập và khởi chạy Head hiệu quả: Kết nối các Thành viên Tham gia và khởi tạo Head đúng chuẩn. Cam kết tài sản (commit) vào Head để chuẩn bị giao dịch Off-Chain.
3. Quản lý giao dịch Off-Chain an toàn: Thực thi giao dịch nhanh chóng và chính xác trong Layer-2. Giám sát số dư, trạng thái và đồng thuận giữa các nút tham gia.
4. Đóng Head và xử lý tranh chấp minh bạch: Thực hiện cơ chế Close và Fanout để trả tài sản về On-Chain. Xử lý các tình huống tranh chấp mà không làm mất mát tài sản.
5. Giám sát và bảo đảm minh bạch: Theo dõi logs và trạng thái Head liên tục. Ghi nhận các sự kiện quan trọng để đảm bảo vận hành bền vững.
6. Chuẩn bị môi trường phát triển và thử nghiệm: Cấu hình Cardano Node, Hydra Node và các công cụ giám sát. Tạo sandbox để thử nghiệm giao dịch Off-Chain trước khi triển khai thực tế.

---

## 🏗️ Initial Head

> **Mục tiêu**: Khởi tạo một Hydra Head mới với một `headId` duy nhất, đạt được đồng thuận giữa tất cả participant, và chuyển trạng thái từ `Idle` → `HeadIsInitializing` → sẵn sàng để **Commit UTxO**.

> **Ngữ cảnh ngắn gọn**: Hydra Head là một channel off-chain giữa những participant trên mạng Cardano. Trước khi commit tiền vào Head, Head phải được khởi tạo thành công và tất cả participant phải thỏa thuận tham gia.

---

### Kiểm tra điều kiện tiên quyết (Trước khi gửi Init)

**Ý tưởng**: Nếu một node không chạy, không kết nối được P2P, hoặc API bị lỗi, lệnh `Init` sẽ không khởi tạo Head. Ta kiểm tra từng mục một cách tuần tự.

#### 1. Node đang chạy

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

#### 2. API HTTP (health)

- **Mục đích**: Đảm bảo HTTP API nội bộ của hydra-node đang trả lời.
- **Lệnh**:

```bash
curl -s http://127.0.0.1:4001/status | jq
```

- **Giải thích**: Endpoint `/status` thường trả `{"status":"ok"}`. Tham số `-s` cho `curl` im lặng, `jq` định dạng JSON.
- **Nếu lỗi**: Có thể hydra-node chưa bind port, service đang crash, hoặc port khác (4002, 4003...). Kiểm tra file cấu hình hoặc log.

#### 3. Kết nối P2P / Network

- **Mục đích**: Hydra nodes liên lạc với nhau qua P2P; nếu network không kết nối Head không thể khởi tạo đồng thuận.
- **Lệnh**:

```bash
websocat ws://127.0.0.1:4001 | jq '.networkInfo'
```

- **Giải thích**: Gửi kết nối WebSocket tới node và quan sát trường `networkInfo` trong luồng sự kiện. Trường `"networkConnected": true` cho biết node đã kết nối với peers.
- **Nếu `false`**: Kiểm tra cấu hình peer discovery, địa chỉ peers, hoặc firewall.

#### 4. Trạng thái Head hiện tại

- **Mục đích**: Đảm bảo Head vẫn ở trạng thái `Idle` trước khi gửi `Init` (nếu đã có head đang chạy, server có thể từ chối tạo head mới hoặc hành xử khác tuỳ triển khai).
- **Lệnh**:

```bash
websocat ws://127.0.0.1:4001 | jq 'select(.tag == "Greetings")'
```

- **Giải thích**: Thao tác này lắng nghe luồng sự kiện WebSocket và lọc message có `tag` là `Greetings` (message khởi tạo/giới thiệu node thường chứa `headStatus`).
- **Kết quả mong đợi**: `"headStatus": "Idle"` — node sẵn sàng khởi tạo Head.

---

### Gửi lệnh Init

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

### 3. Phản hồi và giải thích từng trường

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

#### Giải thích từng trường:

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

#### Kiểm tra sau khi nhận `HeadIsInitializing`

1. **So sánh headId trên tất cả participant**: Mở luồng WebSocket trên từng máy và xác nhận mọi node báo cùng `headId`.
2. **Xác nhận parties**: Kiểm tra `vkey` có trùng khớp với danh sách participant mà bạn mong đợi (Alice/Bob/...).
3. **Chờ trạng thái sẵn sàng để Commit**: Một số triển khai sẽ gửi một message tiếp theo như `ReadyToCommit` hoặc chuyển trạng thái sang `Open`. Đọc tài liệu node của bạn để biết tên message chính xác.

---

## Commit UTxO vào Head

Cam kết tiền là bước quan trọng đầu tiên để tham gia một Hydra Head. Khi người dùng commit, họ sẽ khóa một lượng ADA (ở đây là 100 ADA) từ địa chỉ cá nhân của mình vào hợp đồng Hydra. Số tiền này sẽ được sử dụng để mở kênh thanh toán (Head) giữa các bên.

### 1. Alice cam kết tiền cho Head

Trong mô hình Hydra, mỗi participant phải “cam kết” một lượng ADA để khởi tạo Head. Việc này đảm bảo rằng khi các transaction off-chain diễn ra trong Head, có một nguồn tiền đảm bảo cho các giao dịch. Dưới đây là các bước Alice thực hiện:

1. Bước 1: Kiểm tra số dư hiện tại (UTxO)

Trước khi cam kết, Alice cần biết số dư hiện có tại địa chỉ của mình. UTxO (Unspent Transaction Output) là các “khối tiền chưa dùng” trên blockchain Cardano.

Lệnh kiểm tra:

```bash
cardano-cli query utxo --testnet-magic 2 \
  --address $(cat credentials/alice-funds.addr)
```

Trong đó:

- `--testnet-magic 2` → sử dụng testnet (ở đây là magic number 2) thay vì mainnet.
- `--address $(cat credentials/alice-funds.addr)` → lấy địa chỉ Alice từ file.

Kết quả cho thấy Alice có 100.000.000 lovelace (tức 100 ADA) tại UTxO sau:

```bash
{
    "d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df#2": {
        "address": "addr_test1vr3drx4gwmus3q6n2k6sdws0sp634lsjwukneut7yp966qqnk388d",
        "value": {
            "lovelace": 100000000
        }
    }
}
```

- Đây là “khối tiền” mà Alice sẽ dùng để commit vào Head.
- Alice có 100 ADA (100.000.000 lovelace) trong UTxO này.
- d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df#2 là txHash + outputIndex.

2. Bước 2: Xuất UTxO ra file JSON

Để gửi yêu cầu commit, Hydra node cần biết chính xác UTxO mà Alice muốn cam kết. Cách tiện nhất là xuất UTxO ra file JSON:

```bash
cardano-cli query utxo --testnet-magic 2 \
  --address $(cat credentials/alice-funds.addr) \
  --out-file alice-commit-utxo.json
```

Nội dung file `alice-commit-utxo.json` sẽ chứa thông tin chi tiết về UTxO mà Alice sẽ cam kết vào Head. Đây là dữ liệu mà Hydra node sẽ sử dụng để tạo transaction commit.

```bash
cat alice-commit-utxo.json
```

Kết quả sẽ giống như trên, nhưng ở định dạng JSON, sẵn sàng để gửi đến Hydra node. Đây là thông tin chi tiết về UTxO mà Alice sẽ cam kết vào Head.

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

3. Bước 3: Gửi yêu cầu commit đến Hydra Node

Sau khi đã có file JSON chứa thông tin UTxO, Alice sẽ gửi yêu cầu commit đến Hydra Node thông qua API HTTP. Lệnh dưới đây sử dụng `curl` để gửi POST request với dữ liệu UTxO:

```bash
curl -X POST 127.0.0.1:4001/commit \
  --data @alice-commit-utxo.json \
  > alice-commit-tx.json
```

- Kết quả được lưu vào alice-commit-tx.json.
- `--data @alice-commit-utxo.json` → gửi file JSON UTxO.
- Hydra Node tạo ra transaction chuẩn bị commit nhưng chưa ký.

Kiểm tra nội dung file `alice-commit-tx.json` để xem transaction đã được tạo ra chưa:

````bash
cat alice-commit-tx.json
```

Bạn sẽ thấy CBOR (binary) và txId:

- txId → mã định danh của transaction commit, sẽ dùng để theo dõi trạng thái trên blockchain.
- cborHex → transaction ở định dạng CBOR (binary), chuẩn của Cardano.

```bash
{
    "cborHex":"84a800d90102838258207db7280c05ee5cc27e1498b698fa2229413a25ec9064e590c5e0d9fe4e9e26f202825820c77a74d266501d5b99dd6ee574a09a41d55887741ef11e38e01f76bfa2cc379303825820d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df020dd9010281825820c77a74d266501d5b99dd6ee574a09a41d5588",
    "description":"",
    "txId":"0200c57cc2fe1b27584b35c4421acdc0d194a10a9cda11d087f724c4fe0e2ddf",
    "type":"Tx ConwayEra"
}
````

4. Bước 4: Ký transaction bằng khóa của Alice

Để commit có hiệu lực trên blockchain, Alice phải ký transaction bằng khóa riêng của mình:

```bash
cardano-cli latest transaction sign \
  --tx-file alice-commit-tx.json \
  --signing-key-file credentials/alice-funds.sk \
  --out-file alice-commit-tx-signed.json
```

- alice-funds.sk → khóa riêng của Alice.
- Kết quả là alice-commit-tx-signed.json, transaction đã ký và sẵn sàng submit.

Kiểm tra nội dung:

```bash
cat alice-commit-tx-signed.json
```

File JSON này vẫn chứa cborHex, nhưng transaction đã được ký hợp lệ.

```bash
{
    "type": "Tx ConwayEra",
    "description": "Ledger Cddl Format",
    "cborHex": "84a800d90102838258207db7280c05ee5cc27e1498b698fa2229413a25ec9064e590c5e0d9fe4e9e26f202825820c77a74d266501d5b99dd6ee574a09a41d55887741ef11e38e01f76bfa2cc379303825820d17f6b6c7c83ccd9e20f79650c165d9f8"
}
```

5. Bước 5: Gửi transaction lên mạng Cardano

Submit transaction đã ký để cam kết tiền vào Hydra Head:

```bash
cardano-cli latest transaction submit --testnet-magic 2 --tx-file alice-commit-tx-signed.json
```

Sau khi submit thành công, bạn sẽ nhận được txhash:

```bash
Transaction successfully submitted. Transaction hash is:
{"txhash":"0200c57cc2fe1b27584b35c4421acdc0d194a10a9cda11d087f724c4fe0e2ddf"}
```

6. Bước 6: Xác nhận UTxO đã được cam kết

Hydra Node giữ snapshot của các UTxO đang cam kết. Kiểm tra snapshot hiện tại:

```bash
curl -s 127.0.0.1:4001/snapshot/utxo | jq
```

Ví dụ kết quả:

```bash
{
  "d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df#2": {
    "address": "addr_test1vr3drx4gwmus3q6n2k6sdws0sp634lsjwukneut7yp966qqnk388d",
    "value": {
      "lovelace": 100000000
    }
  }
}
```

- UTxO của Alice đã được Hydra Node ghi nhận.
- Bây giờ Alice đã sẵn sàng tham gia các transaction off-chain trong Hydra Head.

### 2. Bob cam kết tiền cho Head

Bob sẽ gửi 100 ADA từ ví của mình vào Hydra Head. Khi cả Alice và Bob hoàn tất commit, Hydra Head sẽ có đủ tiền để hoạt động (trong ví dụ này là tổng 200 ADA). Quá trình bao gồm: kiểm tra UTxO, xuất UTxO, tạo transaction commit, ký transaction, gửi transaction, kiểm tra snapshot Head.

1. Bước 1: Kiểm tra UTxO của Bob

Trước khi cam kết, cần biết Bob có bao nhiêu ADA có thể sử dụng. Lệnh:

```bash
cardano-cli query utxo --testnet-magic 2 \
  --address $(cat credentials/bob-funds.addr)
```

Kết quả trả về:

```bash
{
    "d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df#3": {
        "address": "addr_test1vzhl786xyy5hplz2p47qnydnla0gvqx05q2dw0shcecrjgc4hj3jy",
        "value": {
            "lovelace": 100000000
        }
    }
}
```

Giải thích:

- d17f6b6c7c83...#3 là UTxO ID, dùng để tham chiếu khi tạo transaction.
- "lovelace": 100000000 → 100 ADA.
- "address" là địa chỉ ví của Bob.

Đây là UTxO mà Bob sẽ cam kết vào Hydra Head.

2. Bước 2: Xuất UTxO ra file JSON

Hydra Node cần thông tin UTxO dưới dạng JSON để tạo transaction commit:

```bash
cardano-cli query utxo --testnet-magic 2 \
  --address $(cat credentials/bob-funds.addr) \
  --out-file bob-commit-utxo.json
```

Xem nội dung file:

```bash
cat bob-commit-utxo.json
```

Kết quả:

```bash
{
    "d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df#3": {
        "address": "addr_test1vzhl786xyy5hplz2p47qnydnla0gvqx05q2dw0shcecrjgc4hj3jy",
        "value": {
            "lovelace": 100000000
        }
    }
}
```

3. Bước 3: Tạo transaction commit

Gửi file UTxO cho Hydra Node để tạo transaction commit:

```bash
curl -X POST 127.0.0.1:4001/commit \
  --data @bob-commit-utxo.json \
  > bob-commit-tx.json
```

Giải thích:

- POST /commit → Endpoint của Hydra Node để tạo commit transaction.
- @bob-commit-utxo.json → File UTxO của Bob.
- bob-commit-tx.json → Lưu transaction chưa ký (CBOR format) vào file.

Xem nội dung file:

```bash
cat bob-commit-tx.json
```

Kết quả là transaction ở ConwayEra, chuẩn bị để ký.

```bash
{
    "cborHex":"84a800d90102838258207db7280c05ee5cc27e1498b698fa2229413a25ec9064e590c5e0d9fe4e9e26f202825820c77a74d266501d5b99dd6ee574a09a41d55887741ef11e38e01f76bfa2cc379303825820d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df020dd9010281825820c77a74d266501d5b99dd6ee574a09a41d55887741ef11e38e01f7436f6d6d69745478",
    "description":"",
    "txId":"0200c57cc2fe1b27584b35c4421acdc0d194a10a9cda11d087f724c4fe0e2ddf",
    "type":"Tx ConwayEra"
}
```

4. Bước 4: Ký transaction bằng khóa của Bob

Transaction phải được ký bằng khóa riêng của Bob trước khi gửi lên mạng:

```bash
cardano-cli latest transaction sign \
  --tx-file bob-commit-tx.json \
  --signing-key-file credentials/bob-funds.sk \
  --out-file bob-commit-tx-signed.json
```

Giải thích:

- --tx-file bob-commit-tx.json → Transaction chưa ký.
- --signing-key-file credentials/bob-funds.sk → Khóa bí mật của Bob.
- --out-file bob-commit-tx-signed.json → Transaction đã ký sẵn sàng submit.

Xem transaction đã ký:

```bash
cat bob-commit-tx-signed.json
```

Kết quả:

```bash
{
    "type": "Tx ConwayEra",
    "description": "Ledger Cddl Format",
    "cborHex": "84a800d90102838258207db7280c05ee5cc27e1498b698fa2229413a25ec9064e590c5e0d9fe4e9e26f202825820c77a74d266501d5b99dd6ee574a09a41d55887741ef11e38e01f76bfa2cc379303825820d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df020dd9010281825820c77a74d266501d5b99dd6ee574a09a41d55887741ef11e38e01f7"
}
```

5. Bước 5: Gửi transaction lên testnet

```bash
cardano-cli latest transaction submit --testnet-magic 2 --tx-file bob-commit-tx-signed.json
```

Nếu thành công, sẽ nhận được hash transaction:

```bash
Transaction successfully submitted. Transaction hash is:
{"txhash":"0200c57cc2fe1b27584b35c4421acdc0d194a10a9cda11d087f724c4fe0e2ddf"}
```

6. Bước 6: Xác nhận UTxO đã được cam kết

Sau khi Bob commit, Hydra Head có thể snapshot trạng thái UTxO:

```bash
curl -s 127.0.0.1:4001/snapshot/utxo | jq
```

Kết quả:

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

Giải thích:

- #2 → UTxO của Alice (100 ADA).
- #3 → UTxO của Bob (100 ADA).
- Hydra Head hiện tại có tổng cộng 200 ADA, sẵn sàng cho bước Open.

## Thực hiện giao dịch

Sau khi cả Alice và Bob commit tiền vào Head, chúng ta có thể thực hiện giao dịch off-chain trực tiếp trên Head. Dưới đây là hướng dẫn chi tiết.

1. Bước 1: Kiểm tra trạng thái UTxO trong Hydra Head

```bash
curl -s 127.0.0.1:4001/snapshot/utxo | jq
```

Kết quả:

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

Giải thích:

- #2 → UTxO của Alice
- #3 → UTxO của Bob
- Hydra Head tổng cộng 200 ADA.

2. Bước 2: Lọc UTxO của Alice để xây dựng giao dịch

```bash
curl -s 127.0.0.1:4001/snapshot/utxo \
  | jq "with_entries(select(.value.address == \"$(cat credentials/alice-funds.addr)\"))" \
  > utxo.json
```

Xem nội dung:

```bash
 cat utxo.json
```

Kết quả:

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

3. Bước 3: Xây dựng giao dịch chuyển ADA

Giả sử Alice muốn gửi 1 ADA (1.000.000 lovelace) cho Bob:

```bash
LOVELACE=1000000
cardano-cli latest transaction build-raw \
  --tx-in $(jq -r 'to_entries[0].key' < utxo.json) \
  --tx-out $(cat credentials/bob-funds.addr)+${LOVELACE} \
  --tx-out $(cat credentials/alice-funds.addr)+$(jq "to_entries[0].value.value.lovelace - ${LOVELACE}" < utxo.json) \
  --fee 0 \
  --out-file tx.json
```

Giải thích:

- --tx-in → UTxO của Alice
- --tx-out đầu tiên → gửi 1 ADA cho Bob
- --tx-out thứ hai → trả lại phần dư còn lại cho Alice
- --fee 0 → phí 0 vì giao dịch off-chain trong Head
- --out-file tx.json → lưu transaction chưa ký

Xem transaction:

```bash
cat tx.json
```

Kết quả:

```bash
{
    "type": "Tx ConwayEra",
    "description": "Ledger Cddl Format",
    "cborHex": "84a300d9010281825820d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df02018282581d60afff1f46212970fc4a0d7c0991b3ff5e8600cfa014d73e17c67039231a000f424082581d60e2d19aa876f908835355b506ba0f80751afe12772d3cf17e204bad001a05e69ec00200a0f5f6"
}
```

4. Bước 4: Ký transaction

```bash
cardano-cli latest transaction sign \
  --tx-body-file tx.json \
  --signing-key-file credentials/alice-funds.sk \
  --out-file tx-signed.json
```

Xem transaction đã ký:

```bash
cat tx-signed.json
```

Kết quả:

```bash
{
    "type": "Tx ConwayEra",
    "description": "Ledger Cddl Format",
    "cborHex": "84a300d9010281825820d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df02018282581d60afff1f46212970fc4a0d7c0991b3ff5e8600cfa014d73e17c67039231a000f424082581d60e2d19aa876f908835355b506ba0f80751afe12772d3cf17e204bad001a05e69ec00200a100d9010281825820b01a386e6d45e1651eda684715e7201139790e2d46a42cbd2882d9434a25a75a5840437a05a6da5b99c1baf142909d90235f7b740e347d3ca2ab18380216bd7259bf13877697ece5c4476cc9991b8754bf51d7df2c14b254d3185fad8fc61f7cd70ef5f6"
}
```

5. Bước 5: Gửi transaction lên Hydra Head

```bash
cat tx-signed.json | jq -c '{tag: "NewTx", transaction: .}' | websocat "ws://127.0.0.1:4001?history=no"
```

or

```bash
websocat ws://127.0.0.1:4001 | jq
cat tx-signed.json | jq -c '{tag: "NewTx", transaction: .}'
```

Transaction sẽ được gửi qua WebSocket tới Hydra Node, và được xác nhận off-chain ngay lập tức.

6. Bước 6: Kiểm tra trạng thái UTxO sau giao dịch

```bash
curl -s 127.0.0.1:4001/snapshot/utxo | jq
```

Kết quả:

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

UTxO của Alice giảm 1 ADA, Bob nhận 1 ADA, Head đã cập nhật trạng thái.

## Close - Phân phối giá trị về Layer-1

Trong kiến trúc Hydra Layer-2 trên Cardano, một Head là kênh off-chain cho phép nhiều participant trao đổi giá trị nhanh chóng mà không cần ghi tất cả giao dịch lên blockchain. Sau khi các participant thực hiện đủ giao dịch off-chain, Head cần được đóng và phân phối giá trị về Layer-1, quá trình này gồm hai bước quan trọng: đóng Head và phân phối giá trị. Dưới đây là hướng dẫn chi tiết về cách đóng Head và phân phối giá trị trong Hydra Layer-2 trên Cardano.

1. Cách thực hiện đóng Head

Lệnh Close Head được sử dụng để: Chốt trạng thái tài sản cuối cùng (snapshot) của Head. Ngăn không cho thêm giao dịch off-chain. Bắt đầu contestation period – khoảng thời gian cho các participant kiểm tra và challenge nếu có gian lận.

```bash
echo '{ "tag": "Close" }' | websocat "ws://127.0.0.1:4001?history=no"
```

Trong đó:

- `tag: "Close"`: Đây là lệnh để đóng Head. Khi gửi lệnh này, Hydra Node sẽ chốt trạng thái tài sản cuối cùng của Head và bắt đầu quá trình đóng.
- Node phản hồi với snapshotUtxo và trạng thái mới headStatus: "Closed".

2. Snapshot cuối cùng của Head

snapshotUtxo là trạng thái tài sản cuối cùng trong Head. Đây là thông tin quan trọng để phân phối giá trị về Layer-1 sau khi đóng Head. Snapshot này sẽ được sử dụng để xác định số lượng tài sản mà mỗi participant sẽ nhận được khi phân phối.

```bash
{
  "snapshotUtxo": {
    "904e33a4c066dbae9efd3916c2727bd544ffbc09171f37af9e92a87dad0279c2#0": {
      "address": "addr_test1vzhl786xyy5hplz2p47qnydnla0gvqx05q2dw0shcecrjgc4hj3jy",
      "value": {
        "lovelace": 1000000
      }
    },
    "904e33a4c066dbae9efd3916c2727bd544ffbc09171f37af9e92a87dad0279c2#1": {
      "address": "addr_test1vr3drx4gwmus3q6n2k6sdws0sp634lsjwukneut7yp966qqnk388d",
      "value": {
        "lovelace": 99000000
      }
    },
    "d17f6b6c7c83ccd9e20f79650c165d9f895d1f0e309e020c30a7a62e07e2b3df#3": {
      "address": "addr_test1vzhl786xyy5hplz2p47qnydnla0gvqx05q2dw0shcecrjgc4hj3jy",
      "value": {
        "lovelace": 100000000
      }
    }
  },
  "tag": "Greetings"
}
```

3. Contestation period và phân phối giá trị

Sau khi đóng Head, sẽ có một khoảng thời gian gọi là contestation period (thường là 1-2 ngày) để các participant có thể kiểm tra snapshot cuối cùng và challenge nếu phát hiện gian lận. Nếu không có challenge nào được đưa ra, hoặc sau khi kết thúc contestation period, giá trị sẽ được phân phối về Layer-1 dựa trên snapshot cuối cùng.

```bash
"contestationPeriod": 600
```

Sau khi contestation period kết thúc, lệnh Fanout sẽ được gửi để phân phối giá trị về Layer-1. Lệnh này sẽ tạo các giao dịch trên blockchain để chuyển tài sản từ Head về địa chỉ của các participant dựa trên snapshot cuối cùng.

## Fanout - Phân phối giá trị về Layer-1

Fanout là bước cuối cùng, thực hiện phân phối tài sản trở lại Layer-1: Tạo transaction on-chain trên Cardano. Chia UTXO trong snapshot cho từng participant. Kết thúc vòng đời của Head.

1. Cách thực hiện lệnh Fanout

```bash
echo '{ "tag": "Fanout" }' | websocat "ws://127.0.0.1:4001?history=no"
```

Trong đó:

- `tag: "Fanout"`: Đây là lệnh để phân phối giá trị về Layer-1. Khi gửi lệnh này, Hydra Node sẽ tạo các giao dịch on-chain để chuyển tài sản từ Head về địa chỉ của các participant dựa trên snapshot cuối cùng.

2. Kết quả sau khi Fanout

Sau khi lệnh Fanout được thực hiện, các participant sẽ nhận được tài sản của mình trên Layer-1. Bạn có thể kiểm tra các giao dịch trên blockchain để xác nhận rằng tài sản đã được phân phối đúng cách. Trạng thái của Head sẽ được cập nhật thành "Finalized", cho thấy rằng quá trình phân phối đã hoàn tất và Head đã kết thúc vòng đời của mình.

```bash
{
  "headStatus": "Idle",
  "tag": "Greetings"
}
```

## Kết luận

Trong video này, chúng ta đã tìm hiểu về cách thực hiện giao dịch cơ bản trên Hydra Layer-2 của Cardano. Chúng ta cũng đã khám phá quá trình đóng Head và phân phối giá trị về Layer-1 thông qua lệnh Close và Fanout. Hiểu rõ các bước này sẽ giúp bạn xây dựng và triển khai các ứng dụng phi tập trung hiệu quả trên Cardano, tận dụng tối đa khả năng mở rộng và tốc độ của Hydra Layer-2.

---

<div align="center">

## 📚 **Tài liệu tham khảo**

**Tóm tắt các bài học quan trọng và chuẩn bị nền tảng vững chắc để bước vào giai đoạn phát triển Hydra DApp một cách an toàn, ổn định và hiệu quả.**

<p>

<a href="https://lms.cardano2vn.io/courses/hydra-on-cardano-complete-step-by-step-dapp-guide/lesson/running-your-first-hydra-head-launching-managing-and-observing-on-chain-and-off-chain-activity/"><img src="https://img.shields.io/badge/LMS-Course-blue?style=for-the-badge&logo=googleclassroom"/></a>
<a href="https://docs.google.com/presentation/d/1lxgBPT84J0FszsPkRIswWZRGYCIJ5t5d/edit?slide=id.p1#slide=id.p1"><img src="https://img.shields.io/badge/Slides-Presentation-orange?style=for-the-badge&logo=googleslides"/></a>
<a href="https://github.com/cardano2vn/Hydra-Course-2025/tree/main/Code/video_06"><img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github"/></a>
<a href="https://hydra-course-2025.vercel.app/document/chapter-02/video-06"><img src="https://img.shields.io/badge/Article-Read-green?style=for-the-badge&logo=readthedocs"/></a>
<a href="https://www.youtube.com/watch?v=Qp5a7_BH3f4&list=PLoQ07ewXairlrp5T6MV2oMOjKF8l9K4qA"><img src="https://img.shields.io/badge/YouTube-Watch-red?style=for-the-badge&logo=youtube"/></a>

</p>

</div>
