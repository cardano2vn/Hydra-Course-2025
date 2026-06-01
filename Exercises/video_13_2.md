# 📝 Bài tập - Chapter 04: Video 13

---

## ✅ Bài 1: Vai trò của Redeemer trong Transaction

### 📌 Đề bài

Giải thích vai trò của Redeemer trong giao dịch Smart Contract. Tại sao cả hành động **Tip** và **Claim** đều cần Redeemer khác nhau?

### 💡 Gợi ý

- Action identifier  
- Validator logic  
- Tip vs Claim

<details>
<summary>📋 Đáp án chi tiết</summary>

**Redeemer** là một thành phần quan trọng trong mô hình eUTxO của Cardano. Đây là dữ liệu mà người dùng gửi kèm theo transaction để **thông báo cho Smart Contract biết người dùng muốn thực hiện hành động gì**.

Trong Plutus, Redeemer đóng vai trò như một "lệnh điều khiển" (command) hoặc "action identifier". Validator script sẽ đọc Redeemer để quyết định logic nào sẽ được thực thi.

#### Trong TipJar contract:

- **Redeemer `Tip`**: Dùng khi người dùng muốn gửi tiền (tip) vào TipJar.  
- **Redeemer `Claim`**: Dùng khi chủ sở hữu (owner) muốn rút toàn bộ tiền ra khỏi TipJar.

Validator script sẽ kiểm tra Redeemer và áp dụng quy tắc tương ứng:

- Nếu Redeemer là **Tip** → Cho phép cập nhật datum (thêm tip mới vào danh sách), tăng giá trị ADA bị khóa trong script.
- Nếu Redeemer là **Claim** → Kiểm tra chữ ký của owner, cho phép consume toàn bộ UTxO và chuyển ADA về địa chỉ owner.

**Tại sao phải dùng Redeemer khác nhau?**

Vì cùng một UTxO (cùng một Smart Contract address) có thể hỗ trợ nhiều loại hành động. Nếu không có Redeemer để phân biệt, validator sẽ không biết nên áp dụng logic nào. Redeemer giúp script trở nên linh hoạt, cho phép nhiều chức năng trên cùng một contract mà vẫn đảm bảo tính bảo mật.

👉 **Kết luận**: Redeemer là "công tắc" giúp Smart Contract phân biệt và xử lý đúng các hành động khác nhau trên cùng một UTxO.
</details>

---

## ✅ Bài 2: Tại sao cần đọc UTxO hiện tại của Smart Contract?

### 📌 Đề bài

Trước khi xây dựng transaction Tip hoặc Claim, tại sao phần Off-chain cần truy vấn UTxO hiện tại của Smart Contract?

### 💡 Gợi ý

- Current state  
- Datum  
- Value

<details>
<summary>📋 Đáp án chi tiết</summary>

Trong mô hình **eUTxO** (extended Unspent Transaction Output), toàn bộ trạng thái của Smart Contract được lưu trữ trực tiếp trong UTxO. Không có cơ sở dữ liệu riêng như các blockchain khác.

Vì vậy, trước khi tạo bất kỳ transaction nào tương tác với contract, phần **Off-chain** (frontend / backend) **bắt buộc phải**:

1. Truy vấn UTxO hiện tại của script address.
2. Lấy **Datum** hiện tại (chứa trạng thái ứng dụng).
3. Lấy **Value** (số lượng ADA và các token khác đang bị khóa).
4. Xác định chính xác **UTxO nào** sẽ được consume.

Nếu không đọc trạng thái hiện tại:
- Không biết datum cũ là gì để tạo datum mới.
- Không biết đang có bao nhiêu ADA trong TipJar.
- Dễ tạo transaction không hợp lệ → validator sẽ reject.
- Có nguy cơ mất đồng bộ trạng thái giữa Off-chain và On-chain.

👉 **Kết luận**: Việc đọc UTxO hiện tại là bước nền tảng để thực hiện **state transition** một cách chính xác và an toàn trong Cardano.
</details>

---

## ✅ Bài 3: Wallet UTxOs và Collateral UTxOs

### 📌 Đề bài

Giải thích vai trò của Wallet UTxOs và Collateral UTxOs khi xây dựng transaction bằng `MeshTxBuilder`.

### 💡 Gợi ý

- Inputs  
- Fees  
- Script validation

<details>
<summary>📋 Đáp án chi tiết</summary>

Khi xây dựng transaction tương tác với Smart Contract trên Cardano, chúng ta thường cần hai loại UTxO:

