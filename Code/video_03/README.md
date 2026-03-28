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

## 📌 Giới thiệu

Trong quá trình phát triển ứng dụng trên Hydra – giải pháp mở rộng Layer 2 của Cardano, việc thiết lập một môi trường phát triển chuẩn và ổn định là bước nền tảng không thể thiếu. Đây không chỉ là công đoạn kỹ thuật ban đầu, mà còn ảnh hưởng trực tiếp đến hiệu năng, khả năng mở rộng và độ ổn định của toàn bộ hệ thống về sau.

Cụ thể, phần này sẽ tập trung vào các nội dung quan trọng sau:

- Phân tích yêu cầu phần cứng, hệ điều hành và lựa chọn mạng Cardano phù hợp (testnet hoặc mainnet).
- Làm quen với việc sử dụng VPS miễn phí cho mục đích học tập và thử nghiệm.
- Đánh giá và lựa chọn VPS trả phí phù hợp với nhu cầu phát triển thực tế.
- Thực hành đăng nhập vào VPS và cài đặt các công cụ cần thiết cho môi trường Hydra.

Thông qua các nội dung này, bạn sẽ không chỉ biết cách thiết lập môi trường, mà còn hiểu rõ cách các thành phần trong hệ sinh thái phối hợp với nhau. Từ đó, bạn có thể tự tin xây dựng một nền tảng vững chắc trước khi bước vào các phần phức tạp hơn như phát triển DApp hay tối ưu hệ thống.

---

## 🎯 Mục tiêu

Sau khi hoàn thành phần này, mục tiêu hướng đến là giúp bạn làm chủ toàn bộ quá trình thiết lập môi trường phát triển cho Hydra, từ mức cơ bản đến thực tế triển khai. Đây là bước giúp bạn chuyển từ lý thuyết sang thực hành một cách bài bản và có hệ thống.

Cụ thể sẽ đạt được các mục tiêu sau:

- Hiểu rõ yêu cầu hạ tầng cần thiết để vận hành Cardano Node và Hydra Node một cách hiệu quả.
- Biết cách lựa chọn và sử dụng VPS phù hợp, từ môi trường miễn phí đến môi trường production.
- Thành thạo việc kết nối, thao tác và cấu hình môi trường trên VPS thông qua SSH.
- Cài đặt và thiết lập đầy đủ các công cụ cần thiết trong hệ sinh thái Hydra.
- Nắm được các phương pháp tối ưu hóa quá trình đồng bộ blockchain và vận hành hệ thống.
- Áp dụng các thực tiễn tốt nhất (best practices) để đảm bảo hệ thống ổn định, dễ bảo trì và dễ mở rộng.

Kết thúc phần này, bạn sẽ sở hữu một môi trường phát triển hoàn chỉnh, sẵn sàng cho việc xây dựng và triển khai các ứng dụng thực tế trên Hydra một cách chuyên nghiệp và hiệu quả. 🚀

---

## 🏗️ Yêu cầu hạ tầng

### Yêu cầu phần cứng

Để vận hành Cardano Node và tích hợp với Hydra Node một cách ổn định, việc lựa chọn hạ tầng phù hợp là yếu tố cực kỳ quan trọng. Cấu hình phần cứng không chỉ ảnh hưởng đến tốc độ đồng bộ blockchain (sync), mà còn quyết định khả năng xử lý giao dịch, độ ổn định lâu dài và trải nghiệm khi phát triển hoặc triển khai DApp.

Trong thực tế, mỗi môi trường sẽ có yêu cầu khác nhau. Mainnet cần độ ổn định và hiệu năng cao để phục vụ production, trong khi Preprod và Preview phù hợp hơn cho kiểm thử và phát triển. Việc lựa chọn cấu hình đúng ngay từ đầu sẽ giúp bạn tiết kiệm chi phí, đồng thời tránh các vấn đề như nghẽn tài nguyên, sync chậm hoặc node bị crash.

Bảng dưới đây thể hiện cấu hình khuyến nghị cho từng môi trường:

