# 📝 Bài tập - Chapter 04: Video 11-2

---

## ✅ Bài 1: Vai trò On-chain trong TipJar

### 📌 Đề bài

Giải thích vai trò của lớp **On-chain** trong hệ thống TipJar sử dụng Hydra. Tại sao nó được coi là “lớp bảo mật cuối cùng”?

### 💡 Gợi ý

- Smart Contract (Aiken)
- eUTxO
- Bảo mật & Trustless

<details>
<summary>Đáp án</summary>

**On-chain** là nơi đặt smart contract (validator) được viết bằng Aiken, chạy trực tiếp trên Cardano Layer-1.

- Đảm bảo mọi giao dịch phải tuân thủ logic đã định nghĩa.
- Là nguồn chân lý cuối cùng (source of truth), không thể gian lận.
- Kế thừa bảo mật của Layer-1.

👉 Kết luận: On-chain đảm bảo tính an toàn và minh bạch, trong khi Hydra xử lý tốc độ & chi phí.

</details>

---

## ✅ Bài 2: Mô hình eUTxO

### 📌 Đề bài

Giải thích mô hình **eUTxO** trong Cardano và vai trò của nó trong smart contract.

### 💡 Gợi ý

- Extended UTxO
- Datum + Redeemer
- Trạng thái từng UTxO

<details>
<summary>Đáp án</summary>

**eUTxO (Extended Unspent Transaction Output)** là mô hình cốt lõi của Cardano.

- Mỗi UTxO không chỉ chứa giá trị ADA/token mà còn có thể gắn **Datum** (trạng thái).
- Khi tiêu UTxO, người dùng cung cấp **Redeemer** (hành động).
- Smart contract (validator) kiểm tra dựa trên Datum + Redeemer + Transaction context.

👉 Kết luận: eUTxO cho phép trạng thái phân tán, minh bạch và dễ kiểm chứng hơn mô hình account-based.

</details>

---

## ✅ Bài 3: Datum và Redeemer trong hello_world

### 📌 Đề bài

Mô tả cấu trúc **Datum** và **Redeemer** trong smart contract `hello_world`.

### 💡 Gợi ý

- Owner
- Message
- Xác thực

<details>
<summary>Đáp án</summary>

**Datum**:

```aiken
pub type Datum {
  owner: VerificationKeyHash,
}
```

→ Lưu chủ sở hữu của UTxO.

**Redeemer**:

```aiken
pub type Redeemer {
    message: String,
}
```

→ Chứa thông điệp do người dùng cung cấp (phải là "Hello, World!").
👉 Kết luận: Datum kiểm soát “ai”, Redeemer kiểm soát “làm gì”.

</details>

---

## ✅ Bài 4: Logic Validator

### 📌 Đề bài

Phân tích logic chính trong hàm spend của validator hello_world.

### 💡 Gợi ý

- must_say_hello
- must_be_signed
- expect Some(datum)

<details>
<summary>Đáp án</summary>

Validator kiểm tra 2 điều kiện chính:

- must_say_hello: redeemer.msg == "Hello, World!"
- must_be_signed: Giao dịch phải được ký bởi datum.owner (kiểm tra trong tx.extra_signatories)

Ngoài ra dùng expect Some(datum) = datum_opt để đảm bảo UTxO có Datum hợp lệ.
Nếu không thỏa mãn → giao dịch thất bại.

```aiken
pub fn spend(datum: Datum, redeemer: Redeemer, context: ScriptContext) -> Bool {
  let must_say_hello = redeemer.message == "Hello, World!"
  let must_be_signed = list.has(context.transaction.extra_signatories, datum.owner)

  must_say_hello && must_be_signed
}
```

👉 Kết luận: Đây là nền tảng để xây dựng logic phức tạp hơn cho TipJar (gửi tip, rút tiền…). Validator là gatekeeper để bảo vệ mọi thay đổi trạng thái.

</details>

---

## ✅ Bài 5: So sánh On-chain và Off-chain

### 📌 Đề bài

So sánh trách nhiệm và vai trò của On-chain (Aiken) và Off-chain (Backend + Hydra) khi xây dựng TipJar trên Cardano + Hydra.

### 💡 Gợi ý

- Bảo mật vs Hiệu năng
- Validator vs State Management
- Layer-1 vs Hydra Head
- Trustless vs User Experience

<details>
<summary>Đáp án</summary>

| Tiêu chí                | On-chain (Aiken/Validator)                                   | Off-chain (Backend + Hydra)                            |
| ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------ |
| **Bảo mật**             | Cao - Validator là final check, không thể gian lận           | Thấp hơn - Chỉ hỗ trợ, phải chịu mộtxem xét cuối cùng  |
| **Hiệu năng**           | Chậm & Đắt - Phải xác thực trên Layer-1                      | Nhanh & Rẻ - Xử lý realtime trên Hydra Head            |
| **Logic**               | Logic cốt lõi & ràng buộc bắt buộc (tất cả tx phải tuân thủ) | Xây dựng giao dịch, quản lý state tạm thời trong Hydra |
| **Vai trò**             | Bảo vệ tài sản, đảm bảo không ai xâm phạm                    | Cải thiện UX, tăng throughput, quản lý luồng công việc |
| **Thời điểm hoạt động** | Khi đóng Head (settle) hoặc nghi ngờ mâu thuẫn               | Liên tục trong Hydra Head cho đến khi đóng             |

**Chi tiết từng vai trò:**

**On-chain (Validator Aiken)**:

- Kiểm tra tất cả input/output UTxO có hợp lệ
- Xác minh chữ ký và điều kiện logic
- Bảo vệ chống lại hành vi độc hại
- Là "nguồn chân lý" cuối cùng trong hệ thống

**Off-chain (Backend + Hydra)**:

- Nhận yêu cầu từ client (gửi tip, rút tiền)
- Xây dựng giao dịch phù hợp với datum/redeemer
- Quản lý state tạm thời trong Hydra Head
- Khi đủ điều kiện → hợp nhất lên Layer-1
- Validator Aiken sẽ kiểm tra lần cuối trước khi confirm

👉 Kết luận: **On-chain + Off-chain + Hydra** tạo thành mô hình hoàn hảo:

- ✅ Bảo mật (On-chain validator)
- ✅ Hiệu năng (Hydra Head)
- ✅ Trải nghiệm tốt (Off-chain orchestration)
- ✅ Trustless & Decentralized

</details>
