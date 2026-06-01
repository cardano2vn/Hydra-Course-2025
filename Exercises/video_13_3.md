# 📝 Bài tập - Chapter 04: Video 13

---

## ✅ Bài 1: Vai trò của Hydra trong luồng Tip

### 📌 Đề bài

Phân tích vai trò của Hydra Head trong quá trình người dùng thực hiện Tip. Hydra đã cải thiện những điểm nào so với việc gửi transaction trực tiếp lên Cardano Layer-1?

### 💡 Gợi ý

Off-chain transaction
Realtime
Low cost
Settlement

<details>
<summary>Đáp án</summary>

Hydra Head cho phép các giao dịch được thực hiện ngoài chuỗi chính (off-chain) giữa các participant đã tham gia Head.

Khi người dùng thực hiện Tip:

Transaction được xử lý trong Hydra Head thay vì gửi trực tiếp lên Layer-1.
Kết quả được xác nhận gần như tức thì.
Không phát sinh phí cho mỗi lần Tip.
Trạng thái mới được đồng bộ giữa các participant trong Head.

Layer-1 chỉ được sử dụng khi:

Commit tài sản vào Head.
Decommit tài sản ra khỏi Head.
Fanout để ghi trạng thái cuối cùng lên blockchain.

👉 Kết luận: Hydra giúp TipJar đạt được trải nghiệm realtime và chi phí thấp, phù hợp với các giao dịch micropayment.

</details>

---

## ✅ Bài 2: Cấu trúc dữ liệu TipJar State

### 📌 Đề bài

Mô tả thông tin cần được lưu trong trạng thái (state) của TipJar. Tại sao việc thiết kế state hợp lý lại quan trọng?

### 💡 Gợi ý

Address
Amount
Aggregation
Datum structure

<details>
<summary>Đáp án</summary>

State của TipJar thường lưu:

Địa chỉ người nhận tip.
Tổng số ADA đã được tip.
Danh sách người gửi tip (nếu cần).
Thông tin phục vụ việc claim sau này.

Ví dụ:

[
{
"address": "addr_test1...",
"amount": 5000000
}
]

Thiết kế state hợp lý giúp:

Dễ dàng cập nhật khi có tip mới.
Giảm kích thước datum.
Tiết kiệm tài nguyên xử lý.
Đơn giản hóa logic validator.

👉 Kết luận: Một state được thiết kế tốt giúp hệ thống dễ mở rộng và hoạt động hiệu quả hơn.

</details>

---

## ✅ Bài 3: Xử lý lỗi trong Off-chain Layer

### 📌 Đề bài

Những lỗi nào có thể xảy ra trong quá trình xây dựng transaction ở tầng Off-chain? Đề xuất cách xử lý cho từng trường hợp.

### 💡 Gợi ý

Missing UTxO
Wallet disconnected
Invalid datum
Error handling

<details>
<summary>Đáp án</summary>

Một số lỗi phổ biến:

Wallet chưa kết nối
Không lấy được địa chỉ ví.
Không truy xuất được UTxO.

Giải pháp:

Kiểm tra wallet trước khi thực hiện giao dịch.
Không tìm thấy Script UTxO
Smart Contract chưa có state.
UTxO đã bị consume.

Giải pháp:

Refetch dữ liệu mới nhất.
Datum không hợp lệ
Decode thất bại.
Dữ liệu không đúng cấu trúc.

Giải pháp:

Validate dữ liệu trước khi encode.
Thiếu UTxO hoặc ADA
User không đủ tiền.

Giải pháp:

Kiểm tra balance trước khi build transaction.

👉 Kết luận: Error handling tốt giúp DApp ổn định và cải thiện trải nghiệm người dùng.

</details>

---

## ✅ Bài 4: Tại sao cần tách Frontend và Off-chain?

### 📌 Đề bài

Giải thích lý do kiến trúc TipJar tách riêng Frontend và Off-chain Backend thay vì xử lý toàn bộ logic trực tiếp trên giao diện.

### 💡 Gợi ý

Separation of concerns
Security
Maintainability
Reusability

<details>
<summary>Đáp án</summary>

Việc tách Frontend và Backend mang lại nhiều lợi ích:

Frontend
Chỉ tập trung hiển thị dữ liệu.
Nhận input từ người dùng.
Quản lý trải nghiệm người dùng.
Off-chain Backend
Xây dựng transaction.
Quản lý trạng thái.
Tương tác với Hydra và Smart Contract.
Kết nối Database.

Lợi ích:

Dễ bảo trì.
Dễ mở rộng hệ thống.
Tăng tính bảo mật.
Có thể tái sử dụng API cho nhiều giao diện khác nhau.

👉 Kết luận: Kiến trúc phân lớp giúp dự án chuyên nghiệp và dễ phát triển lâu dài.

</details>

---

## ✅ Bài 5: Luồng dữ liệu từ User đến Smart Contract

### 📌 Đề bài

Mô tả luồng dữ liệu hoàn chỉnh từ khi người dùng nhấn nút Tip trên giao diện cho đến khi trạng thái mới được lưu vào Smart Contract.

### 💡 Gợi ý

Frontend
Backend
Transaction Builder
Validator
New state

<details>
<summary>Đáp án</summary>
Luồng xử lý gồm các bước:

User nhập số tiền tip trên giao diện.
Frontend gửi request đến Backend.
Backend lấy trạng thái hiện tại của TipJar.
Decode datum hiện tại.
Tính toán trạng thái mới.
Build transaction bằng MeshTxBuilder.
Tạo redeemer Tip.
User ký transaction bằng wallet.
Transaction được gửi đến Hydra hoặc Layer-1.
Validator kiểm tra tính hợp lệ.
UTxO cũ bị consume.
UTxO mới với datum mới được tạo ra.
User
↓
Frontend
↓
Backend
↓
MeshTxBuilder
↓
Wallet Sign
↓
Hydra / Cardano
↓
Validator
↓
New Script UTxO

👉 Kết luận: Toàn bộ hệ thống hoạt động theo mô hình state transition, trong đó Off-chain chịu trách nhiệm chuẩn bị dữ liệu còn On-chain chịu trách nhiệm xác thực.

</details>

---