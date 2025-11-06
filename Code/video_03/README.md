<div align="center">

<img src="https://www.cardano2vn.io/_next/static/media/loading.db59b266.png" width="120" alt="Hydra Logo" />

# **Thiết lập môi trường phát triển Hydra**

**Công cụ, phụ thuộc và các thực tiễn tốt nhất**

[![Ubuntu](https://img.shields.io/badge/Ubuntu-22.04-orange?logo=ubuntu)](https://ubuntu.com/)
[![Cardano Node](https://img.shields.io/badge/Cardano%20Node-10.5.1-blue?logo=cardano)](https://github.com/IntersectMBO/cardano-node)
[![Hydra](https://img.shields.io/badge/Hydra-0.22.4-green)](https://hydra.family)
[![Mithril](https://img.shields.io/badge/Mithril-Sync%20in%2015%20min-blue)](https://mithril.network)
[![License: CC-BY-SA 4.0](https://img.shields.io/badge/License-CC--BY--SA%204.0-yellow.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![Systemd](https://img.shields.io/badge/Systemd-Service-blue?logo=systemd)](https://systemd.io/)
[![License: MIT](https://img.shields.io/badge/License-CC--BY--SA%204.0-yellow.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

---

</div>

# Giới thiệu

**Hydra** là giải pháp **Layer 2 scaling tiên phong** của hệ sinh thái **Cardano**, được thiết kế để xử lý **hàng nghìn giao dịch mỗi giây** với **chi phí gần bằng 0**, mà **không đánh đổi tính phi tập trung hay bảo mật** của blockchain gốc.

Dựa trên công nghệ **Isomorphic State Channels**, Hydra cho phép nhiều người tham gia mở **"Hydra Head"** — một kênh trạng thái riêng biệt — để thực hiện giao dịch **off-chain** nhanh chóng, chỉ định kỳ **settle** kết quả lên Cardano mainnet. Điều này biến Cardano từ một blockchain **chậm nhưng an toàn** thành nền tảng có khả năng **scale ngang** như các ứng dụng tài chính phi tập trung (DeFi), thanh toán vi mô, game blockchain, hay hệ thống ticketing.

> **Tại sao bạn cần môi trường phát triển Hydra?**
>
> - **Nghiên cứu**: Hiểu sâu về state channels, contest period, snapshotting.
> - **Phát triển dApp**: Xây dựng ứng dụng tận dụng tốc độ Hydra (DEX, NFT marketplace, payment gateway).
> - **Đóng góp mã nguồn**: Tham gia cải thiện giao thức tại [cardano-scaling/hydra](https://github.com/cardano-scaling/hydra).
> - **Triển khai node**: Chạy Hydra Head riêng hoặc tham gia mạng đa bên.

**Tài liệu này sẽ hướng dẫn bạn** — từ **một người mới** đến **một developer Hydra thực thụ** — qua các bước:

1. **Nắm bắt yêu cầu phần cứng để cài đặt và phát triển hydra**
1. **Mua & cấu hình VPS tối ưu** (Contabo + Singapore DC)

> **Mục tiêu cuối cùng**: Bạn sẽ có một **Hydra Head hoạt động hoàn toàn**, sẵn sàng để:
>
> - Gửi giao dịch Layer 2
> - Tích hợp API (`hydra-node`)
> - Mở rộng thành cụm 3+ node

---

# Yêu cầu hệ thống

Bảng dưới đây thể hiện cấu hình khuyến nghị cho từng mạng, bảo đảm Cardano Node hoạt động ổn định và đủ tài nguyên cho Hydra hoặc môi trường production.

| Thành phần       | Mainnet (Production) | Preprod (Staging) | Preview (Development) |
| ---------------- | -------------------- | ----------------- | --------------------- |
| **Hệ điều hành** | Ubuntu 22.04 LTS     | Ubuntu 22.04 LTS  | Ubuntu 22.04 LTS      |
| **CPU**          | 8 cores @ 3.0GHz+    | 6 cores @ 2.8GHz+ | 4 cores @ 2.5GHz+     |
| **RAM**          | **24 GB**            | **20 GB**         | 16 GB                 |
| **Ổ cứng**       | **250 GB NVMe**      | **150 GB SSD**    | 100 GB SSD            |
| **Mạng**         | 1 Gbps               | 500 Mbps          | 100 Mbps              |
| **ADA yêu cầu**  | **10–50 ADA**        | **5–20 tADA**     | **1–5 tADA**          |

---

# Hướng dẫn mua VPS trên Contabo

**Contabo** là nhà cung cấp VPS giá rẻ, đáng tin cậy, có trụ sở tại Đức. Phù hợp cho cá nhân, developer, hosting web, chạy bot, proxy, v.v.  
Website chính thức: [https://contabo.com](https://contabo.com)

---

## Bước 1: Đăng ký tài khoản

1. Truy cập: [https://contabo.com/en/vps/](https://contabo.com/en/vps/)
2. Nhấn **"Sign Up"** (góc trên bên phải).
3. Điền thông tin:
   - Email (phải hợp lệ)
   - Mật khẩu (≥8 ký tự, có chữ hoa, số, ký tự đặc biệt)
   - Tên + địa chỉ (dùng địa chỉ Việt Nam được)
4. Xác nhận email → Đăng nhập.

> **Đã có tài khoản?** → Đăng nhập trực tiếp.

---

## Bước 2: Chọn gói VPS

| Gói   | vCPU | RAM   | SSD    | Băng thông | Giá (ước tính)      |
| ----- | ---- | ----- | ------ | ---------- | ------------------- |
| VPS S | 4    | 8 GB  | 200 GB | 200 Mbps   | ~4.99 € (~120k VNĐ) |
| VPS M | 6    | 16 GB | 400 GB | 400 Mbps   | ~8.99 €             |
| VPS L | 8    | 30 GB | 800 GB | 600 Mbps   | ~13.99 €            |

1. Vào mục **VPS** → Chọn gói → **"Order Now"**
2. Lọc theo:
   - **Vị trí server**: Singapore (gần VN), Đức, Mỹ
   - **Hệ điều hành**: Ubuntu, Debian, CentOS (miễn phí), Windows (có phí license)

> **Mẹo**: Bắt đầu với gói nhỏ → nâng cấp sau nếu cần.

---

## Bước 3: Cấu hình thêm

Trong trang đặt hàng:

- Chọn **Data Center** (Singapore nếu cần tốc độ nhanh về VN)
- Chọn **OS** (khuyên dùng Ubuntu 22.04)
- Tùy chọn thêm:
  - [ ] Weekly Backup (+~2 €)
  - [ ] Additional IPv4 (+2 €/IP)
  - [ ] DDoS Protection (khuyến nghị)

→ Nhấn **"Continue to Checkout"**

---

## Bước 4: Thanh toán

Phương thức hỗ trợ:

- Thẻ Visa/Mastercard
- PayPal
- Chuyển khoản ngân hàng (SEPA/SWIFT)

> **Lưu ý**:
>
> - Giá tính bằng **EUR** (1 € ≈ 24.000 VNĐ)
> - VAT 19% có thể áp dụng (tùy quốc gia)
> - Thanh toán **hàng tháng**, hủy bất kỳ lúc nào

→ Điền thông tin → **"Place Order"**

---

## Bước 5: Kích hoạt & truy cập VPS

1. Nhận email xác nhận (5–30 phút)
2. VPS tự động cài đặt (1–2 giờ)
3. Vào **Control Panel** → **My VPS** → Xem:
   - IP Address
   - Username (`root`)
   - Mật khẩu

### Kết nối VPS

#### Linux/Mac (SSH)

```bash
ssh root@your-vps-ip
```
