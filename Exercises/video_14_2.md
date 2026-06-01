# 📝 Bài tập - Chapter 04: Video 14-2

---

## ✅ Bài 1: Component Account & useWallet Hook

### 📌 Đề bài

rong các ứng dụng Web3, việc quản lý và hiển thị thông tin ví là một trong những chức năng quan trọng nhất của Frontend.

Trong dự án Hydra TipJar, component Account chịu trách nhiệm hiển thị trạng thái kết nối ví, địa chỉ ví, số dư ADA và các thông tin liên quan đến người dùng. Để thực hiện điều này, hệ thống sử dụng hook useWallet nhằm lấy dữ liệu từ các ví Cardano như Nami, Lace hoặc Eternl.

Hãy giải thích vai trò của component Account và hook useWallet, đồng thời mô tả các dữ liệu quan trọng mà hook này cung cấp cho giao diện người dùng.

### 💡 Gợi ý

Hãy suy nghĩ về các vấn đề sau:

- Vì sao component này cần sử dụng "use client" trong Next.js?
- Hook useWallet đóng vai trò gì trong việc giao tiếp với ví Cardano?
- Ý nghĩa của các thuộc tính: wallet, browserWallet, address,stakeAddress.
- Những thông tin nào cần hiển thị trên giao diện để người dùng dễ dàng nhận biết trạng thái ví?
- Tại sao nên tạo abstraction thông qua hook thay vì gọi trực tiếp API của từng loại ví?

<details>
<summary>Đáp án</summary>

**Component Account** là component client-side (`"use client"`) hiển thị thông tin ví người dùng.

**useWallet hook** cung cấp:

- `wallet`: metadata ví (tên, icon…).
- `browserWallet`: instance để gọi API ví (getBalance, signTx…).
- `address`: địa chỉ thanh toán.
- `stakeAddress`: địa chỉ staking.

👉 Kết luận: Hook này đóng vai trò abstraction, giúp Frontend tương tác dễ dàng với nhiều loại ví Cardano (Nami, Lace, Eternl…).

</details>

---

## ✅ Bài 2: Lấy số dư ví (getBalance)

### 📌 Đề bài

Một trong những thông tin quan trọng nhất đối với người dùng là số dư ADA hiện có trong ví.

Trong TipJar DApp, Frontend cần truy vấn số dư từ ví Cardano và hiển thị lên giao diện ngay sau khi người dùng kết nối ví. Tuy nhiên, trên thực tế có thể xảy ra các trường hợp ví chưa sẵn sàng hoặc dữ liệu chưa được đồng bộ ngay lập tức.

Hãy mô tả cách component Account lấy số dư ADA từ ví, cách chuyển đổi đơn vị Lovelace sang ADA và cơ chế retry được sử dụng để đảm bảo dữ liệu luôn được cập nhật chính xác.

### 💡 Gợi ý

Hãy tập trung vào các nội dung sau:

- Sử dụng useEffect để fetch dữ liệu khi nào?
- Vai trò của browserWallet.getBalance().
- Lovelace là gì và tại sao cần chuyển đổi sang ADA?
- Ý nghĩa của hằng số DECIMAL_PLACE = 1_000_000.
- Điều gì xảy ra nếu ví chưa phản hồi dữ liệu?
- Vì sao nên retry sau vài giây thay vì hiển thị lỗi ngay lập tức?
- CountUp animation giúp cải thiện trải nghiệm người dùng như thế nào?

<details>
<summary>Đáp án</summary>

Sử dụng `useEffect` theo dõi `wallet` và `browserWallet`:

```tsx
const [balance, setBalance] = useState(0);

useEffect(() => {
  if (!browserWallet) return;

  const fetchBalance = async () => {
    try {
      const balance = await browserWallet.getBalance();
      // balance[0].quantity là số lovelace
      setBalance(Number(balance[0].quantity) / 1_000_000);
    } catch (error) {
      // Retry sau 2 giây nếu ví chưa sync kịp
      setTimeout(fetchBalance, 2000);
    }
  };

  fetchBalance();
}, [wallet, browserWallet]);
```

**Chi tiết**:

- **browserWallet.getBalance()**: Trả về array các UTxO từ ví
- **balance[0].quantity**: Là số Lovelace (đơn vị nhỏ nhất)
- **Chuyển đổi Lovelace → ADA**: Chia cho 1,000,000
- **Retry mechanism**: Nếu lỗi → thử lại sau 2 giây (ví có thể chưa ready)
- **CountUp animation**: Hiển thị số ADA với animation tăng dần

