# 📝 Bài tập - Chapter 03: Video 09

---

## ✅ Bài 1: Bài toán TipJar trên Web3

### 📌 Đề bài

Trong nền kinh tế sáng tạo nội dung (Creator Economy), các nhà sáng tạo như streamer, YouTuber, blogger hoặc nghệ sĩ thường nhận được các khoản ủng hộ trực tiếp từ người hâm mộ dưới hình thức tip. Những khoản tip này thường có giá trị nhỏ (thường từ vài xu đến vài đô la/cryptocoin) nhưng được thực hiện với tần suất rất cao, đặc biệt trong các sự kiện livestream hoặc các hoạt động tương tác thời gian thực.

Ví dụ thực tế: Trong một buổi livestream kéo dài 2 giờ, một streamer có thể nhận được hàng trăm hoặc hàng nghìn khoản tip từ các người hâm mộ khác nhau. Mỗi khoản tip có thể chỉ là 0.5 ADA, 1 ADA, hoặc 2 ADA, nhưng lượng giao dịch tích lũy sẽ rất lớn.

Hãy tìm hiểu và phân tích mô hình TipJar trong Web3. Tại sao đây được xem là một trong những use case tiêu biểu và quan trọng nhất của Hydra trên Cardano? Trong câu trả lời của bạn, hãy liên hệ đến:

1. **Định nghĩa rõ ràng** mô hình TipJar và các đặc điểm chính
2. **Phân tích các đặc điểm giao dịch**: loại giao dịch (micro-transaction hay macro-transaction?), giá trị trung bình, tần suất, thời gian xảy ra
3. **Xác định các yêu cầu về hiệu năng**: tốc độ xử lý cần đạt bao nhiêu TPS (Transaction Per Second)? Độ trễ tối đa chấp nhận được là bao lâu?
4. **Đánh giá trải nghiệm người dùng**: nếu hệ thống chậm hoặc phí cao, điều này sẽ ảnh hưởng thế nào đến người dùng và nhà sáng tạo?

### 💡 Gợi ý

- **Nhu cầu kinh tế**: TipJar giải quyết nhu cầu gì trong Creator Economy? Tại sao người hâm mộ muốn gửi tip và nhà sáng tạo muốn nhận tip?
- **Đặc điểm giá trị**: Giá trị trung bình của mỗi giao dịch tip thường lớn hay nhỏ so với các giao dịch crypto thông thường?
- **Sự kiện cao điểm**: Điều gì xảy ra nếu hàng nghìn người dùng cùng gửi tip trong một khoảng thời gian ngắn (ví dụ: 5 phút đầu của buổi livestream, hoặc khi streamer mở giveaway)?
- **Các yêu cầu kỹ thuật**: Liệt kê chi tiết các yêu cầu về tốc độ xử lý, chi phí giao dịch, khả năng mở rộng, độ trễ chấp nhận được
- **Tại sao Hydra lại phù hợp**: Dựa vào các yêu cầu trên, hãy giải thích tại sao Layer-1 không phù hợp và Hydra lại là giải pháp tối ưu

<details>
<summary>Đáp án</summary>

### Định nghĩa TipJar

**TipJar** là mô hình cho phép người dùng gửi khoản tiền tip (ủng hộ) nhỏ trực tiếp đến nhà sáng tạo nội dung mà không qua trung gian. Đây là một hình thức thanh toán P2P (ngang hàng) được thiết kế đặc biệt cho các giao dịch giá trị nhỏ nhưng tần suất cao.

### Đặc điểm giao dịch

- **Loại giao dịch**: Micro-transaction (giao dịch vi mô)
- **Giá trị trung bình**: Rất nhỏ (0.5-5 ADA, khoảng 0.2-2 USD)
- **Tần suất**: Rất cao (hàng trăm/ngàn giao dịch trong vài giờ)
- **Thời gian xảy ra**: Tập trung vào các thời điểm đỉnh (5 phút đầu livestream, khi streamer tương tác, event đặc biệt)
- **Số lượng người gửi**: Rất nhiều (hàng ngàn người cùng lúc)

