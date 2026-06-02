# 📝 Bài tập - Chapter 04: Video 13

---

## ✅ Bài 1: Vai trò của Redeemer trong Transaction

### 📌 Đề bài

Trong mô hình eUTxO của Cardano, một Smart Contract có thể hỗ trợ nhiều hành động khác nhau trên cùng một địa chỉ script. Khi người dùng tương tác với contract, transaction cần cung cấp thêm thông tin để Smart Contract biết chính xác hành động nào đang được yêu cầu thực hiện.

Hãy giải thích Redeemer là gì, Redeemer được sử dụng như thế nào trong quá trình validator script xác thực transaction, và phân tích lý do tại sao trong hệ thống TipJar cần sử dụng các Redeemer khác nhau cho hành động Tip và Claim. Đồng thời, hãy mô tả điều gì có thể xảy ra nếu contract không sử dụng Redeemer để phân biệt các hành động này.

### 💡 Gợi ý

- Redeemer là dữ liệu được gửi kèm transaction.
- Validator script đọc Redeemer để xác định hành động cần thực hiện.
- Mỗi hành động có thể yêu cầu các điều kiện xác thực khác nhau.
- So sánh logic xử lý giữa Tip và Claim.
- Phân tích vai trò của Redeemer trong việc tăng tính linh hoạt và bảo mật cho Smart Contract.

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

Khác với các blockchain sử dụng mô hình tài khoản (Account Model), Cardano lưu trữ trạng thái của ứng dụng trực tiếp trong các UTxO tại địa chỉ Smart Contract. Trước khi thực hiện một giao dịch Tip hoặc Claim, phần Off-chain luôn phải truy vấn và đọc trạng thái hiện tại của contract.

Hãy giải thích lý do tại sao bước này là bắt buộc, những thông tin nào cần được lấy từ UTxO hiện tại, và các rủi ro có thể xảy ra nếu Off-chain xây dựng transaction mà không dựa trên trạng thái mới nhất của Smart Contract.

### 💡 Gợi ý

- Trạng thái hiện tại được lưu trong Datum.
- Giá trị tài sản được lưu trong Value.
- Cần xác định đúng UTxO sẽ được consume.
- Liên hệ với khái niệm state transition.
- Phân tích các trường hợp transaction bị từ chối do dữ liệu không đồng bộ.

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

Khi xây dựng transaction tương tác với Smart Contract bằng MeshTxBuilder, hệ thống thường sử dụng cả Wallet UTxOs và Collateral UTxOs. Đây là hai loại UTxO có mục đích hoàn toàn khác nhau trong quá trình tạo và xác thực giao dịch.

Hãy giải thích vai trò của từng loại UTxO, mô tả cách chúng được sử dụng trong transaction, và phân tích lý do Cardano yêu cầu cơ chế Collateral khi thực thi Plutus Script.

### 💡 Gợi ý

- Wallet UTxOs là nguồn tài sản chính của người dùng.
- Dùng để thanh toán phí giao dịch và cung cấp ADA.
- Collateral chỉ được sử dụng trong các giao dịch có script.
- Điều gì xảy ra khi validator script thất bại?
- Vai trò của Collateral trong việc bảo vệ mạng lưới.

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

Một đặc điểm quan trọng của Cardano là các UTxO sau khi được tạo ra sẽ không thể chỉnh sửa trực tiếp. Vì vậy, mọi thay đổi trạng thái của Smart Contract đều phải được thực hiện thông qua cơ chế State Transition.

Hãy giải thích khái niệm State Transition trong mô hình eUTxO, mô tả các bước diễn ra khi trạng thái contract thay đổi, và phân tích cách hệ thống TipJar áp dụng cơ chế này khi người dùng gửi thêm một khoản tip mới vào contract.

### 💡 Gợi ý

- UTxO là bất biến (immutable).
- Trạng thái cũ phải được consume.
- Trạng thái mới được tạo bằng một UTxO mới.
- Datum và Value thay đổi như thế nào sau khi Tip.
- Liên hệ với quá trình cập nhật trạng thái trong ứng dụng truyền thống.

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

Trong quá trình phát triển dApp trên Cardano, lập trình viên thường được khuyến nghị giữ phần On-chain càng đơn giản càng tốt và chuyển phần lớn nghiệp vụ xử lý dữ liệu sang Off-chain.

Dựa trên kiến trúc của hệ thống TipJar, hãy phân tích những lợi ích của cách tiếp cận này. So sánh trách nhiệm của Off-chain và On-chain, đồng thời giải thích vì sao việc đưa quá nhiều logic lên Smart Contract có thể làm tăng chi phí và độ phức tạp của hệ thống.

### 💡 Gợi ý

- Chi phí thực thi Plutus Script.
- Kích thước và độ phức tạp của validator.
- Khả năng bảo trì và mở rộng hệ thống.
- Phân chia trách nhiệm giữa Off-chain và On-chain.
- Vai trò của Off-chain trong việc tính toán và chuẩn bị transaction.
- Vai trò của On-chain trong việc xác thực và đảm bảo tính đúng đắn của giao dịch.

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
