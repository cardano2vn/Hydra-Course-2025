# 📝 Bài tập - Chapter 04: Video 11-1

---

## ✅ Bài 1: Mục tiêu của việc thiết lập môi trường

### 📌 Đề bài

Giải thích tại sao việc thiết lập môi trường phát triển là bước quan trọng nhất khi xây dựng Hydra DApp (TipJar). Nêu ra 3 lợi ích chính.

### 💡 Gợi ý

- Ổn định
- Hiệu suất
- Giảm lỗi

<details>
<summary>Đáp án</summary>

Việc thiết lập môi trường tốt giúp xây dựng nền tảng vững chắc cho toàn bộ dự án.

### 3 lợi ích chính:

1. **Tính ổn định & dễ mở rộng** — Tránh lỗi cấu hình khi dự án lớn.
2. **Tối ưu hiệu suất phát triển** — Giảm thời gian debug môi trường.
3. **Giảm thiểu rủi ro triển khai** — Đảm bảo code chạy nhất quán từ local đến production.

👉 Kết luận: Môi trường tốt = nền tảng cho On-chain + Off-chain phát triển hiệu quả.

</details>

---

## ✅ Bài 2: Tech Stack chính

### 📌 Đề bài

Liệt kê và giải thích vai trò của các công cụ chính trong stack phát triển TipJar (Bun, Next.js, Aiken).

### 💡 Gợi ý

- Runtime
- Framework
- Smart Contract Language

<details>
<summary>Đáp án</summary>

- **Bun**: JavaScript runtime + package manager nhanh, all-in-one (thay thế Node.js + npm).
- **Next.js**: Framework frontend (React) để xây dựng giao diện người dùng, hỗ trợ App Router, SSR, API routes.
- **Aiken**: Ngôn ngữ chuyên biệt để viết smart contract trên Cardano, tối ưu tốc độ biên dịch và dễ kiểm thử.

👉 Kết luận: Stack hiện đại giúp cân bằng giữa tốc độ phát triển, hiệu năng và bảo mật.

</details>

---

## ✅ Bài 3: Cài đặt Bun

### 📌 Đề bài

Mô tả cách cài đặt Bun và lý do Bun được chọn thay vì Node.js truyền thống trong dự án Hydra.

### 💡 Gợi ý

- Lệnh cài đặt
- All-in-one
- Hiệu năng

<details>
<summary>Đáp án</summary>

**Lệnh cài đặt**:

```bash
curl -fsSL https://bun.sh/install | bash
```

Lý do chọn Bun:

Tốc độ cao (dùng JavaScriptCore + Zig).
All-in-one: Runtime + Package Manager + Bundler + Test Runner.
Giảm số lượng công cụ cần cài đặt riêng lẻ.

👉 Kết luận: Bun giúp developer experience tốt hơn, phù hợp cho full-stack Web3 development.

</details>

---

## ✅ Bài 4: Tạo dự án Next.js & Cài Aiken

### 📌 Đề bài

Viết lệnh và mô tả quy trình tạo dự án Next.js cho TipJar, sau đó cài đặt Aiken.

### 💡 Gợi ý

- bun create next-app
- aiken install
- Cấu trúc thư mục

<details>
<summary>Đáp án</summary>

**Lệnh cài đặt**:

Tạo Next.js:

```bash
bun create next-app@latest tipjar
cd tipjar
bun dev
```

Cài Aiken (theo hướng dẫn chính thức):

- Cài Bun trước.
- Cài Aiken theo tài liệu aiken-lang.org.
- Kiểm tra: aiken --version

Cấu trúc cơ bản: app/, components/, validators/ (cho Aiken), v.v.
👉 Kết luận: Next.js xử lý Frontend + API, Aiken xử lý On-chain logic.

</details>

## ✅ Bài 4: Thư viện Aiken Assist & eUTxO

### 📌 Đề bài

Giải thích vai trò của thư viện Aiken Assist và mô hình eUTxO trong việc phát triển smart contract cho TipJar.

### 💡 Gợi ý

- Package add
- Extended UTxO
- Logic smart contract

<details>
<summary>Đáp án</summary>

- Aiken Assist: Thư viện hỗ trợ cung cấp hàm tiện ích, cấu trúc dữ liệu sẵn → giúp viết validator nhanh hơn, giảm lỗi.

```bash
aiken packages add logical-mechanism/assist --version v0.5.1
```

- eUTxO (Extended UTxO): Mô hình cốt lõi của Cardano. Mỗi output chứa dữ liệu + script. Smart contract hoạt động dựa trên việc consume & produce UTxO.

👉 Kết luận: Hiểu eUTxO + dùng thư viện Assist là nền tảng để viết smart contract hiệu quả cho Hydra DApp.

</details>
