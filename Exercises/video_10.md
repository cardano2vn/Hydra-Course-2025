# 📝 Bài tập - Chapter 03: Video 10

---

## ✅ Bài 1: Kiến trúc On-chain & Off-chain

### 📌 Đề bài

Giải thích sự khác biệt giữa lớp **On-chain** và **Off-chain** trong kiến trúc TipJar sử dụng Hydra. Vai trò của từng lớp là gì?

### 💡 Gợi ý

- Smart Contract
- Bảo mật & Hiệu năng
- Backend & Hydra Head

<details>
<summary>Đáp án</summary>

**On-chain (Cardano Layer-1)**:  
- Chứa smart contract (validator) viết bằng Aiken.  
- Đảm bảo tính bảo mật, minh bạch và là “nguồn chân lý cuối cùng”.  
- Chỉ xử lý logic cốt lõi (kiểm tra tip minimum, owner claim, cấu trúc UTxO).

**Off-chain (Backend + Hydra)**:  
- Xử lý phần lớn logic nghiệp vụ và giao dịch realtime.  
- Backend xây dựng transaction, Hydra Head xử lý giao dịch nhanh & rẻ.  
- Quản lý trạng thái tạm thời và chỉ commit final state lên L1.

👉 Kết luận: On-chain đảm bảo an toàn, Off-chain mang lại tốc độ & chi phí thấp.

</details>

---

## ✅ Bài 2: Các tầng trong kiến trúc TipJar

### 📌 Đề bài

Mô tả **3 tầng chính** trong kiến trúc tổng thể của DApp TipJar trên Hydra.

### 💡 Gợi ý

- User Layer
- Off-chain Application Layer
- On-chain Cardano Layer

<details>
<summary>Đáp án</summary>

### 1. User Layer (Frontend & Wallet)
- Giao diện người dùng (React/Next.js) + Cardano Wallet (Nami, Lace…).
- Người dùng tương tác, ký transaction.

### 2. Off-chain Application Layer (Backend + Hydra)
- Backend (Node.js), Database, Hydra Head.
- Xử lý logic, xây dựng tx, xử lý realtime.

### 3. On-chain Cardano Layer
- Smart contract (Aiken) + Cardano blockchain.
- Xác thực cuối cùng và lưu trạng thái vĩnh viễn.

👉 Kết luận: Kiến trúc phân tầng giúp tách biệt UX, hiệu năng và bảo mật.

</details>

---

## ✅ Bài 3: Tech Stack cho TipJar

### 📌 Đề bài

Liệt kê và giải thích vai trò của các công cụ/SDK chính được khuyến nghị cho TipJar trên Hydra.

### 💡 Gợi ý

- Aiken, Lucid, Mesh SDK, Hydra SDK, Ogmios/Kupo

<details>
<summary>Đáp án</summary>

- **Aiken**: Viết smart contract On-chain (tối giản, an toàn, hiệu suất cao).
- **Lucid**: Xây dựng và quản lý transaction (core transaction layer).
- **Mesh SDK**: Tối ưu frontend, kết nối wallet, cải thiện UX.
- **Hydra SDK**: Xử lý giao dịch realtime trong Hydra Head.
- **Ogmios + Kupo + Blockfrost**: Hạ tầng hỗ trợ (indexing, realtime query, API).

👉 Kết luận: Mỗi công cụ đảm nhận một vai trò rõ ràng, tạo nên stack cân bằng giữa tốc độ phát triển và hiệu năng.

</details>

---

## ✅ Bài 4: Luồng hoạt động (Workflow)

### 📌 Đề bài

Mô tả ngắn gọn luồng xử lý khi một user gửi tip trong hệ thống TipJar sử dụng Hydra.

### 💡 Gợi ý

- Frontend → Wallet → Backend → Hydra → Commit L1

<details>
<summary>Đáp án</summary>

1. User tương tác trên Frontend → yêu cầu ký transaction qua Wallet.
2. Backend nhận tx đã ký, xây dựng transaction hợp lệ theo smart contract.
3. Transaction được xử lý realtime trong **Hydra Head** (gần như tức thì, phí thấp).
4. Backend cập nhật trạng thái và thông báo realtime cho Frontend.
5. Khi đóng Head hoặc theo lịch → commit final state lên Cardano Layer-1.

👉 Kết quả: Trải nghiệm realtime cho người dùng, vẫn đảm bảo bảo mật nhờ Layer-1.

</details>

---

## ✅ Bài 5: Lợi ích của kiến trúc đề xuất

### 📌 Đề bài

Phân tích **3 lợi ích chính** của việc thiết kế kiến trúc On-chain/Off-chain + Hydra cho TipJar.

### 💡 Gợi ý

- Hiệu năng
- Bảo mật
- Khả năng mở rộng & UX

<details>
<summary>Đáp án</summary>

### 1. Hiệu năng cao & Chi phí thấp
- Hydra xử lý micropayment realtime, phí gần như bằng 0.

### 2. Bảo mật & Trustless
- Smart contract On-chain làm final validator, không thể gian lận trạng thái.

### 3. Trải nghiệm người dùng tốt & Khả năng mở rộng
- UX gần giống Web2 (nhanh, mượt), dễ scale khi số user tăng.

👉 Kết luận: Kiến trúc này cân bằng hoàn hảo giữa **Security (L1)**, **Performance (Hydra)** và **UX (Frontend + Backend)**.

</details>

---