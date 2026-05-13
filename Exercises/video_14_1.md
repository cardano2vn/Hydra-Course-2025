# 📝 Bài tập - Chapter 04: Video 14-1

---

## ✅ Bài 1: Mục tiêu của Frontend trong TipJar

### 📌 Đề bài

Liệt kê và giải thích **4 mục tiêu chính** khi xây dựng Frontend cho Hydra DApp (TipJar).

### 💡 Gợi ý

- UX
- Real-time
- Đồng bộ trạng thái
- Web2-like experience

<details>
<summary>Đáp án</summary>

### 4 mục tiêu chính:
1. **Giao diện đơn giản, trực quan** — Người dùng không cần hiểu UTxO, datum hay transaction.
2. **Hỗ trợ tương tác realtime** — Hiển thị thay đổi ngay lập tức khi có tip mới.
3. **Đồng bộ trạng thái nhất quán** — Giữa UI, Backend và Smart Contract.
4. **Trải nghiệm Web2-like** — Nhanh, mượt mà, thân thiện dù là dApp Web3.

👉 Kết luận: Frontend là lớp quan trọng giúp người dùng tiếp cận Hydra DApp một cách dễ dàng.

</details>

---

## ✅ Bài 2: Vai trò của Frontend trong Hydra Architecture

### 📌 Đề bài

Giải thích vai trò của Frontend trong kiến trúc tổng thể của TipJar (On-chain + Off-chain + Hydra).

### 💡 Gợi ý

- User Interaction
- Wallet Connection
- Realtime Update

<details>
<summary>Đáp án</summary>

Frontend đóng vai trò là **lớp giao tiếp trực tiếp với người dùng**:

- Kết nối wallet (Nami, Lace…).
- Gửi yêu cầu Tip / Claim đến Backend.
- Hiển thị realtime trạng thái TipJar (số tiền, danh sách tip).
- Cung cấp trải nghiệm mượt mà, che giấu độ phức tạp của blockchain và Hydra.

👉 Kết luận: Frontend biến hệ thống kỹ thuật phức tạp thành giao diện đơn giản, thân thiện.

</details>

---

## ✅ Bài 3: Wallet-based Authentication với NextAuth

### 📌 Đề bài

Giải thích cách NextAuth được cấu hình để hỗ trợ **Wallet-based Authentication** cho Cardano dApp.

### 💡 Gợi ý

- CredentialsProvider
- Cardano address
- Session

<details>
<summary>Đáp án</summary>

- Sử dụng **CredentialsProvider** thay vì email/password.
- Nhận dữ liệu từ Frontend dưới dạng JSON chứa thông tin wallet và address.
- Sử dụng **Cardano wallet address** làm định danh chính (user ID).
- Tạo session dựa trên blockchain identity thay vì tài khoản tập trung.

👉 Kết luận: Đây là cách tiếp cận Web3-native, giúp dApp phi tập trung và bảo mật hơn.

</details>

---

## ✅ Bài 4: Quy trình Xác thực (Authentication Flow)

### 📌 Đề bài

Mô tả các bước chính trong quy trình xác thực người dùng bằng wallet trên Frontend + NextAuth.

### 💡 Gợi ý

- Parse credentials
- Validation
- Create user object

<details>
<summary>Đáp án</summary>

1. Frontend gửi thông tin wallet (address + wallet provider) dưới dạng JSON.
2. Backend parse dữ liệu (`JSON.parse(credentials.data)`).
3. Validate wallet tồn tại (`isNil` check).
4. Tạo user object với `id = address`, lưu wallet và address vào session.
5. NextAuth trả về session thành công.

👉 Kết luận: Toàn bộ flow sử dụng Cardano address làm identity chính.

</details>

---

## ✅ Bài 5: So sánh Authentication truyền thống và Wallet-based

### 📌 Đề bài

So sánh Authentication truyền thống (email/password) với **Wallet-based Authentication** trong TipJar DApp.

### 💡 Gợi ý

- Identity
- Security
- Decentralization
- UX

<details>
<summary>Đáp án</summary>

| Tiêu chí           | Truyền thống (Email/Password)     | Wallet-based (Cardano)               |
|--------------------|-----------------------------------|--------------------------------------|
| Identity           | Email hoặc username               | Cardano wallet address               |
| Bảo mật            | Phụ thuộc server & password       | Phụ thuộc private key của user       |
| Phi tập trung      | Thấp (có database tập trung)      | Cao                                  |
| UX                 | Cần đăng ký, quên mật khẩu        | Kết nối wallet nhanh                 |
| Phù hợp Web3       | Kém                               | Tốt                                  |

👉 Kết luận: Wallet-based authentication phù hợp hơn với Hydra DApp, vừa bảo mật vừa phi tập trung.

</details>

---