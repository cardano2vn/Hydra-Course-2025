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

## Onchain và Offchain

Trong phần này, chúng ta sẽ tập trung vào việc xây dựng nền tảng vững chắc để phát triển smart contract trên Cardano, đồng thời hiểu rõ cách phối hợp giữa on-chain và off-chain trong một ứng dụng thực tế như TipJar chạy trên Hydra.

![01](/assets/01.png)

### 🔗 On-chain Smart Contract (Aiken)

Trong hệ thống TipJar chạy trên Hydra, phần on-chain đóng vai trò là lớp bảo mật cuối cùng, đảm bảo rằng tất cả các giao dịch khi được ghi nhận lên blockchain đều phải tuân thủ các điều kiện logic đã được định nghĩa trước. Smart contract dưới đây được viết bằng Aiken, sử dụng mô hình eUTxO của Cardano — một mô hình giúp kiểm soát trạng thái một cách minh bạch và an toàn.

#### 🧠 Mục tiêu của Smart Contract

Contract hello_world được thiết kế với mục tiêu đơn giản nhưng mang tính minh họa rõ ràng. Cụ thể, contract chỉ cho phép tiêu thụ một UTxO khi đồng thời thỏa mãn hai điều kiện: người dùng phải gửi đúng thông điệp "Hello, World!" thông qua Redeemer, và giao dịch đó phải được ký bởi chính chủ sở hữu (owner) của UTxO, được xác định trong Datum.

Mặc dù logic này khá đơn giản, nhưng nó giúp làm rõ cách một smart contract kiểm tra dữ liệu đầu vào và xác thực quyền truy cập. Đây là nền tảng quan trọng để mở rộng sang các logic phức tạp hơn trong ứng dụng TipJar, chẳng hạn như kiểm soát việc gửi tip, rút tiền hoặc phân phối tài sản.

#### 🧱 Định nghĩa dữ liệu

Để smart contract có thể hoạt động, cần xác định rõ các loại dữ liệu mà nó sẽ xử lý. Trong mô hình eUTxO, hai thành phần quan trọng nhất là Datum và Redeemer. Datum đại diện cho trạng thái gắn với UTxO, trong khi Redeemer đại diện cho hành động mà người dùng muốn thực hiện.

Datum trong contract này được định nghĩa với mục đích lưu trữ thông tin về chủ sở hữu của UTxO. Cụ thể, nó chứa một trường owner với kiểu VerificationKeyHash, là hash của public key đại diện cho địa chỉ ví của người dùng. Khi một giao dịch cố gắng tiêu UTxO, contract sẽ sử dụng giá trị này để kiểm tra xem người ký giao dịch có đúng là chủ sở hữu hay không.

Trong khi đó, Redeemer được sử dụng để truyền dữ liệu từ phía người dùng vào smart contract tại thời điểm thực thi giao dịch. Trong ví dụ này, Redeemer chỉ chứa một trường msg dạng ByteArray, đại diện cho thông điệp mà người dùng gửi lên. Contract sẽ kiểm tra nội dung của thông điệp này để xác định xem hành động có hợp lệ hay không.

Sự kết hợp giữa Datum và Redeemer cho phép smart contract kiểm soát cả trạng thái (state) và hành vi (action). Đây là điểm khác biệt quan trọng của mô hình eUTxO so với các mô hình blockchain truyền thống, nơi trạng thái thường được lưu trữ tập trung trong contract.

##### Datum

Trong mô hình eUTxO (Extended UTxO) của Cardano, mỗi UTxO không chỉ đơn thuần chứa giá trị như ADA hoặc token mà còn có thể đi kèm một phần dữ liệu tùy chỉnh gọi là Datum. Datum đóng vai trò như “trạng thái” (state) của smart contract tại thời điểm UTxO đó tồn tại. Trong đoạn mã trên, Datum được định nghĩa với cấu trúc rất đơn giản:

```aiken
pub type Datum {
  owner: VerificationKeyHash,
}
```

Ở đây, owner là một VerificationKeyHash, tức là hash của public key đại diện cho địa chỉ ví của người dùng. Trường này có ý nghĩa cực kỳ quan trọng vì nó xác định ai là chủ sở hữu hợp lệ của UTxO. Khi một giao dịch cố gắng tiêu (spend) UTxO này, smart contract sẽ đọc Datum và kiểm tra xem giao dịch đó có được ký bởi đúng owner hay không. Nếu không thỏa điều kiện này, giao dịch sẽ bị từ chối, đảm bảo tính bảo mật và quyền kiểm soát tài sản.

Trong thực tế, khi một UTxO được tạo tại địa chỉ của smart contract, Datum sẽ được gắn kèm và lưu trữ trực tiếp trên blockchain (hoặc dưới dạng hash tham chiếu). Khi UTxO đó được sử dụng làm input cho một giao dịch mới, Datum sẽ được truyền vào validator để thực hiện các kiểm tra logic. Điều này cho phép contract hoạt động dựa trên trạng thái cụ thể của từng UTxO, thay vì một trạng thái toàn cục như các mô hình account-based.

Đối với bài toán TipJar, cấu trúc Datum này có thể được mở rộng thêm để lưu nhiều thông tin hơn như tổng số tiền tip, địa chỉ người nhận tip hoặc các metadata liên quan. Tuy nhiên, trong ví dụ cơ bản này, việc chỉ lưu owner đã đủ để minh họa cách kiểm soát quyền truy cập và xác thực giao dịch trong smart contract. Điều này cũng thể hiện rõ triết lý của mô hình eUTxO: mỗi UTxO mang theo dữ liệu và logic riêng, giúp hệ thống minh bạch, dễ kiểm chứng và hạn chế các vấn đề về đồng bộ trạng thái.

##### Redeemer

Trong mô hình eUTxO của Cardano, bên cạnh Datum (dữ liệu gắn với UTxO), còn có một thành phần quan trọng khác là Redeemer. Nếu Datum đại diện cho trạng thái hiện tại, thì Redeemer chính là hành động hoặc ý định của người dùng khi muốn tiêu (spend) UTxO đó. Trong đoạn mã trên, Redeemer được định nghĩa như sau:

```aiken
pub type Redeemer {
  msg: ByteArray,
}
```

Ở đây, Redeemer chỉ chứa một trường duy nhất là msg với kiểu ByteArray. Đây là dạng dữ liệu nhị phân, thường được sử dụng để biểu diễn chuỗi ký tự hoặc thông tin tùy chỉnh trong smart contract. Khi người dùng gửi một giao dịch để tương tác với contract, họ sẽ phải cung cấp Redeemer, và giá trị msg này sẽ được truyền vào validator để kiểm tra logic.

Trong contract hello_world, trường msg đóng vai trò như một điều kiện xác thực đơn giản: hệ thống chỉ chấp nhận giao dịch nếu nội dung của msg đúng bằng "Hello, World!". Điều này minh họa cách mà Redeemer được sử dụng để kiểm soát hành vi của người dùng — tức là không chỉ “ai” thực hiện giao dịch (được xác định bởi Datum), mà còn “họ đang cố gắng làm gì” (được thể hiện qua Redeemer).

Trong thực tế, Redeemer thường được thiết kế phức tạp hơn nhiều để biểu diễn các loại hành động khác nhau. Ví dụ trong ứng dụng TipJar, Redeemer có thể được mở rộng thành các dạng như: gửi tip, rút tiền hoặc cập nhật trạng thái. Khi đó, thay vì chỉ có một trường msg, Redeemer có thể trở thành một kiểu dữ liệu phân nhánh (enum) để phân biệt rõ từng hành động. Tuy nhiên, trong ví dụ đơn giản này, việc sử dụng một thông điệp dạng ByteArray giúp làm rõ cơ chế hoạt động cơ bản: Redeemer là dữ liệu đầu vào do người dùng cung cấp để kích hoạt và thỏa mãn điều kiện của smart contract.

