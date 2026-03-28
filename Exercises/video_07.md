# 🛠️ Bài tập

---

## ✅ Bài 1: Sự cố kết nối "Mất liên lạc" L1

### 📌 Tình huống

Alice khởi chạy Hydra Node nhưng ngay lập tức nhận được thông báo lỗi trong Log:
`ConnectException: "node.socket": directional link failure`.
Alice kiểm tra bằng lệnh `ls` và thấy file `node.socket` vẫn tồn tại trong thư mục `/home/ubuntu/cardano-node/db/`.

### 🚀 Yêu cầu

1. Tại sao file socket tồn tại nhưng Hydra Node vẫn báo lỗi?
2. Viết 2 lệnh cần thiết để Alice sửa lỗi này một cách triệt để (không bị mất khi khởi động lại terminal).

<details>
<summary>Đáp án</summary>

1.  **Nguyên nhân:** Do biến môi trường `CARDANO_NODE_SOCKET_PATH` chưa được export hoặc đang trỏ sai đường dẫn trong phiên làm việc (session) hiện tại của terminal.
2.  **Lệnh xử lý:**
`bash
    echo 'export CARDANO_NODE_SOCKET_PATH=/home/ubuntu/cardano-node/db/node.socket' >> ~/.bashrc
    source ~/.bashrc
    `
</details>

---

## ✅ Bài 2: Lỗi "Treo" trạng thái Init (Thiếu Fuel)

### 📌 Tình huống

Bob thực hiện lệnh `{ "tag": "Init" }` qua WebSocket. Cổng API trả về lỗi `PostChainTxError` và Head không thể chuyển sang trạng thái `Initializing`. Khi kiểm tra ví vận hành (`bob-node.addr`), Bob thấy số dư chỉ còn **2 ADA**.

### 🚀 Yêu cầu

1. Giải thích vai trò của 2 ADA này đối với Hydra Node. Tại sao con số này lại dẫn đến lỗi `PostChainTxError`?
2. Bob cần nạp thêm tối thiểu bao nhiêu ADA vào ví `node.addr` để đảm bảo vận hành các lệnh điều khiển (Init, Commit, Close, Fanout) một cách an toàn?

<details>
<summary>Đáp án</summary>

1.  **Giải thích:** Các lệnh điều khiển Hydra trên Layer 1 thực chất là các giao dịch Smart Contract. 2 ADA là quá ít, không đủ để trả phí mạng lưới (Transaction Fee) và tiền ký quỹ (Min-UTxO) cho các script L1.
2.  **Khuyến nghị:** Cần nạp tối thiểu **100 ADA** (theo chuẩn vận hành an toàn) để đảm bảo "nhiên liệu" (Fuel) cho toàn bộ vòng đời của Head.
</details>

---

## ✅ Bài 3: Lỗi Commit chéo cổng (Cross-Port Commit)

### 📌 Tình huống

Trong mô hình 2 người, Alice chạy API tại Port `4001` và Bob chạy tại Port `4002`. Alice vô tình sử dụng script tự động và gửi lệnh Commit UTxO của mình vào địa chỉ `http://127.0.0.1:4002/commit`.

### 🚀 Yêu cầu

1. Hydra Node tại Port 4002 (của Bob) sẽ phản hồi như thế nào trong trường hợp này?
2. Nêu quy tắc đúng khi thực hiện lệnh Commit trong mạng lưới nhiều thành viên.

<details>
<summary>Đáp án</summary>

1.  **Phản hồi:** Node sẽ từ chối (Reject) hoặc sinh ra một file giao dịch trống/lỗi, vì Node của Bob chỉ có quyền ký và xử lý các Commit liên quan đến khóa xác thực (Verification Key) của chính Bob.
2.  **Quy tắc:** Mỗi Participant chỉ được gửi lệnh Commit vào **Node API của chính mình**. Alice dùng Port 4001, Bob dùng Port 4002.
</details>

---

## ✅ Bài 4: Khắc phục lỗi "Fanout bị từ chối"

### 📌 Tình huống

Alice đã gửi lệnh `Close` thành công. Ngay lập tức, vì muốn lấy lại tiền nhanh trên Layer 1, Alice gửi tiếp lệnh `{ "tag": "Fanout" }`. Tuy nhiên, Hydra Node trả về lỗi và trạng thái vẫn giữ nguyên là `Closed`.

### 🚀 Yêu cầu

1. Tại sao Alice không thể Fanout ngay lập tức?
2. Alice cần quan sát tín hiệu nào trong hệ thống Log để biết chính xác thời điểm có thể gửi lệnh `Fanout`?

<details>
<summary>Đáp án</summary>

1.  **Nguyên nhân:** Do đang trong giai đoạn tranh chấp (**Contestation Period**). Hệ thống khóa tài sản trong một khoảng thời gian (ví dụ 600 slot) để đợi các bên kiểm tra Snapshot.
2.  **Tín hiệu:** Alice cần theo dõi Log WebSocket cho đến khi xuất hiện thông báo: `"tag": "ReadyToFanout"`.
</details>

---

## ✅ Bài 5: Chẩn đoán lỗi đồng bộ (Sync Issue)

### 📌 Tình huống

Hydra Node của Bob khởi chạy nhưng liên tục in ra các dòng Log cảnh báo về việc không tìm thấy `ChainPoint` và các giao dịch Off-chain bị từ chối vì UTxO không hợp lệ.

### 🚀 Yêu cầu

1. Hãy viết lệnh CLI để kiểm tra xem Cardano Node (L1) của Bob có đang gặp vấn đề không.
2. Nếu kết quả trả về `syncProgress: "85.00"`, Bob phải làm gì trước khi tiếp tục vận hành Hydra?

<details>
<summary>Đáp án</summary>

1.  **Lệnh kiểm tra:** `cardano-cli query tip --testnet-magic 2`
2.  **Hành động:** Dừng Hydra Node, giữ cho Cardano Node tiếp tục chạy và đợi cho đến khi `syncProgress` đạt chính xác `100.00`. Hydra không thể hoạt động trên một bản sao sổ cái cũ.
</details>

---
