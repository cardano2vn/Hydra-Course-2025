# 📝 Bài tập - Chapter 04: Video 13

---

## ✅ Bài 1: Vai trò của Hydra trong luồng Tip

### 📌 Đề bài

Trong hệ thống TipJar sử dụng Hydra, các giao dịch Tip không được xử lý trực tiếp trên Cardano Layer-1 mà được thực hiện bên trong Hydra Head. Điều này giúp cải thiện đáng kể tốc độ xử lý và chi phí giao dịch cho người dùng.

Hãy phân tích vai trò của Hydra Head trong toàn bộ quá trình người dùng thực hiện Tip. Mô tả cách Hydra xử lý transaction, đồng bộ trạng thái giữa các participant và giải thích những lợi ích mà Hydra mang lại so với việc gửi transaction trực tiếp lên Cardano Layer-1. Đồng thời, hãy chỉ ra những thời điểm mà hệ thống vẫn cần tương tác với blockchain chính.

### 💡 Gợi ý

* Off-chain transaction processing
* Realtime confirmation
* Low transaction cost
* Shared state giữa các participant
* Commit và Decommit tài sản
* Settlement lên Cardano Layer-1

<details>
<summary>📋 Đáp án chi tiết</summary>

Hydra Head cho phép các giao dịch được thực hiện ngoài chuỗi chính (off-chain) giữa các participant đã tham gia Head.

Khi người dùng thực hiện Tip:

* Transaction được xử lý trong Hydra Head thay vì gửi trực tiếp lên Layer-1.
* Kết quả được xác nhận gần như tức thì.
* Không phát sinh phí cho mỗi lần Tip.
* Trạng thái mới được đồng bộ giữa các participant trong Head.

Layer-1 chỉ được sử dụng khi:

* Commit tài sản vào Head.
* Decommit tài sản ra khỏi Head.
* Fanout để ghi trạng thái cuối cùng lên blockchain.

👉 **Kết luận:** Hydra giúp TipJar đạt được trải nghiệm realtime và chi phí thấp, phù hợp với các giao dịch micropayment.

</details>

---

## ✅ Bài 2: Cấu trúc dữ liệu TipJar State

### 📌 Đề bài

Trong mô hình eUTxO, toàn bộ trạng thái của ứng dụng được lưu trữ trực tiếp trong Datum của Smart Contract. Vì vậy, việc thiết kế cấu trúc dữ liệu phù hợp là yếu tố rất quan trọng đối với hiệu năng và khả năng mở rộng của hệ thống.

Hãy mô tả những thông tin cần được lưu trữ trong state của TipJar, giải thích vai trò của từng thành phần dữ liệu và phân tích lý do tại sao việc thiết kế state hợp lý lại ảnh hưởng đến chi phí, hiệu năng và khả năng bảo trì của Smart Contract.

### 💡 Gợi ý

* Creator address
* Total tipped amount
* Aggregated state
* Datum structure
* State update efficiency
* Storage optimization

<details>
<summary>📋 Đáp án chi tiết</summary>

State của TipJar thường lưu:

* Địa chỉ người nhận tip.
* Tổng số ADA đã được tip.
* Danh sách người gửi tip (nếu cần).
* Thông tin phục vụ việc claim sau này.

Ví dụ:

```json
[
  {
    "address": "addr_test1...",
    "amount": 5000000
  }
]
```

Thiết kế state hợp lý giúp:

* Dễ dàng cập nhật khi có tip mới.
* Giảm kích thước datum.
* Tiết kiệm tài nguyên xử lý.
* Đơn giản hóa logic validator.

👉 **Kết luận:** Một state được thiết kế tốt giúp hệ thống dễ mở rộng và hoạt động hiệu quả hơn.

</details>

---

## ✅ Bài 3: Xử lý lỗi trong Off-chain Layer

### 📌 Đề bài

Trong quá trình xây dựng transaction, tầng Off-chain phải tương tác với nhiều thành phần như Wallet, Hydra Head, Blockchain Provider và Smart Contract State. Vì vậy, có nhiều tình huống lỗi có thể xảy ra làm transaction không thể được tạo hoặc gửi thành công.

Hãy liệt kê các lỗi phổ biến có thể xuất hiện trong quá trình xử lý Off-chain, phân tích nguyên nhân gây ra từng lỗi và đề xuất giải pháp xử lý phù hợp nhằm đảm bảo trải nghiệm người dùng và tính ổn định của hệ thống.

### 💡 Gợi ý

