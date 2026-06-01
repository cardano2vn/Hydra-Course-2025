# 📝 Bài tập - Chapter 04: Video 14-1

---

## ✅ Bài 1: Mục tiêu của Frontend trong TipJar

### 📌 Đề bài

Trong một ứng dụng Web3 sử dụng Hydra như TipJar, Frontend không chỉ đơn thuần là nơi hiển thị dữ liệu mà còn đóng vai trò cầu nối giữa người dùng, ví Cardano, Backend và Hydra Head.

Hãy liệt kê và giải thích 4 mục tiêu quan trọng nhất khi xây dựng Frontend cho Hydra TipJar DApp.

Trong câu trả lời, hãy phân tích:

- Vì sao trải nghiệm người dùng (UX) là yếu tố quan trọng trong Web3.
- Cách Frontend giúp che giấu sự phức tạp của blockchain.
- Vai trò của việc đồng bộ dữ liệu giữa nhiều thành phần trong hệ thống.
- Tại sao Hydra yêu cầu khả năng cập nhật dữ liệu gần như realtime.

### 💡 Gợi ý

Hãy suy nghĩ về các khía cạnh sau:

- Người dùng có cần hiểu UTxO, Datum hay Smart Contract hay không.
- UI cần phản hồi như thế nào khi có giao dịch mới.
- Dữ liệu trên giao diện phải đồng bộ với Hydra Head và Layer-1 ra sao.
- Trải nghiệm sử dụng có tương tự các ứng dụng Web2 hiện đại hay không.
- Tốc độ phản hồi ảnh hưởng thế nào đến cảm nhận của người dùng.
- Các yếu tố giúp giảm độ phức tạp khi tương tác với blockchain.

4 mục tiêu chính:

1. Giao diện đơn giản, trực quan — Người dùng không cần hiểu UTxO, datum hay transaction.
2. Hỗ trợ tương tác realtime — Hiển thị thay đổi ngay lập tức khi có tip mới.
3. Đồng bộ trạng thái nhất quán — Giữa UI, Backend và Smart Contract.
4. Trải nghiệm Web2-like — Nhanh, mượt mà, thân thiện dù là dApp Web3.

👉 Kết luận: Frontend là lớp quan trọng giúp người dùng tiếp cận Hydra DApp một cách dễ dàng.

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

Hydra TipJar được xây dựng dựa trên nhiều thành phần khác nhau như Frontend, Backend, Smart Contract, Hydra Node và Cardano Layer-1.

Hãy giải thích vai trò của Frontend trong kiến trúc tổng thể của hệ thống và mô tả cách Frontend tương tác với các thành phần còn lại.

Trong câu trả lời, hãy làm rõ:

- Frontend nhận dữ liệu từ đâu.
- Frontend gửi yêu cầu đến đâu.
- Frontend đóng vai trò gì trong quá trình Tip hoặc Claim.
- Frontend giúp người dùng tương tác với blockchain như thế nào.

### 💡 Gợi ý

Hãy xem xét các luồng sau:

- Kết nối Wallet.
- Hiển thị Dashboard.
- Gửi yêu cầu Commit hoặc Tip.
- Nhận dữ liệu từ Backend.
- Hiển thị trạng thái Hydra Head.
- Cập nhật dữ liệu realtime khi blockchain thay đổi.

Có thể hình dung Frontend như lớp trung gian giữa người dùng và toàn bộ hệ thống blockchain phía sau.

Frontend đóng vai trò là lớp giao tiếp trực tiếp với người dùng:

- Kết nối wallet (Nami, Lace…).
- Gửi yêu cầu Tip / Claim đến Backend.
- Hiển thị realtime trạng thái TipJar (số tiền, danh sách tip).
- Cung cấp trải nghiệm mượt mà, che giấu độ phức tạp của blockchain và Hydra.

👉 Kết luận: Frontend biến hệ thống kỹ thuật phức tạp thành giao diện đơn giản, thân thiện.

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

Khác với các ứng dụng Web2 truyền thống sử dụng email và mật khẩu, TipJar sử dụng Wallet-based Authentication để định danh người dùng thông qua ví Cardano.

Hãy giải thích cách NextAuth được cấu hình để hỗ trợ cơ chế xác thực này.

Trong câu trả lời, hãy đề cập đến: Vì sao không sử dụng email/password. Vai trò của CredentialsProvider. Wallet Address được sử dụng như thế nào trong hệ thống. Session được tạo và quản lý ra sao.

