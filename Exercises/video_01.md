# 📝 Bài tập

---

## ✅ Bài 1: Phân tích vấn đề của Layer-1

### 📌 Đề bài

Phân tích **3 hạn chế chính của Cardano Layer-1** và giải thích:

- Tại sao các hạn chế này gây khó khăn cho ứng dụng thực tế?
- Đưa ra ví dụ cụ thể

### 💡 Gợi ý

- TPS
- Block time
- Phí giao dịch

<details>
<summary>Đáp án</summary>

### 1. TPS thấp (~250 TPS)

- Không đủ cho ứng dụng có nhiều người dùng
- Ví dụ: DEX có hàng nghìn user sẽ bị nghẽn

### 2. Block time ~20s

- Không phù hợp ứng dụng real-time
- Ví dụ: Game hoặc trading cần phản hồi ngay lập tức

### 3. Phí tăng khi tắc nghẽn

- UX kém khi mạng đông
- Ví dụ: mint NFT hoặc swap bị delay và phí cao

👉 Kết luận: Layer-1 tối ưu bảo mật → hy sinh hiệu năng

</details>

---

## ✅ Bài 2: Vai trò của Hydra

### 📌 Đề bài

Hydra giải quyết vấn đề của Layer-1 như thế nào?

### 💡 Gợi ý

- Off-chain
- Hydra Head
- Final state

<details>
<summary>Đáp án</summary>

- Chuyển giao dịch sang off-chain
- Xử lý trong Hydra Head
- Chỉ ghi trạng thái cuối lên Layer-1

👉 Kết quả: nhanh hơn, rẻ hơn, vẫn an toàn

</details>

---

## ✅ Bài 3: Cơ chế Hydra Head

### 📌 Đề bài

Mô tả quy trình:

1. Mở Head
2. Giao dịch
3. Đóng Head

### 💡 Gợi ý

- Multisig
- Off-chain

<details>
<summary>Đáp án</summary>

- Mở Head → lock tài sản
- Giao dịch off-chain
- Đóng Head → commit về Layer-1

👉 Nhanh vì không cần block, an toàn nhờ Layer-1

</details>

---

## ✅ Bài 4: So sánh Layer-2

### 📌 Đề bài

So sánh Hydra với Rollups hoặc Lightning

### 💡 Gợi ý

- Smart contract
- Phí
- Tốc độ

<details>
<summary>Đáp án</summary>

- Hydra nhanh hơn và phí thấp hơn
- Không cần ZK-proof
- Hỗ trợ smart contract tốt hơn Lightning

</details>

---

## ✅ Bài 5: Use case

### 📌 Đề bài

Chọn 1 use case và phân tích

### 💡 Gợi ý

- Micropayment
- Game

<details>
<summary>Đáp án</summary>

Ví dụ Micropayment:

- Layer-1: chậm, phí cao
- Hydra: nhanh, gần như miễn phí

👉 Phù hợp cho tip real-time

</details>

---
