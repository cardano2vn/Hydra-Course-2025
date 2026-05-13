# 📝 Bài tập - Chapter 04: Video 15-1

---

## ✅ Bài 1: Mục tiêu của giai đoạn Testing & Completion

### 📌 Đề bài

Nêu rõ **mục tiêu chính** khi thực hiện phần Kiểm thử và hoàn thành Hydra DApp (TipJar).

### 💡 Gợi ý

- Đồng bộ realtime
- Kiểm thử multi-user
- Xác thực luồng end-to-end

<details>
<summary>Đáp án</summary>

Mục tiêu chính là **hoàn thiện và xác thực toàn bộ hệ thống** từ Frontend → Backend → Hydra → Layer-1.

**Các yêu cầu chính**:

- **Đồng bộ realtime**: Đảm bảo dữ liệu luôn mới nhất. Các hành động (commit, tip, claim, decommit, fanout) hoạt động đúng theo trạng thái hiện tại của Hydra Head.
- **Multi-user scenarios**: Kiểm tra khả năng xử lý nhiều người dùng kết nối đồng thời vào Hydra Head, đảm bảo không có conflict hoặc race conditions.
- **End-to-end validation**: Xác thực toàn bộ luồng từ lúc user click nút cho đến khi transaction được confirm trên Hydra/Layer-1 và database được cập nhật.
- **Performance & Stability**: Đo lường hiệu năng (transaction latency, throughput) và độ ổn định của DApp trong môi trường gần thực tế.

**Các hành động quan trọng cần kiểm thử**:

| Hành động    | Trạng thái Hydra | Yêu cầu                                             |
| ------------ | ---------------- | --------------------------------------------------- |
| **Commit**   | IDLE → OPEN      | Người dùng deposit ADA vào Hydra Head               |
| **Tip**      | OPEN             | Gửi tiền cho người nhận, tăng UTxO TipJar           |
| **Claim**    | OPEN             | Người nhận claim tiền từ TipJar                     |
| **Decommit** | OPEN → CLOSED    | Người dùng rút tiền khỏi Hydra Head                 |
| **Fanout**   | CLOSED           | Settle transaction lên Layer-1 (Cardano blockchain) |

👉 Kết luận: Đây là bước quan trọng để chuyển từ code riêng lẻ sang một **DApp hoàn chỉnh, production-ready**, tận dụng tối đa sức mạnh của Hydra (realtime, zero-cost).

</details>

---

## ✅ Bài 2: Quản lý trạng thái Hydra trên Frontend

### 📌 Đề bài

Giải thích cách sử dụng **React Query (useQuery)** để quản lý và hiển thị trạng thái Hydra Head trên giao diện.

### 💡 Gợi ý

- queryKey
- queryFn: getStatus()
- Component Status
- refetchInterval

<details>
<summary>Đáp án</summary>

**React Query** là thư viện quản lý state cho các API calls, giúp handle caching, loading, error states một cách dễ dàng.

**Sử dụng hook `useQuery` để fetch Hydra Head status**:

```tsx
import { useQuery } from "@tanstack/react-query";

// Hook để lấy trạng thái Hydra Head
const {
  data: headStatus,
  isLoading: isLoadingHeadStatus,
  error,
} = useQuery({
  queryKey: ["fetch-status-hydra"],
  queryFn: () => getStatus(),
  refetchInterval: 1000, // Refetch mỗi 1 giây
});

// headStatus là object chứa:
// {
//   status: "IDLE" | "OPEN" | "CLOSED" | "FANOUT_POSSIBLE",
//   totalParties: 3,
//   totalDeposited: 100_000_000, // Lovelace
//   contractBalance: 50_000_000,
//   ...
// }

// Render component Status
if (isLoadingHeadStatus) {
  return <div>Loading Hydra status...</div>;
}

if (error) {
  return <div>Error: {error.message}</div>;
}

return <Status loading={isLoadingHeadStatus} data={headStatus} />;
```

**Component Status hiển thị trạng thái**:

```tsx
interface StatusProps {
  loading: boolean;
  data: HydraHeadStatus;
}

export function Status({ loading, data }: StatusProps) {
  const statusColor = {
    IDLE: "bg-gray-500",
    OPEN: "bg-green-500",
    CLOSED: "bg-yellow-500",
    FANOUT_POSSIBLE: "bg-blue-500",
  }[data.status];

  return (
    <div className={`px-4 py-2 rounded ${statusColor}`}>
      <h3>Hydra Head Status</h3>
      <p>
        Status: <strong>{data.status}</strong>
      </p>
      <p>
        Total Deposited: <strong>{data.totalDeposited / 1_000_000} ADA</strong>
      </p>
      <p>
        Parties: <strong>{data.totalParties}</strong>
      </p>
      {data.status === "FANOUT_POSSIBLE" && (
        <button>⚡ Fanout to Layer-1</button>
      )}
    </div>
  );
}
```

**Tại sao dùng React Query?**

| Tính năng              | Lợi ích                                                 |
| ---------------------- | ------------------------------------------------------- |
| **Caching**            | Tránh refetch cùng lúc nhiều lần                        |
| **Background Refetch** | `refetchInterval` tự động cập nhật dữ liệu              |
| **Loading state**      | `isLoading` giúp hiển thị skeleton hoặc loading spinner |
| **Error handling**     | `error` để catch và hiển thị lỗi                        |
| **Devtools**           | React Query DevTools để debug queries                   |

👉 Kết luận: Cách này giúp **UI luôn đồng bộ realtime** với Hydra Head, cải thiện UX và giảm lỗi logic. Đặc biệt hữu ích với Hydra vì trạng thái thay đổi nhanh (OPEN → CLOSED → FANOUT_POSSIBLE).

</details>

---

## ✅ Bài 3: Lấy danh sách UTxO để Commit

### 📌 Đề bài

Mô tả cách lấy và hiển thị danh sách UTxO từ Layer-1 để người dùng chọn khi thực hiện Commit vào Hydra.

### 💡 Gợi ý

- useQuery với enabled condition
- getUTxOsCommit API
- Dropdown / Select UI
- Conditional fetching

<details>
<summary>Đáp án</summary>

**Vì sao cần chọn UTxO?**

Cardano sử dụng **eUTxO model** - Extended UTxO. Khi commit vào Hydra, người dùng phải chỉ định **cụ thể** một hoặc nhiều UTxO từ ví của họ để deposit vào Hydra Head.

**Fetch UTxO bằng useQuery**:

```tsx
const [selectedAddress, setSelectedAddress] = useState<string>("");

// Chỉ fetch khi user đã kết nối ví (address khác rỗng)
const {
  data: utxosCommit,
  isLoading: isLoadingUtxosCommit,
  error: errorUtxosCommit,
} = useQuery({
  queryKey: ["fetch-utxo-commit", selectedAddress],
  queryFn: () => getUTxOsCommit({ walletAddress: selectedAddress }),
  enabled: !!selectedAddress, // Chỉ fetch khi có address
  refetchInterval: 2000, // Refetch mỗi 2 giây (balance có thể thay đổi)
});
```

**API endpoint backend** (getUTxOsCommit):

```ts
// /api/utxos/commit
export async function GET(req: Request) {
  const { walletAddress } = req.nextUrl.searchParams;

  // Lấy UTxOs từ Blockfrost / browser wallet
  const utxos = await blockfrost.addressUtxos(walletAddress);

  // Filter chỉ lấy UTxOs chứa ADA (loại bỏ NFTs)
  const adaUtxos = utxos.filter((utxo) => {
    const amount = utxo.amount.find((a) => a.unit === "lovelace");
    return amount && BigInt(amount.quantity) > 0;
  });

  return adaUtxos.map((utxo) => ({
    txHash: utxo.tx_hash,
    outputIndex: utxo.output_index,
    amount: utxo.amount.find((a) => a.unit === "lovelace")?.quantity || "0",
    address: walletAddress,
  }));
}
```