### Yêu cầu về hiệu năng

1. **Throughput cao**: Cần xử lý 1,000-10,000 TPS (tùy theo sự kiện)
2. **Latency thấp**: Độ trễ dưới 1-2 giây (nên là milliseconds để realtime)
3. **Chi phí gần bằng 0**: Phí phải dưới 5-10% giá trị tip để có ý nghĩa kinh tế
4. **Instant confirmation**: Người dùng muốn thấy tip ngay, không chờ

### Tại sao Hydra là giải pháp tiêu biểu

- Layer-1 không thể đáp ứng được yêu cầu về hiệu năng (chậm, đắt, TPS thấp)
- Hydra được thiết kế chuyên biệt cho các use case này:
  - Xử lý off-chain → tốc độ cao, chi phí thấp
  - Commit state cuối → chỉ 1 giao dịch lên L1 thay vì hàng ngàn
  - Kế thừa bảo mật Cardano → an toàn như Layer-1 nhưng nhanh hơn

### Trải nghiệm người dùng

**Nếu dùng Layer-1**: Tệ → phí cao, chậm, tip mất lợi nhuận, streamer không khuyến khích, người hâm mộ không muốn gửi

**Nếu dùng Hydra**: Tốt → phí rẻ, nhanh, tip có lợi nhuận, streamer khuyến khích, người hâm mộ sẵn sàng gửi

👉 **Kết luận**: TipJar là hệ thống thanh toán P2P đòi hỏi hiệu năng realtime, và Hydra là giải pháp hoàn hảo cho use case này.

</details>

---

## ✅ Bài 2: Hạn chế của Layer-1 với TipJar

### 📌 Đề bài

Nếu chúng ta cố gắng triển khai TipJar trực tiếp trên Cardano Layer-1 (blockchain gốc), hệ thống sẽ gặp phải những hạn chế và vấn đề lớn. Phân tích chi tiết **3 hạn chế chính** (hoặc hơn nếu bạn tìm được) khi triển khai TipJar trực tiếp trên Cardano Layer-1. Đối với mỗi hạn chế, hãy giải thích nguyên nhân, lượng hoá vấn đề, tác động đến người dùng, và so sánh với nhu cầu của TipJar.

### 💡 Gợi ý

- **Chi phí giao dịch**: Mỗi tip nhỏ cũng phải trả phí Layer-1. Chi phí này được tính như thế nào? Nếu một khoản tip là 2 ADA nhưng phí là 0.5 ADA, tỷ lệ phí sẽ là bao nhiêu phần trăm? Điều này có kinh tế không?
- **Độ trễ cao (Latency)**: Layer-1 cần bao lâu để xác nhận một giao dịch? Nếu một streamer đang livestream và nhận được tip, điều gì xảy ra nếu tip không hiển thị ngay?
- **Khả năng mở rộng hạn chế**: Layer-1 hiện tại xử lý được bao nhiêu TPS? Khi có sự kiện lớn, điều gì xảy ra với mạng? Phí tăng lên hay độ trễ tăng lên?

<details>
<summary>Đáp án</summary>

### 1. Chi phí giao dịch cao

**Nguyên nhân**: Mỗi giao dịch trên Layer-1 đều cần được xác minh bởi mạng blockchain, do đó phải trả phí.

**Lượng hoá**:

- Phí Layer-1 trên Cardano hiện tại: ~0.16-0.5 ADA mỗi giao dịch (tuỳ độ phức tạp)
- Nếu tip = 2 ADA, phí = 0.5 ADA → Tỷ lệ phí = 0.5/2 = 25% → **không kinh tế**
- Nếu tip = 1 ADA, phí = 0.5 ADA → Tỷ lệ phí = 50% → **rất tồi**
- Streamer muốn nhận được net 1 ADA, nhưng phí ăn mất một nửa

