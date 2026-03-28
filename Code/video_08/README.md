<div align="center">

<img src="https://www.cardano2vn.io/_next/static/media/loading.db59b266.png" width="120" alt="Hydra Logo" />

# **Đánh giá và Chuẩn bị**

**Tóm tắt các bài học quan trọng và chuẩn bị nền tảng vững chắc để bước vào giai đoạn phát triển Hydra DApp một cách an toàn, ổn định và hiệu quả.**

[![Ubuntu](https://img.shields.io/badge/Ubuntu-22.04-orange?logo=ubuntu)](https://ubuntu.com/)
[![Cardano Node](https://img.shields.io/badge/Cardano%20Node-9.0.0%2B-blue?logo=cardano)](https://github.com/IntersectMBO/cardano-node)
[![Hydra Ready](https://img.shields.io/badge/Hydra-Ready-green?logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDBGRjAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAtMThjLTQuNDEgMC04IDMuNTktOCA4czMuNTkgOCA4IDggOC0zLjU5IDgtOHptMC0xNGMtMy4zMSAwLTYgMi42OS02IDZzMi42OSA2IDYgNiA2LTIuNjkgNi02em0wLTEyYy0yLjIxIDAtNCAxLjc5LTQgNHMxLjc5IDQgNCA0IDQtMS43OSA0LTQtMS43OSA0LTQgNHptMC0xMGMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjkgMi0yLTJ6Ii8+PC9zdmc+)](https://hydra.family)
[![Systemd](https://img.shields.io/badge/Systemd-Service-blue?logo=systemd)](https://systemd.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

---

</div>

## 📌 Giới thiệu

Phần này tập trung vào việc tổng hợp và củng cố các kiến thức nền tảng quan trọng trước khi bước vào xây dựng một DApp thực tế trên Hydra.

Cụ thể, nội dung bao gồm:

- 🔁 Ôn tập và hệ thống hóa kiến thức cốt lõi
  Làm rõ toàn bộ quy trình xây dựng và vận hành một Hydra Head, từ khởi tạo, commit tài sản, mở head cho đến khi đóng và fan-out về Layer 1.
- 🌐 Cấu hình và expose Hydra Node trên VPS
  Hướng dẫn cách thiết lập môi trường, mở port và export địa chỉ IP để cho phép các ứng dụng bên ngoài (frontend/DApp) có thể kết nối trực tiếp tới Hydra Node thông qua API.
- ⚖️ So sánh với các giải pháp Layer 2 khác
  Phân tích sự khác biệt giữa Hydra và các giải pháp tiêu biểu như Lightning Network (Bitcoin), nhằm làm rõ:
  - Sự khác biệt trong kiến trúc (multi-party vs payment channel).
  - Cách quản lý trạng thái (full ledger vs balance-based).
  - Khả năng mở rộng và lập trình (smart contract vs micropayment)

---

## 🎯 Mục tiêu

Sau khi hoàn thành phần này, bạn sẽ có được một nền tảng kiến thức vững chắc để bước vào giai đoạn xây dựng DApp thực tế trên Hydra, bao gồm:

- 🔍 Hiểu rõ cách một Hydra Head hoạt động trong thực tế
  Bạn sẽ nắm được toàn bộ vòng đời của một Hydra Head, từ giai đoạn khởi tạo (init), commit tài sản từ Layer 1, mở head để thực hiện giao dịch off-chain, cho đến khi đóng head và fan-out trạng thái cuối cùng về lại blockchain. Đồng thời, bạn cũng hiểu được cách các bên tham gia tương tác và đồng thuận với nhau trong môi trường Hydra.
- ⚙️ Biết cách triển khai và expose Hydra Node trên môi trường VPS
  Bạn sẽ có khả năng tự thiết lập một hệ thống Hydra Node chạy trên VPS, cấu hình các port cần thiết, mở firewall và export địa chỉ IP để cho phép truy cập từ bên ngoài. Điều này giúp bạn đưa Hydra từ môi trường local lên môi trường thực tế, sẵn sàng cho việc tích hợp với các ứng dụng khác.
- 🔗 Nắm được cách tích hợp Hydra với ứng dụng bên ngoài (DApp/Frontend)
  Bạn sẽ hiểu cách các ứng dụng client (frontend hoặc backend) giao tiếp với Hydra thông qua API, từ đó có thể xây dựng các DApp có khả năng gửi giao dịch, truy vấn trạng thái và tương tác trực tiếp với Hydra Head một cách mượt mà, thay vì thao tác thủ công qua terminal.
- ⚖️ Phân biệt rõ Hydra với các giải pháp Layer 2 khác
  Không chỉ dừng lại ở việc sử dụng, bạn còn hiểu sâu về sự khác biệt giữa Hydra và các giải pháp như Lightning Network, thông qua các khía cạnh quan trọng:
  Kiến trúc: Hydra sử dụng mô hình multi-party state channel với shared state, trong khi Lightning sử dụng payment channel giữa hai bên.
- Use case: Hydra phù hợp cho các DApp phức tạp (DeFi, NFT, logic on-chain), còn Lightning tối ưu cho thanh toán nhanh (micropayment).
- Khả năng mở rộng: Hydra cho phép xử lý nhiều giao dịch với logic phức tạp trong một head, trong khi Lightning mở rộng thông qua mạng lưới routing toàn cầu.

---

## 🏗️ Ôn tập và hệ thống hóa kiến thức

---

## 🔌 Cấu hình và expose Hydra Node trên VPS

---

## 🔌 So sánh Hydra với các giải pháp Layer 2 khác (Lightning Network)

| **Tiêu chí**                           | **Lightning Network (Bitcoin)**                                                                                          | **Hydra (Cardano)**                                                                                                                                   |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Số lượng người tham gia trong kênh** | - Chủ yếu 2 bên (Multisig 2-of-2) <br> - Mỗi kênh là giữa 2 người <br> - Mở rộng qua routing network                     | - Nhiều bên (Multi-party) <br> - Thường 3–8 người hoặc hơn trong 1 Head <br> - Nhóm cùng quản lý trạng thái                                           |
| **Mục đích & khả năng thực thi**       | - Tập trung micropayment <br> - Logic đơn giản (BTC transfer) <br> - Có HTLC <br> - Không hỗ trợ smart contract phức tạp | - Tổng quát, mạnh mẽ <br> - Chạy full smart contract (Plutus) <br> - Hỗ trợ DApp, DeFi, Token <br> - Logic gần giống Layer 1                          |
| **Trạng thái quản lý Off-chain**       | - Chỉ quản lý số dư 2 chiều <br> - Trạng thái đơn giản <br> - Không có full ledger / multi-asset                         | - Mini-ledger hoàn chỉnh <br> - Bao gồm eUTXO, Datum, Plutus Script <br> - Hỗ trợ multi-asset <br> - Trạng thái phức tạp như Layer 1                  |
| **Routing & kết nối giữa các kênh**    | - Mạng routing toàn cầu mạnh <br> - Onion routing <br> - Multi-hop payment <br> - Không cần kết nối trực tiếp            | - Mỗi Head độc lập <br> - Không routing tự động giữa các Head <br> - Inter-head protocol đang phát triển <br> - Không phải tính năng cốt lõi hiện tại |

---

<div align="center">

## 📚 **Tài liệu tham khảo**

**Tóm tắt các bài học quan trọng và chuẩn bị nền tảng vững chắc để bước vào giai đoạn phát triển Hydra DApp một cách an toàn, ổn định và hiệu quả.**

<p>

<a href="https://lms.cardano2vn.io/courses/hydra-on-cardano-complete-step-by-step-dapp-guide/lesson/introduction-to-hydra-exploring-the-future-of-cardanos-layer-2-scaling-and-practical-use-cases"><img src="https://img.shields.io/badge/LMS-Course-blue?style=for-the-badge&logo=googleclassroom"/></a>
<a href="https://drive.google.com/file/d/10m66BY47RXPM5_YE5bKxtsch-XCFDkuY/view"><img src="https://img.shields.io/badge/Slides-Presentation-orange?style=for-the-badge&logo=googleslides"/></a>
<a href="https://github.com/cardano2vn/Hydra-Course-2025/tree/main/Code/video_08"><img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github"/></a>
<a href="https://hydra-course-2025.vercel.app/document/chapter-02/video-08"><img src="https://img.shields.io/badge/Article-Read-green?style=for-the-badge&logo=readthedocs"/></a>
<a href="https://www.youtube.com/watch?v=khV9Ew6bBgc"><img src="https://img.shields.io/badge/YouTube-Watch-red?style=for-the-badge&logo=youtube"/></a>

</p>

</div>
