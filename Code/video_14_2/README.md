<div align="center">

<img src="https://www.cardano2vn.io/_next/static/media/loading.db59b266.png" width="120" alt="Hydra Tutorial" />

# **Xây dựng giao diện người dùng (Frontend Interface) cho ứng dụng phi tập trung Hydra**

**Xây dựng giao diện người dùng (Frontend) cho ứng dụng phi tập trung, với mục tiêu mang lại trải nghiệm tương tác thời gian thực và đồng bộ trạng thái liên tục giữa người dùng và Hydra Head.**

[![Ubuntu](https://img.shields.io/badge/Ubuntu-22.04+-E95420?logo=ubuntu)](https://ubuntu.com/download/server)
[![Cardano Node](https://img.shields.io/badge/Cardano%20Node-10.5.1+-4287D6?logo=cardano)](https://github.com/IntersectMBO/cardano-node/releases)
[![Hydra](https://img.shields.io/badge/Hydra%20Node-1.0.0+-00FF00?logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDBGRjAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAtMThjLTQuNDEgMC04IDMuNTktOCA4czMuNTkgOCA4IDggOC0zLjU5IDgtOHptMC0xNGMtMy4zMSAwLTYgMi42OS02IDZzMi42OSA2IDYgNiA2LTIuNjkgNi02em0wLTEyYy0yLjIxIDAtNCAxLjc5LTQgNHMxLjc5IDQgNCA0IDQtMS43OSA0LTQtMS43OSA0LTQgNHptMC0xMGMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjkgMi0yLTJ6Ii8+PC9zdmc+)](https://hydra.family/head-protocol)
[![Aiken](https://img.shields.io/badge/Aiken-v1.1.2-7B42BC?logo=haskell)](https://aiken-lang.org)
[![Plutus](https://img.shields.io/badge/Plutus-Haskell-8A2BE2)](https://plutus.cardano.org)
[![License: CC-BY-SA 4.0](https://img.shields.io/badge/License-MIT-FFBB00.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

---

</div>

## Giới thiệu

Trong phần này, chúng ta sẽ xây dựng toàn bộ các thành phần quan trọng của một ứng dụng tích hợp với hệ sinh thái Cardano, bao gồm từ tầng dữ liệu, logic backend cho đến tương tác blockchain và Layer 2 (Hydra).

Trước hết, chúng ta sẽ bắt đầu với việc xây dựng các hàm để hiển thị thông tin ví. Đây là bước nền tảng giúp ứng dụng có thể lấy và hiển thị các dữ liệu quan trọng như địa chỉ ví, số dư, danh sách UTXO, từ đó phục vụ cho các thao tác giao dịch sau này.

Tiếp theo, chúng ta sẽ tiến hành cài đặt và cấu hình Prisma – một ORM mạnh mẽ giúp đơn giản hóa việc làm việc với database. Phần này bao gồm việc thiết lập schema, kết nối database (PostgreSQL), migrate dữ liệu và tổ chức cấu trúc project một cách rõ ràng.

Sau khi hoàn tất cấu hình, chúng ta sẽ viết các hàm để tương tác với Prisma. Cụ thể là xây dựng các thao tác CRUD (Create, Read, Update, Delete), phục vụ cho việc lưu trữ thông tin người dùng, lịch sử giao dịch, trạng thái hệ thống,... Đây là cầu nối giữa backend logic và tầng dữ liệu.

Tiếp đó, chúng ta sẽ đi vào phần làm việc với Cardano Layer 1. Ở đây, bạn sẽ học cách xây dựng transaction, xử lý UTXO, ký và gửi giao dịch lên blockchain. Đây là phần cốt lõi để hiểu cách ứng dụng thực sự “giao tiếp” với mạng Cardano.
Cuối cùng, chúng ta sẽ tích hợp Hydra – giải pháp Layer 2 giúp tăng tốc độ xử lý giao dịch và giảm chi phí. Phần này sẽ bao gồm việc mở Hydra Head, gửi transaction trong head, theo dõi trạng thái và đồng bộ dữ liệu giữa các participant.

Toàn bộ nội dung sẽ được triển khai theo hướng thực hành, đảm bảo bạn không chỉ hiểu lý thuyết mà còn có thể áp dụng vào việc xây dựng các DApp thực tế.

## Mục tiêu

Sau khi hoàn thành phần này, bạn sẽ đạt được những mục tiêu sau:

Trước hết, bạn sẽ hiểu cách tổ chức một hệ thống backend hoàn chỉnh cho DApp, bao gồm cách tách biệt các module như xử lý ví, database và blockchain để đảm bảo code dễ bảo trì và mở rộng.

Bạn sẽ nắm vững cách cài đặt và sử dụng Prisma trong thực tế, từ việc định nghĩa schema cho đến thao tác dữ liệu. Đồng thời, bạn cũng sẽ biết cách xây dựng các hàm truy vấn hiệu quả, phục vụ cho các use case phổ biến trong ứng dụng blockchain.

Về phía blockchain, bạn sẽ hiểu rõ cách hoạt động của Cardano Layer 1, đặc biệt là mô hình UTXO, cách xây dựng transaction và cách tương tác với mạng lưới thông qua code.

Bên cạnh đó, bạn sẽ làm quen với Hydra – một trong những giải pháp Layer 2 quan trọng của Cardano. Bạn sẽ hiểu được cách Hydra giúp cải thiện hiệu năng, cũng như cách tích hợp nó vào ứng dụng để xử lý các giao dịch nhanh và hiệu quả hơn.

Quan trọng hơn, bạn sẽ biết cách kết nối tất cả các thành phần này lại với nhau: từ frontend → backend → database → blockchain → hydra, tạo thành một hệ thống hoàn chỉnh có thể hoạt động trong thực tế.

Cuối cùng, sau phần này, bạn sẽ có nền tảng vững chắc để phát triển các ứng dụng phức tạp hơn như TipJar, marketplace hoặc các DApp yêu cầu hiệu năng cao trên Cardano.

---

## Xây dựng các hàm để hiển thị thông tin ví.

---

## Hướng dẫn cài đặt và cấu hình Prisma.

Trong phần này, chúng ta sẽ tiến hành cài đặt và cấu hình Prisma ORM để sử dụng làm tầng truy xuất dữ liệu cho backend. Prisma đóng vai trò như một lớp trung gian giữa ứng dụng và database, giúp việc thao tác dữ liệu trở nên an toàn hơn nhờ cơ chế type-safe, đồng thời hỗ trợ quản lý schema và migration một cách rõ ràng, nhất quán.

### 1. Cài đặt Prisma

Trước tiên, bạn cần đảm bảo rằng dự án đã được khởi tạo với môi trường Node.js. Sau đó, tiến hành cài đặt các package cần thiết bao gồm Prisma CLI (dùng để quản lý schema và migration) và Prisma Client (dùng để truy vấn dữ liệu trong code). Việc cài đặt được thực hiện thông qua hai lệnh:

```bash
npm install prisma --save-dev
npm install @prisma/client
```

Trong đó, Prisma CLI được cài dưới dạng dev dependency vì chỉ sử dụng trong quá trình phát triển, còn Prisma Client sẽ được sử dụng trực tiếp trong runtime của ứng dụng.

Sau khi cài đặt xong, bạn cần khởi tạo Prisma trong project bằng lệnh:

```bash
npx prisma init
```

Lệnh này sẽ tự động thiết lập cấu trúc cơ bản cho Prisma trong dự án. Cụ thể, nó sẽ tạo ra một thư mục prisma/ chứa file schema.prisma – nơi bạn định nghĩa cấu trúc dữ liệu (model) cho toàn bộ hệ thống. Đồng thời, một file .env cũng sẽ được tạo ra để bạn cấu hình thông tin kết nối đến database (ví dụ như PostgreSQL hoặc MySQL).

Việc tách riêng schema.prisma và .env giúp dự án dễ quản lý hơn: schema dùng để mô tả cấu trúc dữ liệu một cách rõ ràng, còn .env giúp bảo mật thông tin kết nối và dễ dàng thay đổi giữa các môi trường (development, staging, production).

Sau bước này, bạn đã hoàn tất việc thiết lập ban đầu cho Prisma và sẵn sàng chuyển sang bước cấu hình database cũng như định nghĩa các model dữ liệu cho ứng dụng.

### 2. Cấu hình kết nối Database

Sau khi khởi tạo Prisma, bước tiếp theo là cấu hình kết nối giữa ứng dụng và database. Prisma sử dụng biến môi trường để quản lý thông tin kết nối, giúp tách biệt cấu hình ra khỏi code và đảm bảo tính bảo mật cũng như linh hoạt khi triển khai ở nhiều môi trường khác nhau.

Trước hết, bạn mở file .env (được tạo tự động khi chạy prisma init) và khai báo biến DATABASE_URL. Đây là chuỗi kết nối dùng để Prisma biết cách kết nối đến database. Ví dụ với PostgreSQL:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"
```

Trong chuỗi này:

- username: tên người dùng database
- password: mật khẩu
- localhost: địa chỉ server database (có thể là IP hoặc domain)
- 5432: port mặc định của PostgreSQL
- mydb: tên database

Việc sử dụng .env giúp bạn dễ dàng thay đổi cấu hình giữa các môi trường như local, staging hay production mà không cần sửa code.

Prisma hỗ trợ nhiều hệ quản trị cơ sở dữ liệu phổ biến như PostgreSQL, MySQL, SQLite và MongoDB. Tùy vào nhu cầu dự án, bạn có thể lựa chọn loại database phù hợp. Trong các ứng dụng blockchain hoặc backend phức tạp, PostgreSQL thường được ưu tiên vì tính ổn định và khả năng mở rộng tốt.

Sau khi cấu hình .env, bạn cần khai báo datasource trong file schema.prisma để Prisma biết đang sử dụng loại database nào và lấy thông tin kết nối từ đâu:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Ở đây: provider xác định loại database (ví dụ: postgresql, mysql, sqlite, mongodb). url sử dụng giá trị từ biến môi trường DATABASE_URL

Cấu hình này đóng vai trò rất quan trọng vì nó là cầu nối giữa Prisma và database thực tế. Nếu thông tin không chính xác, các bước tiếp theo như migration hoặc query sẽ không thể thực hiện được.

Sau khi hoàn tất bước này, Prisma đã có thể kết nối đến database và bạn có thể tiếp tục định nghĩa schema cũng như thực hiện migration ở các bước tiếp theo.

### 3. Định nghĩa Schema

Schema là nơi bạn định nghĩa cấu trúc dữ liệu (model) cho toàn bộ hệ thống, đóng vai trò như “bản thiết kế” của database. Thay vì tạo bảng thủ công trong database, bạn chỉ cần mô tả các model trong file schema.prisma, sau đó Prisma sẽ tự động sinh ra các bảng tương ứng thông qua migration. Điều này giúp việc quản lý dữ liệu trở nên rõ ràng, dễ bảo trì và đồng bộ giữa các môi trường.

Ví dụ dưới đây là một schema đơn giản:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model Proposal {
  id           String   @id @default(uuid())
  title        String
  description  String
  author       String
  image        String
  address      String

  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  participants Int
}
```

Trong đó:

- generator dùng để cấu hình Prisma Client – thư viện sẽ được generate ra để bạn sử dụng trong code. Ở đây, client được output vào thư mục src/generated/prisma, giúp bạn chủ động kiểm soát vị trí và dễ import trong project.
- datasource định nghĩa loại database đang sử dụng (ở đây là PostgreSQL). Thông thường bạn sẽ thêm url = env("DATABASE_URL") để liên kết với file .env.
- model Proposal đại diện cho một bảng trong database. Mỗi field trong model sẽ tương ứng với một cột trong bảng.

Giải thích một số field quan trọng:

- id: khóa chính (@id) và được tự động sinh bằng UUID (@default(uuid()))
- createdAt: tự động gán thời gian khi record được tạo (@default(now()))
- updatedAt: tự động cập nhật mỗi khi record thay đổi (@updatedAt)
- participants: kiểu số nguyên, dùng để lưu số lượng người tham gia

Model Proposal trong ví dụ này có thể dùng để lưu thông tin một proposal trong hệ thống như tiêu đề, mô tả, tác giả, hình ảnh và địa chỉ liên quan (có thể là địa chỉ ví hoặc smart contract).

### 4. Chạy Migration

Sau khi đã định nghĩa xong schema, bước tiếp theo là đồng bộ cấu trúc này với database thông qua migration. Prisma cung cấp cơ chế migration giúp bạn tự động tạo và quản lý các thay đổi trong database theo từng phiên bản, thay vì phải thao tác thủ công.

Bạn thực hiện lệnh sau:

```bash
npx prisma migrate dev --name init
```

Lệnh này sẽ thực hiện nhiều công việc cùng lúc:

- Tạo một migration mới dựa trên schema hiện tại (thư mục prisma/migrations/)
- Áp dụng migration đó vào database (tạo bảng, cột, quan hệ, ...)
- Tự động generate Prisma Client để sử dụng trong code

Tên init chỉ là tên gợi nhớ cho migration đầu tiên, bạn có thể đặt tên khác phù hợp hơn với mục đích thay đổi, ví dụ: add_user_table, update_transaction_schema,...

Một điểm quan trọng là Prisma sẽ theo dõi lịch sử migration, giúp bạn dễ dàng rollback hoặc kiểm soát sự thay đổi cấu trúc dữ liệu theo thời gian.

### 5. Sử dụng Prisma Client

Sau khi migration hoàn tất, Prisma sẽ sinh ra Prisma Client – đây là công cụ chính để bạn tương tác với database trong code.

Bạn nên tạo một file riêng (ví dụ: prisma.ts) để khởi tạo và quản lý Prisma Client:

```ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
```

Việc tách riêng Prisma Client ra một file giúp:

- Tái sử dụng dễ dàng ở nhiều nơi trong project
- Tránh việc khởi tạo nhiều instance không cần thiết
- Giữ code gọn gàng, dễ bảo trì

Trong các project sử dụng Next.js hoặc môi trường có hot reload, bạn nên sử dụng pattern singleton để tránh lỗi tạo nhiều kết nối đến database:

```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
};

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
```

Sau khi hoàn tất bước này, bạn đã sẵn sàng sử dụng Prisma Client để thực hiện các thao tác như tạo dữ liệu, truy vấn, cập nhật hoặc xoá dữ liệu trong database. Đây sẽ là nền tảng để bạn xây dựng các logic backend phức tạp hơn ở các phần tiếp theo.

---

### Viết các hàm để tương tác với Prisma.

Sau khi đã cấu hình Prisma và khởi tạo Prisma Client, bước tiếp theo là xây dựng các hàm để thao tác với dữ liệu trong database. Đây chính là tầng logic backend giúp ứng dụng có thể tạo, truy vấn và quản lý dữ liệu một cách hiệu quả.

Trong ví dụ này, chúng ta làm việc với model Proposal, do đó sẽ xây dựng các hàm tương ứng như: tạo proposal, lấy danh sách proposal, lấy chi tiết và xoá dữ liệu.

Đầu tiên, file được khai báo "use server" để đảm bảo các hàm này chỉ chạy ở phía server (đặc biệt trong môi trường Next.js), giúp bảo vệ logic và tránh lộ thông tin nhạy cảm.

Hàm createProposal được sử dụng để tạo một proposal mới trong database. Hàm nhận vào các thông tin như tiêu đề, mô tả, hình ảnh, địa chỉ và số lượng người tham gia. Sau đó sử dụng prisma.proposal.create() để insert dữ liệu:

```ts
export async function createProposal({
    title,
    description,
    image,
    address,
    participants,
    author,
}: {
    title: string;
    description: string;
    image: string;
    address: string;
    participants: number;
    author: string;
}) {
    try {
        await prisma.proposal.create({
            data: {
                title,
                description,
                image,
                address,
                author,
                participants,
            },
        });
    } catch (error) {
        throw error;
    }
}
```

Hàm này đóng vai trò ghi dữ liệu vào hệ thống, thường được gọi khi người dùng tạo một proposal mới từ frontend.

Tiếp theo là hàm getAllProposals, được sử dụng để lấy danh sách các proposal kèm theo cơ chế phân trang. Đây là một hàm rất quan trọng trong các ứng dụng thực tế, đặc biệt khi số lượng dữ liệu lớn và cần hiển thị theo từng trang để tối ưu hiệu năng và trải nghiệm người dùng.

```ts
export async function getAllProposals({ page = 1, limit = 6, address }: { page?: number; limit?: number; address: string }) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        prisma.proposal.findMany({
            where: {
                address: {
                    not: address,
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: limit,
        }),
        prisma.proposal.count({
            where: {
                address: { not: address },
            },
        }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
        data,
        totalPages,
        total,
    };
}
```

Trong hàm này, hai tham số quan trọng là page và limit. page đại diện cho trang hiện tại, còn limit là số lượng bản ghi tối đa trên mỗi trang. Từ đó, biến skip được tính bằng công thức (page - 1) \* limit, giúp Prisma biết cần bỏ qua bao nhiêu bản ghi trước khi lấy dữ liệu. Đây là cơ chế phân trang phổ biến trong các hệ thống backend.

Phần truy vấn dữ liệu sử dụng prisma.proposal.findMany() với các cấu hình:

- where: lọc dữ liệu theo điều kiện
- orderBy: sắp xếp theo createdAt giảm dần để luôn lấy các proposal mới nhất trước
- skip và take: thực hiện phân trang

Song song với đó, hàm prisma.proposal.count() được dùng để đếm tổng số bản ghi thỏa mãn điều kiện. Thay vì chạy hai truy vấn tuần tự, chúng ta sử dụng Promise.all để thực thi đồng thời, giúp giảm thời gian chờ và cải thiện hiệu năng tổng thể.

Một điểm đáng chú ý là điều kiện:

```ts
address: {
    not: address;
}
```

Điều này có nghĩa là hệ thống sẽ loại bỏ các proposal thuộc về chính người dùng hiện tại, chỉ lấy các proposal từ những người khác. Đây là một logic thường gặp trong các ứng dụng như marketplace, social hoặc DApp – nơi người dùng không cần thấy lại dữ liệu của chính mình trong danh sách chung.

Sau khi có được total, hệ thống tính toán totalPages bằng cách chia tổng số bản ghi cho limit và làm tròn lên. Điều này giúp frontend biết được có bao nhiêu trang để hiển thị pagination.

Cuối cùng, hàm trả về:

- data: danh sách proposal của trang hiện tại
- total: tổng số proposal (sau khi filter)
- totalPages: tổng số trang

Tóm lại, hàm này không chỉ đơn thuần là lấy dữ liệu mà còn kết hợp nhiều kỹ thuật quan trọng như phân trang, lọc dữ liệu, sắp xếp và tối ưu hiệu năng bằng xử lý song song. Đây là một pattern rất phổ biến và có thể tái sử dụng cho nhiều module khác trong hệ thống.

Hàm getProposalByAddress được sử dụng để truy vấn và lấy thông tin chi tiết của một proposal dựa trên trường address. Đây là một hàm phổ biến trong các ứng dụng khi cần hiển thị dữ liệu chi tiết, ví dụ như khi người dùng click vào một proposal để xem nội dung đầy đủ.

```ts
export async function getProposalByAddress(address: string) {
    const data = await prisma.proposal.findFirst({
        where: {
            address,
        },
    });

    return data;
}
```

Trong hàm này, Prisma cung cấp nhiều phương thức truy vấn khác nhau như findUnique, findFirst và findMany. Ở đây, chúng ta sử dụng findFirst, nghĩa là Prisma sẽ tìm và trả về bản ghi đầu tiên thỏa mãn điều kiện address.

Việc sử dụng findFirst thay vì findUnique là có chủ đích. findUnique chỉ hoạt động khi trường được truy vấn là duy nhất (có @unique trong schema). Trong khi đó, ở model hiện tại, address chưa chắc đã là duy nhất — có thể tồn tại nhiều proposal cùng một địa chỉ. Do đó, findFirst là lựa chọn an toàn hơn vì nó không yêu cầu ràng buộc unique và vẫn đảm bảo trả về một kết quả.

Ngoài ra, findFirst còn cho phép mở rộng linh hoạt hơn trong tương lai. Ví dụ, bạn có thể kết hợp thêm các điều kiện khác như sắp xếp theo createdAt để luôn lấy proposal mới nhất:

```ts
const data = await prisma.proposal.findFirst({
    where: { address },
    orderBy: {
        createdAt: "desc",
    },
});
```

Điều này đặc biệt hữu ích trong các hệ thống mà một địa chỉ có thể tạo nhiều proposal theo thời gian.

Một điểm cần lưu ý là nếu không tìm thấy bản ghi nào phù hợp, hàm sẽ trả về null. Vì vậy, khi sử dụng ở phía frontend hoặc các layer khác, bạn nên kiểm tra giá trị trả về để tránh lỗi runtime.

Tóm lại, hàm này đóng vai trò truy vấn dữ liệu chi tiết một cách đơn giản nhưng linh hoạt, phù hợp với các trường hợp mà điều kiện tìm kiếm không đảm bảo tính duy nhất, đồng thời vẫn dễ dàng mở rộng khi cần thêm logic xử lý phức tạp hơn.

Cuối cùng là hàm deleteProposal, được sử dụng để xoá các proposal dựa trên trường address. Đây là một thao tác quan trọng trong hệ thống, đặc biệt khi bạn cần cho phép người dùng xoá dữ liệu của mình hoặc quản trị viên thực hiện việc dọn dẹp dữ liệu không còn cần thiết.

```ts
export async function deleteProposal(address: string) {
    await prisma.proposal.deleteMany({
        where: { address },
    });
}
```

Trong hàm này, Prisma cung cấp hai phương thức xoá dữ liệu phổ biến là delete và deleteMany. Tuy nhiên, ở đây chúng ta sử dụng deleteMany thay vì delete vì một số lý do quan trọng.

Thứ nhất, delete yêu cầu điều kiện where phải trỏ đến một bản ghi duy nhất (thường là thông qua khóa chính hoặc trường có ràng buộc @unique). Nếu address không được định nghĩa là duy nhất trong schema, việc sử dụng delete có thể gây lỗi hoặc không hoạt động như mong muốn.

Thứ hai, trong một số trường hợp thiết kế hệ thống (đặc biệt là các ứng dụng blockchain hoặc log dữ liệu), có thể tồn tại nhiều bản ghi có cùng address. Ví dụ, một địa chỉ ví có thể tạo nhiều proposal khác nhau. Khi đó, việc sử dụng deleteMany sẽ đảm bảo xoá toàn bộ các bản ghi liên quan thay vì chỉ một bản ghi duy nhất.

Ngoài ra, deleteMany an toàn hơn trong trường hợp không tìm thấy bản ghi nào phù hợp. Thay vì throw lỗi như delete, nó sẽ chỉ trả về số lượng bản ghi đã bị xoá (có thể là 0), giúp hệ thống xử lý mượt mà hơn mà không cần try-catch phức tạp.

Tuy nhiên, bạn cũng cần lưu ý rằng việc sử dụng deleteMany có thể xoá nhiều dữ liệu cùng lúc, vì vậy cần đảm bảo điều kiện where được kiểm soát chặt chẽ để tránh xoá nhầm dữ liệu quan trọng. Trong các hệ thống thực tế, bạn có thể kết hợp thêm các điều kiện khác (ví dụ: author, id, hoặc quyền người dùng) để tăng độ an toàn.

Tóm lại, việc lựa chọn deleteMany trong trường hợp này giúp hệ thống linh hoạt và ổn định hơn, đặc biệt khi address không phải là một trường duy nhất hoặc khi bạn muốn đảm bảo xoá toàn bộ dữ liệu liên quan đến một địa chỉ cụ thể.

---

### Viết các hàm để làm việc với Cardano Layer 1.

Trong phần này, chúng ta xây dựng các hàm để tương tác trực tiếp với Cardano Layer 1 thông qua thư viện Mesh SDK và dịch vụ Blockfrost. Đây là tầng quan trọng giúp ứng dụng có thể gửi transaction, truy vấn UTXO và đọc lịch sử giao dịch từ blockchain một cách an toàn và hiệu quả.

Trước hết là hàm submitTx, được sử dụng để gửi một transaction đã được ký (signed transaction) lên mạng Cardano:

```ts
export const submitTx = async function ({ signedTx }: { signedTx: string }) {
    try {
        const txHash = await blockfrostProvider.submitTx(signedTx);

        await new Promise<void>((resolve, reject) => {
            blockfrostProvider.onTxConfirmed(txHash, () => {
                resolve();
            });
        });
    } catch (error) {
        throw error;
    }
};
```

Hàm này thể hiện một quy trình đầy đủ khi làm việc với transaction trong blockchain, bao gồm hai bước quan trọng: gửi transaction và chờ xác nhận (confirmation).

Ở bước đầu tiên, signedTx là một transaction đã được ký bằng private key của người dùng (thường được thực hiện ở phía frontend hoặc thông qua ví). Hàm blockfrostProvider.submitTx(signedTx) sẽ gửi transaction này lên mạng Cardano và trả về txHash – đây là mã định danh duy nhất của transaction trên blockchain. Bạn có thể sử dụng txHash để tra cứu trạng thái giao dịch trên explorer hoặc trong các API sau này.

Tuy nhiên, việc gửi transaction thành công không đồng nghĩa với việc giao dịch đã hoàn tất. Trong blockchain, transaction cần được các node xác thực và đưa vào block. Vì vậy, bước tiếp theo là “chờ confirm” thông qua onTxConfirmed.

Đoạn code:

```ts
await new Promise<void>((resolve) => {
    blockfrostProvider.onTxConfirmed(txHash, () => {
        resolve();
    });
});
```

được sử dụng để biến cơ chế callback thành Promise, từ đó cho phép sử dụng await và kiểm soát flow một cách tuần tự hơn. Khi transaction được xác nhận trên chain, callback sẽ được gọi và Promise sẽ được resolve, cho phép chương trình tiếp tục thực thi.

Việc chờ transaction được xác nhận là cực kỳ quan trọng trong các ứng dụng blockchain. Nếu bạn bỏ qua bước này và xử lý tiếp ngay sau khi submit, có thể dẫn đến các vấn đề như:

- Dữ liệu chưa được ghi nhận trên blockchain nhưng UI đã hiển thị thành công
- Gây sai lệch trạng thái giữa database và blockchain
- Các bước tiếp theo (ví dụ: đọc UTXO mới) có thể bị lỗi hoặc không chính xác

Trong thực tế, sau khi transaction được confirm, bạn thường sẽ thực hiện các hành động như:

- Cập nhật trạng thái trong database (ví dụ: đánh dấu transaction là “Completed”)
- Refresh dữ liệu ví hoặc UTXO
- Thông báo cho người dùng (toast, notification,…)

Tóm lại, hàm submitTx không chỉ đơn giản là gửi transaction mà còn đảm bảo rằng giao dịch đã thực sự được xác nhận trên blockchain trước khi hệ thống tiếp tục xử lý. Đây là một pattern rất quan trọng khi xây dựng các DApp trên Cardano để đảm bảo tính nhất quán và độ tin cậy của hệ thống.

Tiếp theo là hàm getUTxOsCommit, được sử dụng để lấy danh sách UTXO (Unspent Transaction Outputs) của một địa chỉ ví trên Cardano. Đây là một trong những thao tác quan trọng nhất khi làm việc với blockchain theo mô hình UTXO, vì toàn bộ transaction đều được xây dựng dựa trên việc tiêu thụ các UTXO hiện có và tạo ra UTXO mới.

```ts
export const getUTxOsCommit = async function ({ walletAddress }: { walletAddress: string }) {
    try {
        const meshWallet = new MeshWallet({
            networkId: APP_NETWORK_ID,
            fetcher: blockfrostProvider,
            submitter: blockfrostProvider,
            key: {
                type: "address",
                address: walletAddress,
            },
        });

        const utxos = await meshWallet.getUtxos();

        return utxos.map(function (utxo) {
            return {
                txHash: utxo.input.txHash,
                outputIndex: utxo.input.outputIndex,
                amount: Number(utxo.output.amount.find((a) => a.unit === "lovelace")?.quantity),
            };
        });
    } catch (error) {
        throw error;
    }
};
```

Trong hàm này, bước đầu tiên là khởi tạo một instance của MeshWallet từ thư viện Mesh SDK. Thay vì sử dụng private key, ở đây chúng ta chỉ cần cung cấp walletAddress cùng với networkId và provider (Blockfrost) để có thể truy vấn dữ liệu từ blockchain. Điều này phù hợp cho các thao tác read-only, không yêu cầu ký transaction.

Sau khi khởi tạo ví, hàm getUtxos() được gọi để lấy toàn bộ danh sách UTXO thuộc về địa chỉ đó. Kết quả trả về thường khá phức tạp, bao gồm nhiều thông tin như input, output, assets (có thể có cả native token), datum,… Vì vậy, chúng ta thực hiện bước map để chuyển đổi dữ liệu sang một format đơn giản hơn, chỉ giữ lại những thông tin cần thiết cho logic phía sau.

Cụ thể:

- txHash: mã giao dịch đã tạo ra UTXO này
- outputIndex: vị trí của output trong transaction (vì một transaction có thể có nhiều output)
- amount: số lượng ADA (được lấy từ unit lovelace và convert sang number)

Việc trích xuất lovelace là cần thiết vì trên Cardano, tất cả giá trị đều được biểu diễn dưới dạng lovelace (1 ADA = 1,000,000 lovelace). Ngoài ra, một UTXO có thể chứa nhiều loại asset khác nhau, nhưng trong nhiều trường hợp cơ bản, chúng ta chỉ quan tâm đến ADA.

Điểm quan trọng cần hiểu là: UTXO không phải là “số dư” theo cách truyền thống. Thay vì lưu số dư tổng, Cardano lưu nhiều “đầu ra chưa sử dụng”. Khi tạo transaction, bạn sẽ chọn một hoặc nhiều UTXO làm input, sau đó tạo ra các UTXO mới làm output. Vì vậy, việc lấy danh sách UTXO là bước bắt buộc trước khi xây dựng transaction.

Trong bối cảnh của Hydra hoặc các ứng dụng nâng cao, danh sách UTXO này còn được dùng để:

- Commit vào Hydra Head
- Tính toán số dư khả dụng
- Xây dựng transaction chính xác và tối ưu phí

Tóm lại, hàm getUTxOsCommit đóng vai trò cung cấp dữ liệu đầu vào quan trọng cho toàn bộ quá trình xử lý transaction trên Cardano, đồng thời giúp đơn giản hóa dữ liệu để dễ dàng sử dụng ở các bước tiếp theo.

Cuối cùng là hàm getWithdraw, dùng để truy vấn và phân tích các giao dịch rút tiền (withdraw) liên quan đến Hydra từ dữ liệu on-chain. Đây là một hàm có logic phức tạp hơn so với các hàm trước, vì không chỉ đơn thuần truy vấn dữ liệu mà còn phải phân tích cấu trúc transaction để xác định đúng loại giao dịch cần tìm.

```ts
export const getWithdraw = async function ({ walletAddress, page = 1, limit = 5 }: { walletAddress: string; page?: number; limit?: number }) {
    if (!walletAddress || walletAddress.trim() === "") {
        throw new Error("Wallet address is not found !");
    }

    const addressTransactions = await blockfrostFetcher.fetchAddressTransactions(walletAddress);

    const data = await Promise.all(
        addressTransactions.map(async function ({ tx_hash, block_time }) {
            const transactionUTxO = await blockfrostFetcher.fetchTransactionsUTxO(tx_hash);

            const hasHydraHeadV1 = transactionUTxO.inputs.some((input) =>
                input.amount.some((asset) => asset.unit.endsWith(stringToHex("HydraHeadV1"))),
            );

            if (hasHydraHeadV1) {
                const outputAddress = transactionUTxO.outputs.find((output) => output.address === walletAddress);

                const amount = outputAddress ? outputAddress.amount.find((asset) => asset.unit === "lovelace")?.quantity || null : null;

                return {
                    type: "Withdraw",
                    status: "Complete",
                    datetime: block_time,
                    txHash: tx_hash,
                    address: walletAddress,
                    amount: amount,
                };
            }
        }),
    );

    const filteredData = data.filter((item) => item !== null && item !== undefined);
    const dataSlice = filteredData.slice((page - 1) * limit, page * limit);

    return {
        data: dataSlice,
        totalItem: filteredData.length,
        totalPages: Math.ceil(filteredData.length / limit),
        currentPage: page,
    };
};
```

Hàm này thể hiện rõ cách làm việc với dữ liệu blockchain thông qua Blockfrost, đồng thời minh họa cách “đọc hiểu” transaction thay vì chỉ lấy dữ liệu thô. Luồng xử lý chi tiết: Trước tiên, hàm kiểm tra walletAddress để đảm bảo đầu vào hợp lệ. Đây là bước quan trọng nhằm tránh các lỗi không cần thiết khi gọi API. Tiếp theo, hàm gọi fetchAddressTransactions(walletAddress) để lấy toàn bộ danh sách transaction liên quan đến địa chỉ ví. Tuy nhiên, dữ liệu này chỉ ở mức tổng quan (tx hash, thời gian, block…), chưa đủ để xác định nội dung giao dịch. Do đó, với mỗi transaction, chúng ta tiếp tục gọi fetchTransactionsUTxO(tx_hash) để lấy thông tin chi tiết về input và output của transaction đó. Đây chính là phần quan trọng nhất, vì toàn bộ logic phân tích đều dựa vào cấu trúc UTXO.

Nhận diện giao dịch Hydra (withdraw), Để xác định một transaction có phải là withdraw từ Hydra hay không, hàm kiểm tra trong phần inputs của transaction:

```ts
const hasHydraHeadV1 = transactionUTxO.inputs.some((input) => input.amount.some((asset) => asset.unit.endsWith(stringToHex("HydraHeadV1"))));
```

Ở đây, logic là: Duyệt qua tất cả input của transaction, Kiểm tra xem có asset nào có tên kết thúc bằng "HydraHeadV1" (sau khi encode sang hex) hay không

Sự xuất hiện của asset này đóng vai trò như một “dấu hiệu nhận diện” rằng transaction có liên quan đến Hydra Head. Đây là một kỹ thuật phổ biến khi làm việc với smart contract trên Cardano: sử dụng token hoặc asset đặc biệt để đánh dấu trạng thái hoặc loại giao dịch.

Xác định số tiền withdraw: Nếu transaction được xác định là liên quan đến Hydra, bước tiếp theo là tìm output trả về cho ví của người dùng:

```ts
const outputAddress = transactionUTxO.outputs.find((output) => output.address === walletAddress);
```

Sau đó, trích xuất số lượng ADA (lovelace) từ output này:

```ts
const amount = outputAddress ? outputAddress.amount.find((asset) => asset.unit === "lovelace")?.quantity || null : null;
```

Điều này cho phép xác định chính xác số tiền mà người dùng đã rút từ Hydra về Layer 1.

Tối ưu hiệu năng và phân trang: Hàm sử dụng Promise.all để xử lý nhiều transaction song song, giúp giảm đáng kể thời gian chờ khi số lượng transaction lớn.

Sau khi xử lý xong, dữ liệu được: Lọc bỏ các giá trị null hoặc undefined (các transaction không liên quan), Cắt theo phân trang (slice) dựa trên page và limit

Cuối cùng, trả về kết quả bao gồm: data: danh sách withdraw, totalItem: tổng số giao dịch hợp lệ, totalPages: tổng số trang, currentPage: trang hiện tại

---

### Viết các hàm để tương tác và làm việc với Hydra.

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