### 1. **Wallet UTxOs (Normal Inputs)**
- Là nguồn tài sản chính của người dùng.
- Dùng để:
  - Cung cấp ADA khi thực hiện Tip.
  - Trả phí transaction (fee).
  - Có thể chứa các token khác nếu cần.

### 2. **Collateral UTxOs**
- Đây là đặc thù của Cardano để đảm bảo an ninh.
- Collateral sẽ **không bị tiêu thụ** nếu transaction thành công.
- Chỉ bị sử dụng (bị đốt) khi script validation **thất bại**.
- Giúp bảo vệ mạng lưới khỏi các transaction độc hại hoặc validator chạy quá lâu.

Khi dùng **MeshTxBuilder**, thư viện thường tự động:
- Lấy các UTxO thông thường từ wallet.
- Lấy thêm Collateral UTxOs (thường là 1–2 UTxO riêng).
- Xây dựng transaction hoàn chỉnh.

👉 **Kết luận**: Wallet UTxOs cung cấp giá trị và trả phí, còn Collateral UTxOs đóng vai trò "bảo hiểm" cho việc chạy Plutus Script.
</details>

---

## ✅ Bài 4: State Transition trong eUTxO

### 📌 Đề bài

Giải thích khái niệm State Transition và cách TipJar áp dụng mô hình này khi người dùng gửi Tip.

### 💡 Gợi ý

- Consume  
- Create new UTxO  
- Immutable state

<details>
<summary>📋 Đáp án chi tiết</summary>

Một trong những nguyên tắc cốt lõi của Cardano là **UTxO bất biến (immutable)**. Không thể sửa trực tiếp một UTxO đã có trên chain.

Do đó, để thay đổi trạng thái của Smart Contract, chúng ta phải thực hiện **State Transition**:

1. **Consume** (tiêu thụ) UTxO hiện tại của Smart Contract.
2. **Tạo ra** một UTxO mới với:
   - Datum mới (trạng thái đã được cập nhật).
   - Value mới (số ADA sau khi thay đổi).

#### Ví dụ thực tế với TipJar:

**Trước khi Tip:**
- Datum: `[{address: A, amount: 10}]`
- Value: 10 ADA

**Sau khi Tip 5 ADA:**
- Datum mới: `[{address: A, amount: 15}]`
- Value mới: 15 ADA

UTxO cũ bị consume hoàn toàn, UTxO mới được tạo ra với trạng thái cập nhật. Toàn bộ quá trình này phải được validator kiểm tra và chấp nhận.

👉 **Kết luận**: State Transition là nền tảng của mọi ứng dụng trên Cardano. TipJar là một ví dụ điển hình cho mô hình này.
</details>

---

## ✅ Bài 5: Tại sao Logic Phức tạp nên đặt ở Off-chain?

### 📌 Đề bài

Phân tích lý do tại sao phần lớn logic xử lý dữ liệu của TipJar được đặt ở Off-chain thay vì On-chain.

### 💡 Gợi ý

- Cost  
- Simplicity  
- Validation

<details>
<summary>📋 Đáp án chi tiết</summary>

Trong phát triển dApp trên Cardano, có một nguyên tắc quan trọng:

> **"Giữ On-chain script càng đơn giản càng tốt."**

### Lý do nên đặt logic phức tạp ở Off-chain:

1. **Chi phí Gas**: On-chain execution rất đắt. Mỗi phép tính phức tạp đều làm tăng fee.
2. **Kích thước Script**: Script càng phức tạp → kích thước lớn → tốn nhiều ADA để deploy và execute.
3. **Bảo trì & Mở rộng**: Code Off-chain (TypeScript/JavaScript) dễ viết, test, debug và cập nhật hơn Plutus.
4. **Hiệu năng**: Off-chain có thể thực hiện các tính toán nặng (tìm kiếm user, tính tổng tip, validate dữ liệu...) mà không làm chậm mạng.

### Vai trò phân công rõ ràng:

- **Off-chain**: Đọc datum, tính toán trạng thái mới, chuẩn bị inputs/outputs, tạo transaction.
- **On-chain (Validator)**: Chỉ kiểm tra xem transaction có hợp lệ không (signature, datum transition, redeemer đúng...).

Đây chính là kiến trúc **Hybrid Architecture** phổ biến và được khuyến khích trong hệ sinh thái Cardano.

👉 **Kết luận**: Off-chain xử lý nghiệp vụ phức tạp, On-chain chỉ làm phần xác thực — giúp hệ thống vừa an toàn, vừa tiết kiệm và dễ phát triển.
</details>

---