| Thành phần      | Mainnet (Production) | Preprod (Staging) | Preview (Development) |
| --------------- | -------------------- | ----------------- | --------------------- |
| **CPU**         | 8 cores @ 3.0GHz+    | 6 cores @ 2.8GHz+ | 4 cores @ 2.5GHz+     |
| **RAM**         | **24 GB**            | **20 GB**         | 16 GB                 |
| **Ổ cứng**      | **250 GB NVMe**      | **150 GB SSD**    | 100 GB SSD            |
| **Mạng**        | 1 Gbps               | 500 Mbps          | 100 Mbps              |
| **ADA yêu cầu** | **10–50 ADA**        | **5–20 tADA**     | **1–5 tADA**          |

### 🔍 Giải thích chi tiết

- CPU: Cardano Node là hệ thống xử lý nhiều tác vụ song song như xác thực block, xử lý transaction và networking. CPU càng mạnh thì khả năng xử lý càng nhanh, đặc biệt quan trọng khi chạy trên Mainnet hoặc khi mở Hydra Head.
- RAM: RAM ảnh hưởng trực tiếp đến khả năng lưu trữ trạng thái và cache dữ liệu của node. Nếu RAM không đủ, hệ thống có thể bị chậm hoặc crash khi load cao. Với Hydra, việc có thêm RAM sẽ giúp xử lý state off-chain hiệu quả hơn.
- Ổ cứng (Storage): Blockchain Cardano liên tục tăng kích thước theo thời gian, vì vậy sử dụng SSD/NVMe là bắt buộc để đảm bảo tốc độ đọc/ghi nhanh. NVMe đặc biệt quan trọng cho Mainnet để giảm thời gian sync và tăng hiệu năng truy xuất dữ liệu.
- Mạng (Network Bandwidth): Node cần giao tiếp liên tục với các peer trong mạng Cardano. Băng thông thấp có thể gây chậm block propagation hoặc mất kết nối, ảnh hưởng đến độ ổn định của node.
- ADA yêu cầu: Đây là lượng ADA tối thiểu để thực hiện các giao dịch on-chain như mở/đóng Hydra Head hoặc tương tác với smart contract. Với testnet, bạn có thể sử dụng tADA (test ADA) từ faucet.

#### ✅ Kết luận

Việc lựa chọn cấu hình hạ tầng phù hợp không chỉ giúp hệ thống hoạt động ổn định mà còn tạo điều kiện thuận lợi cho việc phát triển và mở rộng sau này. Nếu bạn chỉ đang học hoặc thử nghiệm, môi trường Preview là đủ. Tuy nhiên, khi tiến tới triển khai thực tế hoặc xây dựng DApp nghiêm túc trên Hydra, bạn nên đầu tư cấu hình tương đương Preprod hoặc Mainnet để đảm bảo hiệu năng và độ tin cậy lâu dài. 🚀

---

## 🔌 Lựa chọn VPS miễn phí và VPS trả phí

Trong quá trình thiết lập môi trường phát triển cho Hydra, việc lựa chọn hạ tầng phù hợp là một bước quan trọng ảnh hưởng trực tiếp đến trải nghiệm phát triển và hiệu năng hệ thống. Tùy vào mục đích sử dụng (học tập, thử nghiệm hay triển khai thực tế), bạn có thể lựa chọn giữa VPS miễn phí và VPS trả phí.

VPS miễn phí phù hợp để làm quen, test nhanh hoặc chạy demo nhỏ. Tuy nhiên, chúng thường bị giới hạn về tài nguyên, thời gian hoạt động và quyền truy cập hệ thống. Ngược lại, VPS trả phí mang lại hiệu năng ổn định, tài nguyên đầy đủ và phù hợp cho việc chạy Cardano Node, Hydra Node hoặc các môi trường production.

| Loại VPS         | Ưu điểm                   | Nhược điểm                     | Phù hợp cho            |
| ---------------- | ------------------------- | ------------------------------ | ---------------------- |
| **VPS miễn phí** | Miễn phí, dễ setup, nhanh | Tài nguyên thấp, không ổn định | Học tập, test, demo    |
| **VPS trả phí**  | Mạnh, ổn định, chạy 24/7  | Tốn chi phí, cần quản lý       | Node, DApp, production |

### VPS miễn phí

VPS miễn phí là một lựa chọn rất phù hợp cho những người mới bắt đầu tìm hiểu và thực hành với Hydra mà không cần đầu tư chi phí ban đầu. Với các nền tảng này, bạn có thể nhanh chóng tạo ra một môi trường Linux sẵn sàng sử dụng chỉ trong vài phút, giúp tiết kiệm thời gian cài đặt thủ công trên máy cá nhân.

