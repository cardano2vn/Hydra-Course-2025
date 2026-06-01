# 📝 Bài tập - Chapter 04: Video 13

---

## ✅ Bài 1: Vai trò của Off-chain Layer

### 📌 Đề bài

Trong kiến trúc của một DApp trên Cardano, Smart Contract chỉ chịu trách nhiệm xác thực các điều kiện giao dịch và bảo vệ tài sản trên Blockchain. Tuy nhiên, Smart Contract không thể tự lấy dữ liệu từ người dùng, tự tạo transaction hay tự cập nhật giao diện. Để giải quyết vấn đề này, hệ thống cần một tầng Off-chain Layer (Backend) đóng vai trò trung gian giữa Frontend và On-chain. Hãy giải thích vai trò của tầng Off-chain trong dự án TipJar trên Hydra, đồng thời phân tích vì sao một DApp hiện đại không thể chỉ dựa vào Smart Contract mà không có Backend hỗ trợ.

### 💡 Gợi ý

Hãy suy nghĩ về các nội dung sau:

- Smart Contract có thể làm gì và không thể làm gì?
- Off-chain đóng vai trò gì trong việc xây dựng transaction?
- Vì sao cần đọc UTxO và Datum trước khi gửi giao dịch?
- Off-chain hỗ trợ quản lý trạng thái như thế nào?
- Tại sao việc xử lý một phần logic ở Backend giúp giảm tải cho On-chain?
- Vai trò của Mesh SDK và Hydra SDK trong kiến trúc này là gì?
- Off-chain giúp cải thiện hiệu năng và trải nghiệm người dùng như thế nào?

<details>
<summary>Đáp án</summary>

Tầng Off-chain đóng vai trò là **bộ điều phối trung tâm** (orchestration layer):

- Xây dựng và chuẩn bị transaction trước khi gửi lên Hydra hoặc Layer-1.
- Quản lý và đồng bộ trạng thái giữa Frontend, Hydra Head và Smart Contract.
- Giảm tải cho On-chain bằng cách xử lý logic phức tạp (đọc UTxO, decode datum, tính toán state mới).
- Kết nối Mesh SDK, Hydra SDK và Smart Contract.

👉 Kết luận: Off-chain giúp hệ thống đạt được hiệu năng realtime trong khi vẫn giữ bảo mật từ On-chain.

</details>

---

## ✅ Bài 2: MeshTxBuilder

### 📌 Đề bài

Trong dự án TipJar, tầng Off-chain sử dụng lớp MeshTxBuilder để xây dựng và quản lý các giao dịch tương tác với Smart Contract.

MeshTxBuilder là thành phần chịu trách nhiệm chuẩn bị dữ liệu, xử lý trạng thái hiện tại của hợp đồng và tạo transaction hợp lệ trước khi gửi lên Hydra Head hoặc Cardano Layer-1.

Hãy giải thích MeshTxBuilder là gì, vai trò của nó trong hệ thống và cách nó hỗ trợ hai hành động quan trọng là Tip và Claim.

### 💡 Gợi ý

Hãy tìm hiểu các nội dung sau:

- MeshTxBuilder được xây dựng dựa trên thành phần nào?
- Vai trò của Transaction Builder trong Cardano là gì?
- MeshTxBuilder lấy dữ liệu từ Smart Contract bằng cách nào?
- Vì sao cần đọc Datum trước khi tạo transaction mới?
- MeshTxBuilder xử lý state transition như thế nào?
- Mối quan hệ giữa Frontend → MeshTxBuilder → Smart Contract.

<details>
<summary>Đáp án</summary>

**MeshTxBuilder** là lớp mở rộng từ MeshAdapter, đóng vai trò trung tâm ở tầng off-chain.

- Xây dựng transaction hợp lệ cho cả hai hành động: **Tip** (gửi tip) và **Claim** (rút tiền).
- Đọc trạng thái hiện tại từ Smart Contract (UTxO + Datum).
- Tính toán state mới và encode datum.
- Đảm bảo transaction tuân thủ logic validator của Aiken.

👉 Kết luận: MeshTxBuilder là “cầu nối” giữa Frontend/User và Smart Contract.

</details>

---

## ✅ Bài 3: Logic hàm tip()

### 📌 Đề bài

Khi người dùng gửi một khoản tip vào TipJar, hệ thống không đơn giản chỉ chuyển ADA đến Smart Contract.

Thay vào đó, Off-chain phải:

- Đọc trạng thái hiện tại của TipJar.
- Phân tích Datum hiện có.
- Cập nhật danh sách người gửi tip.
- Tạo Datum mới.
- Xây dựng transaction mới để cập nhật trạng thái của hợp đồng.

Hãy mô tả chi tiết các bước xử lý bên trong hàm tip() của MeshTxBuilder.

### 💡 Gợi ý

Hãy phân tích tuần tự quy trình sau:

- Vai trò của getWalletForTx().
- Vì sao cần lấy UTxO và Collateral?
- Làm thế nào để tìm UTxO hiện tại của Smart Contract?
- Quá trình decode datum diễn ra như thế nào?
- Hệ thống xử lý trường hợp: User đã từng tip. User tip lần đầu.
- Cách tạo Datum mới sau khi cập nhật dữ liệu.
- Vai trò của Redeemer Tip.
- Transaction mới được xây dựng như thế nào theo mô hình eUTxO?

<details>
<summary>Đáp án</summary>

Các bước chính trong `tip()`:

1. Lấy thông tin ví (`getWalletForTx()`): UTxOs, collateral, walletAddress.
2. Truy vấn UTxO hiện tại của Smart Contract.
3. Decode datum → chuyển thành danh sách tip (`[{address, amount}]`).
4. Cập nhật state: cộng dồn tip nếu user đã tồn tại hoặc thêm mới.
5. Xây dựng transaction: consume UTxO cũ → tạo UTxO mới với giá trị + datum cập nhật.
6. Sử dụng redeemer `Tip`.

👉 Kết luận: Toàn bộ quá trình là một **state transition** trên mô hình eUTxO.

</details>

---

## ✅ Bài 4: Xử lý Datum trong Off-chain

### 📌 Đề bài

Datum là nơi lưu trữ trạng thái của Smart Contract trên Cardano. Trong TipJar, Datum chứa danh sách người gửi tip cùng số tiền tương ứng.

Khi người dùng thực hiện hành động Tip, tầng Off-chain phải đọc trạng thái hiện tại, cập nhật dữ liệu và chuyển đổi lại sang định dạng mà Smart Contract có thể hiểu được.

Hãy giải thích toàn bộ quy trình xử lý Datum trong Off-chain, bao gồm các bước Decode → Update → Encode.

### 💡 Gợi ý

Hãy tập trung vào các câu hỏi sau:

- Datum được lưu trên Blockchain dưới dạng gì?
- Vai trò của hàm convertDatum().
- Sau khi decode, dữ liệu được biểu diễn như thế nào trong TypeScript?
- Làm thế nào để tìm một user đã tồn tại trong danh sách tip?
- Nếu user đã tồn tại thì cập nhật amount ra sao?
- Nếu user chưa tồn tại thì thêm record mới như thế nào?
- Vai trò của hàm mConStr0() khi encode Datum.
- Điều gì xảy ra nếu Datum được encode sai định dạng?

<details>
<summary>Đáp án</summary>

- **Decode**: `convertDatum()` chuyển PlutusData (CBOR) thành array object `[{address, amount}]`.
- **Update**: Tìm user trong danh sách, nếu có thì cộng dồn amount, nếu chưa thì push record mới.
- **Encode**: Sử dụng `mConStr0()` để chuyển array thành định dạng datum hợp lệ cho transaction.

👉 Kết luận: Off-chain phải xử lý datum chính xác để đảm bảo validator On-chain chấp nhận transaction.

</details>

---

## ✅ Bài 5: So sánh Tip và Claim

### 📌 Đề bài

Trong TipJar có hai hành động quan trọng:

- Tip: Người dùng gửi tiền vào TipJar.
- Claim: Chủ sở hữu rút tiền từ TipJar.

Mặc dù cả hai đều tương tác với cùng một Smart Contract, nhưng logic xử lý của chúng hoàn toàn khác nhau.

Hãy so sánh chi tiết hai hành động Tip và Claim từ góc nhìn Off-chain và Smart Contract.

### 💡 Gợi ý

Hãy xem xét các khía cạnh sau:

- Redeemer nào được sử dụng trong mỗi hành động?
- Ai có quyền thực hiện Tip?
- Ai có quyền thực hiện Claim?
- Smart Contract kiểm tra chữ ký trong trường hợp nào?
- Cách xử lý UTxO của mỗi hành động khác nhau ra sao?
- Datum có được cập nhật hay không?
- Kết quả cuối cùng của transaction là gì?
- Vì sao Tip được xem là public action còn Claim là restricted action?

<details>
<summary>Đáp án</summary>

| Tiêu chí     | Tip                              | Claim                          |
| ------------ | -------------------------------- | ------------------------------ |
| Redeemer     | `Tip`                            | `Claim`                        |
| Ai thực hiện | Bất kỳ ai                        | Chỉ Owner (kiểm tra chữ ký)    |
| Xử lý UTxO   | Consume cũ → Tạo mới + thêm tiền | Consume và rút toàn bộ tiền    |
| Datum        | Cập nhật danh sách tip           | Thường không cần output script |
| Mục đích     | Tích lũy tiền                    | Rút tiền về ví owner           |

👉 Kết luận: Tip là public action, Claim là restricted action — thể hiện rõ ràng qua redeemer và signature check.

</details>

---