### 💡 Gợi ý

Hãy suy nghĩ về:

- Dữ liệu được gửi từ Frontend tới Backend.
- Cách NextAuth nhận và xử lý dữ liệu.
- Cardano Address có thể đóng vai trò User ID hay không.
- Session lưu trữ những thông tin gì.
- Sự khác biệt giữa Web2 Authentication và Web3 Authentication.

Ngoài ra, hãy xem xét lợi ích của việc sử dụng blockchain identity thay cho tài khoản truyền thống.

- Sử dụng CredentialsProvider thay vì email/password.
- Nhận dữ liệu từ Frontend dưới dạng JSON chứa thông tin wallet và address.
- Sử dụng Cardano wallet address làm định danh chính (user ID).
- Tạo session dựa trên blockchain identity thay vì tài khoản tập trung.

👉 Kết luận: Đây là cách tiếp cận Web3-native, giúp dApp phi tập trung và bảo mật hơn.

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

Để người dùng có thể sử dụng TipJar DApp, hệ thống cần xác thực rằng họ thực sự sở hữu ví Cardano đang được kết nối.

Hãy mô tả chi tiết các bước trong quy trình xác thực từ Frontend đến NextAuth.

Trong câu trả lời, hãy giải thích:

- Dữ liệu nào được gửi từ Frontend.
- Backend xử lý dữ liệu như thế nào.
- Các bước validate người dùng.
- Session được tạo ra ở đâu.
- Thông tin nào được lưu lại sau khi đăng nhập thành công.

### 💡 Gợi ý

Có thể chia quy trình thành các bước:

- Người dùng kết nối ví.
- Frontend lấy địa chỉ ví.
- Gửi thông tin đến NextAuth.
- Parse và validate dữ liệu.
- Tạo User Object.
- Tạo Session.
- Chuyển người dùng đến Dashboard.

Hãy chú ý tới vai trò của Wallet Address trong toàn bộ quy trình.

- Frontend gửi thông tin wallet (address + wallet provider) dưới dạng JSON.
- Backend parse dữ liệu (JSON.parse(credentials.data)).
- Validate wallet tồn tại (isNil check).
- Tạo user object với id = address, lưu wallet và address vào session.
- NextAuth trả về session thành công.

👉 Kết luận: Toàn bộ flow sử dụng Cardano address làm identity chính.

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

Trong quá trình phát triển dApp, việc lựa chọn cơ chế xác thực phù hợp ảnh hưởng lớn đến bảo mật, trải nghiệm người dùng và tính phi tập trung của hệ thống.

Hãy so sánh giữa mô hình Authentication truyền thống (Email/Password) và Wallet-based Authentication được sử dụng trong Hydra TipJar.

Trong câu trả lời, hãy phân tích:

- Cách định danh người dùng.
- Mô hình bảo mật.
- Trải nghiệm đăng nhập.
- Khả năng mở rộng trong hệ sinh thái Web3.
- Mức độ phi tập trung của từng giải pháp.

### 💡 Gợi ý

Hãy xem xét các tiêu chí sau:

- User ID được xác định như thế nào.
- Hệ thống có cần lưu mật khẩu hay không.
- Người dùng có thể quên thông tin đăng nhập không.
- Ai là người kiểm soát danh tính.
- Mức độ phù hợp với các ứng dụng blockchain.
- Khả năng tích hợp với Smart Contract và Wallet.

👉 Kết luận: Wallet-based authentication phù hợp hơn với Hydra DApp, vừa bảo mật vừa phi tập trung.

<details>
<summary>Đáp án</summary>

| Tiêu chí      | Truyền thống (Email/Password) | Wallet-based (Cardano)         |
| ------------- | ----------------------------- | ------------------------------ |
| Identity      | Email hoặc username           | Cardano wallet address         |
| Bảo mật       | Phụ thuộc server & password   | Phụ thuộc private key của user |
| Phi tập trung | Thấp (có database tập trung)  | Cao                            |
| UX            | Cần đăng ký, quên mật khẩu    | Kết nối wallet nhanh           |
| Phù hợp Web3  | Kém                           | Tốt                            |

👉 Kết luận: Wallet-based authentication phù hợp hơn với Hydra DApp, vừa bảo mật vừa phi tập trung.

</details>

---
