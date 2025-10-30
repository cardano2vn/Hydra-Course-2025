<div align="center">

<img src="https://www.cardano2vn.io/_next/static/media/loading.db59b266.png" width="120" alt="Hydra Logo" />

# **Cài đặt và Cấu hình Cardano Node**

**Hướng dẫn sẵn sàng triển khai để triển khai một nút Cardano được đồng bộ hóa hoàn toàn trên Ubuntu — nền tảng thiết yếu để chạy tính năng mở rộng Hydra Layer 2.**

[![Ubuntu](https://img.shields.io/badge/Ubuntu-22.04-orange?logo=ubuntu)](https://ubuntu.com/)
[![Cardano Node](https://img.shields.io/badge/Cardano%20Node-9.0.0%2B-blue?logo=cardano)](https://github.com/IntersectMBO/cardano-node)
[![Hydra Ready](https://img.shields.io/badge/Hydra-Ready-green?logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDBGRjAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAtMThjLTQuNDEgMC04IDMuNTktOCA4czMuNTkgOCA4IDggOC0zLjU5IDgtOHptMC0xNGMtMy4zMSAwLTYgMi42OS02IDZzMi42OSA2IDYgNiA2LTIuNjkgNi02em0wLTEyYy0yLjIxIDAtNCAxLjc5LTQgNHMxLjc5IDQgNCA0IDQtMS43OSA0LTQtMS43OSA0LTQgNHptMC0xMGMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjkgMi0yLTJ6Ii8+PC9zdmc+)](https://hydra.family)
[![Systemd](https://img.shields.io/badge/Systemd-Service-blue?logo=systemd)](https://systemd.io/)
[![License: MIT](https://img.shields.io/badge/License-CC--BY--SA%204.0-yellow.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

---

</div>

## 1. Giới Thiệu

**Cài đặt và Cấu hình Cardano Node** là **hướng dẫn chính thức, chuẩn production** giúp bạn triển khai **một Cardano Node đã đồng bộ hoàn toàn** — **nền tảng bắt buộc** để vận hành bất kỳ ứng dụng nào sử dụng **Hydra**, giải pháp mở rộng **Layer 2 mạnh mẽ nhất của Cardano**.

**Hydra không hoạt động độc lập.**  
Mọi `hydra-node` đều **kết nối trực tiếp** với Cardano Node qua socket để:

- **Commit ADA** vào Hydra Head
- **Gửi snapshot & transaction** off-chain
- **Đảm bảo tính nhất quán tuyệt đối** với Layer 1

### Với tài liệu này, bạn sẽ:

| Mục tiêu                                | Thời gian                         |
| --------------------------------------- | --------------------------------- |
| Cài đặt Cardano Node mới nhất (v10.5.1) | **5 phút**                        |
| Đồng bộ toàn bộ preview                 | **< 1 giờ** (dùng snapshot)       |
| Chạy node 24/7 với systemd              | **Tự động restart**               |
| Cấu hình sẵn sàng cho Hydra             | **Socket, key, firewall, Docker** |

---

**Tháng 10/2025** – Hydra `1.0.0` **đã hỗ trợ mainnet với ADA thật**  
**Khuyên dùng Preprod** để test an toàn trước khi triển khai production

---

## 2. Dành cho ai?

| Đối tượng                | Mục đích                                     |
| ------------------------ | -------------------------------------------- |
| **Developer dApp Hydra** | Xây dựng ứng dụng L2 (tipping, gaming, DeFi) |
| **Node Operator**        | Chạy node riêng, tự chủ, bảo mật cao         |
| **Dự án Production**     | Cần môi trường L1 ổn định, hiệu năng tối ưu  |

---

## 3. Yêu cầu hệ thống (Theo mạng – 30/10/2025)

| **Thành phần**   | **Mainnet** (Production) | **Preprod** (Staging) | **Preview** (Development) |
| ---------------- | ------------------------ | --------------------- | ------------------------- |
| **Hệ điều hành** | Ubuntu 22.04 LTS         | Ubuntu 22.04 LTS      | Ubuntu 22.04 LTS          |
| **CPU**          | 8 cores @ 3.0GHz+        | 6 cores @ 2.8GHz+     | 4 cores @ 2.5GHz+         |
| **RAM**          | **24 GB**                | **20 GB**             | 16 GB                     |
| **Ổ cứng**       | **250 GB NVMe**          | **150 GB SSD**        | 100 GB SSD                |
| **Mạng**         | 1 Gbps                   | 500 Mbps              | 100 Mbps                  |
| **ADA cần**      | **10–50 ADA**            | **5–20 tADA**         | **1–5 tADA**              |

### Dung lượng DB thực tế (30/10/2025)

| Mạng        | Kích thước DB | Thời gian sync (snapshot) |
| ----------- | ------------- | ------------------------- |
| **Mainnet** | **~90 GB**    | **~50 phút**              |
| **Preprod** | ~50 GB        | **~30 phút**              |
| **Preview** | ~35 GB        | **~20 phút**              |

---

## 4. Cập nhật hệ thống & Kiểm tra công cụ

```bash
# 1.1 Cập nhật hệ thống
sudo apt update && sudo apt upgrade -y

# 1.2 Cài đặt công cụ cần thiết
sudo apt install curl wget tar unzip jq git -y

# 1.3 Kiểm tra
unzip --version # sudo apt install unzip
curl --version # sudo apt install curl
tar --version # sudo apt install tar
jq --version # sudo apt install jq
```

## 5. Cài đặt Cardano Node & CLI 10.5.1 (Binary – Không cần biên dịch)

**Mục tiêu**:  
Cài đặt **phiên bản chính thức `10.5.1`** của `cardano-node` và `cardano-cli` từ **binary được IntersectMBO ký số**, đảm bảo:

- Không cần biên dịch (tiết kiệm 30–60 phút)
- Ổn định, hiệu năng cao
- Bảo mật cao (checksum + chữ ký)
- Dễ nâng cấp sau này

**Phiên bản chính thức (30/10/2025):** `cardano-node-10.5.1-linux.tar.gz`  
 SHA256: [cardano-node-10.5.1-linux.tar.gz](https://github.com/IntersectMBO/cardano-node/releases/tag/10.5.1)

### 2.1 Tạo thư mục làm việc (Workdir)

```bash
# Đặt phiên bản vào biến (dễ nâng cấp sau)
CARDANO_VERSION="10.5.1"

# Tải file từ GitHub Releases (chính thức, được ký số)
curl -L -o cardano-node-${CARDANO_VERSION}-linux.tar.gz \
  https://github.com/IntersectMBO/cardano-node/releases/download/${CARDANO_VERSION}/cardano-node-${CARDANO_VERSION}-linux.tar.gz

tar xf cardano-node-${CARDANO_VERSION}-linux.tar.gz ./bin/cardano-node ./bin/cardano-cli
tar xf cardano-node-${CARDANO_VERSION}-linux.tar.gz ./share/preview --strip-components=3
```

```bash
export PATH="$HOME/bin:$PATH"
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

```bash
cardano-node --version
cardano-cli --version
```

```bash
cardano-node 10.5.1 - linux-x86_64 - ghc-9.6
git rev ca1ec278070baf4481564a6ba7b4a5b9e3d9f366

cardano-cli 10.11.0.0 - linux-x86_64 - ghc-9.6
git rev ca1ec278070baf4481564a6ba7b4a5b9e3d9f366
```

## 6. Chạy Cardano Node 10.5.1 & Đồng bộ với mạng

### 3.1. So sánh 2 phương thức

| **Tiêu chí**               | **Chạy thường (Snapshot)** | **Mithril (Khuyến nghị)** |
| -------------------------- | -------------------------- | ------------------------- |
| **Thời gian sync**         | **50 phút** (Mainnet)      | **15 phút**               |
| **Dung lượng tải**         | **90 GB**                  | **2.5 GB**                |
| **Kiểm tra tính toàn vẹn** | SHA256                     | **Multi-signature**       |
| **Tương lai**              | Cũ                         | **Tương lai Cardano**     |
| **Độ phức tạp**            | Đơn giản                   | **Đơn giản**              |
| **Khuyến nghị**            | ❌                         | **✅**                    |

---

### 3.2. Chạy thường (Dùng Snapshot)

```bash
tar xf cardano-node-${CARDANO_VERSION}-linux.tar.gz ./share/preview --strip-components=3
```

Khởi chạy một nút Cardano trống và đưa nó vào hoạt động sau vài phút!

```bash
cardano-node run \
  --config config.json \
  --topology topology.json \
  --socket-path ./node.socket \
  --database-path db
```

Bạn sẽ thấy nút Cardano bắt đầu bằng cách xác thực các tệp được nhập từ kho lưu trữ ảnh chụp nhanh. Sau đó, nó sẽ đồng bộ hóa với các nút mạng khác và bắt đầu thêm các khối:

```bash
[c995d1df:cardano.node.ChainDB:Notice:322] [2022-07-10 13:53:40.06 UTC] Chain extended, new tip: 7ae33b2f4bc8b84e77dfd539f0f6e7f59b293e96f62fdcfdb17cbd7a006fe5c0 at slot 63081906
[c995d1df:cardano.node.ChainDB:Notice:322] [2022-07-10 13:55:08.30 UTC] Chain extended, new tip: 6b4ccd2bec5e3862b23ea0f7c2f342a3659cecdcfdaf04551179df3839be6213 at slot 63092090
[c995d1df:cardano.node.ChainDB:Notice:322] [2022-07-10 13:55:21.36 UTC] Chain extended, new tip: 6e95eb82da5a38544e6ef430a2733f6014c3c10527003b9d3bdc534f6a2ce81f at slot 63092103
[c995d1df:cardano.node.ChainDB:Notice:322] [2022-07-10 13:55:39.04 UTC] Chain extended, new tip: a662672ec4b988022e135cb0b7e440f5fbffe8e205771d13a566a418f7021ba7 at slot 63092121
[c995d1df:cardano.node.ChainDB:Notice:322] [2022-07-10 13:55:45.18 UTC] Chain extended, new tip: 2a0f2e6f218a08f4e0bc4668285d8e792fd7ec62f05880bd5b2d23d6bce20dfb at slot 63092127
[c995d1df:cardano.node.ChainDB:Notice:322] [2022-07-10 13:56:18.05 UTC] Chain extended, new tip: ab9ef8af92ec062ec59a10da588e238ba8840705c095ebd5cd5da7ab9ea9c8e1 at slot 63092160
```

Kiểm tra Cardano Node sau khi đồng bộ đang thành công 100% hay chưa

```bash
cardano-cli query tip --testnet-magic 2
```

Kết quả đạt được là đồng bộ đã hoàn thành

```bash
{
    "block": 3734105,
    "epoch": 1101,
    "era": "Conway",
    "hash": "c1fd0fe85db337c3044acf06db90be929aebced51880ee7bba9e97f72a6d4972",
    "slot": 95160249,
    "slotInEpoch": 33849,
    "slotsToEpochEnd": 52551,
    "syncProgress": "100.00"
}
```

### 3.3. Mithril (Khuyên dùng - Đồng bộ siêu nhanh)

```bash
curl --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/input-output-hk/mithril/refs/heads/main/mithril-install.sh | sh -s -- -c mithril-client -d latest -p bin

```

```bash
export PATH="$HOME/bin:$PATH"
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

```bash
mithril-client --version
```

```bash
mithril-client 0.12.30+6a7107e
```

#### 3.2. Khởi động nút Cardano từ ảnh chụp nhanh Mithril Cardano DB của testnet

##### Bước 1: Chuẩn bị một số biến hữu ích

```bash
# Cardano network
export CARDANO_NETWORK=**YOUR_CARDANO_NETWORK**

# Aggregator API endpoint URL
export AGGREGATOR_ENDPOINT=**YOUR_AGGREGATOR_ENDPOINT**

# Genesis verification key
export GENESIS_VERIFICATION_KEY=$(wget -q -O - **YOUR_GENESIS_VERIFICATION_KEY**)

# Ancillary verification key
export ANCILLARY_VERIFICATION_KEY=$(wget -q -O - **YOUR_ANCILLARY_VERIFICATION_KEY**)

# Digest of the latest produced cardano db snapshot for convenience of the demo
# You can also modify this variable and set it to the value of the digest of a snapshot that you can retrieve at step 2
export SNAPSHOT_DIGEST=latest
```

Trong các lệnh sau, chúng ta sẽ sử dụng các biến môi trường sau:

```bash
# Cardano network
export CARDANO_NETWORK=preview
# Aggregator API endpoint URL
export AGGREGATOR_ENDPOINT="https://aggregator.testing-preview.api.mithril.network/aggregator"
# Genesis verification key
export GENESIS_VERIFICATION_KEY=$(wget -q -O - https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/testing-preview/genesis.vkey)
# Ancillary verification key
export ANCILLARY_VERIFICATION_KEY=$(wget -q -O - https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/testing-preview/ancillary.vkey)
# Digest of the latest produced cardano db snapshot for convenience of the demo
export SNAPSHOT_DIGEST=latest
# Cardano network id
export CARDANO_NODE_NETWORK_ID=2

export CARDANO_NODE_SOCKET_PATH="./node.socket"

export PATH="$(pwd)/bin:$PATH"
```

##### Bước 2: Chọn ảnh chụp nhanh Cardano DB

Liệt kê các ảnh chụp nhanh db Cardano có sẵn mà bạn có thể khởi động nút Cardano:

```bash
mithril-client cardano-db snapshot list
```

Bạn sẽ thấy một danh sách các ảnh chụp nhanh:

```bash
+-------+-----------+---------+----------------------------+--------+-----------+
|Epoch  |Immutable  |Network  |Digest (short)              | Size   | Created   |
+-------+-----------+---------+----------------------------+--------+-----------+
|916    |18323      |preview  |a1b5e6f4...82a0d1974        |3.14GB  |04-28 08:40|
|916    |18322      |preview  |1d5172a4...f17ae21d         |3.13GB  |04-28 07:22|
|916    |18321      |preview  |9cd51315...1fcb6d1          |3.13GB  |04-28 06:26|
|916    |18320      |preview  |550bc248...e8eb05f          |3.13GB  |04-28 05:18|
+-------+-----------+---------+----------------------------+--------+-----------+
```

##### Bước 3: Hiển thị chi tiết ảnh chụp nhanh Cardano DB

Để biết thêm chi tiết từ một ảnh chụp nhanh cụ thể (tùy chọn), hãy chạy:

```bash
mithril-client cardano-db snapshot show $SNAPSHOT_DIGEST
```

Bạn sẽ thấy thêm thông tin về ảnh chụp nhanh:

```bash
+----------------------+---------------------------------------------------------------------------------------+
| Epoch                | 916                                                                                   |
| Immutable File Num.  | 18323                                                                                 |
| Network              | preview                                                                               |
| Digest               | a1b5e6f4...a0d1974                                                                    |
| Size                 | 3.14 GiB                                                                              |
| Node Version         | 10.5.1                                                                                |
| Location             | https://storage.googleapis.com/.../preview-e916-i18323.a1b5e6f4...a0d1974.tar.zst     |
| Created              | 2025-04-28 08:40:34 UTC                                                               |
| Compression          | Zstandard                                                                             |
+----------------------+---------------------------------------------------------------------------------------+

```

##### Bước 4: Tải xuống ảnh chụp nhanh Cardano DB đã chọn

Để tải ảnh chụp nhanh đã chọn từ vị trí từ xa về vị trí từ xa của bạn, hãy chạy:

```bash
mithril-client cardano-db download --include-ancillary $SNAPSHOT_DIGEST
```

Bạn sẽ thấy kho lưu trữ ảnh chụp nhanh đã chọn đã được tải xuống cục bộ và chứng chỉ liên quan là hợp lệ:

```bash
1/5 - Checking local disk info…
2/5 - Fetching the certificate and verifying the certificate chain…
  Certificate chain validated
4/5 - Downloading and unpacking the cardano db
   [00:00:22] [###############################################################################################] 3.14 GiB/3.14 GiB (0.0s)
   [00:00:01] [###########################################################################################] 165.88 MiB/165.88 MiB (0.0s)
4/5 - Computing the cardano db message
5/5 - Verifying the cardano db signature…
Cardano db 'a1b5e6f43521fd9c5f55e3d6bf27dc4a62f43980681cb67e28cc40582a0d1974' has been unpacked and successfully verified with Mithril.

    Files in the directory 'db' can be used to run a Cardano node with version >= 10.5.1.

    If you are using Cardano Docker image, you can restore a Cardano Node with:

    docker run -v cardano-node-ipc:/ipc -v cardano-node-data:/data --mount type=bind,source="/home/mithril/data/testnet/a1b5e6f43521fd9c5f55e3d6bf27dc4a62f43980681cb67e28cc40582a0d1974/db",target=/data/db/ -e NETWORK=preview ghcr.io/intersectmbo/cardano-node:10.5.1


Upgrade and replace the restored ledger state snapshot to 'LMDB' flavor by running the command:

    mithril-client tools utxo-hd snapshot-converter --db-directory db --cardano-node-version 10.5.1 --utxo-hd-flavor LMDB --commit

    Or to 'Legacy' flavor by running the command:

    mithril-client tools utxo-hd snapshot-converter --db-directory db --cardano-node-version 10.5.1 --utxo-hd-flavor Legacy --commit
```

##### Bước 5: Khởi chạy nút Cardano từ ảnh chụp nhanh Cardano DB được khôi phục

Khởi chạy một nút Cardano trống và đưa nó vào hoạt động sau vài phút!

```bash
cardano-node run \
  --config config.json \
  --topology topology.json \
  --socket-path ./node.socket \
  --database-path db
```

Bạn sẽ thấy nút Cardano bắt đầu bằng cách xác thực các tệp được nhập từ kho lưu trữ ảnh chụp nhanh. Sau đó, nó sẽ đồng bộ hóa với các nút mạng khác và bắt đầu thêm các khối:

```bash
[c995d1df:cardano.node.ChainDB:Notice:322] [2022-07-10 13:53:40.06 UTC] Chain extended, new tip: 7ae33b2f4bc8b84e77dfd539f0f6e7f59b293e96f62fdcfdb17cbd7a006fe5c0 at slot 63081906
[c995d1df:cardano.node.ChainDB:Notice:322] [2022-07-10 13:55:08.30 UTC] Chain extended, new tip: 6b4ccd2bec5e3862b23ea0f7c2f342a3659cecdcfdaf04551179df3839be6213 at slot 63092090
[c995d1df:cardano.node.ChainDB:Notice:322] [2022-07-10 13:55:21.36 UTC] Chain extended, new tip: 6e95eb82da5a38544e6ef430a2733f6014c3c10527003b9d3bdc534f6a2ce81f at slot 63092103
[c995d1df:cardano.node.ChainDB:Notice:322] [2022-07-10 13:55:39.04 UTC] Chain extended, new tip: a662672ec4b988022e135cb0b7e440f5fbffe8e205771d13a566a418f7021ba7 at slot 63092121
[c995d1df:cardano.node.ChainDB:Notice:322] [2022-07-10 13:55:45.18 UTC] Chain extended, new tip: 2a0f2e6f218a08f4e0bc4668285d8e792fd7ec62f05880bd5b2d23d6bce20dfb at slot 63092127
[c995d1df:cardano.node.ChainDB:Notice:322] [2022-07-10 13:56:18.05 UTC] Chain extended, new tip: ab9ef8af92ec062ec59a10da588e238ba8840705c095ebd5cd5da7ab9ea9c8e1 at slot 63092160
```

Kiểm tra Cardano Node sau khi đồng bộ đang thành công 100% hay chưa

```bash
cardano-cli query tip --testnet-magic 2
```

Kết quả đạt được là đồng bộ đã hoàn thành

```bash
{
    "block": 3734105,
    "epoch": 1101,
    "era": "Conway",
    "hash": "c1fd0fe85db337c3044acf06db90be929aebced51880ee7bba9e97f72a6d4972",
    "slot": 95160249,
    "slotInEpoch": 33849,
    "slotsToEpochEnd": 52551,
    "syncProgress": "100.00"
}
```

## 7. 