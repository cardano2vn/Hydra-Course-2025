# 📝 Bài tập

---

## ✅ Bài 1: Kiểm tra điều kiện tiên quyết (Pre-flight Check)

### 📌 Đề bài

Trước khi khởi chạy Hydra Node, bạn thực hiện lệnh `cardano-cli query tip --testnet-magic 2` và nhận được kết quả `syncProgress: "98.50"`.

1. Bạn có nên khởi chạy `hydra-node` ngay lúc này không? Tại sao?
2. Nêu hậu quả nếu cố tình chạy Hydra khi chỉ số này chưa đạt 100%.

<details>
<summary>Đáp án</summary>

1.  **Câu trả lời: KHÔNG.** Bạn bắt buộc phải đợi đến khi `syncProgress` đạt `100.00`.
2.  **Hậu quả:** Hydra Node hoạt động dựa trên trạng thái sổ cái (ledger) thực tế từ Layer-1. Nếu Node chưa đồng bộ xong, Hydra sẽ không thể nhìn thấy các UTxO mới nhất, dẫn đến lỗi khi thực hiện giao dịch **Commit** (nạp tiền vào Head) hoặc không thể xác minh các script Hydra đã được publish trên chuỗi.
</details>

---

## ✅ Bài 2: Khắc phục lỗi kết nối Socket (IPC)

### 📌 Đề bài

Khi chạy lệnh `hydra-node`, bạn gặp thông báo lỗi liên quan đến `node.socket` (ví dụ: `Connection refused` hoặc `File not found`).

1. Viết lệnh để tìm vị trí chính xác của file `node.socket` trong hệ thống Ubuntu.
2. Viết lệnh để thiết lập biến môi trường này hoạt động **vĩnh viễn** ngay cả sau khi khởi động lại máy.

<details>
<summary>Đáp án</summary>

1.  **Lệnh tìm kiếm:** `find / -name "node.socket" 2>/dev/null | head -n 5`
2.  **Thiết lập vĩnh viễn:**
`bash
    echo 'export CARDANO_NODE_SOCKET_PATH=/đường/dẫn/đã/tìm/thấy/node.socket' >> ~/.bashrc
    source ~/.bashrc
    `
</details>

---

## ✅ Bài 3: Phân loại và Quản lý Khóa (Keys)

### 📌 Đề bài

Trong một Hydra Head cơ bản (ví dụ giữa Alice và Bob), mỗi thành viên cần sở hữu những loại khóa nào? Hãy liệt kê và nêu mục đích của từng loại.

<details>
<summary>Đáp án</summary>

Mỗi người tham gia cần ít nhất **3 cặp khóa (6 file)**:

- **Cardano Node Keys (`.sk`, `.vk`):** Dùng để ký các giao dịch vận hành (fuel) trên Layer-1 (trả phí gas L1).
- **Cardano Funds Keys (`.sk`, `.vk`):** Dùng để quản lý nguồn tiền (UTxO) thực tế sẽ nạp vào trong Hydra Head.
- **Hydra Keys (Off-chain):** Khóa đặc thù của giao thức Hydra, dùng để ký các tin nhắn xác thực trạng thái giữa các thành viên bên trong Head.
</details>

---

## ✅ Bài 4: Cấu hình tham số P2P (Networking)

### 📌 Đề bài

Giả sử bạn đang cấu hình cho Node của **Bob** (Port lắng nghe: `5002`). Bạn cần kết nối đến **Alice** (Port lắng nghe: `5001`). Cả hai đều chạy trên cùng một Server (`127.0.0.1`).

Hãy xác định giá trị của 2 tham số sau trong lệnh chạy của Bob:

1. `--listen`
2. `--peer`

<details>
<summary>Đáp án</summary>

1.  **`--listen 127.0.0.1:5002`**: Đây là địa chỉ mà Node của Bob mở ra để chờ kết nối vào.
2.  **`--peer 127.0.0.1:5001`**: Đây là địa chỉ của Alice mà Bob chủ động tìm đến để thiết lập mạng P2P.
</details>

---

## ✅ Bài 5: Giám sát trạng thái qua WebSocket

### 📌 Đề bài

Sau khi thực thi lệnh chạy Hydra Node, làm thế nào để bạn biết Node của mình đã kết nối thành công với các thành viên khác?

1. Viết lệnh sử dụng `websocat` để truy vấn thông tin Node.
2. Bạn cần tìm trường dữ liệu nào trong kết quả JSON để xác nhận kết nối?

<details>
<summary>Đáp án</summary>

1.  **Lệnh thực hiện:** `websocat ws://127.0.0.1:4001 | jq` (Port 4001 là cổng API mặc định).
2.  **Trường xác nhận:** _ `"tag": "Greetings"`: Thông báo chào mừng từ Node.
_ `"networkConnected": true`: Xác nhận kết nối mạng Hydra. \* `"peersInfo"`: Phải liệt kê đúng địa chỉ IP/Port của đối tác với trạng thái hoạt động.
</details>

---