Tóm lại, nếu Datum là “dữ liệu tĩnh” gắn với UTxO, thì Redeemer là “dữ liệu động” được cung cấp tại thời điểm giao dịch. Sự kết hợp giữa hai thành phần này cho phép smart contract kiểm soát chặt chẽ cả trạng thái lẫn hành vi, tạo nên một mô hình xác thực minh bạch và linh hoạt trong hệ sinh thái Cardano.

#### ⚙️ Validator Logic

Validator là phần cốt lõi của smart contract, nơi định nghĩa toàn bộ logic xác thực giao dịch. Trong đoạn mã dưới đây, validator hello_world quy định các điều kiện mà một giao dịch phải thỏa mãn để có thể tiêu (spend) một UTxO:

```aiken
validator hello_world {

  spend(
    datum_opt: Option<Datum>,
    redeemer: Redeemer,
    _input: OutputReference,
    tx: Transaction,
  ) {
    expect Some(datum) = datum_opt

    let must_say_hello = redeemer.msg == "Hello, World!"
    let must_be_signed = list.has(tx.extra_signatories, datum.owner)

    must_say_hello && must_be_signed
  }

  else(_) {
    fail
  }
}
```

Trong hàm spend, validator nhận vào bốn tham số chính. datum*opt là Datum được gắn với UTxO, nhưng ở dạng Option để xử lý cả trường hợp có hoặc không có dữ liệu. redeemer là dữ liệu do người dùng cung cấp khi thực hiện giao dịch. \_input đại diện cho tham chiếu đến UTxO đang bị tiêu, tuy nhiên trong logic này không được sử dụng nên được đặt dấu *. Cuối cùng, tx là toàn bộ thông tin của giao dịch hiện tại, bao gồm danh sách chữ ký, inputs, outputs và các metadata khác.

Dòng lệnh expect Some(datum) = datum_opt đóng vai trò kiểm tra bắt buộc rằng UTxO phải có Datum hợp lệ. Nếu không có Datum, chương trình sẽ dừng ngay lập tức và giao dịch bị từ chối. Đây là một bước đảm bảo tính toàn vẹn dữ liệu trước khi tiếp tục các kiểm tra khác.

Tiếp theo, validator định nghĩa hai điều kiện quan trọng. Biến must_say_hello kiểm tra xem thông điệp trong Redeemer có đúng bằng "Hello, World!" hay không. Đây là một dạng kiểm tra dữ liệu đầu vào, đảm bảo người dùng đang thực hiện đúng hành động mà contract yêu cầu. Biến must_be_signed kiểm tra xem địa chỉ owner (lấy từ Datum) có nằm trong danh sách những người đã ký giao dịch (tx.extra_signatories) hay không. Điều này đảm bảo rằng chỉ chủ sở hữu hợp lệ mới có quyền tiêu UTxO.

Cuối cùng, validator trả về kết quả của biểu thức must_say_hello && must_be_signed. Điều này có nghĩa là giao dịch chỉ được chấp nhận khi cả hai điều kiện đều đúng: người dùng gửi đúng thông điệp và giao dịch được ký bởi chính chủ sở hữu. Nếu một trong hai điều kiện không thỏa mãn, toàn bộ giao dịch sẽ bị từ chối.

Khối else(\_) { fail } xử lý các trường hợp không phải là hành động spend. Trong bối cảnh này, contract chỉ cho phép tiêu UTxO và từ chối mọi hành động khác, giúp đơn giản hóa logic và tăng tính an toàn.

Tổng thể, validator này minh họa rõ cách một smart contract trong Aiken kiểm soát giao dịch thông qua việc kết hợp dữ liệu từ Datum, Redeemer và thông tin của Transaction. Đây là nền tảng quan trọng để xây dựng các logic phức tạp hơn như kiểm soát dòng tiền, phân quyền hoặc xử lý các kịch bản tương tác trong ứng dụng thực tế như TipJar trên Hydra.

#### 🧪 Kiểm thử Smart Contract

Để đảm bảo smart contract hoạt động chính xác, ta tiến hành kiểm thử bằng cách mô phỏng các tình huống khác nhau của giao dịch. Mỗi test case dưới đây đại diện cho một kịch bản cụ thể, giúp xác minh từng điều kiện trong validator.

```aiken
fn mock_tx(is_owner_signed: Bool) -> Transaction {
  mocktail_tx()
    |> required_signer_hash(is_owner_signed, mock_pub_key_hash(0))
    |> complete()
}
```

Hàm mock_tx đóng vai trò là một công cụ hỗ trợ quan trọng trong quá trình kiểm thử. Thay vì phải tạo một transaction thật trên blockchain, hàm này cho phép chúng ta mô phỏng một transaction với các điều kiện tùy chỉnh, đặc biệt là việc có hay không chữ ký của chủ sở hữu (owner).

Cụ thể, hàm nhận vào một tham số boolean is_owner_signed. Nếu giá trị này là True, hàm required_signer_hash sẽ thêm public key hash của owner (được tạo giả lập bằng mock_pub_key_hash(0)) vào danh sách extra_signatories của transaction. Ngược lại, nếu là False, transaction sẽ không chứa chữ ký của owner. Điều này giúp ta dễ dàng kiểm tra các trường hợp liên quan đến quyền sở hữu.

Quy trình bên trong hàm bắt đầu với mocktail_tx(), một hàm khởi tạo transaction giả lập ở trạng thái ban đầu. Sau đó, toán tử pipeline (|>) được sử dụng để lần lượt truyền transaction qua các bước xử lý: thêm chữ ký (nếu cần) và cuối cùng là complete() để hoàn thiện transaction. Kết quả trả về là một đối tượng Transaction có thể sử dụng trực tiếp trong các test case.

Nhờ hàm mock_tx, việc kiểm thử trở nên linh hoạt và rõ ràng hơn. Ta có thể dễ dàng tạo ra nhiều kịch bản khác nhau như giao dịch hợp lệ (có chữ ký), giao dịch không hợp lệ (thiếu chữ ký), từ đó kiểm tra chính xác cách validator phản ứng với từng tình huống. Đây là một kỹ thuật rất quan trọng trong phát triển smart contract, giúp giảm thiểu rủi ro trước khi triển khai thực tế.

##### ✅ Test case 1: Giao dịch hợp lệ (Successful Spend)

Trong test case này, chúng ta kiểm tra kịch bản lý tưởng nhất, nơi người dùng gửi đúng thông điệp "Hello, World!" và giao dịch được ký bởi chính chủ sở hữu (owner) của UTxO. Đây là tình huống mà validator sẽ chấp nhận và cho phép tiêu UTxO.

```aiken
test test_hello_world() {
  let datum = Some(Datum { owner: mock_pub_key_hash(0) })
  let redeemer = Redeemer { msg: "Hello, World!" }
  let tx = mock_tx(True)
  hello_world.spend(datum, redeemer, mock_utxo_ref(0, 0), tx)
}
```

Trong test case test_hello_world, chúng ta mô phỏng một giao dịch hoàn toàn hợp lệ nhằm kiểm tra xem smart contract có hoạt động đúng trong điều kiện lý tưởng hay không. Trước hết, Datum được khởi tạo với trường owner là một public key hash giả lập thông qua hàm mock_pub_key_hash(0). Điều này đại diện cho chủ sở hữu hợp lệ của UTxO và là cơ sở để validator kiểm tra quyền truy cập.

