# 📝 Bài tập - Chapter 03: Video 09

---

## ✅ Bài 1: Bài toán TipJar trên Web3

### 📌 Đề bài

Giải thích **TipJar** là gì và tại sao đây là một use case điển hình cho Hydra?

### 💡 Gợi ý

- Creator economy
- Micropayment
- Tần suất cao, giá trị nhỏ

<details>
<summary>Đáp án</summary>

**TipJar** là mô hình cho phép người dùng gửi khoản tiền tip (ủng hộ) nhỏ trực tiếp đến nhà sáng tạo nội dung mà không qua trung gian.

- Đặc điểm: giao dịch giá trị nhỏ (micro-transaction) nhưng tần suất rất cao (livestream, real-time interaction).
- Đây là use case điển hình cho Hydra vì cần **high throughput + low latency + low cost**.

👉 Kết luận: TipJar là hệ thống thanh toán P2P (ngang hàng) đòi hỏi hiệu năng realtime.

</details>

---

## ✅ Bài 2: Hạn chế của Layer-1 với TipJar

### 📌 Đề bài

Phân tích **3 hạn chế chính** khi triển khai TipJar trực tiếp trên Cardano Layer-1.

### 💡 Gợi ý

- Chi phí
- Độ trễ
- Khả năng mở rộng

<details>
<summary>Đáp án</summary>

### 1. Chi phí giao dịch cao
- Mỗi tip nhỏ vẫn phải trả phí L1 → không kinh tế.
- Ví dụ: tip 2 ADA nhưng phí chiếm 30-50%.

### 2. Độ trễ cao (Latency)
- Phải chờ block confirmation (~20s) → phá vỡ trải nghiệm realtime.
- Ví dụ: tip trong livestream không hiển thị ngay.

### 3. Khả năng mở rộng hạn chế
- TPS thấp + tắc nghẽn khi nhiều người tip cùng lúc.
- Ví dụ: event lớn → mạng chậm, phí tăng vọt.

👉 Kết luận: Layer-1 phù hợp giao dịch giá trị lớn, tần suất thấp, không phù hợp micropayment realtime.

</details>

---

## ✅ Bài 3: Vai trò của Hydra trong TipJar

### 📌 Đề bài

Hydra giải quyết những vấn đề của TipJar trên Layer-1 như thế nào?

### 💡 Gợi ý

- Off-chain
- Hydra Head
- Realtime

<details>
<summary>Đáp án</summary>

- Tạo **Hydra Head** để xử lý giao dịch **off-chain**.
- Các tip được thực hiện gần như tức thì (low latency).
- Phí cực thấp vì không cần ghi nhận từng transaction lên L1.
- Chỉ commit trạng thái cuối (final state) lên Layer-1.

👉 Kết quả: Mang lại trải nghiệm realtime, chi phí gần như miễn phí cho micropayment.

</details>

---

## ✅ Bài 4: Yêu cầu kỹ thuật của TipJar

### 📌 Đề bài

Liệt kê và giải thích **3 yêu cầu kỹ thuật cốt lõi** mà hệ thống TipJar cần có.

### 💡 Gợi ý

- Throughput
- Latency
- Cost

<details>
<summary>Đáp án</summary>

### 1. High Throughput (Thông lượng cao)
- Xử lý hàng trăm/thousands giao dịch nhỏ trong thời gian ngắn.

### 2. Low Latency (Độ trễ thấp)
- Xác nhận gần như ngay lập tức để hỗ trợ realtime interaction.

### 3. Low Cost (Chi phí thấp)
- Phí phải gần bằng 0 vì giá trị mỗi tip rất nhỏ.

👉 Nếu thiếu một trong ba yếu tố, mô hình TipJar sẽ không hiệu quả.

</details>

---

## ✅ Bài 5: So sánh Layer-1 và Hydra trong TipJar

### 📌 Đề bài

So sánh việc triển khai TipJar trên **Layer-1** và **Hydra**. Điểm mạnh/yếu của từng bên?

### 💡 Gợi ý

- Tốc độ
- Chi phí
- Bảo mật
- Trải nghiệm người dùng

<details>
<summary>Đáp án</summary>

| Tiêu chí          | Layer-1                  | Hydra                          |
|-------------------|--------------------------|--------------------------------|
| Tốc độ            | Chậm (~20s/block)        | Gần realtime                   |
| Chi phí           | Cao                      | Rất thấp / gần như miễn phí    |
| Bảo mật           | Cao                      | Cao (kế thừa L1)               |
| Trải nghiệm UX    | Kém (delay, phí)         | Tốt (mượt mà, realtime)        |

**Kết luận**: Hydra giữ được bảo mật của Layer-1 nhưng khắc phục hoàn toàn các hạn chế về hiệu năng, rất phù hợp cho TipJar và các DApp realtime khác (game, micropayment…).

</details>

---