Tuy nhiên, cần hiểu rõ rằng các VPS miễn phí chỉ nên được sử dụng cho mục đích học tập, thử nghiệm hoặc demo, không phù hợp để vận hành các hệ thống blockchain trong thời gian dài như Cardano Node hoặc Hydra Node. Nguyên nhân là do các giới hạn về tài nguyên, thời gian hoạt động và tính ổn định của môi trường.

⚠️ Hạn chế của VPS miễn phí:

- Tài nguyên hạn chế (CPU, RAM, Disk)
- Có thể bị tắt sau một khoảng thời gian không hoạt động
- Không đảm bảo uptime liên tục
- Hiệu năng không ổn định khi chạy node blockchain
- Không phù hợp cho production hoặc testnet dài hạn

#### 1. Github Codespaces

GitHub Codespaces là một môi trường phát triển chạy trên cloud, được cung cấp bởi GitHub. Nó cho phép bạn khởi tạo một máy ảo (VS Code online) trực tiếp từ repository chỉ với vài cú click. Đây là một lựa chọn tuyệt vời để nhanh chóng thiết lập môi trường phát triển cho Hydra mà không cần phải lo lắng về cấu hình phần cứng hay cài đặt hệ điều hành. Tuy nhiên, do giới hạn tài nguyên và thời gian hoạt động, Codespaces chỉ nên được sử dụng cho mục đích học tập, thử nghiệm hoặc demo nhỏ.

- Ưu điểm: Không cần cài đặt gì trên máy cá nhân. Tích hợp sẵn VS Code (giao diện quen thuộc). Dễ dàng sử dụng với Git và workflow development. Phù hợp để: Test script Hydra. Viết code off-chain. Chạy demo nhanh.
- Nhược điểm: Tài nguyên hạn chế (CPU, RAM). Có thể bị tắt sau một khoảng thời gian không hoạt động. Không đảm bảo uptime liên tục. Hiệu năng không ổn định khi chạy node blockchain. Không phù hợp cho production hoặc testnet dài hạn.
- Khi nào nên dùng: Khi bạn mới bắt đầu học về Hydra và muốn nhanh chóng thiết lập môi trường để thử nghiệm các tính năng cơ bản. Khi bạn muốn viết code off-chain hoặc test script mà không cần phải cài đặt nhiều công cụ trên máy cá nhân. Khi bạn muốn chạy demo nhỏ hoặc làm việc trên một dự án nhỏ mà không cần tài nguyên lớn.

##### Cách cài đặt

1. Bước 1: Chuẩn bị tài khoản GitHub
   - Để sử dụng Codespaces, bạn cần có tài khoản trên GitHub. Truy cập: `https://github.com`.
   - Đăng ký tài khoản (nếu chưa có). Đăng nhập vào hệ thống. Tài khoản miễn phí vẫn sử dụng được Codespaces nhưng có giới hạn thời gian.

2. Bước 2: Tạo Codespace từ repository
   - Bạn có thể sử dụng: Một repository có sẵn. Hoặc tạo repo mới để học Hydra.
   - Cách tạo repo mới: Nhấn "New repository". Đặt tên (ví dụ: hydra-course-2025). Chọn Public. Nhấn Create repository

3. Bước 3: Mở Codespace
   - Sau khi vào repository, bạn thực hiện: Nhấn nút Code (màu xanh). Chọn tab Codespaces. Nhấn Create codespace on main.
   - Hệ thống sẽ: Tự động tạo một máy ảo Linux Cài sẵn VS Code online. Mở terminal cho bạn sử dụng. Thời gian khởi tạo: ~30 giây đến 2 phút.

4. Bước 4: Làm quen với môi trường
   - Sau khi Codespace khởi chạy, bạn sẽ thấy: Giao diện giống VS Code
   - Có sẵn: Terminal (Linux). File explorer.Editor
     Đây chính là một VPS mini chạy trên cloud

**Lưu ý\*: Mặc dù GitHub Codespaces rất tiện lợi, nhưng nếu bạn muốn chạy một node Cardano hoặc Hydra Node thực sự, bạn sẽ cần một môi trường có tài nguyên ổn định hơn, như VPS trả phí hoặc máy chủ cá nhân với cấu hình phù hợp. Codespaces chỉ nên được sử dụng cho các tác vụ nhẹ nhàng và không yêu cầu uptime liên tục.**