Tiếp theo, Redeemer được tạo với thông điệp "Hello, World!", đúng với điều kiện mà smart contract yêu cầu. Đây là dữ liệu đầu vào thể hiện hành động của người dùng khi muốn tiêu UTxO. Sau đó, transaction được tạo thông qua hàm mock_tx(True). Việc truyền giá trị True đảm bảo rằng transaction này có chứa chữ ký của owner trong danh sách extra_signatories, đáp ứng điều kiện xác thực về quyền sở hữu.

Khi hàm hello_world.spend được gọi, validator sẽ thực hiện lần lượt các bước kiểm tra. Đầu tiên, nó xác nhận rằng Datum tồn tại và có thể truy xuất được thông tin owner. Tiếp theo, nó so sánh nội dung của Redeemer với chuỗi "Hello, World!" để đảm bảo hành động hợp lệ. Cuối cùng, validator kiểm tra xem chữ ký của owner có xuất hiện trong transaction hay không. Vì cả hai điều kiện quan trọng — nội dung thông điệp và chữ ký hợp lệ — đều được thỏa mãn, biểu thức logic trong validator trả về true, và giao dịch được chấp nhận.

Sau khi thực thi lệnh:

```bash
aiken check
```

hệ thống tiến hành biên dịch smart contract, thu thập các test case và thực hiện kiểm thử. Kết quả trả về cho thấy tất cả các test đều PASS, không có lỗi hay cảnh báo nào:

```bash
Testing ...

┍━ helloworld ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│ PASS [mem: 60764, cpu: 24461890] test_hello_world
│ PASS [mem: 13842, cpu:  5861155] test_failed_hello_world_incorrect_redeemer
│ PASS [mem: 37448, cpu: 14343556] test_failed_hello_world_without_signer
┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1 tests | 1 passed | 0 failed

Summary 3 checks, 0 errors, 0 warnings
```

Kết quả này xác nhận rằng test case test_hello_world đã hoạt động chính xác, tức là validator cho phép giao dịch hợp lệ được thực thi. Đồng thời, hai test case còn lại cũng PASS, chứng minh rằng smart contract không chỉ xử lý đúng trường hợp hợp lệ mà còn từ chối chính xác các giao dịch không hợp lệ (sai thông điệp hoặc thiếu chữ ký).

Ngoài ra, các chỉ số mem (bộ nhớ) và cpu (số bước tính toán) đi kèm mỗi test phản ánh tài nguyên mà validator sử dụng trong quá trình thực thi. Đây là những thông số quan trọng trong môi trường Cardano vì chúng ảnh hưởng trực tiếp đến chi phí giao dịch. Việc theo dõi các chỉ số này giúp lập trình viên có thể tối ưu hóa smart contract khi cần thiết.

Tổng thể, kết quả kiểm thử cho thấy smart contract đã được xây dựng đúng logic, đảm bảo kiểm soát chặt chẽ cả dữ liệu đầu vào và quyền truy cập. Đây là bước xác nhận quan trọng trước khi tiếp tục triển khai hoặc tích hợp contract vào các hệ thống lớn hơn như ứng dụng TipJar trên Hydra.

##### ❌ Test case 2: Sai Redeemer (Incorrect Message)

Trong kịch bản này, người dùng vẫn ký giao dịch hợp lệ với tư cách là owner, nhưng thông điệp trong Redeemer không đúng với yêu cầu "Hello, World!". Điều này mô phỏng tình huống một người cố gắng tương tác với contract nhưng không cung cấp dữ liệu đầu vào chính xác.

```aiken
test test_failed_hello_world_incorrect_redeemer() {
  let datum = Some(Datum { owner: mock_pub_key_hash(0) })
  let redeemer = Redeemer { msg: "GM World!" }
  let tx = mock_tx(True)
  !hello_world.spend(datum, redeemer, mock_utxo_ref(0, 0), tx)
}
```

Trong test case test_failed_hello_world_incorrect_redeemer, chúng ta mô phỏng một giao dịch không hợp lệ nhằm kiểm tra xem smart contract có từ chối đúng các hành động sai hay không. Cụ thể, Datum vẫn được khởi tạo với owner hợp lệ thông qua mock_pub_key_hash(0), đảm bảo rằng quyền sở hữu là chính xác. Transaction cũng được tạo bằng mock_tx(True), nghĩa là giao dịch vẫn có chữ ký hợp lệ của owner.

Tuy nhiên, điểm khác biệt nằm ở Redeemer. Thay vì sử dụng thông điệp "Hello, World!" như yêu cầu của validator, test case này cung cấp "GM World!". Đây là một thông điệp không hợp lệ và không thỏa mãn điều kiện logic đã được định nghĩa trong smart contract.

Khi hàm hello_world.spend được thực thi, validator sẽ kiểm tra nội dung của Redeemer và phát hiện rằng thông điệp không khớp với giá trị mong đợi. Do đó, điều kiện must_say_hello trả về false, dẫn đến toàn bộ biểu thức logic cũng trả về false, và giao dịch bị từ chối.

Điểm quan trọng trong test này là việc sử dụng toán tử ! trước lời gọi hàm: `!hello_world.spend(...)`

Điều này có nghĩa là test kỳ vọng giao dịch phải thất bại. Nếu validator thực sự từ chối giao dịch (tức là trả về false), thì biểu thức !false sẽ trở thành true, và test được đánh dấu là PASS. Ngược lại, nếu validator chấp nhận giao dịch sai này, test sẽ thất bại.

Sau khi chạy lệnh:

```bash
aiken check
```

kết quả cho thấy test test_failed_hello_world_incorrect_redeemer được đánh dấu PASS, xác nhận rằng smart contract đã hoạt động đúng khi từ chối giao dịch có Redeemer không hợp lệ. Đồng thời, các test khác cũng PASS và không có lỗi hay cảnh báo nào:

```bash
Testing ...

┍━ helloworld ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│ PASS [mem: 60764, cpu: 24461890] test_hello_world
│ PASS [mem: 13842, cpu:  5861155] test_failed_hello_world_incorrect_redeemer
│ PASS [mem: 37448, cpu: 14343556] test_failed_hello_world_without_signer
┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1 tests | 1 passed | 0 failed

Summary 3 checks, 0 errors, 0 warnings
```

Kết quả này chứng minh rằng validator không chỉ xử lý đúng các giao dịch hợp lệ mà còn kiểm soát chặt chẽ dữ liệu đầu vào, đảm bảo rằng chỉ những hành động đúng với logic đã định nghĩa mới được chấp nhận. Đây là một yếu tố quan trọng giúp tăng tính an toàn và độ tin cậy của smart contract trong các ứng dụng thực tế.

##### ❌ Test case 3: Thiếu chữ ký (Missing Signer)

Trong test case test_failed_hello_world_without_signer, chúng ta mô phỏng một giao dịch không hợp lệ nhằm kiểm tra cơ chế xác thực quyền sở hữu của smart contract. Cụ thể, Datum vẫn được khởi tạo với owner hợp lệ thông qua mock_pub_key_hash(0), và Redeemer cũng chứa đúng thông điệp "Hello, World!", hoàn toàn thỏa mãn điều kiện về dữ liệu đầu vào.

```aiken
test test_failed_hello_world_without_signer() {
  let datum = Some(Datum { owner: mock_pub_key_hash(0) })
  let redeemer = Redeemer { msg: "Hello, World!" }
  let tx = mock_tx(False)
  !hello_world.spend(datum, redeemer, mock_utxo_ref(0, 0), tx)
}
```

Tuy nhiên, điểm khác biệt quan trọng nằm ở transaction. Thay vì sử dụng mock_tx(True), test case này sử dụng mock_tx(False), tức là transaction không chứa chữ ký của owner trong danh sách extra_signatories. Điều này mô phỏng tình huống một người không có quyền cố gắng tiêu UTxO.

