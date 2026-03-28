# 📝 Bài tập

---

## ✅ Bài 1: Phân tích yêu cầu hạ tầng

### 📌 Đề bài

Bạn được giao nhiệm vụ thiết lập môi trường chạy **Cardano Node + Hydra Node** cho môi trường **Preprod**.

Hãy đề xuất cấu hình phù hợp (CPU, RAM, Disk, Network, ADA) và giải thích lý do lựa chọn.

### 💡 Gợi ý

- Xem bảng cấu hình trong tài liệu
- Chú ý sự khác biệt giữa Mainnet / Preprod / Preview
- Tập trung vào yếu tố hiệu năng và chi phí

<details>
<summary>Cách giải</summary>
- CPU: 6 cores @ 2.8GHz+
- RAM: 20 GB
- Disk: 150 GB SSD
- Network: 500 Mbps
- ADA: 5–20 tADA

**Giải thích:**

- Preprod cần đủ mạnh để test gần giống production
- Không cần quá cao như Mainnet để tiết kiệm chi phí
- SSD đủ nhanh để sync blockchain ổn định
- RAM cao giúp tránh crash khi load cao

</details>

---

## ✅ Bài 2: So sánh VPS miễn phí và VPS trả phí

### 📌 Đề bài

So sánh VPS miễn phí và VPS trả phí trong việc phát triển Hydra.

Trả lời:

- Khi nào nên dùng VPS miễn phí?
- Khi nào bắt buộc dùng VPS trả phí?

### 💡 Gợi ý

- Nghĩ đến tài nguyên, uptime và độ ổn định
- Liên hệ với việc chạy node blockchain

<details>
<summary>Cách giải</summary>

**VPS miễn phí:**

- Dùng khi: học tập, test script, demo nhỏ
- Ưu điểm: miễn phí, setup nhanh
- Nhược điểm: tài nguyên thấp, không ổn định

**VPS trả phí:**

- Dùng khi: chạy Cardano Node, Hydra Node, production
- Ưu điểm: mạnh, ổn định, uptime 24/7
- Nhược điểm: tốn chi phí

👉 Kết luận:

- Miễn phí → learning
- Trả phí → production
</details>

---

## ✅ Bài 3: Quy trình tạo VPS trên Contabo

### 📌 Đề bài

Mô tả các bước chính để tạo và truy cập một VPS trên Contabo.

### 💡 Gợi ý

- Nhớ các bước: đăng ký → chọn gói → thanh toán → SSH

<details>
<summary>Cách giải</summary>

1. Đăng ký tài khoản Contabo
2. Chọn gói VPS (S/M/L)
3. Chọn:
   - Location (Singapore)
   - OS (Ubuntu 22.04)
4. Thanh toán
5. Nhận thông tin VPS (IP, root, password)
6. Kết nối SSH:

```bash
ssh root@your-vps-ip
```

## </details>

## ✅ Bài 4: Hiểu lệnh cập nhật hệ thống

### 📌 Đề bài

Giải thích ý nghĩa của lệnh:

```bash
sudo apt update && sudo apt upgrade -y
```

Tại sao bước này quan trọng khi chạy Cardano Node?

### 💡 Gợi ý

- Phân tích từng phần của lệnh
- Liên hệ đến stability và security

<details>
<summary>Cách giải</summary>

- `sudo`: chạy với quyền admin
- `apt update`: cập nhật danh sách package
- `apt upgrade -y`: nâng cấp toàn bộ package

**Tại sao quan trọng:**

- Tránh lỗi dependency khi build node
- Đảm bảo tương thích với Cardano & Hydra
- Vá lỗi bảo mật
- Giúp node chạy ổn định lâu dài
</details>

---

## ✅ Bài 5: Vai trò các công cụ cơ bản

### 📌 Đề bài

Giải thích vai trò của các công cụ sau trong quá trình setup Hydra:

- curl
- wget
- git
- jq

### 💡 Gợi ý

- Nghĩ đến việc download, API, và code

<details>
<summary>Cách giải</summary>

- `curl`: gọi API, download dữ liệu
- `wget`: tải file từ internet
- `git`: clone repository (Cardano, Hydra)
- `jq`: xử lý JSON (rất quan trọng khi làm việc với CLI/API)

👉 Ví dụ:

- Dùng `git` để clone hydra-node
- Dùng `jq` để parse output từ cardano-cli
</details>

---