**Tác động đến người dùng**:

- Người hâm mộ: "Tại sao phải gửi tip nếu phí ăn mất một nửa?"
- Streamer: "Tip nhỏ không có lợi nhuận, chỉ có tiền phí"
- Kết quả: TipJar trở nên không khả thi kinh tế

### 2. Độ trễ cao (Latency)

**Nguyên nhân**: Cardano Layer-1 cần xác nhận giao dịch qua cơ chế consensus Proof of Stake, mỗi block mất ~20 giây để tạo ra.

**Lượng hoá**:

- Thời gian xác nhận (1 block): ~20 giây
- Để "realtime confirmations", thường cần 2-3 blocks: ~40-60 giây
- So sánh: Hydra có thể xác nhận trong milliseconds (0.1-0.5 giây)

**Tác động đến người dùng**:

- Livestream là realtime, nhưng tip mất 40-60 giây để hiển thị
- Chat UI sẽ có delay → trải nghiệm kém
- Ví dụ: Streamer nói "cảm ơn tip của bạn" nhưng tip vẫn chưa hiển thị → khó xoay
- Mất đi "feel-good" moment của realtime interaction

### 3. Khả năng mở rộng hạn chế

**Nguyên nhân**: Cardano Layer-1 có giới hạn TPS (Transactions Per Second). Khi có nhiều giao dịch cùng lúc, mạng sẽ bị tắc nghẽn.

**Lượng hoá**:

- Cardano L1 TPS: ~250-300 TPS (trong điều kiện tối ưu)
- Một sự kiện lớn: 50,000 người xem, mỗi người gửi 5 tip/giờ = 250,000 giao dịch trong 2 giờ
- Khi giao dịch tăng vọt → mempool tắc → phí tự động tăng
- Phí có thể tăng từ 0.5 ADA lên 1-2 ADA đơn giản vì mạng bận

**Tác động đến người dùng**:

- Event lớn → mạng chậm, phí tăng vọt
- Người hâm mộ đợi lâu hơn hoặc từ bỏ tip
- Streamer nhận tip chậm hơn bình thường
- Kết quả: Chỉ khi event lớn, TipJar lại gặp vấn đề lớn nhất

### Kết luận

Layer-1 được thiết kế cho **giao dịch giá trị lớn, tần suất thấp** (ví dụ: chuyển tiền, hợp đồng lớn). Nó **hoàn toàn không phù hợp** với micropayment realtime như TipJar vì:

- Phí cao → không kinh tế cho tip nhỏ
- Độ trễ cao → không realtime
- TPS thấp → không scale được khi event lớn

</details>

---

## ✅ Bài 3: Vai trò của Hydra trong TipJar

### 📌 Đề bài

Hydra là một giải pháp Layer 2 được thiết kế để khắc phục các hạn chế của Layer-1. Hãy giải thích chi tiết cách Hydra hoạt động và cách nó giải quyết từng vấn đề của TipJar trên Layer-1. Bao gồm cơ chế off-chain, Hydra Head, xác nhận realtime, chi phí thấp, và cách kế thừa bảo mật từ Layer-1.

### 💡 Gợi ý

- **Off-chain processing**: Tại sao xử lý off-chain lại giúp loại bỏ phí và tốc độ?
- **Hydra Head Architecture**: Hydra Head là gì? Nó được kiểm soát bởi ai? Có bao nhiêu participant?
- **Realtime confirmation**: Giao dịch có thể được xác nhận trong milliseconds thay vì seconds tại sao?
- **Chi phí gần như miễn phí**: Phí được tính như thế nào trong Hydra?
- **Kế thừa bảo mật từ Layer-1**: Mặc dù xử lý off-chain, Hydra vẫn an toàn như Layer-1. Cơ chế này hoạt động như thế nào?
- **Ứng dụng thực tế**: Trong bối cảnh TipJar, khi nào thì Hydra Head được khởi tạo, làm việc, và đóng lại?