Khi hàm hello_world.spend được thực thi, validator sẽ kiểm tra lần lượt các điều kiện. Mặc dù nội dung của Redeemer là hợp lệ, nhưng khi đến bước xác minh chữ ký, điều kiện must_be_signed sẽ trả về false do không tìm thấy chữ ký của owner trong transaction. Kết quả là toàn bộ biểu thức logic trả về false, và giao dịch bị từ chối.

Tương tự như test case trước, toán tử ! được sử dụng: `!hello_world.spend(...)`

Điều này thể hiện rằng test kỳ vọng giao dịch phải thất bại. Khi validator từ chối giao dịch (trả về false), biểu thức !false sẽ trở thành true, và test được đánh dấu là PASS.

Test case này đóng vai trò rất quan trọng trong việc xác minh tính bảo mật của smart contract. Nó đảm bảo rằng chỉ có chủ sở hữu thực sự mới có quyền tiêu UTxO, từ đó ngăn chặn các hành vi truy cập trái phép hoặc giả mạo giao dịch. Khi kết hợp với các test case khác, nó giúp chứng minh rằng contract không chỉ hoạt động đúng trong điều kiện hợp lệ mà còn xử lý chính xác các tình huống vi phạm, đảm bảo tính toàn vẹn và an toàn của hệ thống.

Sau khi chạy lệnh:

```bash
aiken check
```

kết quả cho thấy test test_failed_hello_world_incorrect_redeemer được đánh dấu PASS, xác nhận rằng smart contract đã hoạt động đúng khi từ chối giao dịch có Redeemer không hợp lệ. Đồng thời, các test khác cũng PASS và không có lỗi hay cảnh báo nào:

```bash
Testing ...

┍━ helloworld ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│ PASS [mem: 60764, cpu: 24461890] test_hello_world
│ PASS [mem: 13842, cpu:  5861155] test_failed_hello_world_incorrect_redeemer
│ PASS [mem: 37448, cpu: 14343556] test_failed_hello_world_without_signer
┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1 tests | 1 passed | 0 failed

Summary 3 checks, 0 errors, 0 warnings
```

Kết quả này chứng minh rằng validator không chỉ xử lý đúng các giao dịch hợp lệ mà còn kiểm soát chặt chẽ dữ liệu đầu vào, đảm bảo rằng chỉ những hành động đúng với logic đã định nghĩa mới được chấp nhận. Đây là một yếu tố quan trọng giúp tăng tính an toàn và độ tin cậy của smart contract trong các ứng dụng thực tế.

#### Check & Build

Sau khi hoàn thành việc viết smart contract và các test case, bước tiếp theo là kiểm tra và biên dịch mã nguồn để đảm bảo rằng không có lỗi cú pháp hoặc logic nào tồn tại. Lệnh `aiken check` sẽ thực hiện toàn bộ quá trình này, bao gồm cả việc chạy các test case đã định nghĩa.

```bash
aiken check
```

Khi lệnh này được thực thi, Aiken sẽ tiến hành biên dịch smart contract, thu thập và chạy tất cả các test case. Kết quả trả về sẽ cho biết có bao nhiêu test đã được thực hiện, có bao nhiêu test thành công (PASS) và có bao nhiêu test thất bại (FAIL). Ngoài ra, nếu có lỗi cú pháp hoặc lỗi logic nào trong mã nguồn, chúng cũng sẽ được hiển thị rõ ràng để lập trình viên có thể dễ dàng xác định và sửa chữa.

```bash
      Testing ...

    ┍━ helloworld ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    │ PASS [mem: 60764, cpu: 24461890] test_hello_world
    │ PASS [mem: 13842, cpu:  5861155] test_failed_hello_world_incorrect_redeemer
    │ PASS [mem: 37448, cpu: 14343556] test_failed_hello_world_without_signer
    ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 3 tests | 3 passed | 0 failed


      Summary 3 checks, 0 errors, 0 warnings
```

Nếu tất cả các test case đều PASS và không có lỗi nào được phát hiện, điều này chứng tỏ rằng smart contract đã được xây dựng đúng logic và sẵn sàng để triển khai hoặc tích hợp vào các hệ thống lớn hơn như ứng dụng TipJar trên Hydra. Ngược lại, nếu có bất kỳ test nào thất bại hoặc có lỗi được phát hiện, lập trình viên sẽ cần phải xem xét lại mã nguồn, xác định nguyên nhân và thực hiện các sửa chữa cần thiết trước khi tiếp tục.

```aiken
aiken build
```

Lệnh `aiken build` sẽ tiến hành biên dịch mã nguồn của smart contract thành một định dạng có thể triển khai lên blockchain. Quá trình này sẽ kiểm tra lại toàn bộ mã nguồn để đảm bảo rằng không có lỗi nào tồn tại và tạo ra các file cần thiết cho việc triển khai. Nếu quá trình build thành công, bạn sẽ nhận được thông báo xác nhận và có thể tiếp tục với các bước triển khai hoặc tích hợp vào ứng dụng TipJar trên Hydra.

File build thành công sẽ được lưu trữ trong file `plutus.json` đã được biên dịch sẵn sàng để triển khai lên blockchain. Đây là bước quan trọng để đảm bảo rằng smart contract của bạn đã được chuẩn bị đúng cách và có thể hoạt động hiệu quả khi được triển khai.

### Offchain Logic và Tương tác với Smart Contract

Trong phần này, chúng ta sẽ tập trung vào việc xây dựng logic off-chain để tương tác với smart contract đã được phát triển ở phần trước. Off-chain logic đóng vai trò quan trọng trong việc tạo ra trải nghiệm người dùng mượt mà và hiệu quả, đồng thời giúp giảm tải cho blockchain bằng cách xử lý các tác vụ không cần thiết phải thực hiện trên-chain.

#### Thiết lập biến môi trường

Trong quá trình phát triển ứng dụng (đặc biệt là phần off-chain), việc sử dụng biến môi trường là rất quan trọng để quản lý các thông tin nhạy cảm như khóa API hoặc mnemonic của ví. Thay vì hard-code trực tiếp vào mã nguồn, chúng ta sẽ lưu các giá trị này trong file .env để đảm bảo tính bảo mật và dễ dàng cấu hình.

```.env
APP_MNEMONIC=""
BLOCKFROST_API_KEY=""
KOIOS_TOKEN=""
HYDRA_HTTP_URL=""
HYDRA_HTTP_URL_SUB=""
HYDRA_WS_URL=""
HYDRA_WS_URL_SUB=""
NEXT_PUBLIC_APP_NETWORK="preview"
IPFS_ENDPOINT=""
NEXT_PUBLIC_IPFS_GATEWAY=""
SPEND_ADDRESS=""
```

Để điền các giá trị này, trước hết bạn cần lấy thông tin từ các dịch vụ tương ứng. Biến APP_MNEMONIC dùng để lưu seed phrase của ví Cardano, cho phép ứng dụng ký giao dịch. Bạn có thể tạo ví bằng các ứng dụng như Nami Wallet hoặc Eternl. Đây là thông tin cực kỳ nhạy cảm và không bao giờ được chia sẻ công khai.

Biến BLOCKFROST_API_KEY được lấy từ Blockfrost sau khi tạo project, giúp ứng dụng truy vấn dữ liệu blockchain và gửi transaction. Trong khi đó, KOIOS_TOKEN được lấy từ Koios để sử dụng như một nguồn dữ liệu thay thế hoặc bổ sung.

Ngoài ra, các biến liên quan đến Hydra như HYDRA_HTTP_URL, HYDRA_WS_URL và các biến \_SUB được sử dụng để kết nối đến Hydra Head thông qua HTTP và WebSocket. Đây là thành phần quan trọng giúp ứng dụng TipJar xử lý giao dịch off-chain với tốc độ cao và chi phí thấp.

