<div align="center">

<img src="https://www.cardano2vn.io/_next/static/media/loading.db59b266.png" width="120" alt="Hydra Logo" />

# **Thiết lập Môi Trường Phát Triển Smart Contract cho Hydra**

**Hướng dẫn đầy đủ: cài Aiken, cấu trúc thư mục, chuẩn bị dữ liệu mẫu, và triển khai**

[![Aiken](https://img.shields.io/badge/Aiken-1.1.21+-0d8c5a?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTIgMkwyIDEySDIyTDEyIDIyWiIvPjwvc3ZnPg==)](https://aiken-lang.org)
[![Hydra Ready](https://img.shields.io/badge/Hydra-1.2.0-ready-success)](https://hydra.family)
[![Cardano Node](https://img.shields.io/badge/Cardano%20Node-10.6.1+-blue)](https://github.com/IntersectMBO/cardano-node)
[![License](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](LICENSE)

---

</div>

## Giới Thiệu

Trong phần này, chúng ta sẽ tập trung vào việc xây dựng nền tảng vững chắc để phát triển smart contract trên Cardano.

Bạn sẽ bắt đầu bằng việc chuẩn bị đầy đủ môi trường phát triển, từ cài đặt công cụ, biên dịch cho đến kiểm thử smart contract trong thực tế. Đồng thời, chúng ta sẽ làm quen và áp dụng mô hình eUTxO – nền tảng cốt lõi trong cách Cardano xử lý giao dịch và thiết kế logic hợp đồng thông minh.

Bên cạnh đó, nội dung cũng sẽ giúp bạn hiểu rõ cách kết hợp giữa On-chain và Off-chain để tạo nên một DApp hoàn chỉnh, đảm bảo tính hiệu quả và khả năng mở rộng.

Cuối cùng, bạn sẽ trực tiếp xây dựng một smart contract thử nghiệm nhằm kiểm tra logic, luồng giao dịch và tính đúng đắn của hệ thống trước khi đi vào các bài toán phức tạp hơn.

---

## Mục Tiêu

Trong phần này, mục tiêu không chỉ dừng lại ở việc làm quen mà còn hướng đến việc giúp bạn xây dựng một nền tảng vững chắc trong phát triển smart contract trên Cardano.

- Chuẩn bị đầy đủ môi trường phát triển,
  biên dịch, và kiểm thử smart contract
  trên Cardano.
- Làm việc hiệu quả với mô hình eUTxO và
  tư duy thiết kế smart contract.
- Kết hợp On-chain và Off-chain trong quy
  trình phát triển DApp.
- Xây dựng hợp đồng thử nghiệm nhằm
  kiểm tra Logic, Luồng giao dịch và tính
  đúng đắn.

---

## Cài Đặt Môi Trường Phát Triển

Việc thiết lập môi trường phát triển là bước nền tảng quan trọng trong toàn bộ quy trình xây dựng một ứng dụng phi tập trung (DApp) trên blockchain Cardano. Một môi trường được thiết lập đúng cách sẽ đảm bảo:

- Tính ổn định khi phát triển
- Khả năng mở rộng khi dự án lớn dần
- Giảm thiểu lỗi khi triển khai (deployment)
- Tối ưu hiệu suất làm việc của lập trình viên

Trong hệ sinh thái Cardano hiện đại, một stack phổ biến bao gồm:

- Bun: runtime & package manager
- Next.js: frontend framework
- Aiken: ngôn ngữ viết smart contract
- Các thư viện và công cụ hỗ trợ khác

### 1. Cài đặt Bun (JavaScript Runtime Thế Hệ Mới)

Trong quá trình phát triển các ứng dụng hiện đại, đặc biệt là các ứng dụng Web3 hoặc DApp trên blockchain như Cardano, việc lựa chọn runtime phù hợp đóng vai trò rất quan trọng. Một runtime tốt không chỉ giúp tối ưu hiệu năng mà còn đơn giản hóa quy trình phát triển và giảm thiểu các vấn đề phát sinh trong quá trình cấu hình môi trường. Trong bối cảnh đó, Bun nổi lên như một giải pháp thay thế mạnh mẽ cho Node.js, mang lại hiệu suất cao hơn và trải nghiệm lập trình viên (Developer Experience) tốt hơn.

Bun là một JavaScript runtime được xây dựng bằng ngôn ngữ Zig – một ngôn ngữ hệ thống hiện đại, cho phép kiểm soát bộ nhớ tốt và đạt hiệu năng rất cao. Không giống như Node.js vốn được xây dựng trên V8 Engine của Google, Bun sử dụng JavaScriptCore (engine của Safari), kết hợp với các tối ưu riêng để đạt tốc độ vượt trội.

Điểm đặc biệt của Bun nằm ở triết lý thiết kế “all-in-one”, nghĩa là tích hợp toàn bộ các công cụ cần thiết vào một hệ thống duy nhất, bao gồm:

- Runtime: thực thi JavaScript và TypeScript
- Package Manager: thay thế npm/yarn với tốc độ nhanh hơn
- Bundler: đóng gói mã nguồn cho production
- Transpiler: hỗ trợ TypeScript mà không cần cấu hình
- Test Runner: chạy unit test trực tiếp

_👉 Điều này giúp loại bỏ nhu cầu cài đặt nhiều công cụ rời rạc như trong hệ sinh thái Node.js truyền thống (npm + webpack + babel + ts-node + jest...)._

Để cài đặt Bun, bạn sử dụng lệnh chính thức sau:

```bash
curl -fsSL https://bun.sh/install | bash
```

#### 📌 Phân tích lệnh:

- `curl`: dùng để tải script từ internet
- `-fsSL`: đảm bảo tải an toàn, không hiển thị lỗi không cần thiết
- `| bash`: thực thi script ngay sau khi tải

Trong một số trường hợp, bạn nên restart terminal để đảm bảo mọi cấu hình được áp dụng đầy đủ.

```bash
source ~/.bashrc # hoặc source ~/.zshrc nếu bạn dùng zsh
```

Sau khi hoàn tất, kiểm tra bằng lệnh:

```bash
bun --version # hoặc bun -v
```

Nếu hiển thị phiên bản, việc cài đặt đã thành công.

### 2. Cài đặt NextJS

Next.js là một framework mạnh mẽ được xây dựng trên nền tảng React, phát triển bởi Vercel, giúp đơn giản hóa việc xây dựng các ứng dụng web hiện đại. Trong bối cảnh phát triển các ứng dụng Web3/DApp, Next.js đóng vai trò quan trọng trong việc xây dựng giao diện người dùng (frontend), kết nối với blockchain và xử lý các tương tác với người dùng.

Không giống như React thuần (chỉ là thư viện UI), Next.js cung cấp một hệ sinh thái hoàn chỉnh với nhiều tính năng nâng cao như:

- Server-Side Rendering (SSR) và Static Site Generation (SSG) giúp tối ưu SEO và hiệu suất tải trang
- API Routes cho phép xây dựng backend nhẹ ngay trong dự án
- Hệ thống routing tự động dựa trên cấu trúc thư mục
- Hỗ trợ TypeScript và CSS Modules tích hợp sẵn
- Tích hợp tốt với các công cụ hiện đại như Tailwind CSS, SWR, và nhiều hơn nữa

```bash
bun create next-app@latest tipjar
cd tipjar
```

#### 📌 Giải thích:

- `bun create next-app@latest tipjar`: sử dụng Bun để tạo một ứng dụng Next.js mới với tên "tipjar". Lệnh này sẽ tải về template mới nhất của Next.js và thiết lập dự án.
- `cd tipjar`: chuyển vào thư mục dự án vừa tạo để bắt đầu làm việc.

Trong quá trình tạo project có thể chọn: TypeScript: Yes (khuyến nghị). App Router: Yes. Tailwind CSS: Yes. Sau khi cài đặt xong, bạn có thể kiểm tra phiên bản của NextJS bằng lệnh:

```bash
bun list next
```

Sau khi khởi tạo project Next.js, hệ thống sẽ tự động tạo ra một cấu trúc thư mục tiêu chuẩn. Khi sử dụng App Router (kiến trúc routing mới của Next.js), cấu trúc này mang tính module hóa cao, giúp dễ dàng mở rộng và bảo trì.

Dưới đây là cấu trúc cơ bản của project:

```
tipjar/
├── app/                  # Thư mục định nghĩa routing chính (App Router)
│   ├── layout.tsx        # Layout tổng (wrapper cho toàn bộ ứng dụng)
│   ├── page.tsx          # Trang chính (route "/")
│   └── api/              # API routes (backend nhẹ trong Next.js)
│
├── components/           # Chứa các UI component tái sử dụng
├── public/               # Chứa tài nguyên tĩnh (ảnh, icon, font...)
├── styles/               # CSS hoặc Tailwind config
├── utils/                # Hàm tiện ích (helper functions)
├── hooks/                # Custom React hooks
└── package.json          # Thông tin project & dependencies
```

Sau khi cài đặt và cấu hình project hoàn tất, bước tiếp theo là khởi động ứng dụng để kiểm tra xem hệ thống đã hoạt động chính xác hay chưa. Sử dụng lệnh sau:

```bash
bun dev
```

Lệnh này sẽ khởi động server phát triển của Next.js, thường chạy trên địa chỉ http://localhost:3000. Bạn có thể mở trình duyệt và truy cập vào địa chỉ này để xem ứng dụng Next.js mới tạo đã hoạt động hay chưa. Nếu bạn thấy trang mặc định của Next.js, điều đó có nghĩa là môi trường đã được thiết lập thành công và bạn đã sẵn sàng để bắt đầu phát triển giao diện người dùng cho DApp của mình.

### 3. Cài đặt Aiken

Aiken là một ngôn ngữ lập trình hiện đại được thiết kế chuyên biệt cho việc phát triển smart contract trên nền tảng Cardano. Khác với các công cụ trước đây như Plutus, Aiken tập trung vào việc đơn giản hóa cú pháp, tăng tốc độ biên dịch và cải thiện trải nghiệm lập trình viên.

Aiken cho phép bạn viết các validator (smart contract) một cách rõ ràng, dễ đọc và dễ kiểm thử, từ đó giảm thiểu rủi ro khi triển khai trên blockchain – nơi mà code sau khi deploy gần như không thể thay đổi.

⚠️ Lưu ý quan trọng trước khi cài đặt: Aiken yêu cầu Bun phải được cài đặt trước. Đảm bảo rằng bạn đã hoàn thành bước cài đặt Bun trước khi tiếp tục với Aiken.

```bash
bun install -g aiken-lang
```

Tuy nhiên, đây không phải là cách cài đặt chính thức và có thể gây lỗi hoặc không tương thích trong quá trình sử dụng. Aiken không được phân phối như một package npm/Bun thông thường. Để cài đặt Aiken một cách chính xác, bạn nên làm theo hướng dẫn chính thức từ trang chủ của Aiken tại https://aiken-lang.org/docs/installation. 👉 Vì vậy, bạn nên sử dụng phương pháp cài đặt chính thức được cung cấp bởi đội ngũ phát triển Aiken.

```bash
aiken --version
```

### 4. Cài đặt thư viện Aiken

Trong quá trình phát triển smart contract trên Cardano bằng Aiken, việc sử dụng các thư viện hỗ trợ là rất cần thiết để tăng tốc độ phát triển, giảm thiểu lỗi và tận dụng các đoạn mã đã được tối ưu sẵn. Thay vì phải tự xây dựng mọi logic từ đầu, bạn có thể sử dụng các package có sẵn để xử lý các tác vụ phổ biến.

#### Aiken Assist

Aiken Assist là một thư viện hỗ trợ phát triển smart contract trên Aiken, cung cấp các hàm tiện ích và cấu trúc dữ liệu giúp lập trình viên xây dựng các logic giao dịch phức tạp một cách dễ dàng hơn. Thư viện này đặc biệt hữu ích trong việc xử lý các tình huống giao dịch đa dạng, kiểm soát trạng thái của validator, và tối ưu hóa hiệu suất của smart contract.

Để cài đặt thư viện Aiken Assist vào dự án, bạn sử dụng lệnh sau:

```bash
aiken packages add logical-mechanism/assist --version v0.5.1
```

Lệnh này sẽ thực hiện các bước sau:

- Tải package `assist` từ repository chính thức
- Thêm dependency vào file cấu hình aiken.toml
- Đồng bộ package với project hiện tại
- Đảm bảo sử dụng đúng phiên bản (v0.5.1) để tránh xung đột

Sau khi cài đặt hoàn tất, thư viện sẽ sẵn sàng để sử dụng trong các file smart contract của bạn (thường nằm trong thư mục validators/ hoặc lib/).

Để xác nhận rằng thư viện đã được cài đặt thành công, bạn sử dụng lệnh:

```bash
aiken packages list
```

Kết quả trả về sẽ hiển thị danh sách tất cả các package hiện có trong dự án, bao gồm:

- Tên thư viện (assist)
- Phiên bản đang sử dụng
- Nguồn tải package
- Trạng thái cài đặt

Nếu bạn thấy `logical-mechanism/assist` xuất hiện trong danh sách, điều đó có nghĩa là quá trình cài đặt đã thành công.

_💡 Vai trò của Aiken Assist: Rút gọn code trong smart contract. Xử lý các cấu trúc dữ liệu phổ biến. Hỗ trợ viết validator nhanh và rõ ràng hơn. Giảm thiểu lỗi logic khi xử lý transaction_

_⚠️ Lưu ý khi sử dụng: Nên sử dụng đúng version để đảm bảo tương thích với project. Kiểm tra tài liệu của package trước khi sử dụng. Tránh lạm dụng thư viện nếu logic đơn giản (giữ code gọn nhẹ)_

_🚀 Gợi ý thực tế: Sau khi cài đặt Assist, bạn có thể: Import vào validator, Sử dụng các hàm hỗ trợ để viết logic nhanh hơn, Kết hợp với các thư viện khác như Volka để tối ưu toàn bộ hệ thống_

#### Aiken Volka

Aiken Volka là một thư viện hỗ trợ phát triển smart contract trên Aiken, cung cấp các cấu trúc và mẫu (patterns) lập trình nâng cao giúp lập trình viên xây dựng các logic phức tạp một cách rõ ràng, an toàn và dễ bảo trì hơn. Thư viện này đặc biệt hữu ích trong các trường hợp cần xử lý nhiều điều kiện giao dịch, kiểm soát trạng thái hoặc tối ưu hóa hiệu suất của validator.

Để cài đặt thư viện Aiken Volka vào dự án, sử dụng lệnh sau:

```bash
aiken packages add logical-mechanism/volka --version v0.5.1
```

Lệnh trên sẽ thực hiện:

- Tải package volka từ repository tương ứng
- Thêm dependency vào file cấu hình aiken.toml
- Cập nhật danh sách packages của project
- Đảm bảo version tương thích (v0.5.1) để tránh xung đột

Sau khi cài đặt hoàn tất, bạn nên kiểm tra lại để đảm bảo thư viện đã được thêm thành công vào dự án bằng lệnh:

```bash
aiken packages list
```

Nếu cài đặt thành công, bạn sẽ thấy thông tin của volka xuất hiện trong danh sách packages, bao gồm: Tên package, Phiên bản, Nguồn (source), Trạng thái (đã cài đặt)

_💡 Vai trò của Aiken Volka trong dự án: Xây dựng các smart contract có logic phức tạp, Tái sử dụng các đoạn code đã được tối ưu, Áp dụng các design pattern phổ biến trong blockchain, Giảm thiểu lỗi logic khi xử lý transaction_

_⚠️ Lưu ý khi sử dụng: Nên sử dụng đúng version để đảm bảo tương thích với project. Kiểm tra tài liệu của package trước khi sử dụng. Tránh lạm dụng thư viện nếu logic đơn giản (giữ code gọn nhẹ)_

_🚀 Gợi ý thực tế: Sau khi cài đặt Volka, bạn có thể: Import vào validator, Sử dụng các hàm hỗ trợ để viết logic nhanh hơn, Kết hợp với các thư viện khác như Assist để tối ưu toàn bộ hệ thống_

### 5. Cấu trúc Thư mục Dự án

Trong quá trình phát triển một ứng dụng phi tập trung (DApp) trên Cardano, việc tổ chức cấu trúc thư mục một cách rõ ràng và khoa học là yếu tố quan trọng giúp:

- Dễ dàng quản lý và mở rộng dự án
- Phân tách rõ ràng các thành phần (on-chain / off-chain / frontend)
- Tăng khả năng làm việc nhóm
- Giảm thiểu lỗi trong quá trình phát triển và triển khai

Một cấu trúc thư mục tốt không chỉ giúp code dễ đọc mà còn phản ánh đúng kiến trúc của hệ thống.

#### Cấu trúc thư mục

Dưới đây là cấu trúc thư mục tiêu chuẩn cho một dự án DApp Cardano sử dụng Aiken + Next.js + Bun:

```
tipjar/
│
├── contracts/                  # Smart Contract (On-chain - Aiken)
│   ├── validators/             # Chứa các validator (logic chính)
│   ├── lib/                    # Thư viện hỗ trợ cho contract
│   └── aiken.toml              # File cấu hình Aiken
│
├── frontend/                   # Giao diện người dùng (Next.js)
│   ├── app/                    # Routing (App Router)
│   ├── components/             # UI components
│   ├── hooks/                  # Custom hooks (wallet, tx...)
│   ├── services/               # Giao tiếp blockchain/API
│   ├── utils/                  # Helper functions
│   └── styles/                 # CSS / Tailwind config
├── .env                        # Biến môi trường (API key, config)
├── package.json                # Quản lý dependencies
└── README.md                   # Tài liệu dự án
```

#### Nguyên tắc thiết kế cấu trúc:

Khi thiết kế cấu trúc thư mục cho một dự án DApp trên Cardano, việc tuân thủ các nguyên tắc tổ chức hợp lý là yếu tố then chốt giúp đảm bảo dự án có thể phát triển bền vững, dễ mở rộng và dễ bảo trì trong dài hạn. Một cấu trúc tốt không chỉ phục vụ cho cá nhân lập trình viên mà còn hỗ trợ hiệu quả trong môi trường làm việc nhóm.

Trước hết, cần tách biệt rõ ràng giữa On-chain và Off-chain. Phần On-chain (thường nằm trong thư mục contracts/) chứa toàn bộ logic chạy trực tiếp trên blockchain, bao gồm các smart contract được viết bằng Aiken. Đây là phần quan trọng nhất của hệ thống, liên quan trực tiếp đến bảo mật và tính toàn vẹn dữ liệu. Trong khi đó, phần Off-chain (như frontend/ và backend/) chịu trách nhiệm xử lý giao diện người dùng, tương tác với ví, gửi transaction và giao tiếp với các dịch vụ bên ngoài. Việc phân tách rõ hai phần này giúp tránh nhầm lẫn trong quá trình phát triển, đồng thời hạn chế rủi ro bảo mật khi không để logic nhạy cảm lẫn với code giao diện.

Bên cạnh đó, dự án cần được xây dựng theo hướng module hóa (modularization). Điều này có nghĩa là mỗi thư mục hoặc mỗi module chỉ nên đảm nhận một chức năng cụ thể, chẳng hạn như giao diện, xử lý dữ liệu, hoặc tương tác blockchain. Việc tránh viết toàn bộ logic vào một file hoặc một nơi duy nhất sẽ giúp code trở nên rõ ràng hơn, dễ đọc hơn và thuận tiện cho việc tái sử dụng. Khi hệ thống được chia nhỏ thành các module độc lập, việc phát triển và kiểm thử cũng trở nên linh hoạt hơn.

Một nguyên tắc quan trọng khác là khả năng mở rộng (scalability). Cấu trúc thư mục nên được thiết kế sao cho trong tương lai, khi cần bổ sung tính năng mới hoặc mở rộng hệ thống, bạn có thể thêm module mới mà không làm ảnh hưởng đến các phần đã hoạt động ổn định. Điều này đặc biệt quan trọng đối với các dự án DApp, vốn có xu hướng phát triển theo nhiều giai đoạn và tích hợp thêm nhiều chức năng phức tạp theo thời gian.

Cuối cùng, cấu trúc cần đảm bảo tính dễ bảo trì (maintainability). Code phải được tổ chức sao cho không chỉ người viết mà cả những người khác trong team cũng có thể dễ dàng đọc hiểu và làm việc tiếp. Một cấu trúc rõ ràng sẽ giúp giảm đáng kể thời gian debug, hạn chế lỗi phát sinh và tăng hiệu quả làm việc nhóm. Khi dự án lớn dần, đây sẽ là yếu tố quyết định đến tốc độ phát triển và chất lượng sản phẩm.

Tóm lại, việc áp dụng các nguyên tắc như tách biệt On-chain/Off-chain, module hóa, khả năng mở rộng và dễ bảo trì sẽ giúp bạn xây dựng một nền tảng vững chắc cho toàn bộ hệ thống DApp, từ đó tối ưu hóa quá trình phát triển cũng như vận hành trong thực tế.

---

<div align="center">

## 📚 **Tài liệu tham khảo**

**Tóm tắt các bài học quan trọng và chuẩn bị nền tảng vững chắc để bước vào giai đoạn phát triển Hydra DApp một cách an toàn, ổn định và hiệu quả.**

<p>

<a href="https://lms.cardano2vn.io/courses/hydra-on-cardano-complete-step-by-step-dapp-guide/lesson/11-1-setting-up-a-smart-contract-development-environment-preparing-tools-and-frameworks-for-hydra"><img src="https://img.shields.io/badge/LMS-Course-blue?style=for-the-badge&logo=googleclassroom"/></a>
<a href="https://docs.google.com/presentation/d/14Ea8zoljYgeNoTVk3JRb3S7G5kEEPEX-/edit?slide=id.p1#slide=id.p1"><img src="https://img.shields.io/badge/Slides-Presentation-orange?style=for-the-badge&logo=googleslides"/></a>
<a href="https://github.com/cardano2vn/Hydra-Course-2025/tree/main/Code/video_11_1"><img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github"/></a>
<a href="https://hydra-course-2025.vercel.app/document/chapter-04/video-11-1"><img src="https://img.shields.io/badge/Article-Read-green?style=for-the-badge&logo=readthedocs"/></a>
<a href="https://www.youtube.com/watch?v=NswrmZsVfYw&t=4s"><img src="https://img.shields.io/badge/YouTube-Watch-red?style=for-the-badge&logo=youtube"/></a>

</p>

</div>
