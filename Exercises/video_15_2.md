# 📝 Bài tập - Chapter 04: Video 15-2

---

## ✅ Bài 1: Mục tiêu kiểm thử và xác thực

### 📌 Đề bài

Sau khi hoàn thiện các chức năng chính của Hydra TipJar DApp, bước tiếp theo là thực hiện quá trình kiểm thử (Testing) và xác thực hệ thống (Validation) trong môi trường gần với thực tế. Đây là giai đoạn quan trọng nhằm đảm bảo tất cả các thành phần từ Frontend, Backend, Hydra Head và Layer-1 có thể hoạt động ổn định cùng nhau.

Hãy giải thích mục tiêu chính của quá trình kiểm thử và xác thực trong dự án Hydra TipJar.

Trong câu trả lời, hãy phân tích:

- Tại sao cần kiểm thử toàn bộ hệ thống thay vì chỉ kiểm tra từng chức năng riêng lẻ.
- Vai trò của việc mô phỏng các tình huống sử dụng thực tế.
- Tầm quan trọng của việc xác thực dữ liệu giữa các thành phần trong hệ thống.
- Những rủi ro có thể xảy ra nếu bỏ qua giai đoạn kiểm thử cuối cùng.

### 💡 Gợi ý

Hãy suy nghĩ về các nội dung sau:

- Người dùng thực hiện Commit, Tip, Claim, Decommit và Fanout liên tục.
- Nhiều người dùng cùng tham gia Hydra Head.
- Dữ liệu hiển thị trên giao diện có khớp với blockchain hay không.
- Khả năng xử lý lỗi trong các trường hợp bất thường.
- Hiệu năng và độ ổn định của hệ thống khi hoạt động trong thời gian dài.
- Tính nhất quán giữa Frontend, Backend, Hydra Node và Layer-1.

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

Dashboard là trung tâm điều khiển chính của Hydra TipJar DApp, nơi người dùng có thể theo dõi trạng thái Hydra Head và thực hiện các thao tác liên quan đến tài sản của mình.

Hãy liệt kê các chức năng quan trọng cần được hoàn thiện trên Dashboard và giải thích vai trò của từng chức năng trong vòng đời hoạt động của Hydra Head.

Trong câu trả lời, hãy mô tả:

- Chức năng đó được sử dụng khi nào.
- Ảnh hưởng của chức năng tới trạng thái Hydra Head.
- Những dữ liệu nào cần được cập nhật trên giao diện sau khi thực hiện.

### 💡 Gợi ý

Có thể xem xét các chức năng sau:

- Commit ADA vào Hydra Head.
- Tip ADA cho Creator.
- Claim phần thưởng từ TipJar.
- Decommit tài sản về Layer-1.
- Fanout để kết thúc Hydra Head.
- Hiển thị số dư Hydra.
- Hiển thị trạng thái hiện tại của Hydra Head.
- Hiển thị danh sách giao dịch hoặc lịch sử Tip.

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

Một trong những lợi thế lớn nhất của Hydra là khả năng hỗ trợ nhiều người dùng tương tác đồng thời với tốc độ cao. Vì vậy, việc kiểm thử các kịch bản nhiều người dùng (Multi-user Scenarios) là một bước quan trọng trước khi triển khai thực tế.
Hãy giải thích tại sao cần mô phỏng nhiều người dùng cùng tham gia Hydra Head và phân tích những vấn đề có thể phát sinh khi số lượng giao dịch tăng lên.

Trong câu trả lời, hãy đề cập đến:

- Khả năng xử lý giao dịch đồng thời.
- Tính nhất quán của dữ liệu.
- Độ ổn định của Hydra Head.
- Trải nghiệm người dùng trong môi trường tải cao.

### 💡 Gợi ý

Hãy suy nghĩ về các tình huống như:

- Nhiều người cùng Commit vào Hydra Head.
- Nhiều người Tip cho cùng một Creator.
- Nhiều giao dịch được gửi gần như cùng lúc.
- Người dùng liên tục thực hiện Tip và Claim.
- Hệ thống phải cập nhật dữ liệu realtime cho tất cả participants.