Các biến IPFS_ENDPOINT và IPFS_GATEWAY phục vụ cho việc lưu trữ và truy xuất dữ liệu phi tập trung (ví dụ metadata), trong khi SPEND_ADDRESS là địa chỉ smart contract hoặc ví nhận tiền tip. Biến NEXT_PUBLIC_APP_NETWORK cho phép bạn cấu hình môi trường mạng (preview, preprod hoặc mainnet), từ đó hệ thống có thể tự động xác định APP_NETWORK_ID tương ứng.

Tất cả các biến này sau đó được import và chuẩn hóa trong một module cấu hình như sau:

```ts
import { Network } from "@meshsdk/core";

const BLOCKFROST_API_KEY = process.env.BLOCKFROST_API_KEY || "";
const HYDRA_HTTP_URL = process.env.HYDRA_HTTP_URL || "";
const HYDRA_HTTP_URL_SUB = process.env.HYDRA_HTTP_URL_SUB || "";
const HYDRA_WS_URL = process.env.HYDRA_WS_URL || "";
const HYDRA_WS_URL_SUB = process.env.HYDRA_WS_URL_SUB || "";
const KOIOS_TOKEN = process.env.KOIOS_TOKEN || "";
const APP_NETWORK: Network =
  (process.env.NEXT_PUBLIC_APP_NETWORK?.toLowerCase() as Network) || "preview";
const APP_NETWORK_ID = APP_NETWORK === "mainnet" ? 1 : 0;
const IPFS_ENDPOINT = process.env.IPFS_ENDPOINT || "";
const IPFS_GATEWAY = process.env.NEXT_PUBLIC_IPFS_GATEWAY || "";
const SPEND_ADDRESS = process.env.SPEND_ADDRESS || "";
const APP_MNEMONIC = process.env.APP_MNEMONIC || "";

export {
  APP_NETWORK,
  HYDRA_HTTP_URL,
  APP_NETWORK_ID,
  BLOCKFROST_API_KEY,
  KOIOS_TOKEN,
  IPFS_ENDPOINT,
  IPFS_GATEWAY,
  HYDRA_WS_URL,
  SPEND_ADDRESS,
  HYDRA_HTTP_URL_SUB,
  HYDRA_WS_URL_SUB,
  APP_MNEMONIC,
};
```

Việc gom toàn bộ cấu hình vào một file giúp ứng dụng dễ dàng quản lý, tái sử dụng và chuyển đổi giữa các môi trường khác nhau mà không cần thay đổi logic code. Đây là một thực hành tốt trong phát triển phần mềm, đặc biệt quan trọng với các hệ thống blockchain như TipJar trên Hydra, nơi yêu cầu cao về bảo mật, tính linh hoạt và khả năng mở rộng.

#### Cài đặt thư viện và cấu hình dự án

Để xây dựng phần off-chain logic, chúng ta sẽ sử dụng Node.js cùng với một số thư viện hỗ trợ tương tác với blockchain Cardano. Đầu tiên, bạn cần khởi tạo một dự án Node.js mới và cài đặt các thư viện cần thiết.

```bash
bun i @meshsdk/core
```

Thư viện @meshsdk/core cung cấp các công cụ và API để tương tác với blockchain Cardano một cách dễ dàng. Nó hỗ trợ việc tạo và ký giao dịch, truy vấn dữ liệu từ blockchain, và nhiều tính năng khác giúp đơn giản hóa quá trình phát triển DApp. Sau khi cài đặt xong, bạn có thể bắt đầu xây dựng logic off-chain để tương tác với smart contract đã phát triển ở phần trước.

#### Thiết lập provider

Sau khi đã cấu hình các biến môi trường, bước tiếp theo trong phần off-chain là thiết lập provider để ứng dụng có thể giao tiếp với blockchain Cardano. Trong trường hợp này, chúng ta sử dụng BlockfrostProvider từ thư viện @meshsdk/core để kết nối đến dịch vụ Blockfrost.

```ts
import { BlockfrostProvider } from "@meshsdk/core";
import { BLOCKFROST_API_KEY } from "@/constants/enviroments.constant";

export const blockfrostProvider = new BlockfrostProvider(BLOCKFROST_API_KEY);
```

Đoạn code trên thực hiện việc khởi tạo một instance của BlockfrostProvider bằng cách truyền vào BLOCKFROST_API_KEY đã được cấu hình trong file .env. Provider này đóng vai trò như một cầu nối giữa ứng dụng và blockchain, cho phép thực hiện các thao tác như truy vấn UTxO, kiểm tra số dư ví, theo dõi giao dịch và gửi transaction mà không cần tự vận hành node Cardano.

Việc tách riêng provider thành một module giúp tái sử dụng dễ dàng trong toàn bộ ứng dụng, đồng thời đảm bảo cấu trúc code rõ ràng và dễ bảo trì. Trong các hệ thống thực tế như TipJar chạy trên Hydra, provider sẽ là thành phần cốt lõi để xử lý các tương tác off-chain, kết nối frontend hoặc backend với dữ liệu blockchain một cách hiệu quả và ổn định.

#### Cấu hình Adapter cho Cardano

Để tương tác với blockchain Cardano một cách hiệu quả, đặc biệt là trong bối cảnh ứng dụng TipJar chạy trên Hydra, chúng ta cần thiết lập một adapter để kết nối giữa ứng dụng và các dịch vụ blockchain. Adapter này sẽ giúp chúng ta thực hiện các thao tác như gửi giao dịch, truy vấn dữ liệu và theo dõi trạng thái của smart contract.

##### 🧱 Khởi tạo MeshAdapter và cấu hình hệ thống

Lớp MeshAdapter được thiết kế như một lớp trung gian giúp đơn giản hóa việc tương tác với blockchain Cardano thông qua Mesh SDK. Khi khởi tạo, class nhận vào một đối tượng MeshWallet, sau đó thiết lập các thành phần cần thiết như provider và transaction builder.

```ts
constructor({ meshWallet = null! }: { meshWallet: MeshWallet }) {
    this.meshWallet = meshWallet;
    this.fetcher = blockfrostProvider;

    this.meshTxBuilder = new MeshTxBuilder({
        fetcher: this.fetcher,
        evaluator: blockfrostProvider,
    });
}
```

Trong đó, blockfrostProvider đóng vai trò là cầu nối giúp ứng dụng giao tiếp với blockchain, còn MeshTxBuilder hỗ trợ xây dựng transaction một cách thuận tiện.

##### 📜 Xử lý và khởi tạo Plutus Script

Để tương tác với smart contract đã được phát triển ở phần on-chain, chúng ta cần khởi tạo Plutus Script trong adapter. Điều này cho phép chúng ta xây dựng các giao dịch phù hợp với logic của smart contract và đảm bảo rằng các tương tác off-chain có thể thực thi đúng cách trên blockchain.

```ts
this.spendAddress = serializeAddressObj(
  scriptAddress(
    deserializeAddress(
      serializePlutusScript(this.spendScript, undefined, APP_NETWORK_ID, false)
        .address,
    ).scriptHash,
    "",
    false,
  ),
  APP_NETWORK_ID,
);
```

Đoạn code trên thực hiện việc khởi tạo địa chỉ spendAddress từ Plutus Script đã được biên dịch. Quá trình này bao gồm việc serialize Plutus Script để lấy địa chỉ, sau đó deserialize để trích xuất script hash, và cuối cùng là tạo ra địa chỉ hợp lệ cho mạng lưới đang sử dụng (preview, preprod hoặc mainnet). Việc này đảm bảo rằng các giao dịch được xây dựng trong phần off-chain sẽ tương thích với smart contract đã phát triển ở phần on-chain, giúp ứng dụng TipJar hoạt động hiệu quả trên Hydra.

##### 💼 Chuẩn bị dữ liệu ví cho transaction

