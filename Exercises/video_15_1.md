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

- Đảm bảo dữ liệu realtime, các hành động (commit, tip, claim, decommit, fanout) hoạt động đúng theo trạng thái Hydra.
- Kiểm tra khả năng xử lý nhiều người dùng đồng thời (multi-user scenarios).
- Đo lường hiệu năng và độ ổn định của DApp trong môi trường gần thực tế.

👉 Kết luận: Đây là bước quan trọng để chuyển từ code riêng lẻ sang một DApp hoàn chỉnh, tận dụng tối đa sức mạnh của Hydra.

</details>

---

## ✅ Bài 2: Quản lý trạng thái Hydra trên Frontend

### 📌 Đề bài

Giải thích cách sử dụng **React Query (useQuery)** để quản lý và hiển thị trạng thái Hydra Head trên giao diện.

### 💡 Gợi ý

- queryKey
- queryFn: getStatus()
- Component Status

<details>
<summary>Đáp án</summary>

Sử dụng hook `useQuery` của React Query:

```tsx
const { data: headStatus, isLoading: isLoadingHeadStatus } = useQuery({
  queryKey: ["fetch-status-hydra"],
  queryFn: () => getStatus(),
});

headStatus chứa trạng thái hiện tại (IDLE, OPEN, CLOSED, FANOUT_POSSIBLE…).
Truyền vào component <Status loading={isLoadingHeadStatus} data={headStatus} /> để hiển thị.
React Query tự động xử lý caching, refetch và loading state.

👉 Kết luận: Cách này giúp UI luôn đồng bộ realtime với Hydra Head, cải thiện UX và giảm lỗi logic.


✅ Bài 3: Lấy danh sách UTxO để Commit
📌 Đề bài
Mô tả cách lấy và hiển thị danh sách UTxO từ Layer-1 để người dùng chọn khi thực hiện Commit vào Hydra.
💡 Gợi ý

useQuery
enabled: !!address
Dropdown / Option



Sử dụng useQuery:
tsxconst { data: utxosCommit, isLoading: isLoadingUtxosCommit } = useQuery({
  queryKey: ["fetch-utxo-commit", address],
  queryFn: () => getUTxOsCommit({ walletAddress: address as string }),
  enabled: !!address,
});

Hiển thị dưới dạng dropdown, mỗi option chứa JSON của UTxO.
Hiển thị số ADA (Number(utxo.amount) / 1_000_000).
enabled đảm bảo chỉ fetch khi đã connect wallet.

👉 Kết luận: Vì Cardano dùng mô hình eUTxO, việc chọn UTxO cụ thể là bước bắt buộc và quan trọng.


✅ Bài 4: Luồng Commit + Tạo Proposal
📌 Đề bài
Phân tích luồng xử lý khi người dùng Commit ADA và đồng thời tạo Creator/Proposal trong TipJar.
💡 Gợi ý

getUtxos → commit → signTx → submitTx → createProposal → invalidateQueries



Các bước chính trong onSubmit:

Kiểm tra UTxO người dùng chọn có tồn tại trong ví không.
Gọi hàm commit({ address, utxo, isCreator: true }) để tạo transaction unsigned.
Ký transaction bằng ví (signTx).
Submit transaction lên mạng.
Tạo proposal trong database (Prisma) với thông tin title, description, author…
Invalidate các query liên quan để UI cập nhật realtime (UTxO Hydra, status…).

👉 Kết luận: Luồng này kết hợp On-chain (Hydra), Off-chain (Backend + DB) và Frontend một cách liền mạch.


✅ Bài 5: Tầm quan trọng của invalidateQueries
📌 Đề bài
Giải thích vai trò của queryClient.invalidateQueries() sau khi thực hiện các hành động quan trọng (Commit, Tip…).
💡 Gợi ý

Đồng bộ dữ liệu
Realtime UX
Các queryKey chính



invalidateQueries dùng để buộc React Query refetch lại dữ liệu mới nhất từ server.
Ví dụ:
tsxqueryClient.invalidateQueries({ queryKey: ["fetch-utxo-hydra", address] });
queryClient.invalidateQueries({ queryKey: ["fetch-status-hydra"] });
Lợi ích:

Đảm bảo UI luôn hiển thị dữ liệu mới nhất sau khi transaction thành công.
Tạo cảm giác realtime mà không cần WebSocket phức tạp.
Giảm nguy cơ hiển thị dữ liệu cũ (stale data).

👉 Kết luận: Đây là kỹ thuật quan trọng để duy trì tính nhất quán giữa Frontend và trạng thái thực tế của Hydra + Blockchain.