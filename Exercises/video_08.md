# 📝 Bài tập

## ✅ Bài 1: Phân tích sự cố trong giai đoạn "Commit"

### 📌 Tình huống

Alice và Bob đang khởi tạo một Hydra Head. Alice đã thực hiện lệnh `commit` tài sản thành công từ ví L1 của mình. Tuy nhiên, Node của Bob gặp sự cố mất kết nối mạng đột ngột ngay trước khi anh ấy thực hiện lệnh `commit`. Head hiện đang bị treo ở trạng thái `Initializing`.

### 🚀 Yêu cầu

1. Theo cơ chế "Atomicity" (tính nguyên tử) của Hydra, Head có thể chuyển sang trạng thái `Open` để giao dịch không? Tại sao?
2. Trong trường hợp Bob không thể quay lại trực tuyến trong thời gian dài, Alice cần thực hiện lệnh nào để hủy bỏ phiên làm việc và lấy lại số tài sản đã cam kết (commit)?

<details>
<summary>💡 Gợi ý & Đáp án</summary>

- **Gợi ý:** Hãy nhớ rằng mọi participant phải commit thành công thì Head mới có thể mở.
- **Giải thích:** 1. **Không.** Hydra Head yêu cầu tất cả các bên tham gia phải hoàn tất việc commit tài sản. Nếu thiếu dù chỉ một bên, Head sẽ không thể mở để đảm bảo tính nhất quán của sổ cái off-chain. 2. Alice cần gửi lệnh `{ "tag": "Abort" }`. Lệnh này sẽ đóng phiên khởi tạo và hoàn trả các UTxO đã commit về lại địa chỉ Layer 1 của các bên.
</details>

---

## ✅ Bài 2: Cấu hình API và Bảo mật trên VPS

### 📌 Tình huống

Bạn đã triển khai Hydra Node thành công trên một VPS Ubuntu. Bạn muốn xây dựng một ứng dụng Web (Frontend) chạy ở máy tính cá nhân (Local) để kết nối và tương tác với Hydra Node trên VPS đó.

### 🚀 Yêu cầu

1. Khi khởi chạy Hydra Node, tham số `--api-host` mặc định thường là `127.0.0.1`. Bạn cần đổi tham số này thành gì để ứng dụng bên ngoài có thể truy cập được?
2. Để đảm bảo ứng dụng Frontend kết nối được tới cổng API (ví dụ: 4001) của Hydra Node, bạn cần thực hiện lệnh gì trên tường lửa `ufw` của VPS?

<details>
<summary>💡 Gợi ý & Đáp án</summary>

- **Gợi ý:** `127.0.0.1` chỉ cho phép kết nối nội bộ bên trong VPS.
- **Lệnh xử lý:** 1. Thay đổi thành `--api-host 0.0.0.0` (để lắng nghe trên tất cả các giao diện mạng). 2. Thực hiện lệnh: `sudo ufw allow 4001/tcp` để mở cổng kết nối cho API.
</details>

---

## ✅ Bài 3: So sánh Use Case thực tế (Hydra vs Lightning)

### 📌 Tình huống

Một doanh nghiệp muốn xây dựng một ứng dụng đấu giá NFT tốc độ cao trên Cardano, yêu cầu xử lý các logic đấu giá phức tạp ngay trong môi trường Layer 2 để giảm phí sàn.

### 🚀 Yêu cầu

1. Dựa trên bảng so sánh, tại sao Hydra lại là lựa chọn tối ưu hơn Lightning Network cho trường hợp này? (Nêu 2 lý do về kỹ thuật).
2. "Mini-ledger" của Hydra có ưu điểm gì so với việc chỉ quản lý số dư (balance-based) của Lightning khi xử lý NFT?

<details>
<summary>💡 Gợi ý & Đáp án</summary>

- **Gợi ý:** Hãy xem xét khả năng chạy Smart Contract và cấu trúc dữ liệu eUTXO.
- **Giải thích:** 1. Hydra hỗ trợ **Full Smart Contract (Plutus)** giúp chạy logic đấu giá phức tạp, và hỗ trợ **Multi-party** cho phép nhiều người tham gia vào cùng một phiên đấu giá trong 1 Head. 2. Mini-ledger của Hydra hỗ trợ **eUTXO và Multi-asset**, cho phép di chuyển các NFT (Native Assets) với đầy đủ dữ liệu đi kèm (Datum), điều mà Lightning Network (chỉ quản lý số dư BTC) không làm được.
</details>

---

## ✅ Bài 4: Kiểm soát Finality trong giai đoạn "Close" và "Fanout"

### 📌 Tình huống

Sau một ngày giao dịch off-chain sôi nổi, các bên quyết định đóng Hydra Head. Alice gửi lệnh `Close`. Hệ thống thông báo trạng thái là `Closed`.

### 🚀 Yêu cầu

1. Tại sao sau khi lệnh `Close` thành công, các bên vẫn chưa thấy tiền hiển thị ngay lập tức trong ví Layer 1 của mình?
2. Ý nghĩa của trạng thái `Fanout` đối với tính "Finality" (tính xác thực cuối cùng) của toàn bộ giao dịch off-chain là gì?

<details>
<summary>💡 Gợi ý & Đáp án</summary>

- **Gợi ý:** Hãy xem lại phần "Contestation Period" (Giai đoạn tranh chấp).
- **Giải thích:** 1. Vì hệ thống cần trải qua giai đoạn tranh chấp để các bên kiểm tra Snapshot cuối cùng. Chỉ sau khi giai đoạn này kết thúc, lệnh `Fanout` mới có thể thực hiện. 2. `Fanout` là bước settlement cuối cùng. Nó giải phóng tài sản từ script của Hydra Head về lại địa chỉ ví L1 của từng người, chính thức xác nhận các giao dịch off-chain lên blockchain chính.
</details>

---

## ✅ Bài 5: Tư duy vận hành hệ thống

### 📌 Tình huống

Một Node tham gia vào Head đang ở trạng thái `Open` bỗng nhiên bị treo (freeze) và không phản hồi các yêu cầu ký giao dịch mới từ các participant khác.

### 🚀 Yêu cầu

1. Theo tài liệu, nguyên nhân phổ biến nào dẫn đến việc Node bị treo trong trạng thái `Open`?
2. Nếu các bên không thể tiếp tục giao dịch do Node này offline, quy trình "Fallback" (dự phòng) an toàn nhất để bảo vệ tài sản là gì?

<details>
<summary>💡 Gợi ý & Đáp án</summary>

- **Gợi ý:** Hãy xem lại mục lưu ý trong trạng thái Open.
- **Giải thích:** 1. Nguyên nhân thường do mất kết nối mạng (network latency), mất đồng bộ trạng thái (state mismatch) hoặc Node bị quá tải tài nguyên (RAM/CPU). 2. Quy trình Fallback: Một trong các bên còn lại cần gửi lệnh `Close` lên Layer 1 dựa trên Snapshot hợp lệ gần nhất đã được ký để chốt sổ và bắt đầu quy trình rút tiền về Layer 1.
</details>

---