Để thực hiện các giao dịch trên blockchain Cardano, chúng ta cần chuẩn bị dữ liệu ví, bao gồm việc lấy thông tin về địa chỉ và số dư. Điều này giúp đảm bảo rằng khi người dùng muốn gửi tip hoặc tương tác với smart contract, chúng ta có đủ thông tin để xây dựng và ký giao dịch một cách chính xác.

```ts
protected getWalletForTx = async () => {
    const utxos = await this.meshWallet.getUtxos();

    const collaterals =
        (await this.meshWallet.getCollateral()).length === 0
            ? [await this.getCollateral()]
            : await this.meshWallet.getCollateral();

    const walletAddress = await this.meshWallet.getChangeAddress();

    if (!utxos || utxos.length === 0) throw new Error("No UTXOs found");
    if (!walletAddress) throw new Error("No wallet address found");

    return { utxos, collateral: collaterals[0], walletAddress };
};
```

Đoạn code trên định nghĩa một phương thức getWalletForTx, có nhiệm vụ lấy thông tin về UTxO, collateral và địa chỉ ví của người dùng. Phương thức này sử dụng MeshWallet để truy vấn dữ liệu từ ví, đảm bảo rằng chúng ta có đủ thông tin cần thiết để xây dựng giao dịch. Nếu không tìm thấy UTxO hoặc địa chỉ ví, phương thức sẽ ném ra lỗi, giúp đảm bảo rằng các bước tiếp theo trong quá trình xây dựng giao dịch sẽ không gặp sự cố do thiếu dữ liệu.

##### 🔍 Đọc validator từ Plutus JSON

Để tương tác với smart contract đã được biên dịch, chúng ta cần đọc validator từ file Plutus JSON. Điều này cho phép chúng ta xây dựng các giao dịch phù hợp với logic của smart contract và đảm bảo rằng các tương tác off-chain có thể thực thi đúng cách trên blockchain.

```ts
protected readValidator = function (plutus: Plutus, title: string): string {
    const validator = plutus.validators.find((v) => v.title === title);

    if (!validator) throw new Error(`${title} validator not found.`);

    return validator.compiledCode;
};
```

Đoạn code trên định nghĩa một phương thức readValidator, có nhiệm vụ tìm kiếm và trả về mã đã biên dịch của validator dựa trên tiêu đề (title) từ một đối tượng Plutus. Phương thức này sẽ kiểm tra xem validator có tồn tại trong danh sách validators hay không, nếu không sẽ ném ra lỗi. Việc này đảm bảo rằng chúng ta có thể truy cập đúng validator cần thiết để xây dựng giao dịch phù hợp với logic của smart contract đã phát triển ở phần on-chain, giúp ứng dụng TipJar hoạt động hiệu quả trên Hydra.

##### 📦 Truy vấn UTxO theo asset

Để xây dựng các giao dịch tương tác với smart contract, chúng ta cần có khả năng truy vấn UTxO dựa trên một asset cụ thể. Điều này giúp chúng ta xác định được các UTxO nào có chứa token hoặc tài sản mà chúng ta muốn sử dụng trong giao dịch, từ đó xây dựng các giao dịch chính xác và hiệu quả.

```ts
protected getAddressUTXOAsset = async (address: string, unit: string) => {
    const utxos = await this.fetcher.fetchAddressUTxOs(address, unit);
    return utxos[utxos.length - 1];
};
protected getAddressUTXOAssets = async (address: string, unit: string) => {
    return await this.fetcher.fetchAddressUTxOs(address, unit);
};
```

Đoạn code trên định nghĩa một phương thức getAddressUTXOAsset, có nhiệm vụ truy vấn các UTxO tại một địa chỉ cụ thể dựa trên một đơn vị tài sản (unit). Phương thức này sử dụng fetcher (trong trường hợp này là BlockfrostProvider) để lấy danh sách UTxO tại địa chỉ đó và lọc ra những UTxO chứa asset mà chúng ta quan tâm. Kết quả trả về là UTxO cuối cùng trong danh sách, giúp chúng ta xác định được nguồn tài sản để sử dụng trong giao dịch tương tác với smart contract đã phát triển ở phần on-chain, từ đó giúp ứng dụng TipJar hoạt động hiệu quả trên Hydra.

##### 💰 Lựa chọn collateral cho transaction

Trong quá trình xây dựng giao dịch trên blockchain Cardano, việc lựa chọn collateral là rất quan trọng để đảm bảo rằng giao dịch có thể được thực thi một cách an toàn và hiệu quả. Collateral là một loại tài sản được sử dụng để đảm bảo rằng nếu giao dịch không thành công (ví dụ như do lỗi trong smart contract), thì collateral sẽ bị mất thay vì mất tài sản chính của người dùng.

```ts
protected getCollateral = async (): Promise<UTxO> => {
    const utxos = await this.meshWallet.getUtxos();

    return utxos.filter((utxo) => {
        const amount = utxo.output.amount;
        return (
            Array.isArray(amount) &&
            amount.length === 1 &&
            amount[0].unit === "lovelace" &&
            Number(amount[0].quantity) >= 5_000_000
        );
    })[0];
};
```

Đoạn code trên định nghĩa một phương thức getCollateral, có nhiệm vụ lựa chọn một UTxO phù hợp để sử dụng làm collateral cho giao dịch. Phương thức này truy vấn tất cả các UTxO từ ví của người dùng và lọc ra những UTxO chỉ chứa lovelace (đơn vị tiền tệ cơ bản của Cardano) với số lượng tối thiểu là 5 triệu lovelace. Việc này đảm bảo rằng collateral đủ lớn để đảm bảo an toàn cho giao dịch, đồng thời giúp giảm thiểu rủi ro mất mát tài sản chính của người dùng trong trường hợp giao dịch không thành công khi tương tác với smart contract đã phát triển ở phần on-chain, từ đó giúp ứng dụng TipJar hoạt động hiệu quả trên Hydra.

#### Thiết lập TxBuilder và xây dựng giao dịch

Để xây dựng giao dịch tương tác với smart contract trên blockchain Cardano, chúng ta cần thiết lập một TxBuilder. TxBuilder giúp chúng ta tạo ra các giao dịch phức tạp một cách dễ dàng, bao gồm việc thêm inputs, outputs, và các tham số khác cần thiết để đảm bảo rằng giao dịch có thể được thực thi đúng cách trên blockchain.

##### 🧱 Tổng quan về MeshTxBuilder

Lớp MeshTxBuilder kế thừa từ MeshAdapter, do đó nó tận dụng toàn bộ các chức năng đã được xây dựng trước đó như quản lý wallet, UTxO, script và provider. Mục tiêu chính của class này là xây dựng transaction cho hai hành động quan trọng: khóa tài sản vào smart contract (lock) và mở khóa tài sản (unlock).

```ts
export class MeshTxBuilder extends MeshAdapter {}
```

Lớp MeshTxBuilder sẽ chứa các phương thức cụ thể để xây dựng giao dịch cho từng hành động, đồng thời sử dụng các công cụ và dữ liệu đã được chuẩn bị trong MeshAdapter để đảm bảo rằng các giao dịch được xây dựng một cách chính xác và hiệu quả.

##### 🔒 Chức năng Lock (Gửi tiền vào Smart Contract)

Chức năng lock trong MeshTxBuilder có nhiệm vụ xây dựng một giao dịch để gửi tài sản vào smart contract. Điều này thường được sử dụng khi người dùng muốn gửi tip vào TipJar trên Hydra, nơi tài sản sẽ được khóa trong smart contract cho đến khi có điều kiện mở khóa được thỏa mãn

