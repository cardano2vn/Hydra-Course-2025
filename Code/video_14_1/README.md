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

Frontend của hệ thống TipJar được xây dựng nhằm tạo ra một giao diện người dùng hoàn chỉnh, nơi người dùng có thể tương tác trực tiếp với smart contract và Hydra một cách dễ dàng và trực quan. Thay vì phải làm việc với các khái niệm phức tạp như UTxO, datum hay transaction flow, người dùng chỉ cần thao tác đơn giản thông qua UI.

Trọng tâm của phần frontend là mang lại trải nghiệm người dùng (UX) mượt mà, rõ ràng và tối giản, giúp việc tip, claim hay theo dõi trạng thái trở nên trực quan hơn. Giao diện được thiết kế để giảm thiểu độ phức tạp kỹ thuật nhưng vẫn giữ được sức mạnh của kiến trúc blockchain phía sau.

Bên cạnh đó, frontend được kết nối trực tiếp với blockchain và Hydra Layer 2, cho phép hệ thống xử lý và hiển thị dữ liệu theo thời gian thực. Điều này giúp người dùng thấy ngay các thay đổi về state mà không cần chờ xác nhận như trên Layer 1 truyền thống.

Toàn bộ kiến trúc frontend đóng vai trò như một lớp trung gian quan trọng, đảm bảo sự liền mạch giữa giao diện người dùng, backend logic và blockchain, từ đó tạo nên một hệ thống dApp hoàn chỉnh, ổn định và có khả năng mở rộng.

---

## Mục tiêu

- Xây dựng một giao diện người dùng đơn giản, trực quan và dễ sử dụng cho hệ thống TipJar, giúp người dùng thao tác nhanh mà không cần hiểu sâu về blockchain
- Tích hợp trực tiếp với blockchain và Hydra để xử lý và cập nhật dữ liệu theo thời gian thực (real-time), đảm bảo phản hồi ngay khi state thay đổi
- Cung cấp trải nghiệm tương tác mượt mà, giảm tối đa độ trễ so với mô hình Layer 1 truyền thống
- Đồng bộ trạng thái một cách nhất quán giữa giao diện người dùng (UI), backend và smart contract, tránh sai lệch dữ liệu trong quá trình xử lý
- Đảm bảo toàn bộ hệ thống hoạt động liền mạch từ frontend, backend cho đến on-chain logic, tạo thành một flow thống nhất end-to-end
- Tối ưu trải nghiệm theo phong cách Web2-like (nhanh, mượt, thân thiện), đồng thời vẫn giữ được tính phi tập trung và minh bạch của kiến trúc Web3 và Hydra architecture

---

## 🔐 NextAuth Configuration – Wallet-based Authentication (Cardano dApp)

Đây là phần cấu hình NextAuth được thiết kế để xây dựng cơ chế xác thực người dùng dựa trên wallet (Cardano address) thay vì sử dụng mô hình truyền thống như email hoặc mật khẩu. Cách tiếp cận này biến ví blockchain trở thành một identity layer (lớp định danh) cho toàn bộ hệ thống dApp.

Trong mô hình này, mỗi người dùng được xác định duy nhất bằng địa chỉ ví Cardano, giúp loại bỏ hoàn toàn nhu cầu quản lý tài khoản tập trung. Khi người dùng đăng nhập, hệ thống sẽ nhận dữ liệu từ wallet, xác thực và tạo session tương ứng, từ đó cho phép truy cập vào các chức năng của ứng dụng như tip, claim hoặc tương tác với smart contract.

Việc sử dụng wallet làm identity không chỉ giúp tăng tính phi tập trung mà còn đảm bảo tính minh bạch và bảo mật cao hơn, vì quyền sở hữu danh tính gắn trực tiếp với private key của người dùng thay vì thông tin đăng nhập truyền thống.

👉 Tóm lại, cấu hình này giúp chuyển đổi NextAuth thành một authentication layer Web3-native, nơi:

- Identity = Cardano wallet address
- Authentication = wallet-based login
- Session = blockchain-backed user state

👉 Đây là nền tảng quan trọng để kết nối frontend với toàn bộ hệ sinh thái dApp và smart contract trong kiến trúc Web3.

### ⚙️ 1. Provider – Credentials Authentication

```ts
CredentialProvider({
    name: "credentials",
    credentials: {
        data: {},
    },
    async authorize(credentials) {
```

Trong bước này, hệ thống sử dụng CredentialsProvider của NextAuth để xây dựng cơ chế xác thực tùy chỉnh, thay vì dựa trên các phương thức truyền thống như OAuth, email hoặc password.

Cụ thể, toàn bộ quá trình đăng nhập được thiết kế xoay quanh việc nhận dữ liệu trực tiếp từ frontend thông qua trường credentials.data. Đây là một chuỗi JSON chứa thông tin liên quan đến wallet của người dùng, chẳng hạn như địa chỉ ví và các dữ liệu cần thiết để định danh trong hệ thống dApp.

