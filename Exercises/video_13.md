# 📝 Bài tập - Chapter 04: Video 13

---

## ✅ Bài 1: Vai trò của Off-chain Layer

### 📌 Đề bài

Giải thích vai trò quan trọng của tầng **Off-chain** (Backend) khi tích hợp với Smart Contract trong hệ thống TipJar trên Hydra.

### 💡 Gợi ý

- Orchestration
- State management
- Giảm tải On-chain

<details>
<summary>Đáp án</summary>

Tầng Off-chain đóng vai trò là **bộ điều phối trung tâm** (orchestration layer):

- Xây dựng và chuẩn bị transaction trước khi gửi lên Hydra hoặc Layer-1.
- Quản lý và đồng bộ trạng thái giữa Frontend, Hydra Head và Smart Contract.
- Giảm tải cho On-chain bằng cách xử lý logic phức tạp (đọc UTxO, decode datum, tính toán state mới).
- Kết nối Mesh SDK, Hydra SDK và Smart Contract.

👉 Kết luận: Off-chain giúp hệ thống đạt được hiệu năng realtime trong khi vẫn giữ bảo mật từ On-chain.

</details>

---

## ✅ Bài 2: MeshTxBuilder

### 📌 Đề bài

MeshTxBuilder là gì? Vai trò của nó trong việc xử lý Tip & Claim?

### 💡 Gợi ý

- Kế thừa MeshAdapter
- Transaction Builder
- State transition

<details>
<summary>Đáp án</summary>

**MeshTxBuilder** là lớp mở rộng từ MeshAdapter, đóng vai trò trung tâm ở tầng off-chain.

- Xây dựng transaction hợp lệ cho cả hai hành động: **Tip** (gửi tip) và **Claim** (rút tiền).
- Đọc trạng thái hiện tại từ Smart Contract (UTxO + Datum).
- Tính toán state mới và encode datum.
- Đảm bảo transaction tuân thủ logic validator của Aiken.

👉 Kết luận: MeshTxBuilder là “cầu nối” giữa Frontend/User và Smart Contract.

</details>

---

## ✅ Bài 3: Logic hàm tip()

### 📌 Đề bài

Mô tả các bước chính trong hàm `tip()` của MeshTxBuilder.

### 💡 Gợi ý

- getWalletForTx
- Fetch UTxO
- Decode datum → Update state → Encode datum

<details>
<summary>Đáp án</summary>

Các bước chính trong `tip()`:

1. Lấy thông tin ví (`getWalletForTx()`): UTxOs, collateral, walletAddress.
2. Truy vấn UTxO hiện tại của Smart Contract.
3. Decode datum → chuyển thành danh sách tip (`[{address, amount}]`).
4. Cập nhật state: cộng dồn tip nếu user đã tồn tại hoặc thêm mới.
5. Xây dựng transaction: consume UTxO cũ → tạo UTxO mới với giá trị + datum cập nhật.
6. Sử dụng redeemer `Tip`.

👉 Kết luận: Toàn bộ quá trình là một **state transition** trên mô hình eUTxO.

</details>

---

## ✅ Bài 4: Xử lý Datum trong Off-chain

### 📌 Đề bài

Giải thích cách Off-chain xử lý Datum khi thực hiện Tip (decode, update, encode).

### 💡 Gợi ý

- convertDatum
- existing user
- mConStr0

<details>
<summary>Đáp án</summary>

- **Decode**: `convertDatum()` chuyển PlutusData (CBOR) thành array object `[{address, amount}]`.
- **Update**: Tìm user trong danh sách, nếu có thì cộng dồn amount, nếu chưa thì push record mới.
- **Encode**: Sử dụng `mConStr0()` để chuyển array thành định dạng datum hợp lệ cho transaction.

👉 Kết luận: Off-chain phải xử lý datum chính xác để đảm bảo validator On-chain chấp nhận transaction.

</details>

---

## ✅ Bài 5: So sánh Tip và Claim

### 📌 Đề bài

So sánh logic xử lý **Tip** và **Claim** trong MeshTxBuilder.

### 💡 Gợi ý

- Redeemer
- Quyền truy cập
- Output

<details>
<summary>Đáp án</summary>

| Tiêu chí          | Tip                              | Claim                              |
|-------------------|----------------------------------|------------------------------------|
| Redeemer          | `Tip`                            | `Claim`                            |
| Ai thực hiện      | Bất kỳ ai                        | Chỉ Owner (kiểm tra chữ ký)        |
| Xử lý UTxO        | Consume cũ → Tạo mới + thêm tiền | Consume và rút toàn bộ tiền        |
| Datum             | Cập nhật danh sách tip           | Thường không cần output script     |
| Mục đích          | Tích lũy tiền                    | Rút tiền về ví owner               |

👉 Kết luận: Tip là public action, Claim là restricted action — thể hiện rõ ràng qua redeemer và signature check.

</details>

---