```ts
lock = async (): Promise<string> => {
  const { utxos, collateral, walletAddress } = await this.getWalletForTx();

  const unsignedTx = this.meshTxBuilder
    .txOut(this.spendAddress, [
      {
        unit: "lovelace",
        quantity: "1000000",
      },
    ])
    .txOutDatumHashValue(
      mConStr0([deserializeAddress(walletAddress).pubKeyHash]),
    )
    .selectUtxosFrom(utxos)
    .changeAddress(walletAddress)
    .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
    .txInCollateral(
      collateral.input.txHash,
      collateral.input.outputIndex,
      collateral.output.amount,
      collateral.output.address,
    )
    .setNetwork(APP_NETWORK);

  return await unsignedTx.complete();
};
```

Đoạn code trên định nghĩa phương thức lock, có nhiệm vụ xây dựng một giao dịch để gửi tài sản vào smart contract. Phương thức này thực hiện các bước sau:

1. Lấy thông tin về UTxO, collateral và địa chỉ ví của người dùng thông qua phương thức getWalletForTx.
2. Sử dụng MeshTxBuilder để bắt đầu xây dựng giao dịch, thêm một output
   đến địa chỉ spendAddress (địa chỉ của smart contract) với một lượng lovelace cụ thể (ở đây là 1 triệu lovelace).
3. Thêm datum hash vào output để liên kết với dữ liệu cần thiết cho smart contract.
4. Chọn UTxO từ ví của người dùng để sử dụng làm input cho giao dịch.
5. Đặt địa chỉ nhận lại (change address) là địa chỉ ví của người dùng.
6. Yêu cầu chữ ký của người dùng thông qua requiredSignerHash.
7. Thêm collateral vào giao dịch để đảm bảo an toàn trong trường hợp giao dịch không thành công. Cuối cùng, phương thức hoàn thiện giao dịch và trả về transaction đã được xây dựng sẵn sàng để ký và gửi lên blockchain. Đây là bước quan trọng để đảm bảo rằng giao dịch được xây dựng đúng cách và có thể tương tác hiệu quả với smart contract đã phát triển ở phần on-chain, giúp ứng dụng TipJar hoạt động hiệu quả trên Hydra.

##### 🔓 Chức năng Unlock (Rút tiền từ Smart Contract)

Chức năng unlock trong MeshTxBuilder có nhiệm vụ xây dựng một giao dịch để rút tài sản từ smart contract. Điều này thường được sử dụng khi người dùng muốn nhận lại tip đã gửi vào TipJar trên Hydra, nơi tài sản sẽ được mở khóa và chuyển về ví của người dùng khi điều kiện mở khóa được thỏa mãn.

```ts
unlock = async (): Promise<string> => {
  const { utxos, collateral, walletAddress } = await this.getWalletForTx();
  const utxo = (await this.fetcher.fetchAddressUTxOs(this.spendAddress))[0];

  const unsignedTx = this.meshTxBuilder
    .spendingPlutusScript("V3")
    .txIn(
      utxo.input.txHash,
      utxo.input.outputIndex,
      utxo.output.amount,
      utxo.output.address,
    )
    .txInScript(this.spendScriptCbor)
    .txInRedeemerValue(mConStr0([stringToHex("Hello, World!")]))
    .txInInlineDatumPresent()
    .changeAddress(walletAddress)
    .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
    .selectUtxosFrom(utxos)
    .txInCollateral(
      collateral.input.txHash,
      collateral.input.outputIndex,
      collateral.output.amount,
      collateral.output.address,
    )
    .setNetwork(APP_NETWORK);

  return await unsignedTx.complete();
};
```

Đoạn code trên định nghĩa phương thức unlock, có nhiệm vụ xây dựng một giao dịch để rút tài sản từ smart contract. Phương thức này thực hiện các bước sau:

1. Lấy thông tin về UTxO, collateral và địa chỉ ví của người dùng thông qua phương thức getWalletForTx.
2. Truy vấn UTxO tại địa chỉ spendAddress (địa chỉ của smart contract) để xác định UTxO nào chứa tài sản cần rút.
3. Sử dụng MeshTxBuilder để bắt đầu xây dựng giao dịch, thêm một input từ UTxO đã xác định, đồng thời chỉ định rằng đây là một giao dịch spending từ Plutus Script.
4. Thêm script và redeemer vào input để đảm bảo rằng giao dịch có thể được thực thi đúng cách trên blockchain, với redeemer chứa thông điệp "Hello, World!" như yêu cầu của smart contract.
5. Đặt địa chỉ nhận lại (change address) là địa chỉ ví của người dùng.
6. Yêu cầu chữ ký của người dùng thông qua requiredSignerHash.
7. Thêm collateral vào giao dịch để đảm bảo an toàn trong trường hợp giao dịch không thành công. Cuối cùng, phương thức hoàn thiện giao dịch và trả về transaction đã được xây dựng sẵn sàng để ký và gửi lên blockchain. Đây là bước quan trọng để đảm bảo rằng giao dịch được xây dựng đúng cách và có thể tương tác hiệu quả với smart contract đã phát triển ở phần on-chain, giúp ứng dụng TipJar hoạt động hiệu quả trên Hydra.

## 🧪 Tổng quan kiểm thử Lock & Unlock

Đoạn code trên sử dụng jest để kiểm thử toàn bộ luồng hoạt động của smart contract, bao gồm hai hành động chính: lock (gửi tiền vào contract) và unlock (rút tiền ra khỏi contract). Đây là bước kiểm thử end-to-end, mô phỏng gần như đầy đủ cách ứng dụng hoạt động trong thực tế.

```ts
describe("This is testcase Lock and Unlock with Helloworld Validator", function () {});
```

Trong phần mô tả của describe, chúng ta sẽ định nghĩa các test case cụ thể để kiểm tra từng khía cạnh của chức năng lock và unlock. Mỗi test case sẽ tập trung vào một tình huống cụ thể, từ đó giúp xác minh rằng smart contract hoạt động đúng như mong đợi trong các điều kiện khác nhau.

### 🔑 Khởi tạo Wallet cho mỗi test

Để đảm bảo rằng mỗi test case được thực thi trong một môi trường độc lập và có thể tái tạo, chúng ta sẽ khởi tạo một ví mới cho mỗi test. Điều này giúp tránh tình trạng dữ liệu bị ảnh hưởng lẫn nhau giữa các test case, đồng thời đảm bảo rằng chúng ta có thể kiểm tra chính xác các hành động lock và unlock mà không bị ảnh hưởng bởi trạng thái của ví từ các test trước đó.

```ts
beforeEach(async function () {
  meshWallet = new MeshWallet({
    networkId: 0,
    fetcher: blockfrostProvider,
    submitter: blockfrostProvider,
    key: {
      type: "mnemonic",
      words: process.env.APP_MNEMONIC?.split(" ") || [],
    },
  });
});
```

Trong đoạn code trên, chúng ta sử dụng beforeEach để đảm bảo rằng trước mỗi test case, một instance mới của MeshWallet được khởi tạo với cấu hình phù hợp. Ví này sẽ sử dụng mnemonic được cấu hình trong biến môi trường APP_MNEMONIC để tạo ra các khóa cần thiết cho việc ký giao dịch. Việc này giúp đảm bảo rằng mỗi test case có một ví mới, độc lập và có thể tái tạo, từ đó giúp kiểm thử chính xác các chức năng lock và unlock của smart contract.

### ⏱️ Thiết lập thời gian chờ

Trong quá trình kiểm thử các chức năng liên quan đến blockchain, đặc biệt là khi tương tác với smart contract, thời gian chờ (timeout) có thể cần được điều chỉnh để đảm bảo rằng các giao dịch có đủ thời gian để được xử lý và xác nhận trên blockchain. Điều này đặc biệt quan trọng trong môi trường testnet hoặc khi sử dụng các dịch vụ như Blockfrost, nơi thời gian phản hồi có thể không ổn định.