Khi người dùng thực hiện đăng nhập, frontend sẽ gửi lên một payload dạng JSON string, và hàm authorize sẽ chịu trách nhiệm xử lý, parse và xác thực dữ liệu này. Nếu dữ liệu hợp lệ, hệ thống sẽ coi đó là một phiên đăng nhập thành công.

Điểm quan trọng của cơ chế này là không sử dụng OAuth hay password truyền thống, mà thay vào đó toàn bộ authentication được xây dựng dựa trên wallet-based identity, nơi ví blockchain đóng vai trò như một bằng chứng sở hữu danh tính.

👉 Tóm lại, provider này cho phép:

- nhận dữ liệu login từ frontend qua JSON (credentials.data)
- xác thực người dùng dựa trên wallet thay vì username/password
- xây dựng nền tảng authentication phù hợp với kiến trúc Web3 dApp
- đơn giản hóa flow đăng nhập bằng cách loại bỏ OAuth phức tạp

👉 Đây là bước nền tảng để biến NextAuth thành một wallet authentication system cho Cardano dApp.

### 🧾 Parse dữ liệu login

```ts
parsed = JSON.parse(credentials.data as string) as Credentials;
const { wallet, address } = parsed;
```

Đoạn này xử lý bước giải mã dữ liệu đăng nhập được gửi từ frontend trong flow authentication của NextAuth.

Khi người dùng thực hiện đăng nhập bằng wallet, frontend sẽ gửi lên một chuỗi JSON nằm trong credentials.data. Backend sẽ nhận chuỗi này và thực hiện JSON.parse để chuyển nó từ dạng string sang object có cấu trúc rõ ràng.

Sau khi parse thành công, hệ thống sẽ tách ra hai giá trị quan trọng:

- wallet: định danh loại ví hoặc thông tin liên quan đến wallet provider (ví dụ Eternl, Nami, Lace, v.v.)
- address: địa chỉ Cardano của người dùng, đóng vai trò là user identity chính trong hệ thống

Nếu quá trình parse thất bại (ví dụ dữ liệu không hợp lệ hoặc bị lỗi format), hệ thống sẽ trả về null, từ đó từ chối đăng nhập để đảm bảo an toàn và tránh dữ liệu không hợp lệ đi vào session.

👉 Tóm lại:

- nhận dữ liệu login dạng JSON từ frontend
- chuyển đổi sang object để xử lý
- trích xuất wallet + address làm identity
- fail-safe bằng cách reject login nếu dữ liệu sai định dạng

👉 Đây là bước quan trọng để đảm bảo authentication flow dựa trên wallet hoạt động ổn định và an toàn trong dApp Web3.

### 🚫 Validation wallet

```ts
if (isNil(wallet)) {
    return null;
}
```

Đây là bước kiểm tra tính hợp lệ của thông tin wallet sau khi đã parse dữ liệu đăng nhập từ frontend.

Sau khi hệ thống tách được wallet và address, nó sẽ thực hiện validation để đảm bảo rằng trường wallet thực sự tồn tại và không bị null hoặc undefined. Hàm isNil (từ lodash) được dùng để kiểm tra cả hai trường hợp này một cách an toàn.

Nếu wallet không tồn tại hoặc không hợp lệ, hàm authorize sẽ trả về null, đồng nghĩa với việc:

- từ chối toàn bộ quá trình đăng nhập
- không tạo session cho người dùng
- ngăn chặn dữ liệu không hợp lệ đi vào hệ thống authentication

👉 Ý nghĩa chính của bước này là đảm bảo chỉ những request có wallet hợp lệ từ frontend mới được phép tiếp tục flow đăng nhập.

👉 Tóm lại:

- kiểm tra wallet có tồn tại hay không
- loại bỏ request không hợp lệ hoặc thiếu dữ liệu
- đảm bảo integrity cho authentication flow
- chặn login nếu thiếu wallet

👉 Đây là một lớp validation đơn giản nhưng quan trọng để giữ cho hệ thống auth dựa trên wallet hoạt động ổn định và an toàn.

👤 Tạo user object

```ts
return {
    id: address,
    wallet,
    address,
};
```

Sau khi đã xác thực và kiểm tra dữ liệu wallet hợp lệ, hệ thống tiến hành tạo đối tượng user để đưa vào session của NextAuth.

Trong thiết kế này, address của ví Cardano được sử dụng làm định danh duy nhất (unique identifier) cho người dùng, thông qua trường id. Điều này giúp đảm bảo mỗi người dùng trong hệ thống được phân biệt rõ ràng dựa trên blockchain identity thay vì thông tin truyền thống như email hay username.
Ngoài id, hệ thống cũng lưu thêm hai thông tin quan trọng:

- wallet: loại ví hoặc provider mà người dùng đang sử dụng
- address: địa chỉ ví Cardano, đóng vai trò là identity chính trong toàn bộ dApp

👉 Ý nghĩa cốt lõi của bước này là chuyển đổi một blockchain address thành user identity trong hệ thống authentication, giúp frontend và backend có thể làm việc với người dùng như một entity thống nhất trong session.

👉 Tóm lại:

- id = address → định danh duy nhất theo blockchain
- lưu wallet + address vào session
- tạo user object cho NextAuth
- biến ví Cardano thành identity trong hệ thống

👉 Đây là bước kết nối trực tiếp giữa Web3 wallet identity và Web2 session model.

### 🔁 2. Callbacks – JWT & Session Handling

#### 🔐 signIn callback

```ts
async signIn() {
    return true;
}
```

Callback signIn trong NextAuth được sử dụng như một cổng kiểm soát cuối cùng trước khi cho phép người dùng đăng nhập.

Trong cấu hình hiện tại, hàm này luôn trả về true, nghĩa là hệ thống luôn cho phép login nếu quá trình authorize trước đó thành công. Không có thêm bất kỳ ràng buộc hay điều kiện phức tạp nào ở bước này.

Cách thiết kế này giúp flow authentication trở nên đơn giản và tập trung vào việc xác thực ở tầng authorize, thay vì phân tán logic qua nhiều lớp kiểm tra khác nhau.

👉 Ý nghĩa chính:

- luôn cho phép người dùng đăng nhập nếu đã qua bước authorize
- không áp dụng restriction layer ở thời điểm hiện tại
- giữ logic authentication đơn giản và dễ mở rộng

Trong tương lai, callback này có thể được mở rộng để thêm các cơ chế nâng cao như:

- xác minh chữ ký (wallet signature verification)
- kiểm tra whitelist/blacklist address
- giới hạn quyền truy cập theo role hoặc smart contract state

👉 Tóm lại: signIn hiện tại đóng vai trò như một “pass-through gate”, cho phép toàn bộ user hợp lệ tiếp tục vào hệ thống, đồng thời để ngỏ khả năng mở rộng security layer về sau.

#### 🔄 redirect sau login

```ts
async redirect() {
    return "/dashboard";
}
```

Callback redirect trong NextAuth được sử dụng để xác định trang đích sau khi người dùng đăng nhập thành công.

Trong cấu hình hiện tại, hệ thống luôn trả về "/dashboard", nghĩa là sau khi hoàn tất quá trình authentication (bao gồm authorize, signIn và tạo session), người dùng sẽ được tự động chuyển hướng đến trang dashboard của ứng dụng.

Cách thiết kế này giúp đơn giản hóa user flow, đảm bảo người dùng ngay lập tức được đưa vào khu vực chính của hệ thống sau khi đăng nhập, thay vì phải điều hướng thủ công.

👉 Ý nghĩa chính:

điều hướng user sau khi login thành công
luôn redirect về /dashboard
tạo trải nghiệm onboarding đơn giản, liền mạch

Về mặt UX, cách làm này mang lại trải nghiệm tương tự các ứng dụng Web2 truyền thống, nơi người dùng sau khi đăng nhập sẽ được đưa thẳng vào trang chính, trong khi vẫn giữ được nền tảng xác thực Web3 dựa trên wallet.

👉 Tóm lại: redirect đảm bảo flow đăng nhập kết thúc tại dashboard, giúp trải nghiệm người dùng đơn giản, nhất quán và dễ dự đoán.

#### 🪙 JWT callback

```ts
async jwt({ user, token }) {
    if (user) {
        token.user = user;
    }
    return token;
}
```

Callback jwt trong NextAuth được sử dụng để xử lý và duy trì trạng thái người dùng trong JSON Web Token (JWT) trong suốt phiên đăng nhập.

Khi người dùng đăng nhập lần đầu thành công, đối tượng user sẽ được truyền vào callback này. Tại thời điểm đó, hệ thống sẽ gán user vào trong token.user, từ đó lưu trữ thông tin người dùng vào JWT.

Điều này giúp đảm bảo rằng thông tin user không bị mất giữa các request, vì JWT sẽ được sử dụng như một session storage phía server và được gửi kèm theo mỗi request sau đó.

👉 Ý nghĩa chính:

- khi login lần đầu → lưu user vào JWT
- JWT giữ vai trò như session state trên server
- đảm bảo user info được persist giữa các request
- tránh phải query lại dữ liệu user nhiều lần

👉 Tóm lại: JWT callback giúp “đóng gói” thông tin user vào token, biến JWT thành lớp lưu session nhẹ và hiệu quả trong kiến trúc authentication của NextAuth.

#### 📦 Session callback

```ts
async session({ session, token }) {
    session.user = token.user;
    return session;
}
```

Callback session trong NextAuth được sử dụng để tạo và đồng bộ dữ liệu session mà frontend có thể sử dụng từ JWT đã được lưu ở server.

Trong bước này, hệ thống lấy dữ liệu người dùng đã được lưu trong token.user (từ JWT callback) và gán lại vào session.user. Điều này đảm bảo rằng mỗi khi frontend gọi useSession() hoặc fetch session từ API, thông tin user luôn được trả về đầy đủ và nhất quán.

👉 Ý nghĩa chính:

- đồng bộ dữ liệu từ JWT sang session object
- đảm bảo session.user luôn có dữ liệu người dùng
- giúp frontend dễ dàng truy cập thông tin user
- duy trì trạng thái đăng nhập xuyên suốt ứng dụng

Về mặt kiến trúc, đây là bước bridge giữa server-side token và client-side session, giúp NextAuth hoạt động mượt mà trong cả SSR và client-side rendering.

👉 Tóm lại: Session callback đảm bảo dữ liệu user được truyền từ JWT sang session, giúp frontend luôn có thể truy cập session.user một cách ổn định và nhất quán.

#### 🧠 3. Server-side helper

```ts
export function auth(...) {
    return getServerSession(...args, config);
}
```

Hàm auth được xây dựng như một utility helper phía server, giúp tái sử dụng logic lấy session từ NextAuth trong nhiều ngữ cảnh khác nhau của Next.js.
Thay vì phải gọi trực tiếp getServerSession() và truyền lại toàn bộ config ở nhiều nơi, hệ thống đóng gói lại thành một hàm duy nhất để đơn giản hóa việc kiểm tra authentication ở server-side.
Hàm này có thể được sử dụng trong:

- getServerSideProps (SSR) để kiểm tra session trước khi render page
- API routes để xác thực request trước khi xử lý logic backend
- hoặc bất kỳ server-side context nào cần biết user đã đăng nhập hay chưa

👉 Ý nghĩa chính:

- cung cấp một wrapper thống nhất cho getServerSession
- kiểm tra session trực tiếp ở server-side
- hỗ trợ SSR và API authentication
- giảm lặp code khi cần xác thực user

Về mặt kiến trúc, đây là lớp security gate phía server, đảm bảo mọi request quan trọng đều có thể kiểm tra được trạng thái đăng nhập trước khi thực thi logic tiếp theo.
👉 Tóm lại: auth() là helper giúp truy xuất session từ server một cách thống nhất, phục vụ cho việc bảo vệ route và xử lý authentication trong cả SSR lẫn API layer.

#### 🌐 4. API Routes (Next.js App Router)

```ts
export const GET = NextAuth(config);
export const POST = NextAuth(config);
```

Đoạn này dùng để expose NextAuth dưới dạng API routes trong Next.js App Router, giúp hệ thống authentication hoạt động như một backend hoàn chỉnh cho toàn bộ ứng dụng.

Cụ thể, hai dòng GET và POST sẽ gắn trực tiếp NextAuth vào endpoint:

```bash
/api/auth/[...nextauth]
```

Khi đó, mọi luồng liên quan đến authentication như đăng nhập, lấy session, xử lý callback hay quản lý JWT đều sẽ được NextAuth xử lý thông qua endpoint này. Việc hỗ trợ cả GET và POST giúp hệ thống tương thích với nhiều kiểu request khác nhau từ client, bao gồm cả redirect-based flow và API-based flow.

👉 Ý nghĩa của đoạn này là biến NextAuth thành một authentication backend trung tâm, nơi toàn bộ logic xác thực người dùng, session và token đều được xử lý tập trung. Điều này giúp frontend chỉ cần gọi API mà không cần tự triển khai logic auth phức tạp.

👉 Tóm lại, đây là lớp backend authentication cốt lõi của hệ thống, chịu trách nhiệm xử lý toàn bộ vòng đời đăng nhập và session của người dùng trong dApp.

#### 🔑 5. Client-side signIn helper

```ts
export const { signIn } = NextAuth(config);
```

Đoạn code này export ra hàm signIn từ NextAuth, cho phép frontend gọi trực tiếp để kích hoạt luồng đăng nhập từ giao diện người dùng.

Thay vì phải tự xây dựng logic authentication phức tạp, UI chỉ cần gọi signIn() (ví dụ khi người dùng connect wallet), hệ thống sẽ tự động trigger toàn bộ flow đăng nhập đã được cấu hình trong NextAuth, bao gồm gửi credentials, authorize, tạo session và redirect.

👉 Ý nghĩa chính:

- cho phép frontend trigger login flow một cách đơn giản
- tích hợp trực tiếp với UI (ví dụ: nút “Connect Wallet”)
- kích hoạt toàn bộ pipeline authentication của NextAuth
- giảm độ phức tạp logic auth ở phía client

## Provider

### Session Provider

Đoạn code này tạo một SessionProvider wrapper cho toàn bộ ứng dụng Next.js, giúp đồng bộ trạng thái đăng nhập giữa server và client trong hệ thống NextAuth.

Trước hết, hàm SessionProvider được khai báo là một async server component, cho phép nó gọi trực tiếp auth() ở phía server để lấy session hiện tại của người dùng:

```ts
const session = await auth();

return (
  <SessionProviderBase session={session}>
    {children}
  </SessionProviderBase>
);
```

Hàm auth() này sẽ đọc JWT từ request (nếu có), giải mã và trả về thông tin session của user. Nhờ đó, ngay từ lúc render server-side, ứng dụng đã biết người dùng đã đăng nhập hay chưa.

Sau khi lấy được session, component sẽ bọc toàn bộ children bằng SessionProviderBase từ next-auth/react:

```ts
return <SessionProviderBase session={session}>{children}</SessionProviderBase>;
```

Điều này giúp: truyền session xuống toàn bộ React tree cho phép client sử dụng useSession() để truy cập user data. đảm bảo SSR và client đều dùng chung một trạng thái authentication

### Client Component + Session Hook

```ts
"use client";
const { data: session, status } = useSession();
```

Đây là một client-side component sử dụng useSession() từ NextAuth để theo dõi trạng thái đăng nhập của người dùng theo thời gian thực ngay trong React runtime.

Hook này sẽ liên tục đồng bộ với authentication state của hệ thống và trả về hai giá trị chính:

- session: chứa toàn bộ thông tin người dùng nếu đã đăng nhập thành công (bao gồm user, address, wallet, …)
- status: trạng thái của phiên đăng nhập, có thể là:
- loading → đang kiểm tra session
- authenticated → đã đăng nhập
- unauthenticated → chưa đăng nhập hoặc đã logout

Nhờ cơ chế này, UI có thể phản ứng ngay lập tức với thay đổi trạng thái authentication mà không cần reload trang hay gọi API thủ công.

👉 Tóm lại: useSession() đóng vai trò là cầu nối realtime giữa NextAuth session và giao diện người dùng, giúp ứng dụng luôn hiển thị đúng trạng thái đăng nhập của user trong thời gian thực.

### Sync wallet state

```ts
useWalletSync();
```

Hook useWalletSync() được sử dụng để đồng bộ trạng thái ví blockchain với toàn bộ ứng dụng, đảm bảo UI luôn phản ánh đúng trạng thái thực tế của wallet trong thời gian thực.

Bên trong hook này thường sẽ đảm nhiệm các tác vụ như:

- phát hiện sự kiện connect / disconnect của ví
- đồng bộ địa chỉ ví (wallet address) vào state toàn cục
- cập nhật trạng thái internal của wallet provider
- đảm bảo dữ liệu ví luôn nhất quán giữa các component

Cơ chế này giúp ứng dụng luôn “bắt kịp” thay đổi từ phía blockchain wallet mà không cần user refresh hoặc trigger thủ công.

👉 Về kiến trúc, đây là một bridge layer giữa UI và Web3 wallet provider, đóng vai trò trung gian để kết nối trạng thái thực tế của ví với hệ thống React state.

👉 Tóm lại: useWalletSync() đảm bảo toàn bộ ứng dụng luôn đồng bộ với trạng thái ví blockchain theo thời gian thực, giúp UX mượt và nhất quán trong môi trường Web3.

### Auto disconnect khi logout

```ts
useEffect(() => {
    if (isNil(session) || status === "unauthenticated") {
        disconnect();
    }
}, [session, status, disconnect]);
```

Đoạn code này thực hiện cơ chế tự động ngắt kết nối ví blockchain khi người dùng không còn đăng nhập hợp lệ. Cụ thể, useEffect sẽ theo dõi hai trạng thái là session từ NextAuth và status của phiên đăng nhập. Khi hệ thống phát hiện session bị null (không tồn tại) hoặc trạng thái là unauthenticated, nó sẽ hiểu rằng người dùng đã logout hoặc phiên đăng nhập không còn hợp lệ.

Ngay lúc đó, hàm disconnect() sẽ được gọi để ngắt kết nối ví blockchain đang được sử dụng trong ứng dụng. Việc này giúp đảm bảo rằng không tồn tại tình trạng người dùng đã logout nhưng ví vẫn còn kết nối với dApp.

Cơ chế này đóng vai trò như một lớp đồng bộ quan trọng giữa authentication (Web2 – NextAuth session) và wallet connection (Web3 – blockchain identity), giúp hệ thống luôn giữ trạng thái nhất quán và an toàn trong suốt quá trình sử dụng.

### ⚙️ Khởi tạo React Query Client

```ts
const queryClient = new QueryClient();
```

Đoạn code này khởi tạo một instance của React Query Client, đây là thành phần trung tâm trong việc quản lý toàn bộ server state của ứng dụng frontend.

Trong các ứng dụng hiện đại, đặc biệt là dApp hoặc hệ thống có nhiều tương tác với API và blockchain, việc quản lý dữ liệu không chỉ đơn giản là gọi API rồi setState. Dữ liệu cần được cache, đồng bộ, tái sử dụng và cập nhật liên tục. React Query được sinh ra để giải quyết chính vấn đề này.

Instance QueryClient đóng vai trò như một “data engine” phía client, chịu trách nhiệm:

- quản lý toàn bộ luồng fetch dữ liệu từ server hoặc backend API
- lưu cache của các request để tránh gọi lại nhiều lần không cần thiết
- tự động đồng bộ dữ liệu khi component mount/unmount
- hỗ trợ cơ chế background refetch để đảm bảo dữ liệu luôn mới
- tối ưu hiệu năng bằng cách giảm số lượng network request

