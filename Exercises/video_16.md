# 📝 Bài tập - Chapter 04: Video 16

---

## ✅ Bài 1: Mục tiêu của giai đoạn Triển khai & Giới thiệu

### 📌 Đề bài

Sau khi hoàn thành việc phát triển Hydra TipJar DApp, dự án cần được đưa ra khỏi môi trường phát triển để tiếp cận người dùng thực tế. Hãy giải thích mục tiêu chính của giai đoạn Triển khai (Deployment) và Giới thiệu sản phẩm (Presentation & Showcase).

Trong câu trả lời, hãy phân tích:

- Vì sao một dự án không nên chỉ dừng lại ở mức prototype hoặc local demo.
- Vai trò của môi trường production đối với người dùng cuối.
- Tầm quan trọng của việc giới thiệu sản phẩm tới cộng đồng Cardano và Hydra.
- Những giá trị mà một bản demo hoàn chỉnh mang lại cho dự án.

### 💡 Gợi ý

Hãy suy nghĩ về các khía cạnh sau:

- Chuyển từ môi trường local sang production.
- Triển khai ứng dụng để nhiều người dùng có thể truy cập.
- Xây dựng bản demo hoàn chỉnh từ đầu đến cuối.
- Chia sẻ sản phẩm với cộng đồng, nhà phát triển và nhà đầu tư.
- Thu thập phản hồi để tiếp tục cải tiến dự án.

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

Một bản demo hiệu quả cần giúp người xem hiểu được toàn bộ vòng đời hoạt động của Hydra TipJar DApp. Hãy liệt kê và mô tả ngắn gọn 5 bước quan trọng nhất trong luồng demo từ khi người dùng truy cập ứng dụng cho đến khi hoàn tất việc nhận lại tài sản trên Layer-1.

Trong câu trả lời, hãy làm rõ:

- Mục đích của từng bước.
- Vai trò của Hydra Head trong từng giai đoạn.
- Giá trị mà người dùng nhận được khi sử dụng Hydra thay vì giao dịch trực tiếp trên Layer-1.

### 💡 Gợi ý

Hãy suy nghĩ về quy trình sử dụng thực tế của một người dùng mới:

- Kết nối ví Cardano.
- Tạo hoặc lựa chọn Creator.
- Commit tài sản vào Hydra Head.
- Thực hiện Tip trong Hydra.
- Claim hoặc rút tài sản về Layer-1.

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

Việc đưa một Hydra DApp vào môi trường production đòi hỏi nhiều công cụ hỗ trợ khác nhau nhằm đảm bảo tính ổn định, khả năng mở rộng và dễ dàng bảo trì. Hãy liệt kê các công cụ hoặc nền tảng thường được sử dụng trong quá trình triển khai và giải thích vai trò của từng công cụ trong hệ thống.

Trong câu trả lời, hãy đề cập đến:

- Quản lý source code.
- Đóng gói ứng dụng.
- Triển khai frontend.
- Triển khai backend và Hydra Node.
  Quản lý domain và bảo mật.

### 💡 Gợi ý

Có thể tham khảo các công cụ phổ biến như:

- Git & GitHub
- Docker
- Docker Compose
- Vercel
- VPS hoặc Cloud Server
- Domain & SSL Certificate

Hãy giải thích vì sao mỗi công cụ lại cần thiết trong môi trường production.

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

Một ứng dụng hoạt động tốt trên máy cá nhân chưa chắc sẽ vận hành ổn định trong môi trường production. Hãy phân tích 3 thách thức phổ biến nhất khi triển khai Hydra DApp lên production và đề xuất giải pháp khắc phục phù hợp.

Trong phần trả lời, hãy làm rõ:

- Nguyên nhân dẫn đến vấn đề.
- Ảnh hưởng của vấn đề tới người dùng.
- Cách giảm thiểu hoặc xử lý vấn đề trong thực tế.

### 💡 Gợi ý

Hãy tập trung vào các vấn đề thường gặp như:

- Quản lý biến môi trường và cấu hình hệ thống.
- Vận hành Hydra Node và Cardano Node ổn định.
- Đồng bộ dữ liệu realtime giữa nhiều người dùng.
- Theo dõi và giám sát hệ thống.
- Xử lý lỗi khi mạng blockchain gặp sự cố.

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

Một sản phẩm tốt chưa chắc đã được nhiều người biết đến nếu không có chiến lược giới thiệu phù hợp. Hãy đề xuất cách trình bày và giới thiệu Hydra TipJar DApp tới cộng đồng Cardano nhằm thu hút sự quan tâm của người dùng và nhà phát triển.

Trong câu trả lời, hãy xem xét:

- Nội dung cần xuất hiện trong video demo.
- Cách tổ chức một buổi live demo.
- Các lợi ích nổi bật cần nhấn mạnh.
- Những kênh truyền thông phù hợp để quảng bá dự án.
- Cách thu thập phản hồi từ cộng đồng sau khi giới thiệu.

### 💡 Gợi ý

Hãy suy nghĩ về các hoạt động như:

- Quay video demo ngắn.
- Viết bài giới thiệu dự án.
- Livestream trên X (Twitter), Discord hoặc YouTube.
- Chia sẻ mã nguồn GitHub.
- Trình bày các chỉ số về tốc độ và chi phí giao dịch của Hydra.
- Thu thập feedback từ cộng đồng để cải thiện sản phẩm.

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