<details>
<summary>Đáp án</summary>

### Hydra Head là gì?

**Hydra Head** là một "miniature blockchain" tạm thời nằm ngoài Layer-1 Cardano. Nó được kiểm soát bởi một nhóm participants (thường là 2-5 người) và hoạt động độc lập với Layer-1 khi đang hoạt động.

### Cách Hydra giải quyết các vấn đề

#### 1. Giải quyết vấn đề Chi phí

**Cơ chế**:

- Giao dịch được xử lý **off-chain** trong Hydra Head
- Không cần ghi nhận từng transaction lên Layer-1
- Chỉ commit **trạng thái cuối cùng** (final state) lên L1 → chỉ 1 giao dịch thay vì 1,000

**Lợi ích**:

- Thay vì 1,000 tip × 0.5 ADA/cái = 500 ADA phí → chỉ 1 lần commit = 0.5 ADA
- Chi phí trên mỗi tip giảm từ 0.5 ADA xuống còn 0.0005 ADA (1000x rẻ hơn!)
- Tip 2 ADA vẫn có lợi nhuận cho streamer

#### 2. Giải quyết vấn đề Độ trễ

**Cơ chế**:

- Các giao dịch trong Hydra Head được xác nhận ngay lập tức (không cần chờ block)
- Chỉ khi "close" Hydra Head thì mới cần chờ Layer-1 (~20 giây)

**Lợi ích**:

- Tip được xác nhận trong **milliseconds** (0.1-0.5 giây) thay vì 40-60 giây
- Trải nghiệm realtime như Visa/PayPal
- Chat UI hiển thị tip ngay lập tức

#### 3. Giải quyết vấn đề Khả năng mở rộng

**Cơ chế**:

- Hydra Head có thể xử lý **hàng ngàn TPS** (tùy số participants)
- Mỗi Hydra Head là một "silo" độc lập → có thể tạo nhiều Hydra Heads song song
- Ví dụ: 3 streamer lớn, mỗi người một Hydra Head → tổng cộng 10,000 TPS

**Lợi ích**:

- Event lớn không ảnh hưởng đến các Hydra Heads khác
- Không có tắc nghẽn, không có phí tăng vọt

### Cách Hydra kế thừa bảo mật từ Layer-1

**Cơ chế**:

1. Khi mở Hydra Head, participants phải commit UTXO (đặt tiền cược) trên Layer-1
2. Tất cả giao dịch trong Hydra Head được lưu trong một **ledger local**
3. Nếu một participant cố gắng gian lận (ví dụ: gửi state sai), các participants khác có thể **challenge** trên Layer-1
4. Layer-1 sẽ xác minh ai đúng, ai sai → người gian lận sẽ mất tiền cược

**Kết quả**: Hydra Head vừa nhanh, vừa an toàn như Layer-1 (vì có Layer-1 "đứng phía sau")

### Ứng dụng thực tế cho TipJar

**Quy trình**:

1. **Trước livestream**: Streamer mở một Hydra Head với M participant (có thể là: streamer + platform + bank)
2. **Trong livestream**:
   - Người hâm mộ gửi tip vào Hydra Head
   - Tip được xác nhận ngay lập tức
   - Chat UI hiển thị tip realtime
3. **Sau livestream**: Streamer "close" Hydra Head
   - Final state được commit lên Layer-1
   - Tiền tip chuyển vào ví của streamer

👉 **Kết quả**: Trải nghiệm realtime như Visa, chi phí gần như miễn phí, bảo mật như Layer-1.

</details>

---

## ✅ Bài 4: Yêu cầu kỹ thuật của TipJar

### 📌 Đề bài