Điểm quan trọng của React Query là nó tách biệt rõ ràng giữa server state và UI state. Điều này giúp developer không phải tự quản lý quá nhiều logic phức tạp như loading, caching, retry hay invalidation.

Trong kiến trúc tổng thể của frontend, QueryClient đóng vai trò như một data-fetching layer chính, nằm giữa UI và backend, giúp mọi dữ liệu được xử lý một cách nhất quán, hiệu quả và có khả năng mở rộng cao.

👉 Tóm lại: QueryClient là lõi quản lý dữ liệu phía client, giúp ứng dụng xử lý API một cách thông minh hơn thông qua caching, synchronization và background updates, từ đó tối ưu hiệu năng và trải nghiệm người dùng trong toàn bộ hệ thống.

### 🔐 Session Provider (NextAuth)

```ts
<SessionProvider session={session}>
```

SessionProvider là một lớp trung gian quan trọng trong NextAuth, có nhiệm vụ truyền trạng thái xác thực (authentication state) từ server xuống toàn bộ ứng dụng React. Khi ứng dụng khởi chạy, session của người dùng sẽ được lấy từ server (thông qua JWT hoặc auth() ở server-side) và đưa vào SessionProvider, từ đó trở thành một nguồn dữ liệu dùng chung cho toàn bộ component tree.

Nhờ cơ chế này, toàn bộ ứng dụng có thể truy cập thông tin người dùng thông qua session.user mà không cần phải gọi lại API ở nhiều nơi. Đồng thời, hook useSession() có thể được sử dụng ở bất kỳ component nào để lấy trạng thái đăng nhập hiện tại một cách trực tiếp và đồng bộ.

Về mặt kiến trúc, SessionProvider đóng vai trò như một authentication context layer, giúp duy trì trạng thái đăng nhập xuyên suốt trong toàn bộ ứng dụng, đảm bảo sự nhất quán giữa server và client, đồng thời hỗ trợ trải nghiệm người dùng mượt mà khi chuyển trang hoặc reload ứng dụng.

### ⚡ QueryClientProvider

```ts
<QueryClientProvider client={queryClient}>
```

QueryClientProvider là lớp bao bọc chính của React Query, có nhiệm vụ cung cấp queryClient cho toàn bộ ứng dụng. Đây là thành phần cốt lõi giúp React Query có thể hoạt động xuyên suốt trong React tree và quản lý toàn bộ luồng dữ liệu từ server một cách tập trung.

Khi được khởi tạo, QueryClientProvider sẽ đóng vai trò như một data layer của frontend, nơi tất cả các request API, cache, và trạng thái dữ liệu đều được điều phối thông qua queryClient. Nhờ đó, ứng dụng không cần phải tự quản lý thủ công các trạng thái như loading, error hay data synchronization ở từng component riêng lẻ.

Cơ chế này giúp:

- quản lý API state một cách tập trung và nhất quán
- cache dữ liệu thông minh để tránh gọi lại request không cần thiết
- tối ưu hiệu năng bằng cách giảm số lần fetch dữ liệu từ server
- hỗ trợ tự động refetch và đồng bộ dữ liệu khi cần thiết

Về kiến trúc tổng thể, QueryClientProvider chính là lớp data-fetching foundation của frontend, giúp toàn bộ ứng dụng xử lý dữ liệu server một cách hiệu quả, nhất quán và có khả năng mở rộng cao.

👉 Tóm lại: Đây là lớp data layer trung tâm của React Query, giúp quản lý, cache và tối ưu toàn bộ luồng dữ liệu API trong ứng dụng frontend.

### 🔗 BlockchainProvider

```ts
<BlockchainProvider>
```

BlockchainProvider là một lớp provider quan trọng trong kiến trúc ứng dụng Web3, đóng vai trò tích hợp toàn bộ logic liên quan đến blockchain và wallet vào trong React application.

Provider này không chỉ đơn thuần quản lý trạng thái ví, mà còn đảm nhiệm việc đồng bộ giữa authentication (Web2) và wallet identity (Web3), tạo ra một luồng dữ liệu thống nhất giữa hai thế giới.

Cụ thể, BlockchainProvider thực hiện các chức năng chính như:

- đồng bộ trạng thái ví blockchain (connect/disconnect) theo thời gian thực
- tự động ngắt kết nối ví khi user logout khỏi hệ thống (session invalid)
- kết nối và tương tác với blockchain provider (Cardano wallet layer)
- đảm bảo trạng thái session Web2 (NextAuth) luôn nhất quán với wallet Web3

Nhờ cơ chế này, hệ thống tránh được các trạng thái không đồng bộ như user đã logout nhưng ví vẫn còn kết nối, hoặc session tồn tại nhưng wallet đã bị disconnect.

Về mặt kiến trúc, BlockchainProvider đóng vai trò như một bridge layer giữa authentication và blockchain infrastructure, giúp toàn bộ ứng dụng hoạt động mượt mà như một hệ thống thống nhất giữa Web2 UX và Web3 backend.

