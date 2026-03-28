# 📝 Bài tập – Kiến trúc Hydra (Nâng cao)

--

## ✅ Bài 1: Phân tích vòng đời Hydra Head

### 📌 Đề bài

Mô tả đầy đủ vòng đời Hydra Head và giải thích tại sao cần tuần tự các trạng thái.

### 💡 Gợi ý

- Idle → Init → Commit → Open → Close → Fanout

<details>
<summary>Đáp án</summary>

Lifecycle đảm bảo:

- Tính nhất quán
- Không mất tài sản
- Tránh race condition

Nếu bỏ Commit → không có tài sản để giao dịch

</details>

---

## ✅ Bài 2: Phân tích lỗi

### 📌 Đề bài

Xác định lỗi thuộc giai đoạn nào:

- Không commit UTxO
- Mất kết nối
- Signature sai
- Fanout fail

<details>
<summary>Đáp án</summary>

- Commit → thiếu UTxO
- Open → mất kết nối
- Close → signature sai
- Fanout → fail

</details>

---

## ✅ Bài 3: Operators vs Delegators

### 📌 Đề bài

So sánh vai trò và trả lời điều gì xảy ra nếu Delegator không ký.

<details>
<summary>Đáp án</summary>

- Operator: vận hành node
- Delegator: ký giao dịch

Không ký → giao dịch không hợp lệ

</details>

---

## ✅ Bài 4: Trust Model

### 📌 Đề bài

Hydra có trustless không?

<details>
<summary>Đáp án</summary>

- Không cần tin participant
- Tin Layer-1

Operator gian lận → bị từ chối state

</details>

---

## ✅ Bài 5: Rủi ro bảo mật

### 📌 Đề bài

Liệt kê rủi ro và cách xử lý

<details>
<summary>Đáp án</summary>

- Node crash → restart
- Network lỗi → retry
- Sai state → validate

</details>

---

## 🚀 Bonus

### 📌 Đề bài

Head bị treo ở Open, xử lý thế nào?

<details>
<summary>Đáp án</summary>

- Kiểm tra logs
- Restart node
- Resync state

</details>