**Tại sao cần retry?**

- Khi user mới kết nối ví → blockchain chưa cập nhật ngay lập tức
- Retry tự động giúp UX mượt hơn, người dùng không phải chủ động refresh

👉 Kết luận: Cơ chế retry + animation này tạo trải nghiệm UX tự nhiên, người dùng thấy số dư được cập nhật mượt mà.

</details>

---

## ✅ Bài 3: Hiển thị UI Ví (Popover)

### 📌 Đề bài

Khi người dùng kết nối ví, hệ thống cần cung cấp một giao diện vừa gọn gàng vừa đầy đủ thông tin.

Trong TipJar, giao diện ví được thiết kế theo mô hình hai lớp:

1. Compact View (hiển thị nhanh trên Header)
2. Detail View (hiển thị chi tiết khi người dùng click)

Hãy phân tích cách thiết kế giao diện này và giải thích lý do sử dụng `PopoverTrigger` kết hợp với `PopoverContent`.

### 💡 Gợi ý

Hãy suy nghĩ về các yếu tố UX sau:

- Tại sao không hiển thị toàn bộ địa chỉ ví ngay trên Header?
- Vai trò của: PopoverTrigger, PopoverContent
- Vì sao cần hàm shortenString()?
- Những thông tin nào nên hiển thị ở chế độ chi tiết?
- Chức năng Copy Address có lợi ích gì?
- Vì sao nên cung cấp nút Logout hoặc Disconnect Wallet?
- Thiết kế này có điểm gì giống các ứng dụng Web2 hiện đại?

<details>
<summary>Đáp án</summary>

**Thiết kế hai lớp (Compact + Detail)**:

```tsx
<Popover>
  <PopoverTrigger asChild>
    {/* Compact view - hiển thị nhanh */}
    <Button variant="outline">
      <WalletIcon wallet={wallet} />
      <span>{shortenString(address)}</span>
      <span>${balance.toFixed(2)}</span>
    </Button>
  </PopoverTrigger>

  <PopoverContent>
    {/* Detail view - thông tin đầy đủ */}
    <div>Wallet: {wallet?.name}</div>
    <div>Network: {networkId}</div>
    <div>Address: {address}</div>
    <div>Stake: {stakeAddress}</div>
    <CopyButton value={address} />
    <LogoutButton />
  </PopoverContent>
</Popover>
```

**Chi tiết từng phần**:

**Compact View (PopoverTrigger)**:

- Icon ví + tên ví
- Địa chỉ rút gọn (dùng `shortenString()`)
- Số dư ADA với CountUp animation
- Kích thước nhỏ, gọn gàng → phù hợp header

**Detail View (PopoverContent)**:

- Tên ví đầy đủ + network
- Địa chỉ thanh toán toàn bộ (58 ký tự)
- Stake address (địa chỉ staking)
- Nút Copy → copy address nhanh chóng
- Nút Logout → disconnect ví

**Các hàm helper**:

```tsx
// Rút gọn địa chỉ: addr1vx2... (hiển thị 8 ký tự đầu + 8 ký tự cuối)
function shortenString(str: string, length = 8) {
  if (str.length <= length * 2) return str;
  return `${str.slice(0, length)}...${str.slice(-length)}`;
}

// Component copy với toast notification
function CopyButton({ value }: { value: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    // Show toast: "Copied!"
  };
  return <button onClick={handleCopy}>📋 Copy</button>;
}
```

**Tại sao chia thành 2 view?**

| Aspek          | Compact                     | Detail                       |
| -------------- | --------------------------- | ---------------------------- |
| **Mục đích**   | Quick info & mau chóng nhìn | Đầy đủ thông tin & hành động |
| **Kích thước** | Vừa header                  | Popover (larger)             |
| **Hiển thị**   | Luôn hiện                   | Khi user click               |
| **UX**         | Gọn gàng, không chiếm chỗ   | Đầy đủ tất cả thông tin cần  |
| **Action**     | Không có                    | Copy, Logout                 |

👉 Kết luận: Design này tuân theo **mobile-first UX principle** - hiển thị thông tin tối thiểu (compact) nhưng cung cấp đầy đủ khi user cần (detail). Phù hợp với Web3 UX pattern.

</details>

---

## ✅ Bài 4: Vai trò của Prisma trong TipJar

### 📌 Đề bài

