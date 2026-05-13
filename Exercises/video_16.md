# 📝 Bài tập - Chapter 04: Video 16

---

## ✅ Bài 1: Mục tiêu của giai đoạn Triển khai & Giới thiệu

### 📌 Đề bài

Giải thích mục tiêu chính khi triển khai và giới thiệu Hydra DApp (TipJar) ra môi trường thực tế.

### 💡 Gợi ý

- Demo
- Production
- Community

<details>
<summary>Đáp án</summary>

Mục tiêu chính là chuyển dự án từ môi trường phát triển (local) sang **môi trường production**, đồng thời có khả năng trình bày và chia sẻ sản phẩm với cộng đồng.

- Hoàn thiện demo end-to-end toàn bộ luồng.
- Đóng gói, build và deploy ứng dụng.
- Xây dựng khả năng giới thiệu dự án một cách chuyên nghiệp.

👉 Kết luận: Đây là bước cuối cùng biến dự án cá nhân thành một sản phẩm thực tế có thể sử dụng và chia sẻ.

</details>

---

## ✅ Bài 2: Các bước chính trong Demo luồng hoạt động

### 📌 Đề bài

Liệt kê và mô tả ngắn gọn **5 bước quan trọng** trong bản demo toàn bộ luồng của TipJar DApp.

### 💡 Gợi ý

- Wallet Connection
- Create Creator
- Commit
- Tip
- Claim / Decommit

<details>
<summary>Đáp án</summary>

1. **Kết nối Wallet** — Kết nối ví Cardano (Nami, Eternl…) và chuyển đến Dashboard.
2. **Tạo Creator** — Tạo profile nhà sáng tạo (title, description, image…).
3. **Commit ADA** — Chọn UTxO và commit tài sản vào Hydra Head.
4. **Thực hiện Tip** — Gửi tip realtime cho Creator (off-chain, nhanh & rẻ).
5. **Claim / Decommit / Fanout** — Rút tiền (Claim) hoặc rút tài sản về Layer-1.

👉 Kết luận: Demo cần thể hiện rõ sự khác biệt về tốc độ và chi phí so với Layer-1 thuần.

</details>

---

## ✅ Bài 3: Công cụ hỗ trợ Triển khai

### 📌 Đề bài

Liệt kê các công cụ / phương pháp quan trọng dùng để triển khai Hydra DApp lên production.

### 💡 Gợi ý

- Docker
- Git
- Vercel / VPS
- Domain

<details>
<summary>Đáp án</summary>

- **Docker**: Đóng gói ứng dụng (Frontend + Backend) thành container, đảm bảo chạy nhất quán.
- **Git**: Quản lý source code, versioning, collaboration.
- **Vercel**: Triển khai Frontend (Next.js) nhanh chóng.
- **VPS / Server**: Triển khai Backend + Hydra Node + Database.
- **Domain & SSL**: Cấu hình tên miền riêng và chứng chỉ bảo mật.

👉 Kết luận: Kết hợp các công cụ này giúp DApp chuyên nghiệp, dễ scale và dễ bảo trì.

</details>

---

## ✅ Bài 4: Thách thức khi Triển khai Production

### 📌 Đề bài

Phân tích **3 thách thức phổ biến** khi đưa Hydra DApp từ local lên production và cách khắc phục.

### 💡 Gợi ý

- Environment
- Hydra Node
- Realtime

<details>
<summary>Đáp án</summary>

### 3 thách thức chính:
1. **Cấu hình môi trường** — Biến môi trường, API keys, Hydra Node endpoint → Sử dụng `.env` và Docker Compose.
2. **Hydra Node & Cardano Node** — Chạy ổn định, sync chain → Sử dụng Docker và monitoring.
3. **Realtime & Data Consistency** — Đồng bộ trạng thái giữa nhiều user → Sử dụng React Query + Backend polling/invalidation.

👉 Kết luận: Production đòi hỏi sự ổn định và khả năng chịu tải cao hơn nhiều so với local.

</details>

---

## ✅ Bài 5: Cách giới thiệu sản phẩm hiệu quả

### 📌 Đề bài

Đề xuất cách giới thiệu và trình bày Hydra TipJar DApp với cộng đồng Cardano.

### 💡 Gợi ý

- Demo video
- Live demo
- Highlight lợi ích

<details>
<summary>Đáp án</summary>

**Cách giới thiệu hiệu quả**:
- Quay video demo ngắn (1-3 phút) thể hiện full flow (Connect → Commit → Tip realtime → Claim).
- Tổ chức live demo trên X (Twitter), Discord Cardano hoặc YouTube.
- Nhấn mạnh lợi ích: **Tốc độ realtime, chi phí cực thấp, vẫn giữ bảo mật Layer-1**.
- Chia sẻ mã nguồn (GitHub) và link deploy.
- Thu thập feedback từ cộng đồng để cải tiến.

👉 Kết luận: Một bản demo tốt sẽ giúp dự án nổi bật và thu hút sự quan tâm từ cộng đồng Cardano & Hydra.

</details>

---