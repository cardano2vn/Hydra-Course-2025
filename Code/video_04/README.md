<div align="center">

<img src="https://www.cardano2vn.io/_next/static/media/loading.db59b266.png" width="120" alt="Hydra Logo" />

# **Cài đặt và Cấu hình Cardano Node**

**Hướng dẫn sẵn sàng triển khai để triển khai một nút Cardano được đồng bộ hóa hoàn toàn trên Ubuntu — nền tảng thiết yếu để chạy tính năng mở rộng Hydra Layer 2.**

[![Ubuntu](https://img.shields.io/badge/Ubuntu-22.04-orange?logo=ubuntu)](https://ubuntu.com/)
[![Cardano Node](https://img.shields.io/badge/Cardano%20Node-10.5.1-blue?logo=cardano)](https://github.com/IntersectMBO/cardano-node)
[![Hydra](https://img.shields.io/badge/Hydra-0.22.4-green)](https://hydra.family)
[![Mithril](https://img.shields.io/badge/Mithril-Sync%20in%2015%20min-blue)](https://mithril.network)
[![License: CC-BY-SA 4.0](https://img.shields.io/badge/License-CC--BY--SA%204.0-yellow.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![Systemd](https://img.shields.io/badge/Systemd-Service-blue?logo=systemd)](https://systemd.io/)
[![License: MIT](https://img.shields.io/badge/License-CC--BY--SA%204.0-yellow.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

---

</div>

## Giới Thiệu

**“Cài đặt và Cấu hình Cardano Node”** là tài liệu hướng dẫn chi tiết, được biên soạn theo tiêu chuẩn **production-grade**, giúp bạn triển khai một **Cardano Node đã đồng bộ hoàn toàn** và **ổn định 24/7**. Đây là nền tảng bắt buộc để vận hành bất kỳ ứng dụng, dịch vụ hoặc hệ thống nào dựa trên **Cardano Layer 1**, đặc biệt là những giải pháp mở rộng **Layer 2** như **Hydra**. Cardano Node đóng vai trò là **điểm kết nối duy nhất** giữa hạ tầng của bạn và mạng lưới Cardano, chịu trách nhiệm:

- Tiếp nhận và truyền phát block/transaction giữa server của bạn và mạng Cardano.
- Duy trì ledger state mới nhất.
- Xử lý các truy vấn CLI như UTxO, ký/sent giao dịch.
- Cung cấp kênh giao tiếp IPC (`node.socket`) cho Hydra và backend.

Việc triển khai đúng chuẩn không chỉ đảm bảo hiệu năng mà còn quyết định **tính an toàn, ổn định và độ tin cậy** của toàn bộ hệ thống.

---

### Hydra và Sự Phụ Thuộc vào Cardano Node

Hydra hoạt động như một Layer 2 xác định (deterministic L2) và **không thể vận hành** nếu không có Cardano Node.  
Bảng dưới đây tóm tắt 3 chức năng phụ thuộc cốt lõi:

| Chức năng                                | Mô tả                                                                                        | Cardano Node cung cấp gì?                                  |
| ---------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Commit tài sản vào Hydra Head**        | Hồ sơ tài sản (ADA/token) được gửi từ Layer 1 để mở Hydra Head.                              | Ký & gửi giao dịch commit, xác minh input/output trên L1.  |
| **Xử lý snapshot & giao dịch off-chain** | Snapshot của L2 được neo vào L1; các giao dịch off-chain cần tham chiếu trạng thái on-chain. | Chain tip mới nhất, protocol parameters, thời gian/slot.   |
| **Đồng bộ tuyệt đối với Layer 1**        | Hydra Head phải nhất quán 100% với L1 để đảm bảo tính xác định và khả năng đóng Head.        | Trạng thái L1 liên tục; node phải ổn định, không trễ sync. |

**Nếu Cardano Node chậm, lỗi hoặc mất kết nối → Hydra tạm dừng hoặc ngừng hoạt động → Đây là lý do việc vận hành node ổn định và cấu hình đúng chuẩn là điều kiện tiên quyết để chạy Hydra.**

---

### Tài liệu này giúp bạn đạt được gì?

| Mục tiêu                                 | Chi tiết                                                          |
| ---------------------------------------- | ----------------------------------------------------------------- |
| **Cài đặt Cardano Node 10.5.1 (binary)** | Cài đặt bản chính thức, không cần biên dịch, chỉ 5 phút.          |
| **Đồng bộ Preview/Preprod/Mainnet**      | Dùng snapshot (<1 giờ) hoặc Mithril (15 phút).                    |
| **Chạy node 24/7 với systemd**           | Tự khởi động lại khi lỗi, auto-start khi reboot.                  |
| **Sẵn sàng cho Hydra**                   | Cấu hình socket, key, firewall, Docker và chuẩn bị môi trường L2. |

---

### Tình hình Hydra (Tháng 10/2025)

- Phiên bản **Hydra 1.0.0** đã hỗ trợ **mainnet với ADA thật**.
- Khuyến nghị sử dụng **Preview** để thử nghiệm trước khi triển khai production.

---

## Dành cho ai?

Tài liệu này phù hợp cho các nhóm dưới đây, tùy theo mục đích triển khai Cardano Node hoặc Hydra:

| Đối tượng                | Mục đích / Nhu cầu                                                                                                                      |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Developer dApp Hydra** | Xây dựng ứng dụng Layer 2: tipping, gaming real-time, microtransaction, DeFi; cần môi trường L1 để commit ADA và thử nghiệm Hydra Head. |
| **Node Operator**        | Triển khai node riêng nhằm đảm bảo tự chủ dữ liệu, nâng cao bảo mật, đồng bộ 24/7 và sử dụng CLI cho các tác vụ on-chain.               |
| **Dự án Production**     | Vận hành hệ thống yêu cầu môi trường Cardano L1 ổn định, hiệu năng cao và tích hợp Hydra hoặc backend on-chain trong quy mô lớn.        |

---

## Yêu cầu hệ thống

Bảng dưới đây thể hiện cấu hình khuyến nghị cho từng mạng, bảo đảm Cardano Node hoạt động ổn định và đủ tài nguyên cho Hydra hoặc môi trường production.

| Thành phần       | Mainnet (Production) | Preprod (Staging) | Preview (Development) |
| ---------------- | -------------------- | ----------------- | --------------------- |
| **Hệ điều hành** | Ubuntu 22.04 LTS     | Ubuntu 22.04 LTS  | Ubuntu 22.04 LTS      |
| **CPU**          | 8 cores @ 3.0GHz+    | 6 cores @ 2.8GHz+ | 4 cores @ 2.5GHz+     |
| **RAM**          | **24 GB**            | **20 GB**         | 16 GB                 |
| **Ổ cứng**       | **250 GB NVMe**      | **150 GB SSD**    | 100 GB SSD            |
| **Mạng**         | 1 Gbps               | 500 Mbps          | 100 Mbps              |
| **ADA yêu cầu**  | **10–50 ADA**        | **5–20 tADA**     | **1–5 tADA**          |

---

### Dung lượng DB thực tế (30/10/2025)

| Mạng        | Kích thước DB | Thời gian sync (snapshot) |
| ----------- | ------------- | ------------------------- |
| **Mainnet** | **~90 GB**    | **~50 phút**              |
| **Preprod** | ~50 GB        | **~30 phút**              |
| **Preview** | ~35 GB        | **~20 phút**              |

---

**Ghi chú:**

- Sử dụng **NVMe** cho Mainnet giúp tăng tốc độ I/O đáng kể, cải thiện performance của ChainDB.
- Mạng Preview/Preprod có thể dùng SSD nhưng ưu tiên NVMe nếu chạy Hydra hoặc backend nhiều truy vấn.
- ADA yêu cầu dùng cho phí giao dịch commit/close Hydra Head hoặc thao tác CLI cơ bản.

---

## Cập nhật hệ thống & Kiểm tra công cụ

Trước khi cài đặt Cardano Node, bạn cần chuẩn bị môi trường hệ thống đầy đủ và ổn định.  
Phần này gồm ba bước chính: cập nhật hệ điều hành, cài đặt công cụ hỗ trợ và kiểm tra phiên bản các công cụ.

---

### 1. Cập nhật hệ thống

Cập nhật danh sách gói và nâng cấp toàn bộ package giúp hệ thống ổn định và tránh lỗi phụ thuộc khi cài đặt Node.

```bash
sudo apt update && sudo apt upgrade -y
```

#### Lý do cần thực hiện bước này

- Đảm bảo môi trường Ubuntu tương thích với các binary mới.
- Giảm rủi ro lỗi trong quá trình chạy Cardano Node lâu dài.
- Vá lỗi bảo mật và cập nhật thư viện hệ thống.

---

### 2. Cài đặt các công cụ cần thiết

Các công cụ này được sử dụng xuyên suốt trong việc tải file, giải nén, xử lý cấu hình và thao tác JSON.

```bash
sudo apt install curl wget tar unzip jq git -y
```

#### Giải thích từng công cụ

| Công cụ   | Chức năng                                                  |
| --------- | ---------------------------------------------------------- |
| **curl**  | Tải file và thực hiện API request từ URL.                  |
| **wget**  | Tải file lớn như snapshot hoặc config mạng.                |
| **tar**   | Giải nén các file `.tar.gz` của Cardano Node.              |
| **unzip** | Giải nén file `.zip` khi tải cấu hình hoặc tools.          |
| **jq**    | Đọc và xử lý JSON – rất quan trọng khi dùng `cardano-cli`. |
| **git**   | Tải source hoặc file cấu hình từ GitHub khi cần.           |

---

### 3. Kiểm tra phiên bản công cụ

Kiểm tra để xác nhận các tiện ích đã được cài đặt thành công và hoạt động đúng.

```bash
unzip --version
curl --version
tar --version
jq --version
```

#### Ý nghĩa của bước kiểm tra

- Đảm bảo các công cụ đã có trong PATH.
- Tránh lỗi khi chạy các lệnh tải và giải nén.
- Xác nhận phiên bản đủ mới để hoạt động ổn định.

---

## Cài đặt Cardano Node & CLI 10.5.1 (Binary – Không cần biên dịch)

Để tiết kiệm thời gian và giảm độ phức tạp, phần này hướng dẫn bạn cài đặt **phiên bản chính thức `10.5.1`** của `cardano-node` và `cardano-cli` bằng **binary được IntersectMBO ký số**.  
Phương pháp này không yêu cầu biên dịch từ source, giúp rút ngắn thời gian cài đặt từ 30–60 phút xuống còn vài phút.

### Lợi ích khi dùng binary chính thức

- ✅ Không cần biên dịch – thiết lập nhanh chóng
- ✅ Hiệu năng cao và ổn định
- ✅ Đảm bảo an toàn (checksum + chữ ký)
- ✅ Dễ dàng nâng cấp khi có phiên bản mới

**Phiên bản chính thức (30/10/2025):**  
`cardano-node-10.5.1-linux.tar.gz`  
Nguồn: GitHub Releases → IntersectMBO  
SHA256 có trong cùng trang phát hành.

---

## 2.1 Tạo thư mục làm việc (Workdir)

Thiết lập biến phiên bản để dễ quản lý và nâng cấp sau này.

```bash
CARDANO_VERSION="10.5.2"
```

### Tải binary từ GitHub Releases

Tải file tarball đã được ký số từ nguồn chính thức của IntersectMBO.

```bash
curl -L -o cardano-node-${CARDANO_VERSION}-linux.tar.gz \
  https://github.com/IntersectMBO/cardano-node/releases/download/${CARDANO_VERSION}/cardano-node-${CARDANO_VERSION}-linux.tar.gz
```

### Giải nén cardano-node và cardano-cli

Giải nén đúng các thư mục cần thiết: cardano-node, cardano-cli và cấu hình mạng preview.

```bash
tar xf cardano-node-${CARDANO_VERSION}-linux.tar.gz ./bin/cardano-node ./bin/cardano-cli
tar xf cardano-node-${CARDANO_VERSION}-linux.tar.gz ./share/preview --strip-components=3
```

---

## 2.2 Cấu hình PATH

Thêm ~/bin vào PATH để có thể gọi cardano-node và cardano-cli ở bất kỳ đâu.

```bash
export PATH="$HOME/bin:$PATH"
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

---

## 2.3 Kiểm tra phiên bản

Xác nhận rằng Node và CLI đã được cài đặt đúng phiên bản.

```bash
cardano-node --version
cardano-cli --version
```

**Kết quả:**

```bash
cardano-node 10.5.1 - linux-x86_64 - ghc-9.6
git rev ca1ec278070baf4481564a6ba7b4a5b9e3d9f366

cardano-cli 10.11.0.0 - linux-x86_64 - ghc-9.6
git rev ca1ec278070baf4481564a6ba7b4a5b9e3d9f366
```

---

## Chạy Cardano Node 10.5.1 & Đồng bộ với mạng

Để đưa Cardano Node vào trạng thái hoạt động, bạn cần đồng bộ dữ liệu blockchain.  
Có hai phương thức phổ biến: **dùng snapshot truyền thống** hoặc **dùng Mithril (khuyến nghị)** – giải pháp đồng bộ nhanh thế hệ mới.

---

### 3.1 So sánh hai phương thức đồng bộ

Bảng dưới đây giúp bạn chọn phương án phù hợp theo nhu cầu và môi trường triển khai.

| Tiêu chí                   | Chạy thường (Snapshot)  | Mithril (Khuyến nghị)                      |
| -------------------------- | ----------------------- | ------------------------------------------ |
| **Thời gian sync**         | ~ **50 phút** (Mainnet) | ~ **15 phút**                              |
| **Dung lượng tải**         | ~ **90 GB**             | ~ **2.5 GB**                               |
| **Kiểm tra tính toàn vẹn** | SHA256 checksum         | **Chứng thực đa chữ ký (multi-signature)** |
| **Tính tương lai**         | Công nghệ cũ            | **Giải pháp sync thế hệ mới của Cardano**  |
| **Độ phức tạp**            | Đơn giản                | **Đơn giản (tự động hóa)**                 |
| **Khuyến nghị**            | ❌ Không khuyến khích   | ✅ **Nên dùng**                            |

---

**Nhận xét:**

- Snapshot truyền thống vẫn hoạt động tốt nhưng tốn dung lượng tải lớn và tốc độ sync chậm.
- **Mithril** giúp giảm kích thước tải xuống hơn 35 lần và có cơ chế bảo mật mạnh hơn thông qua multi-signature, vì vậy được xem là tương lai của quá trình đồng bộ Cardano Node.
- Trong hầu hết trường hợp — **nên dùng Mithril**.

---

### 3.2 Chạy thường (Dùng Snapshot)

Phương pháp này sử dụng **snapshot truyền thống** được cung cấp kèm theo bộ cài đặt để khởi tạo nhanh thư mục dữ liệu (`db`).  
Sau khi giải nén snapshot, node sẽ tự đồng bộ phần còn lại với mạng lưới.

---

#### Giải nén snapshot vào thư mục dữ liệu

```bash
tar xf cardano-node-${CARDANO_VERSION}-linux.tar.gz ./share/preview --strip-components=3
```

Snapshot được giải nén vào thư mục `db`, giúp node rút ngắn thời gian sync ban đầu.

---

#### Khởi chạy Cardano Node

```bash
cardano-node run \
  --config config.json \
  --topology topology.json \
  --socket-path ./node.socket \
  --database-path db
```

Node sẽ bắt đầu đọc dữ liệu từ snapshot, xác minh tính toàn vẹn, sau đó đồng bộ phần còn lại từ các peer trong mạng.

---

#### Ví dụ log node khi đang đồng bộ

```bash
[c995d1df:cardano.node.ChainDB:Notice:322] [2022-07-10 13:53:40.06 UTC] Chain extended, new tip: 7ae33b2f4bc8b84e77dfd539f0f6e7f59b293e96f62fdcfdb17cbd7a006fe5c0 at slot 63081906
[c995d1df:cardano.node.ChainDB:Notice:322] [2022-07-10 13:55:08.30 UTC] Chain extended, new tip: 6b4ccd2bec5e3862b23ea0f7c2f342a3659cecdcfdaf04551179df3839be6213 at slot 63092090
[c995d1df:cardano.node.ChainDB:Notice:322] [2022-07-10 13:55:21.36 UTC] Chain extended, new tip: 6e95eb82da5a38544e6ef430a2733f6014c3c10527003b9d3bdc534f6a2ce81f at slot 63092103
[c995d1df:cardano.node.ChainDB:Notice:322] [2022-07-10 13:55:39.04 UTC] Chain extended, new tip: a662672ec4b988022e135cb0b7e440f5fbffe8e205771d13a566a418f7021ba7 at slot 63092121
[c995d1df:cardano.node.ChainDB:Notice:322] [2022-07-10 13:55:45.18 UTC] Chain extended, new tip: 2a0f2e6f218a08f4e0bc4668285d8e792fd7ec62f05880bd5b2d23d6bce20dfb at slot 63092127
[c995d1df:cardano.node.ChainDB:Notice:322] [2022-07-10 13:56:18.05 UTC] Chain extended, new tip: ab9ef8af92ec062ec59a10da588e238ba8840705c095ebd5cd5da7ab9ea9c8e1 at slot 63092160
```

---

#### Kiểm tra tiến trình đồng bộ

```bash
cardano-cli query tip --testnet-magic 2
```

Khi đồng bộ hoàn tất, bạn sẽ thấy kết quả như sau:

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

Chỉ số **syncProgress = "100.00"** xác nhận node đã đồng bộ hoàn toàn.

---

### 3.3 Mithril (Khuyên dùng – Đồng bộ siêu nhanh)

Mithril là giải pháp đồng bộ thế hệ mới của Cardano, cho phép tải xuống **snapshot đã được chứng thực bởi multi-signature**, giúp việc sync node nhanh hơn **3–5 lần** và an toàn hơn nhiều so với snapshot truyền thống.

---

## Cài đặt Mithril Client

```bash
curl --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/input-output-hk/mithril/refs/heads/main/mithril-install.sh | sh -s -- -c mithril-client -d latest -p bin
```

Cấu hình PATH:

```bash
export PATH="$HOME/bin:$PATH"
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Kiểm tra phiên bản:

```bash
mithril-client --version
```

Ví dụ kết quả:

```bash
mithril-client 0.12.30+6a7107e
```

---

## Khởi động nút Cardano từ snapshot Mithril (Preview/Testnet)

### Bước 1: Chuẩn bị biến môi trường

```bash
# Cardano network
export CARDANO_NETWORK=preview

# Aggregator API endpoint URL
export AGGREGATOR_ENDPOINT="https://aggregator.testing-preview.api.mithril.network/aggregator"

# Genesis verification key
export GENESIS_VERIFICATION_KEY=$(wget -q -O - https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/testing-preview/genesis.vkey)

# Ancillary verification key
export ANCILLARY_VERIFICATION_KEY=$(wget -q -O - https://raw.githubusercontent.com/input-output-hk/mithril/main/mithril-infra/configuration/testing-preview/ancillary.vkey)

# Latest snapshot digest
export SNAPSHOT_DIGEST=latest

# Cardano network ID
export CARDANO_NODE_NETWORK_ID=2

export CARDANO_NODE_SOCKET_PATH="./node.socket"

export PATH="$(pwd)/bin:$PATH"
```

---

### Bước 2: Liệt kê các snapshot Mithril có sẵn

```bash
mithril-client cardano-db snapshot list
```

Ví dụ kết quả:

```
+-------+-----------+---------+----------------------------+--------+-----------+
|Epoch  |Immutable  |Network  |Digest (short)              | Size   | Created   |
+-------+-----------+---------+----------------------------+--------+-----------+
|916    |18323      |preview  |a1b5e6f4...82a0d1974        |3.14GB  |04-28 08:40|
|916    |18322      |preview  |1d5172a4...f17ae21d         |3.13GB  |04-28 07:22|
|916    |18321      |preview  |9cd51315...1fcb6d1          |3.13GB  |04-28 06:26|
|916    |18320      |preview  |550bc248...e8eb05f          |3.13GB  |04-28 05:18|
+-------+-----------+---------+----------------------------+--------+-----------+
```

---

### Bước 3: Xem chi tiết snapshot

```bash
mithril-client cardano-db snapshot show $SNAPSHOT_DIGEST
```

Ví dụ:

```
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

---

### Bước 4: Tải xuống snapshot Mithril

```bash
mithril-client cardano-db download --include-ancillary $SNAPSHOT_DIGEST
```

Ví dụ output:

```
Cardano db 'a1b5e6f43521fd9c5f55e3d6bf27dc4a62f43980681cb67e28cc40582a0d1974' has been unpacked and successfully verified with Mithril.

Files in the directory 'db' can be used to run a Cardano node with version >= 10.5.1.
```

---

### Bước 5: Chạy Cardano Node từ snapshot Mithril

```bash
cardano-node run \
  --config config.json \
  --topology topology.json \
  --socket-path ./node.socket \
  --database-path db
```

Ví dụ log:

```bash
[c995d1df:cardano.node.ChainDB:Notice:322] Chain extended, new tip: 7ae33b2f4bc...
[c995d1df:cardano.node.ChainDB:Notice:322] Chain extended, new tip: 6b4ccd2bec5...
```

---

### Kiểm tra tiến trình đồng bộ

```bash
cardano-cli query tip --testnet-magic 2
```

Khi sync hoàn tất:

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

---

# Kiểm tra Cardano Node & Triển khai giao dịch mẫu

Sau khi Cardano Node đã chạy và CLI hoạt động bình thường, bạn có thể thử thực hiện một giao dịch đơn giản để đảm bảo mọi thành phần của hệ thống đã sẵn sàng.

## 7.1 Tạo khóa & địa chỉ thanh toán

Tạo cặp khóa:

```bash
cardano-cli address key-gen   --verification-key-file payment.vkey   --signing-key-file payment.skey   --testnet-magic 2
```

Sinh địa chỉ:

```bash
cardano-cli address build   --payment-verification-key-file payment.vkey   --out-file payment.addr   --testnet-magic 2
```

Kiểm tra địa chỉ:

```bash
cat payment.addr
```

## 7.2 Nạp tiền vào địa chỉ (Testnet Faucet)

Preview Faucet: https://docs.cardano.org/cardano-testnet/tools/faucet

Sau khi nạp, kiểm tra UTxO:

```bash
cardano-cli query utxo   --address $(cat payment.addr)   --testnet-magic 2
```

kết quả:

```bash
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
be3fa4c...c01b             0            100000000 lovelace

```

## 7.3 Chuẩn bị biến môi trường

```bash
TX_HASH="be3fa4c...c01b"
TX_IX="0"
LOVELACE_IN="100000000"
PAYMENT_ADDR=$(cat payment.addr)
RECEIVER_ADDR="addr_test1vq...."
FEE="200000"
LOVELACE_OUT=$((LOVELACE_IN - FEE))
```

## 7.4 Xây giao dịch

```bash
cardano-cli transaction build   --babbage-era   --testnet-magic 2   --tx-in $TX_HASH#$TX_IX   --tx-out "$RECEIVER_ADDR+$LOVELACE_OUT"   --change-address $PAYMENT_ADDR   --out-file tx.raw
```

## 7.5 Ký giao dịch

```bash
cardano-cli transaction sign   --tx-body-file tx.raw   --signing-key-file payment.skey   --testnet-magic 2   --out-file tx.signed
```

## 7.6 Gửi giao dịch

```bash
cardano-cli transaction submit   --tx-file tx.signed   --testnet-magic 2
```

## 7.7 Kiểm tra giao dịch

```bash
cardano-cli query utxo   --address $RECEIVER_ADDR   --testnet-magic 2
```