**Hiển thị danh sách UTxO dưới dạng Dropdown**:

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CommitForm() {
  const [selectedUtxo, setSelectedUtxo] = useState<string>("");

  return (
    <div>
      <label>Select UTxO to Commit</label>

      {isLoadingUtxosCommit && <p>Loading UTxOs...</p>}
      {errorUtxosCommit && <p>Error: {errorUtxosCommit.message}</p>}

      {utxosCommit && utxosCommit.length > 0 ? (
        <Select value={selectedUtxo} onValueChange={setSelectedUtxo}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a UTxO to commit" />
          </SelectTrigger>
          <SelectContent>
            {utxosCommit.map((utxo, idx) => (
              <SelectItem
                key={`${utxo.txHash}-${utxo.outputIndex}`}
                value={JSON.stringify(utxo)}
              >
                {/* Hiển thị: txHash (rút gọn) + amount */}
                {utxo.txHash.slice(0, 8)}...{utxo.outputIndex}
                {" → "}
                {(Number(utxo.amount) / 1_000_000).toFixed(2)} ADA
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <p>No UTxOs available. Please check your wallet balance.</p>
      )}

      <button
        onClick={() => handleCommit(selectedUtxo)}
        disabled={!selectedUtxo}
      >
        Commit to Hydra
      </button>
    </div>
  );
}
```

**Chi tiết quan trọng**:

| Khía cạnh             | Mô tả                                                        |
| --------------------- | ------------------------------------------------------------ |
| **enabled condition** | Chỉ fetch khi `!!selectedAddress` (đã kết nối ví)            |
| **queryKey**          | Bao gồm `selectedAddress` để tự động refetch khi user đổi ví |
| **refetchInterval**   | 2 giây vì balance có thể thay đổi (user nhận tiền từ ai đó)  |
| **Dropdown display**  | Hiển thị txHash + amount để user chọn chính xác              |
| **Error handling**    | Nếu không có UTxO → thông báo "No UTxOs available"           |

👉 Kết luận: Vì Cardano dùng **eUTxO model**, việc chọn UTxO cụ thể là bước **bắt buộc và quan trọng**. User phải "chỉ" một hoặc nhiều UTxO mà họ muốn commit vào Hydra Head. Thiết kế UI này giúp user dễ hiểu và tránh nhầm lẫn.

</details>

---

## ✅ Bài 4: Luồng Commit + Tạo Creator/Proposal

### 📌 Đề bài

Phân tích luồng xử lý **từ đầu đến cuối** khi người dùng thực hiện Commit ADA vào Hydra Head và đồng thời tạo Creator/Proposal trong TipJar.

### 💡 Gợi ý

- getUTxOs → commit → signTx → submitTx
- createProposal (database)
- invalidateQueries để sync UI
- Error handling

<details>
<summary>Đáp án</summary>

**Luồng Commit End-to-End**:

```
Frontend (React)
  ↓ 1. User chọn UTxO & click "Commit"
  ↓
Frontend
  ↓ 2. Gọi API /api/commit { address, utxo, isCreator: true }
  ↓
Backend (Next.js)
  ↓ 3. Build transaction (MeshTxBuilder)
  ↓ 4. Sign và submit transaction
  ↓
Hydra Head
  ↓ 5. Transaction được confirm
  ↓
Backend (Prisma)
  ↓ 6. Lưu Creator/Proposal vào DB
  ↓
Frontend (React Query)
  ↓ 7. invalidateQueries → refetch data mới
  ↓
UI
  ↓ 8. Hiển thị balance, UTxO list, status cập nhật
```

**Code triển khai (Frontend)**:

```tsx
import { useQueryClient } from "@tanstack/react-query";

export function CommitForm() {
  const [selectedUtxo, setSelectedUtxo] = useState<any>(null);
  const [isCreator, setIsCreator] = useState(false);
  const [proposalTitle, setProposalTitle] = useState("");
  const queryClient = useQueryClient();

  const handleCommit = async () => {
    try {
      // 1. Validate UTxO
      if (!selectedUtxo) {
        throw new Error("Please select a UTxO");
      }

      // 2. Call backend API
      const response = await fetch("/api/commit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: userAddress,
          utxo: selectedUtxo,
          isCreator,
          proposalTitle: isCreator ? proposalTitle : null,
        }),
      });

      const { unsignedTx } = await response.json();

      // 3. Sign transaction với ví
      const signedTx = await browserWallet.signTx(unsignedTx);

      // 4. Submit transaction
      const txHash = await browserWallet.submitTx(signedTx);

      // 5. Invalidate queries để UI cập nhật realtime
      await queryClient.invalidateQueries({
        queryKey: ["fetch-utxo-commit", userAddress],
      });
      await queryClient.invalidateQueries({
        queryKey: ["fetch-status-hydra"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["fetch-proposals"],
      });

      // 6. Hiển thị toast success
      toast.success(`Commit successful! TX: ${txHash}`);
    } catch (error) {
      console.error("Commit failed:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <Select
        value={JSON.stringify(selectedUtxo)}
        onValueChange={(val) => setSelectedUtxo(JSON.parse(val))}
      >
        {/* ... Dropdown UTxO ... */}
      </Select>

      <label>
        <input
          type="checkbox"
          checked={isCreator}
          onChange={(e) => setIsCreator(e.target.checked)}
        />
        Be the Creator
      </label>

      {isCreator && (
        <input
          type="text"
          placeholder="Proposal Title"
          value={proposalTitle}
          onChange={(e) => setProposalTitle(e.target.value)}
        />
      )}

      <button onClick={handleCommit}>⚡ Commit to Hydra</button>
    </div>
  );
}
```

**Code backend** (/api/commit):

```ts
import { MeshTxBuilder } from "@meshsdk/core";

export async function POST(req: Request) {
  const { address, utxo, isCreator, proposalTitle } = await req.json();

  try {
    // 1. Build transaction
    const tx = new MeshTxBuilder()
      .spendUTxOs([utxo]) // Spend UTxO được chọn
      .sendValue(hydraHeadAddress, {
        lovelace: BigInt(utxo.amount),
      })
      .complete();

    // 2. Return unsigned transaction
    return {
      unsignedTx: tx.toString(),
    };
  } catch (error) {
    return { error: error.message };
  }
}

// Sau khi user submit transaction (thông qua polling hoặc webhook)
export async function confirmCommit(
  txHash: string,
  userId: string,
  isCreator: boolean,
  proposalTitle: string,
) {
  // 3. Lưu Creator/Proposal vào DB
  if (isCreator) {
    await prisma.creator.create({
      data: {
        userId,
        txHash,
        proposalTitle,
        createdAt: new Date(),
      },
    });

    await prisma.proposal.create({
      data: {
        title: proposalTitle,
        creatorId: userId,
        status: "ACTIVE",
      },
    });
  }

  // 4. Update User balance (Hydra)
  await prisma.user.update({
    where: { id: userId },
    data: {
      hydraBalance: { increment: BigInt(selectedUtxo.amount) },
    },
  });
}
```

**Bảng so sánh các trạng thái**:

| Phase              | Nơi                       | Trạng thái              | Hành động                            |
| ------------------ | ------------------------- | ----------------------- | ------------------------------------ |
| **1. Select UTxO** | Frontend                  | Dropdown hiển thị UTxOs | User chọn UTxO + fill proposal title |
| **2. Build TX**    | Backend                   | MeshTxBuilder xây dựng  | Tạo unsigned transaction             |
| **3. Sign TX**     | Frontend Wallet           | Browser wallet          | User ký bằng ví                      |
| **4. Submit TX**   | Hydra Head                | Transaction pending     | Submit lên Hydra network             |
| **5. Confirm TX**  | Backend (polling/webhook) | Transaction confirmed   | Verify txHash                        |
| **6. Save to DB**  | Prisma                    | Data persistence        | Lưu Creator + Proposal + Balance     |
| **7. Sync UI**     | React Query               | invalidateQueries       | Refetch tất cả data                  |

👉 Kết luận: Luồng này **kết hợp ba lớp** (Frontend, Backend, Blockchain) một cách **liền mạch**. Bước invalidateQueries là chìa khóa để UI realtime không hiển thị dữ liệu cũ (stale data).

</details>

---

## ✅ Bài 5: Tầm quan trọng của invalidateQueries

### 📌 Đề bài

Giải thích vai trò của `queryClient.invalidateQueries()` sau khi thực hiện các hành động quan trọng (Commit, Tip, Claim…). Tại sao cần invalidate?

### 💡 Gợi ý

- Đồng bộ dữ liệu (data consistency)
- Realtime UX
- Các queryKey chính cần invalidate
- Stale data problem

<details>
<summary>Đáp án</summary>

**Vấn đề: Stale Data**

Khi user thực hiện hành động (Commit, Tip, Claim), dữ liệu trên blockchain/backend thay đổi ngay lập tức. Tuy nhiên, React Query có thể vẫn cache dữ liệu cũ → UI hiển thị sai số liệu.

**Ví dụ**:

```
Frontend cache: balance = 100 ADA
User clicks "Commit 50 ADA" → Transaction successful
Blockchain now: balance = 50 ADA
But Frontend still shows: 100 ADA (stale!)
```

**Giải pháp: invalidateQueries**

```tsx
import { useQueryClient } from "@tanstack/react-query";

export function TipForm() {
  const queryClient = useQueryClient();

  const handleTip = async (amount: number) => {
    try {
      // 1. Call API
      const response = await fetch("/api/tip", {
        method: "POST",
        body: JSON.stringify({ amount }),
      });

      // 2. Transaction successful
      const { txHash } = await response.json();

      // 3. Invalidate relevant queries → force refetch
      queryClient.invalidateQueries({
        queryKey: ["fetch-balance-hydra"],
      });

      queryClient.invalidateQueries({
        queryKey: ["fetch-tips-list"],
      });

      queryClient.invalidateQueries({
        queryKey: ["fetch-status-hydra"],
      });

      // 4. UI automatically refetch & re-render
      toast.success("Tip sent!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return <button onClick={() => handleTip(50)}>Send 50 ADA Tip</button>;
}
```

**Các queryKey chính cần invalidate**:

| queryKey                  | Khi nào invalidate               | Lý do                                  |
| ------------------------- | -------------------------------- | -------------------------------------- |
| `["fetch-balance-hydra"]` | Sau Commit, Tip, Claim, Decommit | Balance thay đổi                       |
| `["fetch-status-hydra"]`  | Sau Commit, Decommit, Fanout     | Status thay đổi (IDLE → OPEN → CLOSED) |
| `["fetch-utxo-commit"]`   | Sau Commit thành công            | UTxO được consume, không còn available |
| `["fetch-tips-list"]`     | Sau Tip hoặc Claim               | Danh sách tips cập nhật                |
| `["fetch-proposals"]`     | Sau tạo Creator                  | Proposal mới                           |
| `["fetch-utxo-hydra"]`    | Sau bất kỳ transaction nào       | UTxOs trong Hydra thay đổi             |

**invalidateQueries vs setQueryData**:

| Approach              | Code                                       | Ưu điểm                               | Nhược điểm                    |
| --------------------- | ------------------------------------------ | ------------------------------------- | ----------------------------- |
| **invalidateQueries** | `queryClient.invalidateQueries({...})`     | Tự động refetch dữ liệu mới từ server | Cần 1-2 giây để fetch         |
| **setQueryData**      | `queryClient.setQueryData([key], newData)` | Cập nhật UI ngay lập tức (optimistic) | Phải hand-code logic cập nhật |

**Best Practice: Optimistic + Invalidate**

```tsx
const handleTip = async (amount: number) => {
  // 1. Optimistic update (cập nhật UI ngay)
  const previousBalance = queryClient.getQueryData(["fetch-balance-hydra"]);
  queryClient.setQueryData(
    ["fetch-balance-hydra"],
    (old: number) => old - amount,
  );

  try {
    // 2. Call API
    await fetch("/api/tip", {
      method: "POST",
      body: JSON.stringify({ amount }),
    });

    // 3. Invalidate để refetch & verify
    queryClient.invalidateQueries({ queryKey: ["fetch-balance-hydra"] });
  } catch (error) {
    // 4. Rollback nếu lỗi
    queryClient.setQueryData(["fetch-balance-hydra"], previousBalance);
    toast.error(error.message);
  }
};
```

**Workflow toàn bộ**:

```
User clicks "Tip" button
  ↓
Frontend: setQueryData → optimistic update (show new balance immediately)
  ↓
Backend: /api/tip → build + submit transaction
  ↓
Blockchain: Transaction confirmed
  ↓
Frontend: invalidateQueries → refetch balance từ server (verify)
  ↓
UI: Re-render với dữ liệu mới nhất từ server
  ↓
User thấy balance được cập nhật (mượt & nhanh!)
```

**Tại sao quan trọng?**

1. **Data Consistency**: Đảm bảo UI luôn hiển thị dữ liệu đúng
2. **User Experience**: Người dùng thấy kết quả ngay lập tức (optimistic) + verified (refetch)
3. **Prevent Bugs**: Tránh lỗi "transaction nói successful nhưng balance không đổi"
4. **Realtime Feeling**: Mỗi hành động đều cập nhật UI ngay lập tức

👉 Kết luận: `invalidateQueries` là **kỹ thuật quan trọng để duy trì tính nhất quán** giữa Frontend React Query cache và trạng thái thực tế của Hydra + Blockchain. Kết hợp với **optimistic updates**, nó tạo ra UX **realtime, mượt mà, và đáng tin cậy**.

</details>