👉 Tóm lại: Đây là lớp trung gian quan trọng giúp đồng bộ session người dùng với trạng thái ví blockchain, đảm bảo tính nhất quán giữa authentication layer và Web3 wallet layer trong toàn bộ ứng dụng.

### 🔔 Toaster UI

```ts
<Toaster />
```

Toaster là một component UI dùng để hiển thị thông báo (notifications) trong toàn bộ ứng dụng, thường được đặt ở tầng root để có thể hoạt động xuyên suốt mọi màn hình và feature.

Trong kiến trúc frontend, nó đóng vai trò như một global feedback system, giúp người dùng nhận phản hồi ngay lập tức từ các hành động họ thực hiện.

Cụ thể, Toaster được sử dụng để hiển thị:

- thông báo hệ thống (notification)
- trạng thái thành công hoặc thất bại (success / error messages)
- phản hồi từ các giao dịch blockchain như tip, claim, commit, decommit
- các trạng thái xử lý bất đồng bộ (loading completion, transaction result, v.v.)

Nhờ cơ chế này, người dùng luôn nhận được phản hồi trực quan ngay khi có thay đổi trạng thái trong hệ thống, đặc biệt quan trọng trong các thao tác liên quan đến blockchain vốn có độ trễ và tính bất đồng bộ cao.

Về mặt UX, Toaster giúp biến các thao tác kỹ thuật phức tạp trở nên dễ hiểu hơn, đồng thời nâng cao trải nghiệm người dùng bằng cách cung cấp feedback rõ ràng và kịp thời.

👉 Tóm lại: Toaster là lớp UI notification toàn cục, giúp hiển thị mọi phản hồi từ hệ thống (đặc biệt là blockchain transactions), đảm bảo người dùng luôn nắm được trạng thái hành động của mình trong thời gian thực.

## Wallet

### 🧩 1. State chính của wallet

```ts
wallet: Wallet | null;
address: string | null;
stakeAddress: string | null;
browserWallet: BrowserWallet | null;
```

Đây là các state cốt lõi đại diện cho toàn bộ trạng thái ví blockchain trong ứng dụng, đóng vai trò như nguồn dữ liệu trung tâm (source of truth) của Web3 layer.

Cụ thể, từng thành phần có ý nghĩa như sau:

- wallet: chứa metadata của ví như tên, icon, version. Đây là thông tin phục vụ hiển thị UI và nhận diện loại wallet người dùng đang sử dụng (ví dụ Nami, Eternl, Lace).
- address: địa chỉ Cardano chính của người dùng, được dùng trong các giao dịch on-chain và làm định danh blockchain của user.
- stakeAddress: reward address dùng cho staking, đại diện cho quyền lợi staking của người dùng trong hệ sinh thái Cardano.
- browserWallet: instance thực tế kết nối với extension wallet, đóng vai trò là cầu nối để thực hiện các thao tác như ký transaction, lấy UTxO, submit transaction, v.v.

Nhìn tổng thể, toàn bộ các state này tạo thành lớp quản lý danh tính và kết nối blockchain trong frontend, đảm bảo mọi thao tác Web3 đều có nguồn dữ liệu thống nhất và đáng tin cậy.

👉 Tóm lại: Đây là “single source of truth” cho Web3 layer, nơi mọi trạng thái liên quan đến wallet, identity và blockchain interaction đều được quản lý tập trung trong một store duy nhất.

### ⚙️ 2. Core blockchain functions

#### 📥 Lấy UTxO

```ts
getUtxos: async () => {
    return await browserWallet.getUtxos();
};
```

Hàm getUtxos được sử dụng để truy xuất toàn bộ UTxO (Unspent Transaction Outputs) hiện có trong ví của người dùng thông qua browserWallet.
UTxO là đơn vị cốt lõi trong mô hình Cardano, đại diện cho các “đầu ra chưa được tiêu thụ” và chính là nguồn dữ liệu đầu vào để xây dựng mọi transaction trên blockchain.
Trong ngữ cảnh ứng dụng, hàm này được dùng để:

- lấy danh sách UTxO hiện tại của ví
- cung cấp input cho việc build transaction
- hỗ trợ các thao tác như tip, claim, commit hoặc decommit trong Hydra
- đảm bảo transaction luôn có nguồn dữ liệu hợp lệ để xử lý on-chain

👉 Tóm lại: getUtxos là hàm nền tảng giúp truy xuất trạng thái tài sản của ví trên blockchain, đóng vai trò đầu vào quan trọng cho toàn bộ quá trình xây dựng transaction trong hệ thống Web3.

#### 💰 Lấy balance

```ts
getBalance: async () => {
    const balance = await browserWallet.getLovelace();
    return Number(balance);
};
```

Hàm getBalance được sử dụng để lấy tổng số ADA (Lovelace) hiện có trong ví của người dùng thông qua browserWallet.

Cụ thể, browserWallet.getLovelace() sẽ trả về tổng số dư của ví dưới đơn vị lovelace (1 ADA = 1,000,000 lovelace). Sau đó giá trị này được chuyển về dạng số (Number) để dễ sử dụng trong logic frontend như hiển thị UI, kiểm tra số dư hoặc validate trước khi thực hiện transaction.

