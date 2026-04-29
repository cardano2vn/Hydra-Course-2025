<div align="center">

<img src="https://www.cardano2vn.io/_next/static/media/loading.db59b266.png" width="120" alt="Hydra Tutorial" />

# **Viết Smart Contract cho Hydra**

**Hướng dẫn chi tiết triển khai và kiểm thử logic hợp đồng thông minh trên Hydra — giải pháp Layer-2 scaling của Cardano — bằng Aiken hoặc Plutus.**

[![Ubuntu](https://img.shields.io/badge/Ubuntu-22.04+-E95420?logo=ubuntu)](https://ubuntu.com/download/server)
[![Cardano Node](https://img.shields.io/badge/Cardano%20Node-10.5.1+-4287D6?logo=cardano)](https://github.com/IntersectMBO/cardano-node/releases)
[![Hydra](https://img.shields.io/badge/Hydra%20Node-1.0.0+-00FF00?logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDBGRjAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAtMThjLTQuNDEgMC04IDMuNTktOCA4czMuNTkgOCA4IDggOC0zLjU5IDgtOHptMC0xNGMtMy4zMSAwLTYgMi42OS02IDZzMi42OSA2IDYgNiA2LTIuNjkgNi02em0wLTEyYy0yLjIxIDAtNCAxLjc5LTQgNHMxLjc5IDQgNCA0IDQtMS43OSA0LTQtMS43OSA0LTQgNHptMC0xMGMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjkgMi0yLTJ6Ii8+PC9zdmc+)](https://hydra.family/head-protocol)
[![Aiken](https://img.shields.io/badge/Aiken-v1.1.2-7B42BC?logo=haskell)](https://aiken-lang.org)
[![Plutus](https://img.shields.io/badge/Plutus-Haskell-8A2BE2)](https://plutus.cardano.org)
[![License: CC-BY-SA 4.0](https://img.shields.io/badge/License-MIT-FFBB00.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

---

</div>

## Giới thiệu

Trong hệ sinh thái Cardano, việc tối ưu hóa hiệu suất xử lý giao dịch luôn là một bài toán quan trọng, đặc biệt khi các ứng dụng phi tập trung (DApp) ngày càng yêu cầu trải nghiệm thời gian thực và chi phí thấp. Mô hình mở rộng Layer 2 với Hydra ra đời nhằm giải quyết vấn đề này bằng cách đưa phần lớn giao dịch ra khỏi chuỗi chính, giúp tăng thông lượng và giảm độ trễ đáng kể.

Trong bối cảnh đó, smart contract đóng vai trò là lớp logic cốt lõi đảm bảo tính đúng đắn và minh bạch của hệ thống. Việc xây dựng một smart contract TipJar tối ưu bằng Aiken không chỉ giúp hiểu rõ cách vận hành của validator trên Cardano mà còn tạo nền tảng để triển khai các ứng dụng thực tế trên Hydra một cách hiệu quả hơn.

---

## Mục tiêu

Phần này hướng đến việc đạt được các mục tiêu chính sau:

- Xây dựng smart contract TipJar được tối ưu hóa cho môi trường Hydra bằng Aiken, đảm bảo hiệu suất và tính an toàn khi xử lý giao dịch off-chain.
- Hiểu rõ vai trò của smart contract trong kiến trúc Cardano, cũng như cách Hydra hỗ trợ mở rộng khả năng xử lý giao dịch theo thời gian thực.
- Thực hành quy trình phát triển đầy đủ: viết mã, biên dịch và triển khai smart contract trên Cardano.
- Kiểm thử logic on-chain bằng Aiken và công cụ mô phỏng (như Sidan hoặc môi trường test tương đương) để đảm bảo validator hoạt động chính xác trong nhiều kịch bản khác nhau.

---

<div align="center">

## 📚 **Tài liệu tham khảo**

**Tóm tắt các bài học quan trọng và chuẩn bị nền tảng vững chắc để bước vào giai đoạn phát triển Hydra DApp một cách an toàn, ổn định và hiệu quả.**

<p>

<a href="https://lms.cardano2vn.io/courses/hydra-on-cardano-complete-step-by-step-dapp-guide/lesson/introduction-to-hydra-exploring-the-future-of-cardanos-layer-2-scaling-and-practical-use-cases"><img src="https://img.shields.io/badge/LMS-Course-blue?style=for-the-badge&logo=googleclassroom"/></a>
<a href="https://docs.google.com/presentation/d/16XjWCYfsjugHwTKSeluslssTU13uLa4v/edit?slide=id.p1#slide=id.p1"><img src="https://img.shields.io/badge/Slides-Presentation-orange?style=for-the-badge&logo=googleslides"/></a>
<a href="https://github.com/cardano2vn/Hydra-Course-2025/tree/main/Code/video_01"><img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github"/></a>
<a href="https://hydra-course-2025.vercel.app/document/chapter-01/video-01"><img src="https://img.shields.io/badge/Article-Read-green?style=for-the-badge&logo=readthedocs"/></a>
<a href="https://www.youtube.com/watch?v=3rO7EuTN3t8&t=313s"><img src="https://img.shields.io/badge/YouTube-Watch-red?style=for-the-badge&logo=youtube"/></a>

</p>

</div>