Ngoài Blockchain và Hydra Head, dự án TipJar còn cần một cơ sở dữ liệu để lưu trữ thông tin người dùng, lịch sử tip, proposal và các dữ liệu phục vụ giao diện. Để đơn giản hóa việc thao tác với cơ sở dữ liệu PostgreSQL, dự án sử dụng Prisma ORM. Hãy giải thích Prisma là gì, vai trò của Prisma trong kiến trúc hệ thống và mô tả các thao tác CRUD quan trọng cần triển khai trong TipJar.

### 💡 Gợi ý

Hãy tìm hiểu các nội dung sau:

- ORM (Object Relational Mapping) là gì?
- Prisma giúp lập trình viên tránh những khó khăn nào khi làm việc với SQL?
- Vai trò của file schema.prisma.
- Cách Prisma sinh TypeScript types tự động.
- Những thao tác CRUD nào xuất hiện trong TipJar? Tạo User, Lưu lịch sử Tip, Lấy danh sách Tip, Cập nhật trạng thái TipJar.
- Vì sao Prisma phù hợp với kiến trúc Next.js Full-stack?

<details>
<summary>Đáp án</summary>

**Prisma** là ORM (Object-Relational Mapping) giúp làm việc dễ dàng với Database mà không cần viết SQL thô.

**Schema Prisma cho TipJar** (ví dụ):

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String   @id @default(cuid())
  address      String   @unique
  stakeAddress String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  tips         Tip[]
}

model Tip {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  amount    Int      // Lovelace
  message   String?
  txHash    String?  // Cardano transaction hash
  createdAt DateTime @default(now())
}

model TipJarState {
  id           String @id @default(cuid())
  totalAmount  Int    // Tổng tiền trong TipJar
  updatedAt    DateTime @updatedAt
}
```

**Các thao tác CRUD chính**:

```tsx
// CREATE: Tạo user khi user kết nối ví
await prisma.user.upsert({
  where: { address: userAddress },
  update: { updatedAt: new Date() },
  create: { address: userAddress, stakeAddress },
});

// READ: Lấy lịch sử tip của user
const userTips = await prisma.tip.findMany({
  where: { userId: userId },
  orderBy: { createdAt: "desc" },
  take: 10, // 10 tip mới nhất
});

// READ: Lấy trạng thái TipJar (tổng tiền)
const state = await prisma.tipJarState.findUnique({
  where: { id: "tipjar-1" },
});

// CREATE: Lưu tip vào DB sau khi user gửi
await prisma.tip.create({
  data: {
    userId,
    amount,
    message,
    txHash, // Transaction hash từ Cardano
  },
});

// UPDATE: Cập nhật trạng thái TipJar
await prisma.tipJarState.update({
  where: { id: "tipjar-1" },
  data: { totalAmount: newTotal },
});
```

**Tại sao sử dụng Prisma?**

- **Type-safe**: Tự động generate TypeScript types từ schema
- **Migrations**: Quản lý schema changes dễ dàng
- **Relations**: Xử lý foreign keys dễ dàng (User ↔ Tip)
- **No SQL injection**: Parameterized queries tự động
- **Developer friendly**: Query syntax gọn gàng, dễ đọc

👉 Kết luận: Prisma là cầu nối giữa Backend Node.js và PostgreSQL Database, cho phép code type-safe, maintainable, và đầy đủ tính năng cho full-stack DApp.

</details>

---

## ✅ Bài 5: Tích hợp Frontend – Backend – Blockchain

### 📌 Đề bài

Một trong những mục tiêu quan trọng nhất của TipJar là kết nối liền mạch giữa giao diện người dùng, hệ thống Backend và Blockchain Cardano/Hydra.

Khi người dùng thực hiện hành động Tip, rất nhiều thành phần phải phối hợp với nhau để hoàn thành giao dịch:

- Frontend
- Wallet
- Backend API
- Hydra Head
- Cardano Layer-1
- Database

Hãy mô tả toàn bộ luồng xử lý từ lúc người dùng nhấn nút Tip cho đến khi giao diện được cập nhật với dữ liệu mới nhất.

### 💡 Gợi ý

Hãy phân tích từng bước trong hệ thống:

- Vai trò của useWallet.
- Frontend gửi dữ liệu lên Backend như thế nào?
- NextAuth xác thực người dùng ra sao?
- Backend sử dụng MeshTxBuilder để làm gì?
- Transaction được ký ở đâu?
- Transaction được gửi lên Hydra hay Layer-1?
- Database lưu những dữ liệu gì sau khi giao dịch thành công?
- Frontend cập nhật dữ liệu mới bằng Polling, React Query hay WebSocket?
- Vì sao kiến trúc nhiều lớp giúp hệ thống dễ mở rộng hơn?

<details>
<summary>Đáp án</summary>

**Luồng Tip hoàn chỉnh (End-to-End)**:

```
┌─────────────┐
│   Frontend  │
│ (React)     │
│ useWallet   │
└──────┬──────┘
       │ 1. User clicks "Tip"
       │ 2. Call /api/tip { amount, message }
       │ 3. Send signature via browserWallet.signTx()
       │
       v