Một hệ thống TipJar thành công không phải chỉ cần công nghệ tốt mà còn phải đáp ứng được các yêu cầu kỹ thuật cụ thể. Nếu thiếu một trong các yêu cầu này, hệ thống sẽ không hoạt động hiệu quả.

Listê kê và giải thích chi tiết **3 yêu cầu kỹ thuật cốt lõi** mà hệ thống TipJar cần phải có. Với mỗi yêu cầu, hãy:

1. Định nghĩa rõ ràng
2. Giải thích tại sao lại quan trọng cho TipJar
3. Cung cấp số liệu cụ thể (mức đạt bao nhiêu)
4. Giải thích hậu quả nếu không đáp ứng
5. Phân tích mối liên hệ giữa các yêu cầu

### 💡 Gợi ý

- **Throughput (Thông lượng)**: Khoảng 1,000-10,000 TPS tùy theo sự kiện
- **Latency (Độ trễ)**: Dưới 1-2 giây, lý tưởng là milliseconds
- **Cost (Chi phí)**: Phí dưới 5-10% giá trị tip để có ý nghĩa kinh tế

<details>
<summary>Đáp án</summary>

### 1. High Throughput (Thông lượng cao)

**Định nghĩa**: Khả năng xử lý bao nhiêu giao dịch trong một đơn vị thời gian, thường tính bằng TPS (Transaction Per Second).

**Tại sao quan trọng**:

- TipJar không phải 1-2 giao dịch mà là hàng trăm/ngàn
- Một buổi livestream 2 giờ với 50,000 người xem, mỗi người 5 tip/giờ = 250,000 giao dịch
- Nếu không thể xử lý nhanh, hệ thống sẽ quá tải

**Số liệu cụ thể**:

- Layer-1 Cardano: ~250-300 TPS (quá thấp)
- Hydra Head: ~1,000-10,000 TPS (đủ tốt)
- Yêu cầu TipJar: Tối thiểu 1,000 TPS cho event lớn

**Hậu quả nếu không đạt**:

- Hệ thống quá tải → giao dịch chậm → phí tăng vọt
- Người hâm mộ không thể gửi tip trong thời gian cao điểm
- Streamer mất doanh thu

**Mối liên hệ**: Throughput cao giúp latency thấp và chi phí thấp hơn

### 2. Low Latency (Độ trễ thấp)

**Định nghĩa**: Khoảng thời gian từ khi gửi giao dịch đến khi nhận được xác nhận.

**Tại sao quan trọng**:

- Livestream là realtime → người hâm mộ muốn thấy tip ngay
- Nếu chờ 30-60 giây, trải nghiệm "bị hỏng"
- Ví dụ: Streamer nói "cảm ơn tip" nhưng tip vẫn chưa hiển thị → khó xoay

**Số liệu cụ thể**:

- Layer-1 Cardano: ~20-60 giây (quá lâu)
- Hydra Head: ~0.1-0.5 giây (rất tốt)
- Yêu cầu TipJar: Dưới 2 giây chấp nhận được, lý tưởng dưới 500ms

**Hậu quả nếu không đạt**:

- Mất đi "feel-good" moment của realtime interaction
- Trải nghiệm giống Skype call cũ (video delay, âm thanh trễ)
- Người hâm mộ không sẵn sàng gửi tip lần 2

**Mối liên hệ**: Latency thấp phụ thuộc vào throughput cao (không tắc nghẽn)

### 3. Low Cost (Chi phí thấp)

**Định nghĩa**: Phí giao dịch trên mỗi tip phải rất thấp để tip vẫn có ý nghĩa kinh tế.

**Tại sao quan trọng**:

- Tip nhỏ (1-5 ADA) không thể chịu phí cao
- Nếu phí 0.5 ADA mỗi tip 1 ADA → streamer chỉ nhận 0.5 ADA → không khuyến khích
- Người hâm mộ không muốn phí ăn mất 50% tip

**Số liệu cụ thể**:

- Layer-1 Cardano: ~0.16-0.5 ADA/giao dịch (quá cao, ~25-50% tip)
- Hydra Head: ~0.0001-0.001 ADA/giao dịch (rất thấp, ~0.01% tip)
- Yêu cầu TipJar: Phí dưới 5-10% giá trị tip (ví dụ: tip 2 ADA, phí < 0.2 ADA)

**Hậu quả nếu không đạt**:

- Streamer: "Phí ăn mất 50% tip, không có lợi nhuận, hủy TipJar"
- Người hâm mộ: "Tại sao gửi tip nếu phí cao?"
- TipJar trở nên không khả thi kinh tế

**Mối liên hệ**: Chi phí thấp phụ thuộc vào throughput cao (không tắc nghẽn) và latency thấp (xử lý off-chain)

### Kết luận

**Ba yêu cầu này là cân bằng**:

- Throughput cao → latency thấp → chi phí thấp
- Nếu thiếu một, toàn bộ mô hình TipJar sẽ không hiệu quả
- Ví dụ:
  - Nếu chỉ throughput cao nhưng latency cao → không realtime
  - Nếu chỉ latency thấp nhưng chi phí cao → không kinh tế
  - Nếu chỉ chi phí thấp nhưng throughput thấp → không scale được

**Điểm khác biệt giữa Layer-1 và Hydra**:

- Layer-1: ❌ Throughput thấp, Latency cao, Chi phí cao
- Hydra: ✅ Throughput cao, Latency thấp, Chi phí thấp

</details>

---

## ✅ Bài 5: So sánh Layer-1 và Hydra trong TipJar

### 📌 Đề bài

Có hai cách để triển khai TipJar: sử dụng Layer-1 trực tiếp hoặc sử dụng Hydra Layer-2. Mỗi cách có ưu và nhược điểm riêng.

Hãy tạo một **bảng so sánh toàn diện** giữa việc triển khai TipJar trên **Layer-1** và **Hydra**. Bao gồm tối thiểu 6-7 tiêu chí khác nhau, với giải thích chi tiết cho mỗi tiêu chí.

Dựa vào bảng so sánh, hãy rút ra kết luận:

1. Giải pháp nào tốt hơn cho TipJar và tại sao?
2. Có trường hợp nào Layer-1 được sử dụng không?
3. Có trường hợp nào Hydra không phù hợp không?
4. Có thể kết hợp cả hai không?

### 💡 Gợi ý

**Các tiêu chí so sánh**:

- Tốc độ xử lý giao dịch
- Chi phí giao dịch
- Bảo mật
- Khả năng mở rộng
- Trải nghiệm người dùng (UX)
- Độ phức tạp triển khai
- Finality (độ chắc chắn)

<details>
<summary>Đáp án</summary>

| Tiêu chí           | Layer-1                      | Hydra                                      |
| ------------------ | ---------------------------- | ------------------------------------------ |
| **Tốc độ**         | Chậm (~20-60 giây)           | Rất nhanh (~100-500ms)                     |
| **Chi phí**        | Cao (0.16-0.5 ADA/giao dịch) | Rất thấp (~0.0001-0.001 ADA/giao dịch)     |
| **Bảo mật**        | Cao (full blockchain)        | Cao (kế thừa Layer-1)                      |
| **Throughput**     | Giới hạn (~250-300 TPS)      | Cao (~1,000-10,000 TPS)                    |
| **Trải nghiệm UX** | Kém (delay 1 phút, phí cao)  | Tốt (mượt mà, realtime)                    |
| **Độ phức tạp**    | Đơn giản (on-chain)          | Phức tạp hơn (cần setup Hydra Head)        |
| **Finality**       | Lâu (cần chờ many blocks)    | Nhanh (trong Hydra Head), sau đó commit L1 |

### Phân tích chi tiết từng tiêu chí

**1. Tốc độ xử lý giao dịch**