Hàm này thường được dùng trong các trường hợp như:

- hiển thị số dư ví trên giao diện người dùng
- kiểm tra đủ tiền trước khi thực hiện giao dịch (tip, claim, mint, v.v.)
- hỗ trợ logic tính phí và điều kiện on-chain/off-chain
- cập nhật trạng thái tài chính realtime của user

👉 Tóm lại: getBalance là hàm giúp truy xuất tổng số ADA trong ví, đóng vai trò quan trọng trong việc hiển thị và kiểm soát tài sản người dùng trong toàn bộ hệ thống Web3.

#### ✍️ Sign transaction

```ts
signTx: async (unsignedTx: string) => {
    return await browserWallet.signTx(unsignedTx);
};
```

Hàm signTx được sử dụng để ký một transaction chưa ký (unsigned transaction) bằng ví của người dùng thông qua browserWallet.

Trong quy trình blockchain, sau khi transaction được xây dựng (bao gồm inputs, outputs, fee, datum, script…), nó vẫn chưa thể gửi lên mạng lưới Cardano ngay lập tức. Thay vào đó, transaction cần được ký bằng private key của người dùng để xác thực quyền sở hữu tài sản.

Hàm này sẽ gửi unsignedTx tới wallet extension (như Nami, Eternl, Lace), sau đó wallet sẽ thực hiện ký và trả về một transaction đã được ký (signed transaction).

👉 Vai trò của signTx:

- xác thực quyền sở hữu tài sản trước khi giao dịch
- đảm bảo transaction hợp lệ trên blockchain
- là bước bắt buộc trước khi submit lên mạng Cardano
- bảo mật private key vì không bao giờ lộ ra ngoài wallet

👉 Tóm lại: signTx là bước “xác nhận cuối cùng của người dùng”, nơi transaction được ký bởi ví trước khi được gửi lên blockchain để thực thi.

#### 🚀 Submit transaction

```ts
submitTx: async (signedTx: string) => {
    return await browserWallet.submitTx(signedTx);
};
```

Hàm submitTx được sử dụng để gửi một transaction đã được ký (signed transaction) lên mạng lưới Cardano thông qua browser wallet.

Sau khi transaction đã trải qua các bước build và ký (signTx), nó sẽ được chuyển sang trạng thái sẵn sàng để broadcast. Lúc này submitTx sẽ đóng vai trò gửi dữ liệu transaction lên blockchain network để các node xác thực và đưa vào mempool.

Quá trình này là bước cuối cùng trong lifecycle của một transaction, bao gồm:

- gửi signed transaction lên Cardano network
- broadcast tới các node để kiểm tra tính hợp lệ
- đưa transaction vào mempool chờ confirm
- hoàn tất việc ghi dữ liệu lên blockchain khi được block xác nhận

👉 Vai trò của submitTx: thực thi transaction trên blockchain, kết nối frontend với Cardano network, hoàn tất pipeline từ build → sign → submit, kích hoạt trạng thái on-chain thực tế

👉 Tóm lại: submitTx là bước cuối cùng trong quy trình giao dịch, nơi transaction được đưa từ client lên blockchain để xử lý và xác nhận, hoàn tất vòng đời của một giao dịch Web3.

#### 🔐 3. SignIn – Web3 Authentication Core

Đây là phần quan trọng nhất:

🔗 Kết nối wallet
BrowserWallet.enable(name.toLowerCase());

👉 Kết nối extension wallet (Nami, Eternl, Lace…)

🌐 Check network
if (network !== APP_NETWORK_ID)

👉 Đảm bảo user đang ở đúng mạng (testnet/mainnet)

🔑 Lấy address + stake
const address = await browserWallet.getChangeAddress();
const stakeList = await browserWallet.getRewardAddresses();

👉 Xác định identity blockchain của user

🔏 Wallet signature authentication
const { data } = await getNonceAddress(address);
const signature = await browserWallet.signData(data);

👉 Đây là bước chứng minh ownership wallet

🔐 Login NextAuth
await signIn("credentials", {
data: JSON.stringify({
wallet: name,
address: address,
}),
});

👉 Biến wallet thành identity trong hệ thống Web2 session

👉 Tóm lại flow:

connect wallet
verify network
sign nonce
login NextAuth
sync state vào Zustand
🔄 4. Sync session → wallet
syncWithSession: async (session) => { ... }
Ý nghĩa:
nếu session tồn tại → restore wallet connection
nếu session sai → reset state
retry nếu wallet extension chưa sẵn sàng

👉 Đây là auto rehydration layer

🔁 5. useWalletSync hook
React.useEffect(() => {
if (session) {
setTimeout(() => syncWithSession(session), 1000);
} else {
syncWithSession(session);
}
}, [session]);

👉 Tự động sync wallet mỗi khi session thay đổi

🔌 6. Disconnect
disconnect: async () => {
set({ browserWallet: null!, wallet: null! });
}

👉 Reset toàn bộ trạng thái Web3 khi logout

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