#### 2. Firebase Studio

Firebase Studio là một nền tảng phát triển ứng dụng trực tuyến, cung cấp môi trường lập trình và hosting miễn phí. Mặc dù không phải là một VPS truyền thống, Firebase Studio có thể được sử dụng để phát triển và thử nghiệm các ứng dụng liên quan đến Hydra, đặc biệt là các ứng dụng frontend hoặc backend nhỏ. Tuy nhiên, do giới hạn về tài nguyên và tính ổn định, Firebase Studio chỉ nên được sử dụng cho mục đích học tập hoặc thử nghiệm nhỏ.

- Ưu điểm: Dễ dàng sử dụng, không cần cài đặt. Tích hợp sẵn các công cụ phát triển web. Phù hợp để: Phát triển frontend cho DApp. Viết backend nhỏ. Test API liên quan đến Hydra.
- Nhược điểm: Tài nguyên hạn chế (CPU, RAM). Không đảm bảo uptime liên tục. Hiệu năng không ổn định khi chạy node blockchain. Không phù hợp cho production hoặc testnet dài hạn.
- Khi nào nên dùng: Khi bạn muốn phát triển một ứng dụng frontend hoặc backend nhỏ liên quan đến Hydra mà không cần phải lo lắng về cấu hình phần cứng. Khi bạn muốn thử nghiệm các tính năng liên quan đến API hoặc tích hợp với Hydra mà không cần tài nguyên lớn. Khi bạn đang học cách xây dựng DApp và muốn một môi trường phát triển đơn giản, dễ sử dụng.

##### Cách cài đặt:

1. Bước 1: Truy cập Firebase
   - Truy cập: https://firebase.google.com
   - Đăng nhập bằng tài khoản Google. Nếu chưa có tài khoản: Bạn cần tạo tài khoản Google trước khi sử dụng

2. Bước 2: Tạo Project mới
   - Nhấn "Add project". Đặt tên project (ví dụ: hydra-demo). Nhấn Continue. Tắt Google Analytics (nếu không cần).
   - Nhấn Create project. Thời gian tạo: ~30 giây
3. Bước 3: Khởi tạo môi trường làm việc
   - Sau khi tạo project: Truy cập vào dashboard
   - Mở phần Development / Hosting / Functions (tuỳ mục đích) Hoặc sử dụng Firebase CLI để làm việc local + cloud.
   - Firebase không phải VPS truyền thống, mà là: Nền tảng để chạy backend serverless. Phù hợp với logic off-chain

**Lưu ý\*: Firebase Studio không phải là một môi trường phù hợp để chạy Cardano Node hoặc Hydra Node thực sự, do đó nếu bạn muốn phát triển hoặc thử nghiệm các tính năng liên quan đến node, bạn sẽ cần một môi trường có tài nguyên ổn định hơn, như VPS trả phí hoặc máy chủ cá nhân với cấu hình phù hợp. Firebase Studio chỉ nên được sử dụng cho các tác vụ nhẹ nhàng và không yêu cầu uptime liên tục.**

### VPS trả phí

#### 1. Contabo

Contabo là một nhà cung cấp VPS giá rẻ và phổ biến, có trụ sở tại Đức, được nhiều developer lựa chọn nhờ chi phí thấp nhưng cấu hình tương đối mạnh. Đây là lựa chọn phù hợp để:

- Chạy Cardano Node
- Triển khai Hydra Node
- Hosting backend, bot hoặc dịch vụ blockchain liên quan đến Cardano. Với Contabo, bạn có thể dễ dàng nâng cấp tài nguyên khi cần thiết, giúp đảm bảo hiệu năng và độ ổn định cho các dự án của mình.

Website chính thức: https://contabo.com

---

##### Bước 1: Đăng ký tài khoản