┌─────────────────────┐
│  Backend            │
│ (Next.js / Node.js) │
│ MeshTxBuilder       │
└──────┬──────────────┘
       │ 4. Verify session (NextAuth)
       │ 5. Build transaction (input/output UTxO)
       │ 6. Add Datum + Redeemer
       │ 7. Validate signature
       │
       v
┌──────────────────────────┐
│ Cardano / Hydra Head     │
│ - Hydra (realtime)       │
│ - OR Layer-1 (L1)        │
└──────┬───────────────────┘
       │ 8. Execute transaction
       │ 9. Broadcast to peers
       │
       v
┌─────────────────────────┐
│   Database (Prisma)     │
│ - Save Tip record       │
│ - Update TipJarState    │
│ - Notify via WebSocket  │
└──────┬──────────────────┘
       │ 10. Frontend receives update
       │ 11. Refresh balance, tip list
       │
       v
┌──────────────┐
│  Frontend    │
│ CountUp: 45→50 ADA
│ Toast: "Tip sent! 🎉"
│ Update list: [new Tip...]
└──────────────┘
```

**Chi tiết từng bước**:

**1. Frontend - User Action**:

```tsx
const handleTip = async (amount: number, message: string) => {
  // Gọi API backend
  const response = await fetch("/api/tip", {
    method: "POST",
    body: JSON.stringify({ amount, message }),
  });
};
```

**2. Backend - Transaction Builder**:

```ts
// /api/tip
export async function POST(req: Request) {
  const { amount, message } = await req.json();

  // Verify session
  const session = await getServerSession();

  // Build transaction with MeshTxBuilder
  const tx = new MeshTxBuilder()
    .spendingPlutusScript(scriptRef)
    .spendUTxOs([tipJarUTxO])
    .txInDatum(datum)
    .txInRedeemer(redeemer)
    .payToScript(...) // Output UTxO với tiền mới
    .complete();

  // Return tx để frontend ký
  return { tx: tx.toString() };
}
```

**3. Frontend - Sign & Submit**:

```tsx
const signedTx = await browserWallet.signTx(unsignedTx);
const txHash = await browserWallet.submitTx(signedTx);
```

**4. Backend - Broadcast & Persist**:

```ts
// Sau khi transaction confirmed
await prisma.tip.create({
  data: { userId, amount, message, txHash },
});

// Broadcast tới WebSocket clients
io.emit('tip-received', { amount, message, timestamp });

// Update TipJarState
await prisma.tipJarState.update({...});
```

**5. Frontend - Real-time Update**:

```tsx
useEffect(() => {
  const socket = io();
  socket.on("tip-received", (data) => {
    setBalance((prev) => prev + data.amount);
    setTips([data, ...tips]);
    toast.success("Tip received! 🎉");
  });
}, []);
```

**Hydra vs Layer-1**:

| Khía cạnh    | Hydra Head                | Layer-1              |
| ------------ | ------------------------- | -------------------- |
| **Tốc độ**   | Realtime (ms)             | ~20 giây / block     |
| **Chi phí**  | Free (off-chain)          | ~0.2 ADA (on-chain)  |
| **Finality** | Tức thì (trong Head)      | Khi đóng Head        |
| **Sử dụng**  | Quick tips, state updates | Settlement, withdraw |
| **Backend**  | Hydra node + mesh         | Blockfrost + Mesh    |

👉 Kết luận: Hệ thống là **3-layer architecture** (Frontend + Backend + Blockchain):

- **Frontend**: UX-focused, gọi API
- **Backend**: Logic, transaction builder, database
- **Blockchain**: Validator, state, settlement
- **Hydra**: Tăng tốc độ & giảm chi phí cho realtime updates
- **Database**: Lưu history, enable offline browsing

Mô hình này tạo ra DApp scalable, user-friendly, và cost-effective!

</details>
