<div align="center">

<img src="https://www.cardano2vn.io/_next/static/media/loading.db59b266.png" width="120" alt="Hydra Logo" />

# **Cài đặt và Cấu hình Hydra Node**

**Hướng dẫn sẵn sàng triển khai để triển khai một nút Cardano được đồng bộ hóa hoàn toàn trên Ubuntu — nền tảng thiết yếu để chạy tính năng mở rộng Hydra Layer 2.**

[![Ubuntu](https://img.shields.io/badge/Ubuntu-22.04-orange?logo=ubuntu)](https://ubuntu.com/)
[![Cardano Node](https://img.shields.io/badge/Cardano%20Node-10.5.1-blue?logo=cardano)](https://github.com/IntersectMBO/cardano-node)
[![Hydra Ready](https://img.shields.io/badge/Hydra-1.0.0-green?logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDBGRjAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAtMThjLTQuNDEgMC04IDMuNTktOCA4czMuNTkgOCA4IDggOC0zLjU5IDgtOHptMC0xNGMtMy4zMSAwLTYgMi42OS02IDZzMi42OSA2IDYgNiA2LTIuNjkgNi02em0wLTEyYy0yLjIxIDAtNCAxLjc5LTQgNHMxLjc5IDQgNCA0IDQtMS43OSA0LTQtMS43OSA0LTQgNHptMC0xMGMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjkgMi0yLTJ6Ii8+PC9zdmc+)](https://hydra.family)
[![Systemd](https://img.shields.io/badge/Systemd-Service-blue?logo=systemd)](https://systemd.io/)
[![License: MIT](https://img.shields.io/badge/License-CC--BY--SA%204.0-yellow.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

---

</div>

## 📌 Giới thiệu

Trong bài học này, chúng ta sẽ từng bước tiếp cận quy trình thiết lập và chạy thử một hệ thống Hydra Node trong môi trường thực tế. Mục tiêu không chỉ dừng lại ở việc cài đặt, mà còn giúp bạn hiểu rõ cách các thành phần hoạt động và liên kết với nhau trong kiến trúc tổng thể của Hydra trên Cardano.

Bạn sẽ bắt đầu từ việc chuẩn bị môi trường, cài đặt các công cụ cần thiết, thiết lập các biến môi trường và cấu hình hệ thống. Sau đó, chúng ta sẽ đi sâu vào việc tạo khóa, cấu hình tham số và cuối cùng là khởi chạy một demo hoàn chỉnh để quan sát cách Hydra vận hành trong thực tế.

Thông qua bài học này, bạn sẽ có cái nhìn rõ ràng hơn về cách xây dựng và vận hành một hệ thống off-chain sử dụng Hydra, từ đó làm nền tảng cho việc phát triển các ứng dụng phi tập trung (DApp) có hiệu năng cao.

📚 Cụ thể, nội dung bao gồm:

- Giới thiệu tổng quan về bài học và vai trò của Hydra.
- Chuẩn bị môi trường để chạy Hydra Node.
- Cài đặt các công cụ cần thiết và thiết lập biến môi trường.
  = Tạo khóa và cấu hình các tham số quan trọng.
- Khởi chạy demo và quan sát hoạt động của hệ thống.

---

## 🎯 Mục tiêu

Sau khi hoàn thành bài học này, bạn sẽ đạt được các mục tiêu sau:

- Hiểu được quy trình thiết lập và vận hành một Hydra Node từ đầu.
- Biết cách chuẩn bị môi trường phù hợp cho việc phát triển và thử nghiệm Hydra.
- Nắm được cách cài đặt và sử dụng các công cụ cần thiết trong hệ sinh thái Cardano.
- Hiểu rõ vai trò của khóa (keys) và các tham số cấu hình trong hệ thống.
- Có khả năng tự khởi chạy một demo Hydra và kiểm tra hoạt động của nó.

---

## 📚 Cuẩn bị môi trường

Trước khi khởi chạy Hydra Node, điều kiện tiên quyết là bạn phải đảm bảo rằng Cardano Node đang hoạt động ổn định và đã đồng bộ hoàn toàn với mạng blockchain. Hydra hoạt động như một layer mở rộng (Layer 2), vì vậy nó phụ thuộc trực tiếp vào Cardano Node để:

- Lấy dữ liệu blockchain
- Xác thực giao dịch
- Đồng bộ trạng thái on-chain

👉 Nếu Cardano Node chưa sync xong, Hydra sẽ không thể hoạt động chính xác.

## 1. Kiểm Tra Cardano Node Đang Chạy

Để kiểm tra trạng thái node, bạn sử dụng lệnh:

```bash
cardano-cli query tip --testnet-magic 2
```

Trong đó:

- Lệnh này giúp bạn: Kiểm tra node có đang chạy hay không, Xác định mức độ đồng bộ với blockchain. Lấy thông tin mới nhất về block, slot và epoch.
- `cardano-cli query tip` truy vấn trạng thái hiện tại của blockchain mà node đã đồng bộ.
- `--testnet-magic 2` → chỉ định mạng Preview (testnet). Nếu bạn dùng mainnet, tham số sẽ khác (không dùng testnet-magic)

Kết quả: Bạn sẽ nhận được một JSON chứa thông tin về block hiện tại, epoch, era, slot và tiến trình đồng bộ (syncProgress). Ví dụ:

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

### Giải thích các trường quan trọng:

- syncProgress: "100.00" → node đã đồng bộ hoàn toàn với mạng (bắt buộc để chạy Hydra).
- era: kỷ nguyên hiện tại (ví dụ: Conway) — chỉ để biết node đang ở phiên bản protocol nào.
- block / slot / slotInEpoch: thông tin tiến trình chuỗi; giúp chẩn đoán.

> **Nếu syncProgress < 100% → dừng lại và chờ node đồng bộ hoàn toàn. Hydra không thể hoạt động nếu node chưa sync.**

## 2. Kiểm Tra `node.socket`

Trong hệ thống Cardano, các thành phần như Cardano Node, cardano-cli và Hydra không giao tiếp với nhau qua HTTP API, mà sử dụng một cơ chế nội bộ gọi là IPC (Inter-Process Communication) thông qua file node.socket. Đây là một file đặc biệt mà Cardano Node tạo ra khi khởi động, và nó hoạt động như một cổng giao tiếp giữa node và các client khác (như cardano-cli hoặc hydra-node). 👉 Vì vậy, để Hydra hoạt động, bạn cần đảm bảo rằng biến môi trường CARDANO_NODE_SOCKET_PATH đã được cấu hình đúng.

### 🔍 Kiểm tra biến môi trường

1. Chạy lệnh sau để xem giá trị của biến môi trường:

```bash
echo $CARDANO_NODE_SOCKET_PATH
```

2. Kết quả mong đợi sẽ thấy đường dẫn đầy đủ tới file node.socket, ví dụ:

```bash
/home/ubuntu/cardano-node/relay/db/node.socket
```

### Nếu biến chưa được đặt

Trong trường hợp biến môi trường CARDANO_NODE_SOCKET_PATH chưa tồn tại hoặc trả về rỗng, bạn cần thực hiện các bước sau để cấu hình đúng đường dẫn tới node.socket.

1. Tìm file socket

Tìm vị trí chính xác của file node.socket trong hệ thống. Tránh việc cấu hình sai đường dẫn dẫn đến lỗi kết nối giữa Hydra và Cardano Node.

```bash
find / -name "node.socket" 2>/dev/null | head -5
```

Lưu ý: Kết quả có thể trả về nhiều đường dẫn → hãy chọn đường dẫn đúng với Cardano Node đang chạy. Thường nằm trong thư mục: `/db` or `/relay/db/`hoặc thư mục bạn cấu hình khi chạy node

```bash
/home/ubuntu/cardano-node/db/node.socket
```

2. Export tạm thời

Sau khi tìm được đường dẫn chính xác, bạn cần export biến môi trường:

```bash
export CARDANO_NODE_SOCKET_PATH=./node.socket
```

3. Lưu vĩnh viễn vào `~/.bashrc`:

```bash
echo 'export CARDANO_NODE_SOCKET_PATH=./node.socket' >> ~/.bashrc
source ~/.bashrc
```

## 3. Kiểm Tra Kết Nối Mạng

Kiểm tra IP public (để biết máy có Internet/public IP hay chỉ local):

```bash
curl -s https://api.ipify.org && echo
```

- Nếu trả về IP public → máy có kết nối Internet.
- Nếu đang test nội bộ, dùng localhost/127.0.0.1 là đủ.

## 4. Cập Nhật Hệ Thống

Cập nhật package và cài các công cụ cơ bản:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl unzip git
```

# Cài Đặt Công Cụ

## Cài `websocat` - Công Cụ Test WebSocket

websocat là một công cụ dòng lệnh mạnh mẽ, dùng để giao tiếp với WebSocket server giống như cách curl giao tiếp với HTTP server. Công cụ này bắt buộc phải có khi làm việc với Hydra Node, vì Hydra sử dụng WebSocket để:

- Nhận sự kiện (events)
- Gửi lệnh điều khiển (commands)
- Theo dõi trạng thái Head
- Gửi và nhận giao dịch off-chain

### Cài đặt websocat (x86_64 Linux)

Websocat có bản build sẵn, không cần biên dịch.

```bash
sudo wget -qO /usr/local/bin/websocat \
https://github.com/vi/websocat/releases/latest/download/websocat.x86_64-unknown-linux-musl
sudo chmod a+x /usr/local/bin/websocat
```

- wget -qO → tải file và lưu đúng vào /usr/local/bin/websocat
- Không cần giải nén — đây là một binary duy nhất
- chmod a+x để bạn có thể chạy lệnh

### Kiểm tra cài đặt

```bash
websocat --version
```

Kết quả mong đợi:

```bash
websocat 1.12.0
```

> Output mong đợi: websocat 1.12.0 (phiên bản có thể khác; chỉ cần lệnh chạy được).

> Lỗi thường gặp: command not found → kiểm tra /usr/local/bin/websocat tồn tại và có quyền thực thi.

### Cài Đặt Hydra Node

Hydra Node là thành phần cốt lõi giúp bạn mở Head, thực hiện giao dịch off-chain và đồng bộ với Cardano Node. Phần này hướng dẫn toàn bộ quá trình cài đặt một cách an toàn – chính xác – có kiểm tra lỗi.

**1. Chọn phiên bản Hydra**

Chọn phiên bản Hydra Node muốn cài đặt - Khuyến nghị v1.0.0+. Có thể xem các phiên bản ở [Hydra Version](https://github.com/cardano-scaling/hydra/releases)

```bash
HYDRA_VERSION=1.0.0
```

**2. Cài Binary Hydra Node**

Hydra phát hành binary đóng gói (zip), không cần build từ source.

```bash
curl -L -O https://github.com/cardano-scaling/hydra/releases/download/${HYDRA_VERSION}/hydra-x86_64-linux-${HYDRA_VERSION}.zip
```

Giải thích:

- -L: theo mọi redirect của GitHub về CDN.
- -O: giữ lại tên file gốc.
- File tải về: hydra-x86_64-linux-1.0.0.zip

**3. Giải nén vào thư mục $HOME/bin**

Đây là nơi chứa các binary cá nhân của user.

```bash
mkdir -p ~/bin
unzip -d ~/bin hydra-x86_64-linux-${HYDRA_VERSION}.zip
```

Sau khi giải nén, bạn sẽ có các file như:

```bash
Archive:  hydra-x86_64-linux-1.0.0.zip
  inflating: /root/bin/hydra-node
  inflating: /root/bin/hydra-tui
```

**4. Thêm Hydra Node vào PATH**

Để gọi hydra-node ở bất kỳ đâu:

1. Thêm tạm thời:

```bash
export PATH="$HOME/bin:$PATH"
```

2. Thêm vĩnh viễn:

```bash
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

3. Kiểm tra:

```bash
hydra-node --version
# 1.0.0-d505ff119c4bc62f008b6fcff3416cffc3d6df5b
```

> Nếu lệnh không chạy: Kiểm tra echo $PATH. Kiểm tra file thực tế trong ~/bin

# Giải Thích Các Tham Số trong Hydra Node

## 1. Các tham số cơ bản

Nhóm tham số này điều khiển cách Hydra Node giao tiếp với các node khác trong mạng Hydra. Chúng xác định danh tính của node, địa chỉ lắng nghe P2P, và danh sách các peer sẽ kết nối khi khởi động. Nếu cấu hình sai, các node sẽ không thể nhìn thấy nhau và Head sẽ không thể khởi tạo.

| Tham số                    | Giải thích                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------ |
| `-q`, `--quiet`            | Tắt toàn bộ logging. Phù hợp môi trường production.                                        |
| `-n`, `--node-id NODE-ID`  | ID duy nhất cho mỗi node tham gia mạng Hydra. Không được trùng nhau.                       |
| `-l`, `--listen HOST:PORT` | Địa chỉ và cổng lắng nghe kết nối từ các Hydra node khác. Mặc định: 0.0.0.0:5001.          |
| `--advertise HOST:PORT`    | Địa chỉ công khai để peer kết nối tới. Cần khi có NAT/firewall. Không đặt → dùng --listen. |
| `-P`, `--peer HOST:PORT`   | Danh sách peer để node tự kết nối. Dùng nhiều lần, tối đa 7 peer.                          |

## 2. API và Giao tiếp Client

Hydra cung cấp API HTTP và WebSocket nhằm cho phép ứng dụng client (web, backend, game engine…) giao tiếp với Hydra Head. Nhóm tham số này xác định địa chỉ API, cấu hình HTTPS/WSS và cổng cho Prometheus. Nếu sai cấu hình, client sẽ không thể gửi giao dịch hoặc truy cập trạng thái Head.

| Tham số                  | Giải thích                                                |
| ------------------------ | --------------------------------------------------------- |
| `--api-host IP`          | IP của API client (HTTP/WebSocket). Mặc định: 127.0.0.1.  |
| `--api-port PORT`        | Cổng API client. Mặc định: 4001.                          |
| `--tls-cert FILE`        | File chứng chỉ TLS để bật HTTPS/WSS.                      |
| `--tls-key FILE`         | File private key cho TLS (phải có cùng lúc với cert).     |
| `--monitoring-port PORT` | Cổng xuất Prometheus metrics. Không đặt → tắt monitoring. |

## 3. KHÓA BẢO MẬT (OFF-CHAIN & ON-CHAIN)

Hydra sử dụng hai lớp khóa:

- khóa off-chain (Hydra keys) cho giao dịch L2
- khóa on-chain (Cardano keys) để mở Head, đóng Head, contest hoặc submit giao dịch L1

Nếu cấu hình thiếu hoặc sai khóa, node sẽ không thể tham gia Head hoặc ký giao dịch.

| Tham số                           | Giải thích                                                           |
| --------------------------------- | -------------------------------------------------------------------- |
| `--hydra-signing-key FILE`        | Khóa ký Hydra off-chain. Mặc định: hydra.sk.                         |
| `--hydra-verification-key FILE`   | Khóa xác minh của các participant khác. Dùng tối đa 7 lần.           |
| `--cardano-signing-key FILE`      | Khóa ký Cardano on-chain (fuel + ký tx Hydra). Mặc định: cardano.sk. |
| `--cardano-verification-key FILE` | Khóa xác minh Cardano của participant khác. Dùng nhiều lần.          |

## 4. LƯU TRỮ & PERSISTENCE

Hydra lưu trữ trạng thái Head (UTxO, snapshot, event) trong persistence directory. Không được chỉnh sửa thủ công vì có thể làm hỏng lịch sử Head. Tùy chọn xoay file persistence giúp giảm kích thước file và tối ưu hiệu năng lâu dài.

| Tham số                              | Giải thích                                                                       |
| ------------------------------------ | -------------------------------------------------------------------------------- |
| `--persistence-dir DIR`              | Thư mục lưu trạng thái Head (UTxO, snapshot, lịch sử). Không chỉnh sửa thủ công. |
| `--persistence-rotate-after NATURAL` | Số event trước khi xoay file persistence. Mặc định: không xoay.                  |

## 5. Kết nối với Cardano Layer 1

Hydra vẫn phụ thuộc Cardano L1 để mở Head, đóng Head và xuất UTxO ra chain. Bạn có thể kết nối bằng cách dùng cardano-node hoặc Blockfrost. Sai cấu hình sẽ khiến giao dịch không thể submit.

### 1. Sử dụng Cardano Node (recommended)

| Tham số                   | Giải thích                                                         |
| ------------------------- | ------------------------------------------------------------------ |
| `--mainnet`               | Chạy trên mainnet (magic ID tự động)                               |
| `--testnet-magic NATURAL` | Chạy trên testnet. Ví dụ: --testnet-magic 2 → Preview.             |
| `--node-socket FILE`      | Đường dẫn tới node.socket của cardano-node. Mặc định: node.socket. |

### 2. Sử dụng Blockfrost

| Tham số             | Giải thích                                              |
| ------------------- | ------------------------------------------------------- |
| `--blockfrost FILE` | File chứa Blockfrost API key. Mặc định: blockfrost.txt. |

## 6. Hydra Scripts (Plutus Scripts)

Hydra yêu cầu bộ scripts Plutus đã publish lên chain.
Tất cả node phải dùng cùng scripts thông qua TXID hoặc cùng network.
Sai TXID hoặc khác network sẽ khiến Head không thể mở.

| Tham số                      | Giải thích                                                        |
| ---------------------------- | ----------------------------------------------------------------- |
| `--hydra-scripts-tx-id TXID` | TxID chứa reference scripts Hydra (nằm trong 10 output đầu).      |
| `--network NETWORK`          | Sử dụng scripts đã publish sẵn cho (mainnet / preprod / preview). |

## 7. Tham số trong giao thức Head

Những tham số này quyết định logic hoạt động của Head: thời gian tranh chấp, thời gian deposit và điểm xuất phát của chain.
Tất cả các node phải sử dụng cùng cấu hình.

| Tham số                         | Giải thích                                                              |
| ------------------------------- | ----------------------------------------------------------------------- |
| `--contestation-period SECONDS` | Thời gian tranh chấp sau Close. Mặc định: 600 giây.                     |
| `--deposit-period SECONDS`      | Thời gian tối thiểu trước deadline để gửi deposit. Mặc định: 3600 giây. |
| `--start-chain-from SLOT.HASH`  | Điểm bắt đầu theo dõi chain. Dùng khi phục hồi từ snapshot.             |

## 8. Chế độ offline (Mô Phỏng L1)

Hydra có chế độ chạy offline để test nhanh mà không cần Cardano L1.
Chế độ này mô phỏng genesis, protocol parameters và UTxO ban đầu.
Tất cả node phải đồng bộ seed và file cấu hình.

| Tham số                             | Giải thích                                                                |
| ----------------------------------- | ------------------------------------------------------------------------- |
| `--offline-head-seed HEX`           | Seed hex để sinh Head ID offline (tất cả node phải giống nhau).           |
| `--initial-utxo FILE`               | File JSON chứa UTxO ban đầu cho Hydra. Mặc định: utxo.json.               |
| `--ledger-genesis FILE`             | File genesis mô phỏng Shelley L1.                                         |
| `--ledger-protocol-parameters FILE` | Protocol parameters cho Hydra ledger. Mặc định: protocol-parameters.json. |

## 9. Các lệnh phụ

Nhóm lệnh tiện ích phục vụ việc chuẩn bị môi trường Hydra, như publish scripts hoặc sinh khóa Hydra.

| Command           | Giải thích                                                                                      |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| `publish-scripts` | Publish Hydra Plutus scripts lên chain → tạo TXID cho --hydra-scripts-tx-id. Tốn khoảng 50 ADA. |
| `gen-hydra-key`   | Tạo cặp khóa Hydra (sk/vk) off-chain.                                                           |

## 10. Information & Help

Nhóm lệnh trợ giúp hiển thị phiên bản, thông tin scripts hoặc hướng dẫn đầy đủ.

Parameter

| Tham Số         | Description                    |
| --------------- | ------------------------------ |
| `--version`     | Hiển thị phiên bản hydra-node. |
| `--script-info` | In thông tin script (JSON).    |
| `-h`, `--help`  | Hiển thị hướng dẫn đầy đủ.     |

# Khởi Chạy Hydra Node

## 1. Tạo Khóa Cardano cho Alice và Bob

> Mục tiêu: Mỗi người tham gia cần **2 cặp khóa Cardano**:
>
> - `node` → dùng để **ký giao dịch Hydra** (fuel)
> - `funds` → dùng để **gửi tiền vào Head** (UTxO ban đầu)

### 1.1. Tạo thư mục lưu khóa

```bash
mkdir -p credentials # Tất cả khóa sẽ được lưu trong thư mục credentials/.
```

### 1.2. Tạo khóa cho Alice

```bash
# Khóa cho node (ký giao dịch Hydra)
cardano-cli address key-gen \
  --verification-key-file credentials/alice-node.vk \
  --signing-key-file credentials/alice-node.sk

# Tạo địa chỉ từ khóa công khai
cardano-cli address build \
  --verification-key-file credentials/alice-node.vk \
  --out-file credentials/alice-node.addr \
  --testnet-magic 2

# Khóa cho quỹ (gửi tiền vào Head)
cardano-cli address key-gen \
  --verification-key-file credentials/alice-funds.vk \
  --signing-key-file credentials/alice-funds.sk

cardano-cli address build \
  --verification-key-file credentials/alice-funds.vk \
  --out-file credentials/alice-funds.addr \
  --testnet-magic 2
```

Kết quả:

```bash
credentials/
├── alice-node.sk      → khóa ký giao dịch Hydra
├── alice-node.vk      → khóa công khai (dùng để chia sẻ)
├── alice-node.addr    → địa chỉ nhận ADA (fuel)
├── alice-funds.sk     → khóa ký quỹ
├── alice-funds.vk     → khóa công khai quỹ
└── alice-funds.addr   → địa chỉ nhận ADA (sẽ đưa vào Head)
```

### 1.3. Tạo khóa cho Bob

```bash
# Khóa cho node (ký giao dịch Hydra)
cardano-cli address key-gen \
  --verification-key-file credentials/bob-node.vk \
  --signing-key-file credentials/bob-node.sk

# Tạo địa chỉ từ khóa công khai
cardano-cli address build \
  --verification-key-file credentials/bob-node.vk \
  --out-file credentials/bob-node.addr \
  --testnet-magic 2

# Khóa cho quỹ (gửi tiền vào Head)
cardano-cli address key-gen \
  --verification-key-file credentials/bob-funds.vk \
  --signing-key-file credentials/bob-funds.sk

cardano-cli address build \
  --verification-key-file credentials/bob-funds.vk \
  --out-file credentials/bob-funds.addr \
  --testnet-magic 2
```

Kết quả:

```bash
credentials/
├── bob-node.sk      → khóa ký giao dịch Hydra
├── bob-node.vk      → khóa công khai (dùng để chia sẻ)
├── bob-node.addr    → địa chỉ nhận ADA (fuel)
├── bob-funds.sk     → khóa ký quỹ
├── bob-funds.vk     → khóa công khai quỹ
└── bob-funds.addr   → địa chỉ nhận ADA (sẽ đưa vào Head)

```

## 2. Gửi tADA vào các địa chỉ

### 2.1. Mở https://testnet.cardano.org/en/testnet-tools/faucet/

### 2.1. Dán lần lượt các địa chỉ

```bash
cat credentials/alice-node.addr && echo &&
cat credentials/alice-funds.addr && echo &&
cat credentials/bob-node.addr && echo &&
cat credentials/bob-funds.addr && echo &&
```

### 2.1. Nhận ít nhất 100 tADA mỗi địa chỉ

> Lưu ý:
>
> - `node.addr` → cần ít nhất 50 tADA để làm fuel (phí giao dịch Hydra)
> - `funds.addr` → cần ít nhất 20 tADA để đưa vào Head

## 3. Tạo khóa Hydra (off-chain)

> Khóa này không liên quan đến Cardano, dùng để ký tin nhắn trong Head (giống như chữ ký số nội bộ).

```bash
# Alice
hydra-node gen-hydra-key --output-file credentials/alice-hydra

# Bob
hydra-node gen-hydra-key --output-file credentials/bob-hydra
```

Kết quả:

```bash
credentials/
├── alice-hydra.sk     → khóa ký Hydra của Alice
├── alice-hydra.vk     → khóa công khai (chia sẻ cho Bob)
├── bob-hydra.sk       → khóa ký Hydra của Bob
└── bob-hydra.vk       → khóa công khai (chia sẻ cho Alice)
```

> Quan trọng: Mỗi người phải gửi \*.vk Hydra của mình cho người kia.

## 4. Tạo file `protocol-parameters.json` (miễn phí giao dịch)

> Mục tiêu: Tạo file cấu hình không tính phí để test local/offline dễ dàng.

```bash
cardano-cli query protocol-parameters  --testnet-magic 2 \
  | jq '.txFeeFixed = 0 |.txFeePerByte = 0 | .executionUnitPrices.priceMemory = 0 | .executionUnitPrices.priceSteps = 0' \
  > protocol-parameters.json
```

Giải thích:

| Tham Số                               | Giải thích                                 |
| ------------------------------------- | ------------------------------------------ |
| cardano-cli query protocol-parameters | Lấy cấu hình giao thức hiện tại từ testnet |
| --testnet-magic 2                     | Chọn mạng Preview                          |
| jq '...'                              | Sửa đổi JSON: đặt tất cả phí = 0           |
| > protocol-parameters.json            | Lưu file protocol-parameters.json          |

Kết quả: File protocol-parameters.json với giao dịch miễn phí → dùng khi:

- Chạy offline mode
- Test nhiều giao dịch mà không tốn phí

> Cảnh báo: Chỉ dùng cho test. Không dùng trên mainnet!

## 5. Khởi chạy Hydra Node

> **Mục tiêu**:
>
> - Chạy **2 hydra-node** trên cùng một máy (localhost)
> - Kết nối P2P qua cổng `5001` ↔ `5002`
> - Dùng **Hydra scripts đã publish sẵn** trên Preview
> - Giao dịch **miễn phí** nhờ `protocol-parameters.json`
> - Sẵn sàng **mở Head** và gửi giao dịch Layer 2

### 5.1 Yêu cầu trước khi chạy

1. Đã hoàn thành **Bước 2–4** (khóa, protocol-parameters)
2. `cardano-node` đang chạy và có socket:

   ```bash
   export CARDANO_NODE_SOCKET_PATH=/path/to/node.socket
   ```

3. Kết nối Internet (để tải hydra-scripts-tx-id)

4. Cài jq và curl:

```bash
sudo apt install jq curl
```

### 5.2. Khởi chạy Node Alice

Tạo tmux để chạy Node

```bash
tmux new -t alice-hydra-node
```

Sau đó

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

Kết quả

```bash
{"timestamp":"2025-11-06T04:11:14.378858461Z","threadId":62,"namespace":"HydraNode-\"alice-node2\"","message":{"directChain":{"contents":{"point":{"blockHash":"5d2a89ce5fb0dfa022262e535d6e5f5daf3b83b7cef48b1049d707a2bc81011a","slot":95746274,"tag":"ChainPoint"},"tag":"BeginUpdate"},"tag":"Wallet"},"tag":"DirectChain"}}
{"timestamp":"2025-11-06T04:11:14.378878411Z","threadId":62,"namespace":"HydraNode-\"alice-node2\"","message":{"directChain":{"contents":{"newUTxO":{},"tag":"EndUpdate"},"tag":"Wallet"},"tag":"DirectChain"}}
{"timestamp":"2025-11-06T04:11:14.378880264Z","threadId":62,"namespace":"HydraNode-\"alice-node2\"","message":{"directChain":{"point":{"blockHash":"5d2a89ce5fb0dfa022262e535d6e5f5daf3b83b7cef48b1049d707a2bc81011a","slot":95746274,"tag":"ChainPoint"},"receivedTxIds":["3f2e153df2f70bfb08602c0ce8556b8d6d58738b3ea502394a961f0a160d5e38"],"tag":"RolledForward"},"tag":"DirectChain"}}
{"timestamp":"2025-11-06T04:11:14.453863795Z","threadId":82,"namespace":"HydraNode-\"alice-node2\"","message":{"node":{"by":{"vkey":"37f06d9d5b6c4bebc5680c17e3f425419416ced292906373c89374cdd46c7d43"},"input":{"chainEvent":{"chainSlot":95746274,"chainTime":"2025-11-06T04:11:14Z","tag":"Tick"},"tag":"ChainInput"},"inputId":15,"tag":"BeginInput"},"tag":"Node"}}
{"timestamp":"2025-11-06T04:11:14.453882302Z","threadId":82,"namespace":"HydraNode-\"alice-node2\"","message":{"node":{"by":{"vkey":"37f06d9d5b6c4bebc5680c17e3f425419416ced292906373c89374cdd46c7d43"},"outcome":{"effects":[],"stateChanges":[{"chainSlot":95746274,"tag":"TickObserved"}],"tag":"Continue"},"tag":"LogicOutcome"},"tag":"Node"}}
{"timestamp":"2025-11-06T04:11:14.454060711Z","threadId":82,"namespace":"HydraNode-\"alice-node2\"","message":{"node":{"by":{"vkey":"37f06d9d5b6c4bebc5680c17e3f425419416ced292906373c89374cdd46c7d43"},"inputId":15,"tag":"EndInput"},"tag":"Node"}}
{"timestamp":"2025-11-06T04:12:05.736551107Z","threadId":582,"namespace":"HydraNode-\"alice-node2\"","message":{"api":{"reason":"ConnectionClosed","tag":"APIConnectionError"},"tag":"APIServer"}}
{"timestamp":"2025-11-06T04:12:12.564391526Z","threadId":62,"namespace":"HydraNode-\"alice-node2\"","message":{"directChain":{"contents":{"point":{"blockHash":"9c2fff431f2db421df24f2966b832ae2359cb4a6895510e402967f318e998edf","slot":95746332,"tag":"ChainPoint"},"tag":"BeginUpdate"},"tag":"Wallet"},"tag":"DirectChain"}}
{"timestamp":"2025-11-06T04:12:12.565149037Z","threadId":62,"namespace":"HydraNode-\"alice-node2\"","message":{"directChain":{"contents":{"newUTxO":{},"tag":"EndUpdate"},"tag":"Wallet"},"tag":"DirectChain"}}
{"timestamp":"2025-11-06T04:12:12.565162457Z","threadId":62,"namespace":"HydraNode-\"alice-node2\"","message":{"directChain":{"point":{"blockHash":"9c2fff431f2db421df24f2966b832ae2359cb4a6895510e402967f318e998edf","slot":95746332,"tag":"ChainPoint"},"receivedTxIds":["af1fd7f9a51064d26883f79d522038d3dac310c94142e454192fbb435a125c29"],"tag":"RolledForward"},"tag":"DirectChain"}}
{"timestamp":"2025-11-06T04:12:12.676835661Z","threadId":82,"namespace":"HydraNode-\"alice-node2\"","message":{"node":{"by":{"vkey":"37f06d9d5b6c4bebc5680c17e3f425419416ced292906373c89374cdd46c7d43"},"input":{"chainEvent":{"chainSlot":95746332,"chainTime":"2025-11-06T04:12:12Z","tag":"Tick"},"tag":"ChainInput"},"inputId":16,"tag":"BeginInput"},"tag":"Node"}}
{"timestamp":"2025-11-06T04:12:12.67684846Z","threadId":82,"namespace":"HydraNode-\"alice-node2\"","message":{"node":{"by":{"vkey":"37f06d9d5b6c4bebc5680c17e3f425419416ced292906373c89374cdd46c7d43"},"outcome":{"effects":[],"stateChanges":[{"chainSlot":95746332,"tag":"TickObserved"}],"tag":"Continue"},"tag":"LogicOutcome"},"tag":"Node"}}
{"timestamp":"2025-11-06T04:12:12.677019447Z","threadId":82,"namespace":"HydraNode-\"alice-node2\"","message":{"node":{"by":{"vkey":"37f06d9d5b6c4bebc5680c17e3f425419416ced292906373c89374cdd46c7d43"},"inputId":16,"tag":"EndInput"},"tag":"Node"}}
{"timestamp":"2025-11-06T04:12:22.057429347Z","threadId":73,"namespace":"HydraNode-\"alice-node2\"","message":{"network":{"contents":{"etcd":{"caller":"etcdserver/raft.go:427","exceeded-duration":"1.337832ms","expected-duration":"200ms","heartbeat-interval":"100ms","level":"warn","msg":"leader failed to send out heartbeat on time; took too long, leader is overloaded likely from slow disk","to":"33be72d937d7d2df","ts":"2025-11-06T05:12:22.049210+0100"},"tag":"EtcdLog"},"tag":"Etcd"},"tag":"Network"}}
```

### 5.3. Khởi chạy Node Bob

```bash
tmux new -t bob-hydra-node
```

Sau đó

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

Kết quả

```bash
{"timestamp":"2025-11-06T04:11:14.380739503Z","threadId":62,"namespace":"HydraNode-\"bob-node2\"","message":{"directChain":{"contents":{"point":{"blockHash":"5d2a89ce5fb0dfa022262e535d6e5f5daf3b83b7cef48b1049d707a2bc81011a","slot":95746274,"tag":"ChainPoint"},"tag":"BeginUpdate"},"tag":"Wallet"},"tag":"DirectChain"}}
{"timestamp":"2025-11-06T04:11:14.380744671Z","threadId":62,"namespace":"HydraNode-\"bob-node2\"","message":{"directChain":{"contents":{"newUTxO":{},"tag":"EndUpdate"},"tag":"Wallet"},"tag":"DirectChain"}}
{"timestamp":"2025-11-06T04:11:14.380746213Z","threadId":62,"namespace":"HydraNode-\"bob-node2\"","message":{"directChain":{"point":{"blockHash":"5d2a89ce5fb0dfa022262e535d6e5f5daf3b83b7cef48b1049d707a2bc81011a","slot":95746274,"tag":"ChainPoint"},"receivedTxIds":["3f2e153df2f70bfb08602c0ce8556b8d6d58738b3ea502394a961f0a160d5e38"],"tag":"RolledForward"},"tag":"DirectChain"}}
{"timestamp":"2025-11-06T04:11:14.446301172Z","threadId":93,"namespace":"HydraNode-\"bob-node2\"","message":{"node":{"by":{"vkey":"75944646ac58771a88496a2a951c24481ac9554cc5c7af12fb7b596345b9ab27"},"input":{"chainEvent":{"chainSlot":95746274,"chainTime":"2025-11-06T04:11:14Z","tag":"Tick"},"tag":"ChainInput"},"inputId":15,"tag":"BeginInput"},"tag":"Node"}}
{"timestamp":"2025-11-06T04:11:14.446314242Z","threadId":93,"namespace":"HydraNode-\"bob-node2\"","message":{"node":{"by":{"vkey":"75944646ac58771a88496a2a951c24481ac9554cc5c7af12fb7b596345b9ab27"},"outcome":{"effects":[],"stateChanges":[{"chainSlot":95746274,"tag":"TickObserved"}],"tag":"Continue"},"tag":"LogicOutcome"},"tag":"Node"}}
{"timestamp":"2025-11-06T04:11:14.446475114Z","threadId":93,"namespace":"HydraNode-\"bob-node2\"","message":{"node":{"by":{"vkey":"75944646ac58771a88496a2a951c24481ac9554cc5c7af12fb7b596345b9ab27"},"inputId":15,"tag":"EndInput"},"tag":"Node"}}
{"timestamp":"2025-11-06T04:12:12.564849355Z","threadId":62,"namespace":"HydraNode-\"bob-node2\"","message":{"directChain":{"contents":{"point":{"blockHash":"9c2fff431f2db421df24f2966b832ae2359cb4a6895510e402967f318e998edf","slot":95746332,"tag":"ChainPoint"},"tag":"BeginUpdate"},"tag":"Wallet"},"tag":"DirectChain"}}
{"timestamp":"2025-11-06T04:12:12.564866791Z","threadId":62,"namespace":"HydraNode-\"bob-node2\"","message":{"directChain":{"contents":{"newUTxO":{},"tag":"EndUpdate"},"tag":"Wallet"},"tag":"DirectChain"}}
{"timestamp":"2025-11-06T04:12:12.564868404Z","threadId":62,"namespace":"HydraNode-\"bob-node2\"","message":{"directChain":{"point":{"blockHash":"9c2fff431f2db421df24f2966b832ae2359cb4a6895510e402967f318e998edf","slot":95746332,"tag":"ChainPoint"},"receivedTxIds":["af1fd7f9a51064d26883f79d522038d3dac310c94142e454192fbb435a125c29"],"tag":"RolledForward"},"tag":"DirectChain"}}
{"timestamp":"2025-11-06T04:12:12.682620978Z","threadId":93,"namespace":"HydraNode-\"bob-node2\"","message":{"node":{"by":{"vkey":"75944646ac58771a88496a2a951c24481ac9554cc5c7af12fb7b596345b9ab27"},"input":{"chainEvent":{"chainSlot":95746332,"chainTime":"2025-11-06T04:12:12Z","tag":"Tick"},"tag":"ChainInput"},"inputId":16,"tag":"BeginInput"},"tag":"Node"}}
{"timestamp":"2025-11-06T04:12:12.682633267Z","threadId":93,"namespace":"HydraNode-\"bob-node2\"","message":{"node":{"by":{"vkey":"75944646ac58771a88496a2a951c24481ac9554cc5c7af12fb7b596345b9ab27"},"outcome":{"effects":[],"stateChanges":[{"chainSlot":95746332,"tag":"TickObserved"}],"tag":"Continue"},"tag":"LogicOutcome"},"tag":"Node"}}
{"timestamp":"2025-11-06T04:12:12.682777033Z","threadId":93,"namespace":"HydraNode-\"bob-node2\"","message":{"node":{"by":{"vkey":"75944646ac58771a88496a2a951c24481ac9554cc5c7af12fb7b596345b9ab27"},"inputId":16,"tag":"EndInput"},"tag":"Node"}}
```

### 5.4. Kiếm tra kết nối

Sau khi thực thi

```bash
 websocat ws://127.0.0.1:4001 | jq
```

Kết quả

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

Khi `"networkConnected": true` và `"peersInfo": { "127.0.0.1:5002": true }` chứng tỏ thành công

<div align="center">

## 📚 **Tài liệu tham khảo**

**Tóm tắt các bài học quan trọng và chuẩn bị nền tảng vững chắc để bước vào giai đoạn phát triển Hydra DApp một cách an toàn, ổn định và hiệu quả.**

<p>

<a href="https://lms.cardano2vn.io/courses/hydra-on-cardano-complete-step-by-step-dapp-guide/lesson/introduction-to-hydra-exploring-the-future-of-cardanos-layer-2-scaling-and-practical-use-cases"><img src="https://img.shields.io/badge/LMS-Course-blue?style=for-the-badge&logo=googleclassroom"/></a>
<a href="YOUR_SLIDES_LINK"><img src="https://img.shields.io/badge/Slides-Presentation-orange?style=for-the-badge&logo=googleslides"/></a>
<a href="YOUR_GITHUB_LINK"><img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github"/></a>
<a href="YOUR_ARTICLE_LINK"><img src="https://img.shields.io/badge/Article-Read-green?style=for-the-badge&logo=readthedocs"/></a>
<a href="YOUR_YOUTUBE_LINK"><img src="https://img.shields.io/badge/YouTube-Watch-red?style=for-the-badge&logo=youtube"/></a>

</p>

</div>