- Layer-1: ~20-60 giây để xác nhận (quá lâu cho livestream)
- Hydra: ~100-500 milliseconds (realtime như Visa)
- **Kết quả**: Hydra thắng lớn

**2. Chi phí giao dịch**

- Layer-1: 0.16-0.5 ADA/giao dịch (=25-50% tip nhỏ)
- Hydra: 0.0001-0.001 ADA/giao dịch (~0.01% tip)
- **Kết quả**: Hydra thắng 1000x lần

**3. Bảo mật**

- Layer-1: Bảo mật tối đa (toàn bộ blockchain xác minh)
- Hydra: Bảo mật cao (Layer-1 đứng phía sau, có cơ chế challenge)
- **Kết quả**: Cả hai bảo mật tốt, L1 hơn chút xíu

**4. Khả năng mở rộng (Throughput)**

- Layer-1: ~250-300 TPS (quá thấp, tắc nghẽn khi event lớn)
- Hydra: ~1,000-10,000 TPS (scalable, có thể tạo nhiều Hydra Heads)
- **Kết quả**: Hydra thắng lớn

**5. Trải nghiệm người dùng (UX)**

- Layer-1: Chậm (1 phút chờ), phí cao → người hâm mộ từ bỏ tip
- Hydra: Nhanh (realtime), phí rẻ → người hâm mộ sẵn sàng tip
- **Kết quả**: Hydra tốt hơn rất nhiều

**6. Độ phức tạp triển khai**

- Layer-1: Đơn giản (chỉ cần smart contract on-chain)
- Hydra: Phức tạp hơn (cần setup Hydra Head, quản lý participants, close state)
- **Kết quả**: Layer-1 dễ hơn, nhưng nó không hoạt động được :(

**7. Finality**

- Layer-1: Finality lâu (cần chờ many blocks để chắc chắn, ~10 phút)
- Hydra: Finality nhanh trong Hydra Head (realtime), sau đó commit L1
- **Kết quả**: Hydra nhanh hơn

### Kết luận

**Hydra thắng Layer-1 trong 6/7 tiêu chí cho TipJar.**

Chỉ có 1 tiêu chí Layer-1 hơn: "Độ phức tạp" (dễ hơn). Nhưng dễ hơn để làm cái gì **KHÔNG HOẠT ĐỘNG** có ý gì?

**Giải pháp tốt nhất: Hydra**

### Trường hợp Layer-1 được sử dụng

1. **Giao dịch giá trị lớn**: Ví dụ: streamer rút tiền cuối tháng (1,000 ADA) → chấp nhận phí cao
2. **Giao dịch ít tần suất**: Ví dụ: thanh toán hợp đồng sáng tác (1 lần/tháng)
3. **Yêu cầu bảo mật tuyệt đối**: Ví dụ: giao dịch pháp lý (cần full blockchain history)

### Trường hợp Hydra không phù hợp

1. **Số lượng participant ít**: Nếu chỉ 2-3 người tham gia, có thể Layer-1 đủ
2. **Yêu cầu bảo mật siêu cao**: Nếu cần tuyệt đối không có sai sót, Layer-1 an toàn hơn
3. **Không cần realtime**: Ví dụ: thanh toán hàng tháng không cần realtime

### Kết hợp cả hai

**Giải pháp hybrid tốt nhất**:

1. **Trong livestream**: Dùng Hydra Head cho tips realtime
2. **Cuối livestream**: Close Hydra Head → commit L1
3. **Rút tiền**: Streamer rút tiền từ L1 (giao dịch on-chain)

**Kết quả**: Lợi ích của cả hai, khắc phục nhược điểm của từng bên.

👉 **Kết luận tổng quát**: Hydra là giải pháp tối ưu cho TipJar. Layer-1 chỉ phù hợp cho giao dịch lớn, ít tần suất, hoặc yêu cầu bảo mật tuyệt đối.

</details>

---