1. Truy cập: [https://contabo.com/en/vps/](https://contabo.com/en/vps/)
2. Nhấn **"Sign Up"** (góc trên bên phải).
3. Điền thông tin:
   - Email (phải hợp lệ)
   - Mật khẩu (≥8 ký tự, có chữ hoa, số, ký tự đặc biệt)
   - Tên + địa chỉ (dùng địa chỉ Việt Nam được)
4. Xác nhận email → Đăng nhập.

> **Đã có tài khoản?** → Đăng nhập trực tiếp.

---

##### Bước 2: Chọn gói VPS

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

##### Bước 3: Cấu hình thêm

Trong trang đặt hàng:

- Chọn **Data Center** (Singapore nếu cần tốc độ nhanh về VN)
- Chọn **OS** (khuyên dùng Ubuntu 22.04)
- Tùy chọn thêm:
  - [ ] Weekly Backup (+~2 €)
  - [ ] Additional IPv4 (+2 €/IP)
  - [ ] DDoS Protection (khuyến nghị)

→ Nhấn **"Continue to Checkout"**

---

##### Bước 4: Thanh toán

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

##### Bước 5: Kích hoạt & truy cập VPS

1. Nhận email xác nhận (5–30 phút)
2. VPS tự động cài đặt (1–2 giờ)
3. Vào **Control Panel** → **My VPS** → Xem:
   - IP Address
   - Username (`root`)
   - Mật khẩu

##### Bước 6: Kết nối VPS qua SSH

Sau khi có thông tin VPS, bạn có thể kết nối bằng lệnh:

```bash
ssh root@your-vps-ip
```

Lần đầu kết nối: Gõ yes để xác nhận Nhập mật khẩu từ email

## Cài đặt công cụ cần thiết

### Cập nhật hệ thống

Bước cập nhật hệ thống là một bước nền tảng cực kỳ quan trọng trước khi cài đặt bất kỳ thành phần nào liên quan đến blockchain, đặc biệt là Cardano Node. Khi thực hiện lệnh này, hệ thống sẽ:

- Đồng bộ lại danh sách các package từ repository của Ubuntu
- Nâng cấp toàn bộ các thư viện và phần mềm hiện có lên phiên bản mới nhất
- Đảm bảo môi trường hệ điều hành luôn trong trạng thái ổn định và tương thích

```bash
sudo apt update && sudo apt upgrade -y
```

Trong đó:

- `sudo`: Chạy lệnh với quyền quản trị (root), cần thiết để thực hiện các thay đổi hệ thống.
- `apt update`: Cập nhật danh sách package từ các repository đã cấu hình, giúp hệ thống biết được phiên bản mới nhất của các phần mềm.
- `apt upgrade -y`: Nâng cấp tất cả các package đã cài đặt lên phiên bản mới nhất. Tham số `-y` tự động đồng ý với tất cả các câu hỏi xác nhận, giúp quá trình nâng cấp diễn ra nhanh chóng và không bị gián đoạn.

Tại sao cần cập nhật hệ thống:

- Khi chạy Cardano Node, bạn đang chạy một hệ thống long-running (chạy lâu dài) → nếu thư viện lỗi thời, node có thể crash sau vài ngày.
- Tránh lỗi phổ biến như Sai version của OpenSSL. Lỗi dependency khi build hoặc chạy binary.
- Đảm bảo tương thích với Hydra Node cardano-cli, Các SDK liên quan.
- Lợi ích về bảo mật: Vá các lỗ hổng bảo mật đã biết Tránh bị exploit khi node mở port public. Giảm rủi ro khi deploy lên VPS hoặc cloud.

### Cài đặt các công cụ cơ bản

Đây là bước chuẩn bị bộ công cụ nền tảng, được sử dụng xuyên suốt trong toàn bộ quá trình: Cài đặt Cardano Node, Tải snapshot blockchain, Làm việc với Hydra, Viết script automation. Nếu thiếu một trong các công cụ này, quá trình setup có thể bị gián đoạn.

```bash
sudo apt install curl wget tar unzip jq git -y
```

Trong đó:

- `curl`: Công cụ dòng lệnh để truyền dữ liệu qua các giao thức mạng, thường dùng để tải file hoặc gọi API.
- `wget`: Tương tự curl, dùng để tải file từ internet.
- `tar`: Dùng để giải nén các file tar.gz, thường là định dạng của các bản release.
- `unzip`: Dùng để giải nén các file zip, có thể dùng cho một số bản release hoặc tài liệu.
- `jq`: Công cụ xử lý JSON, rất hữu ích khi làm việc với API hoặc parsing output từ các lệnh.
- `git`: Hệ thống quản lý phiên bản, cần thiết để clone các repository liên quan đến Cardano Node, Hydra hoặc các dự án liên quan.

---

### Kiểm tra cài đặt

Sau khi cài đặt, bạn cần xác nhận rằng: Các công cụ đã được cài thành công Có thể gọi trực tiếp từ terminal. Không bị lỗi PATH hoặc thiếu quyền

```bash
curl --version
wget --version
tar --version
unzip -v
jq --version
git --version
```

Trong đó:

- Mỗi lệnh sẽ trả về phiên bản của công cụ tương ứng nếu đã được cài đặt thành công.
- Nếu có lỗi như "command not found" hoặc "permission denied", bạn cần kiểm tra lại quá trình cài đặt hoặc cấu hình PATH.
- Đảm bảo rằng bạn đang chạy terminal với quyền phù hợp (thường là root hoặc sudo) để tránh các lỗi liên quan đến quyền truy cập.
- Việc xác nhận cài đặt thành công giúp đảm bảo rằng bạn đã chuẩn bị đầy đủ công cụ cần thiết để tiếp tục với các bước tiếp theo trong quá trình thiết lập môi trường phát triển cho Hydra.

---

## Bài tập

### ✅ Bài 1: Phân tích yêu cầu hạ tầng

#### 📌 Đề bài

Bạn được giao nhiệm vụ thiết lập môi trường chạy **Cardano Node + Hydra Node** cho môi trường **Preprod**.

Hãy đề xuất cấu hình phù hợp (CPU, RAM, Disk, Network, ADA) và giải thích lý do lựa chọn.

#### 💡 Gợi ý

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

### ✅ Bài 2: So sánh VPS miễn phí và VPS trả phí

#### 📌 Đề bài

So sánh VPS miễn phí và VPS trả phí trong việc phát triển Hydra.

Trả lời:

- Khi nào nên dùng VPS miễn phí?
- Khi nào bắt buộc dùng VPS trả phí?

#### 💡 Gợi ý

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

### ✅ Bài 3: Quy trình tạo VPS trên Contabo

#### 📌 Đề bài

Mô tả các bước chính để tạo và truy cập một VPS trên Contabo.

#### 💡 Gợi ý

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

</details>

### ✅ Bài 4: Hiểu lệnh cập nhật hệ thống

#### 📌 Đề bài

Giải thích ý nghĩa của lệnh:

```bash
sudo apt update && sudo apt upgrade -y
```

Tại sao bước này quan trọng khi chạy Cardano Node?

#### 💡 Gợi ý

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

### ✅ Bài 5: Vai trò các công cụ cơ bản

#### 📌 Đề bài

Giải thích vai trò của các công cụ sau trong quá trình setup Hydra:

- curl
- wget
- git
- jq

#### 💡 Gợi ý

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

<div align="center">

## 📚 **Tài liệu tham khảo**

**Tóm tắt các bài học quan trọng và chuẩn bị nền tảng vững chắc để bước vào giai đoạn phát triển Hydra DApp một cách an toàn, ổn định và hiệu quả.**

<p>

<a href="https://lms.cardano2vn.io/courses/hydra-on-cardano-complete-step-by-step-dapp-guide/lesson/setting-up-your-hydra-development-environment-tools-dependencies-and-best-practices"><img src="https://img.shields.io/badge/LMS-Course-blue?style=for-the-badge&logo=googleclassroom"/></a>
<a href="https://docs.google.com/presentation/d/1gUveo68EbyMDkEUiVd-NG17FIn0b53WA/edit?slide=id.p1#slide=id.p1"><img src="https://img.shields.io/badge/Slides-Presentation-orange?style=for-the-badge&logo=googleslides"/></a>
<a href="https://github.com/cardano2vn/Hydra-Course-2025/blob/main/Code/video_03"><img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github"/></a>
<a href="https://hydra-course-2025.vercel.app/document/chapter-01/video-03"><img src="https://img.shields.io/badge/Article-Read-green?style=for-the-badge&logo=readthedocs"/></a>
<a href="https://www.youtube.com/watch?v=oYMKJjB7Qkc&t=500s"><img src="https://img.shields.io/badge/YouTube-Watch-red?style=for-the-badge&logo=youtube"/></a>

</p>

</div>
