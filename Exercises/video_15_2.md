# 📝 Bài tập - Chapter 04: Video 15-2

---

## ✅ Bài 1: Mục tiêu kiểm thử và xác thực

### 📌 Đề bài

Nêu rõ **mục tiêu chính** khi thực hiện kiểm thử và xác thực Hydra DApp (TipJar) trong video này.

### 💡 Gợi ý

- Multi-user
- End-to-end flow
- Performance & Stability

<details>
<summary>Đáp án</summary>

Mục tiêu chính là **xác thực toàn bộ hệ thống** trong điều kiện gần với thực tế:

- Đảm bảo tất cả chức năng (Commit, Tip, Claim, Decommit, Fanout) hoạt động đúng ở từng trạng thái của Hydra Head.
- Kiểm tra khả năng xử lý đa người dùng (multi-user) đồng thời.
- Đo lường hiệu năng, độ ổn định và tính realtime của DApp.
- Xác nhận dữ liệu được đồng bộ nhất quán giữa Frontend, Backend, Hydra và Layer-1.

👉 Kết luận: Đây là bước cuối cùng trước khi triển khai, giúp phát hiện và sửa lỗi logic hoặc hiệu năng.

</details>

---

## ✅ Bài 2: Hoàn thiện các chức năng Dashboard

### 📌 Đề bài

Liệt kê các chức năng chính cần hoàn thiện trên Dashboard và vai trò của từng chức năng trong TipJar.

### 💡 Gợi ý

- Commit, Tip, Claim, Decommit, Fanout

<details>
<summary>Đáp án</summary>

### Các chức năng chính:
1. **Commit** — Đưa ADA từ Layer-1 vào Hydra Head.
2. **Tip** — Gửi tip realtime (off-chain) cho creator.
3. **Claim** — Owner rút tiền từ TipJar.
4. **Decommit** — Rút ADA ra khỏi Hydra Head về Layer-1.
5. **Fanout** — Đóng Head và phân phối tài sản cho tất cả participants.

👉 Kết luận: Dashboard phải hỗ trợ đầy đủ lifecycle của Hydra Head (Open → Active → Close).

</details>

---

## ✅ Bài 3: Kiểm thử Multi-user Scenarios

### 📌 Đề bài

Giải thích tầm quan trọng của việc mô phỏng kịch bản **nhiều người dùng** khi kiểm thử Hydra DApp.

### 💡 Gợi ý

- Concurrent tips
- Performance
- Race condition

<details>
<summary>Đáp án</summary>

Việc kiểm thử multi-user giúp đánh giá:

- Khả năng xử lý đồng thời nhiều giao dịch Tip realtime.
- Độ ổn định của Hydra Head khi có nhiều người commit/decommit cùng lúc.
- Hiệu năng thực tế (throughput, latency) của hệ thống.
- Phát hiện race condition hoặc lỗi đồng bộ trạng thái.

👉 Kết luận: Hydra nổi bật ở khả năng scale với nhiều participants, nên multi-user testing là bắt buộc để chứng minh lợi thế off-chain.

</details>

---

## ✅ Bài 4: Decommit và Fanout

### 📌 Đề bài

Phân biệt **Decommit** và **Fanout** trong Hydra, và khi nào nên sử dụng từng hành động.

### 💡 Gợi ý

- Trạng thái Head
- Rút tiền
- Đóng Head

<details>
<summary>Đáp án</summary>

- **Decommit**: Rút một phần hoặc toàn bộ ADA ra khỏi Hydra Head về Layer-1 **khi Head vẫn đang OPEN**. Dùng khi muốn rút tiền mà vẫn giữ Head hoạt động.
- **Fanout**: Đóng hoàn toàn Hydra Head, phân phối tất cả tài sản còn lại cho các participants và ghi final state lên Layer-1. Chỉ thực hiện được khi Head ở trạng thái `FANOUT_POSSIBLE`.

👉 Kết luận: Decommit linh hoạt hơn, Fanout dùng để kết thúc phiên Hydra.

</details>

---

## ✅ Bài 5: Đo lường và Đánh giá hiệu suất

### 📌 Đề bài

Khi kiểm thử TipJar trên Hydra, bạn nên đo lường những chỉ số hiệu suất nào? Tại sao chúng quan trọng?

### 💡 Gợi ý

- Latency
- Throughput
- Cost
- UX

<details>
<summary>Đáp án</summary>

**Các chỉ số quan trọng**:
1. **Latency** — Thời gian từ lúc tip đến khi UI cập nhật (phải gần realtime).
2. **Throughput** — Số giao dịch tip xử lý được mỗi giây trong Hydra Head.
3. **Chi phí** — Phí Layer-1 chỉ phát sinh khi Commit/Decommit/Fanout (không phải mỗi tip).
4. **Tỷ lệ thành công** — Số transaction thất bại khi có nhiều user.

👉 Kết luận: So sánh kết quả với Layer-1 thuần túy để chứng minh Hydra mang lại cải thiện rõ rệt về tốc độ và chi phí cho micropayment.

</details>

---