Ngoài ra, hãy cân nhắc các vấn đề kỹ thuật như:

- Race conditions.
- Data consistency.
- Throughput.
- Transaction latency.
- Đồng bộ trạng thái trên Frontend.

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

Trong Hydra, người dùng có thể đưa tài sản ra khỏi Hydra Head bằng nhiều cách khác nhau. Hai hành động thường gây nhầm lẫn là Decommit và Fanout. Hãy phân tích sự khác nhau giữa hai cơ chế này và giải thích trong những trường hợp nào nên sử dụng từng hành động.

Trong câu trả lời, hãy làm rõ:

- Mục đích của từng thao tác.
- Trạng thái Hydra Head yêu cầu trước khi thực hiện.
- Ảnh hưởng của hành động tới những người tham gia khác.
- Kết quả cuối cùng trên Layer-1 sau khi thực hiện.

### 💡 Gợi ý

Hãy xem xét các câu hỏi sau:

- Hydra Head có tiếp tục hoạt động sau thao tác này hay không?
- Người dùng muốn rút tiền cá nhân hay muốn kết thúc toàn bộ phiên Hydra?
- Khi nào trạng thái OPEN, CLOSED hoặc FANOUT_POSSIBLE xuất hiện?
- Dữ liệu nào sẽ được ghi nhận lên Cardano Layer-1?

Ngoài ra, hãy so sánh:

- Tính linh hoạt của Decommit.
- Vai trò của Fanout trong việc hoàn tất phiên giao dịch Hydra.

<details>
<summary>Đáp án</summary>

- **Decommit**: Rút một phần hoặc toàn bộ ADA ra khỏi Hydra Head về Layer-1 **khi Head vẫn đang OPEN**. Dùng khi muốn rút tiền mà vẫn giữ Head hoạt động.
- **Fanout**: Đóng hoàn toàn Hydra Head, phân phối tất cả tài sản còn lại cho các participants và ghi final state lên Layer-1. Chỉ thực hiện được khi Head ở trạng thái `FANOUT_POSSIBLE`.

👉 Kết luận: Decommit linh hoạt hơn, Fanout dùng để kết thúc phiên Hydra.

</details>

---

## ✅ Bài 5: Đo lường và Đánh giá hiệu suất

### 📌 Đề bài

Một trong những mục tiêu quan trọng của Hydra là cải thiện khả năng mở rộng của Cardano thông qua các giao dịch off-chain tốc độ cao. Để chứng minh hệ thống hoạt động hiệu quả, cần tiến hành đo lường và đánh giá nhiều chỉ số khác nhau trong quá trình kiểm thử.

Hãy liệt kê các chỉ số hiệu suất quan trọng cần theo dõi khi kiểm thử Hydra TipJar DApp và giải thích vì sao mỗi chỉ số lại có ý nghĩa đối với trải nghiệm người dùng.

Trong câu trả lời, hãy phân tích:

- Chỉ số nào phản ánh tốc độ giao dịch.
- Chỉ số nào phản ánh khả năng mở rộng.
- Chỉ số nào phản ánh chi phí sử dụng hệ thống.
- Chỉ số nào phản ánh độ ổn định và độ tin cậy.

### 💡 Gợi ý

Có thể tập trung vào các chỉ số sau:

- Thời gian phản hồi sau mỗi giao dịch.
- Thời gian cập nhật dữ liệu trên giao diện.
- Số lượng giao dịch xử lý được trong một khoảng thời gian.
- Tỷ lệ giao dịch thành công và thất bại.
- Chi phí phát sinh trên Layer-1.
- Mức sử dụng tài nguyên của hệ thống.
- Trải nghiệm người dùng khi tương tác liên tục với Dashboard.

Hãy thử so sánh kết quả giữa:

- Giao dịch trực tiếp trên Cardano Layer-1.
- Giao dịch thực hiện bên trong Hydra Head.

Từ đó đánh giá liệu Hydra có thực sự mang lại lợi ích về tốc độ, chi phí và khả năng mở rộng cho mô hình micropayment của TipJar hay không.

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