* Missing UTxO
* Wallet disconnected
* Invalid datum
* Insufficient balance
* Network errors
* Error handling strategy

<details>
<summary>📋 Đáp án chi tiết</summary>

Một số lỗi phổ biến:

### 1. Wallet chưa kết nối

* Không lấy được địa chỉ ví.
* Không truy xuất được UTxO.

**Giải pháp:**

* Kiểm tra wallet trước khi thực hiện giao dịch.

### 2. Không tìm thấy Script UTxO

* Smart Contract chưa có state.
* UTxO đã bị consume.

**Giải pháp:**

* Refetch dữ liệu mới nhất.

### 3. Datum không hợp lệ

* Decode thất bại.
* Dữ liệu không đúng cấu trúc.

**Giải pháp:**

* Validate dữ liệu trước khi encode.

### 4. Thiếu UTxO hoặc ADA

* User không đủ tiền để thực hiện transaction.

**Giải pháp:**

* Kiểm tra balance trước khi build transaction.

👉 **Kết luận:** Error handling tốt giúp DApp ổn định và cải thiện trải nghiệm người dùng.

</details>

---

## ✅ Bài 4: Tại sao cần tách Frontend và Off-chain?

### 📌 Đề bài

Trong kiến trúc của TipJar, giao diện người dùng (Frontend) và tầng xử lý nghiệp vụ (Off-chain Backend) được triển khai thành các thành phần riêng biệt. Đây là mô hình phổ biến trong các ứng dụng Web3 hiện đại.

Hãy giải thích lý do tại sao hệ thống không nên đặt toàn bộ logic xử lý trực tiếp trên Frontend. Phân tích vai trò của từng tầng trong kiến trúc và nêu những lợi ích mà cách tiếp cận này mang lại về bảo mật, khả năng mở rộng và bảo trì hệ thống.

### 💡 Gợi ý

* Separation of concerns
* Security
* Maintainability
* Reusability
* API layer
* Business logic isolation

<details>
<summary>📋 Đáp án chi tiết</summary>

Việc tách Frontend và Backend mang lại nhiều lợi ích:

### Frontend

* Chỉ tập trung hiển thị dữ liệu.
* Nhận input từ người dùng.
* Quản lý trải nghiệm người dùng.

### Off-chain Backend

* Xây dựng transaction.
* Quản lý trạng thái.
* Tương tác với Hydra và Smart Contract.
* Kết nối Database.

### Lợi ích

* Dễ bảo trì.
* Dễ mở rộng hệ thống.
* Tăng tính bảo mật.
* Có thể tái sử dụng API cho nhiều giao diện khác nhau.

👉 **Kết luận:** Kiến trúc phân lớp giúp dự án chuyên nghiệp và dễ phát triển lâu dài.

</details>

---

## ✅ Bài 5: Luồng dữ liệu từ User đến Smart Contract

### 📌 Đề bài

Khi người dùng nhấn nút Tip trên giao diện, hệ thống phải trải qua nhiều bước xử lý trước khi trạng thái mới được ghi nhận trong Smart Contract. Quá trình này liên quan đến Frontend, Backend, Wallet, Transaction Builder và Validator Script.

Hãy mô tả chi tiết luồng dữ liệu từ lúc người dùng gửi yêu cầu Tip cho đến khi trạng thái mới của TipJar được tạo ra. Giải thích trách nhiệm của từng thành phần trong hệ thống và vai trò của state transition trong quá trình này.

### 💡 Gợi ý

* Frontend
* Backend
* Transaction Builder
* Wallet signing
* Validator script
* State transition
* New UTxO creation

<details>
<summary>📋 Đáp án chi tiết</summary>

Luồng xử lý gồm các bước:

1. User nhập số tiền tip trên giao diện.
2. Frontend gửi request đến Backend.
3. Backend lấy trạng thái hiện tại của TipJar.
4. Decode datum hiện tại.
5. Tính toán trạng thái mới.
6. Build transaction bằng MeshTxBuilder.
7. Tạo redeemer Tip.
8. User ký transaction bằng wallet.
9. Transaction được gửi đến Hydra hoặc Layer-1.
10. Validator kiểm tra tính hợp lệ.
11. UTxO cũ bị consume.
12. UTxO mới với datum mới được tạo ra.

```text
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
```

👉 **Kết luận:** Toàn bộ hệ thống hoạt động theo mô hình state transition, trong đó Off-chain chịu trách nhiệm chuẩn bị dữ liệu còn On-chain chịu trách nhiệm xác thực.

</details>