```ts
jest.setTimeout(600000000);
```

Đoạn code trên sử dụng jest.setTimeout để thiết lập thời gian chờ cho toàn bộ các test case trong suite. Giá trị 600000000 milliseconds (tương đương với khoảng 166 giờ) được đặt để đảm bảo rằng các giao dịch có đủ thời gian để được xử lý và xác nhận trên blockchain, tránh tình trạng test bị thất bại do timeout khi giao dịch chưa kịp hoàn thành. Việc này giúp đảm bảo rằng chúng ta có thể kiểm thử chính xác các chức năng lock và unlock của smart contract mà không bị gián đoạn bởi các vấn đề liên quan đến thời gian phản hồi của blockchain.

### 🔒 Test case 1: Lock (Gửi tiền vào Smart Contract)

Trong test case test_lock, chúng ta sẽ kiểm tra chức năng lock của smart contract bằng cách xây dựng và gửi một giao dịch để khóa tài sản vào contract. Mục tiêu của test này là xác minh rằng giao dịch được xây dựng đúng cách, có thể được ký và gửi lên blockchain mà không gặp lỗi nào.

```ts
test("Lock", async function () {
  const meshTxBuilder: MeshTxBuilder = new MeshTxBuilder({
    meshWallet: meshWallet,
  });

  const unsignedTx: string = await meshTxBuilder.lock();

  const signedTx = await meshWallet.signTx(unsignedTx, true);
  const txHash = await meshWallet.submitTx(signedTx);

  await new Promise<void>(function (resolve, reject) {
    blockfrostProvider.onTxConfirmed(txHash, () => {
      console.log("https://preview.cexplorer.io/tx/" + txHash);
      resolve();
    });
  });
});
```

Đoạn code trên định nghĩa test case test_lock, trong đó chúng ta thực hiện các bước sau:

1. Khởi tạo một instance của MeshTxBuilder với ví đã được thiết lập.
2. Gọi phương thức lock để xây dựng một giao dịch chưa được ký.
3. Sử dụng ví để ký giao dịch và sau đó gửi giao dịch lên blockchain.
4. Sử dụng blockfrostProvider để theo dõi giao dịch và chờ cho đến khi giao dịch được xác nhận trên blockchain. Khi giao dịch được xác nhận, chúng ta sẽ in ra liên kết đến giao dịch trên explorer để kiểm tra. Mục tiêu của test này là đảm bảo rằng chức năng lock hoạt động đúng cách, cho phép người dùng gửi tài sản vào smart contract mà không gặp lỗi nào trong quá trình xây dựng, ký và gửi giao dịch.

Sau khi chạy lệnh:

```
bun test
```

Sau khi chạy lệnh `bun test`, chúng ta sẽ nhận được kết quả kiểm thử cho cả hai test case lock và unlock. Nếu cả hai test case đều PASS, điều này chứng tỏ rằng chức năng lock và unlock của smart contract hoạt động đúng cách, cho phép người dùng gửi và rút tài sản một cách hiệu quả mà không gặp lỗi nào trong quá trình xây dựng, ký và gửi giao dịch lên blockchain. Kết quả này cũng giúp xác minh rằng smart contract đã được triển khai đúng logic và có thể tương tác hiệu quả với ứng dụng TipJar trên Hydra.

```bash
🚀 Starting Lock Transaction...
📝 Unsigned TX: <hex...>
✍️ Signed TX: <hex...>
📤 Submitted TX Hash: abc123...

✅ Lock Transaction Confirmed!
🔗 Explorer: https://preview.cexplorer.io/tx/abc123...
```

Kiểm tra trên Explorer sẽ cho thấy chi tiết về giao dịch, bao gồm các input, output, datum, redeemer và trạng thái của giao dịch. Điều này giúp chúng ta xác minh rằng giao dịch đã được xây dựng đúng cách và tương tác chính xác với smart contract đã phát triển ở phần on-chain, từ đó đảm bảo rằng ứng dụng TipJar hoạt động hiệu quả trên Hydra.

### 🔓 Test case 2: Unlock (Rút tiền từ Smart Contract)

Trong test case test_unlock, chúng ta sẽ kiểm tra chức năng unlock của smart contract bằng cách xây dựng và gửi một giao dịch để rút tài sản từ contract. Mục tiêu của test này là xác minh rằng giao dịch được xây dựng đúng cách, có thể được ký và gửi lên blockchain mà không gặp lỗi nào, đồng thời đảm bảo rằng tài sản được rút thành công khi điều kiện mở khóa được thỏa mãn.

```ts
test("Un Lock", async function () {
  const meshTxBuilder: MeshTxBuilder = new MeshTxBuilder({
    meshWallet: meshWallet,
  });

  const unsignedTx: string = await meshTxBuilder.unlock();

  const signedTx = await meshWallet.signTx(unsignedTx, true);
  const txHash = await meshWallet.submitTx(signedTx);

  await new Promise<void>(function (resolve, reject) {
    blockfrostProvider.onTxConfirmed(txHash, () => {
      console.log("https://preview.cexplorer.io/tx/" + txHash);
      resolve();
    });
  });
});
```

Đoạn code trên định nghĩa test case test_unlock, trong đó chúng ta thực hiện các bước sau:

1. Khởi tạo một instance của MeshTxBuilder với ví đã được thiết lập.
2. Gọi phương thức unlock để xây dựng một giao dịch chưa được ký nhằm rút tài sản từ smart contract.
3. Sử dụng ví để ký giao dịch và sau đó gửi giao dịch lên blockchain.
4. Sử dụng blockfrostProvider để theo dõi giao dịch và chờ cho đến khi giao dịch được xác nhận trên blockchain. Khi giao dịch được xác nhận, chúng ta sẽ in ra liên kết đến giao dịch trên explorer để kiểm tra. Mục tiêu của test này là đảm bảo rằng chức năng unlock hoạt động đúng cách, cho phép người dùng rút tài sản từ smart contract khi điều kiện mở khóa được thỏa mãn, đồng thời không gặp lỗi nào trong quá trình xây dựng, ký và gửi giao dịch.

Sau khi chạy lệnh:

```
bun test
```

Sau khi chạy lệnh `bun test`, chúng ta sẽ nhận được kết quả kiểm thử cho cả hai test case lock và unlock. Nếu cả hai test case đều PASS, điều này chứng tỏ rằng chức năng lock và unlock của smart contract hoạt động đúng cách, cho phép người dùng gửi và rút tài sản một cách hiệu quả mà không gặp lỗi nào trong quá trình xây dựng, ký và gửi giao dịch lên blockchain. Kết quả này cũng giúp xác minh rằng smart contract đã được triển khai đúng logic và có thể tương tác hiệu quả với ứng dụng TipJar trên Hydra.

```bash
🚀 Starting Lock Transaction...
📝 Unsigned TX: <hex...>
✍️ Signed TX: <hex...>
📤 Submitted TX Hash: abc123...

✅ Lock Transaction Confirmed!
🔗 Explorer: https://preview.cexplorer.io/tx/abc123...

🚀 Starting Unlock Transaction...
📝 Unsigned TX: <hex...>
✍️ Signed TX: <hex...>
📤 Submitted TX Hash: xyz789...

✅ Unlock Transaction Confirmed!
🔗 Explorer: https://preview.cexplorer.io/tx/xyz789...
```

Kiểm tra trên Explorer sẽ cho thấy chi tiết về giao dịch, bao gồm các input, output, datum, redeemer và trạng thái của giao dịch. Điều này giúp chúng ta xác minh rằng giao dịch đã được xây dựng đúng cách và tương tác chính xác với smart contract đã phát triển ở phần on-chain, từ đó đảm bảo rằng ứng dụng TipJar hoạt động hiệu quả trên Hydra.

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
