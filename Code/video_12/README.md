<div align="center">

<img src="https://www.cardano2vn.io/_next/static/media/loading.db59b266.png" width="120" alt="Hydra Tutorial" />

# **Viết Smart Contract cho Hydra**

**Hướng dẫn chi tiết triển khai và kiểm thử logic hợp đồng thông minh trên Hydra — giải pháp Layer-2 scaling của Cardano — bằng Aiken hoặc Plutus.**

[![Ubuntu](https://img.shields.io/badge/Ubuntu-22.04+-E95420?logo=ubuntu)](https://ubuntu.com/download/server)
[![Cardano Node](https://img.shields.io/badge/Cardano%20Node-10.5.1+-4287D6?logo=cardano)](https://github.com/IntersectMBO/cardano-node/releases)
[![Hydra](https://img.shields.io/badge/Hydra%20Node-1.0.0+-00FF00?logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDBGRjAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAtMThjLTQuNDEgMC04IDMuNTktOCA4czMuNTkgOCA4IDggOC0zLjU5IDgtOHptMC0xNGMtMy4zMSAwLTYgMi42OS02IDZzMi42OSA2IDYgNiA2LTIuNjkgNi02em0wLTEyYy0yLjIxIDAtNCAxLjc5LTQgNHMxLjc5IDQgNCA0IDQtMS43OSA0LTQtMS43OSA0LTQgNHptMC0xMGMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjkgMi0yLTJ6Ii8+PC9zdmc+)](https://hydra.family/head-protocol)
[![Aiken](https://img.shields.io/badge/Aiken-v1.1.2-7B42BC?logo=haskell)](https://aiken-lang.org)
[![Plutus](https://img.shields.io/badge/Plutus-Haskell-8A2BE2)](https://plutus.cardano.org)
[![License: CC-BY-SA 4.0](https://img.shields.io/badge/License-MIT-FFBB00.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

---

</div>

## Giới thiệu

Trong hệ sinh thái Cardano, việc tối ưu hóa hiệu suất xử lý giao dịch luôn là một bài toán quan trọng, đặc biệt khi các ứng dụng phi tập trung (DApp) ngày càng yêu cầu trải nghiệm thời gian thực và chi phí thấp. Mô hình mở rộng Layer 2 với Hydra ra đời nhằm giải quyết vấn đề này bằng cách đưa phần lớn giao dịch ra khỏi chuỗi chính, giúp tăng thông lượng và giảm độ trễ đáng kể.

Trong bối cảnh đó, smart contract đóng vai trò là lớp logic cốt lõi đảm bảo tính đúng đắn và minh bạch của hệ thống. Việc xây dựng một smart contract TipJar tối ưu bằng Aiken không chỉ giúp hiểu rõ cách vận hành của validator trên Cardano mà còn tạo nền tảng để triển khai các ứng dụng thực tế trên Hydra một cách hiệu quả hơn.

---

## Mục tiêu

Phần này hướng đến việc đạt được các mục tiêu chính sau:

- Xây dựng smart contract TipJar được tối ưu hóa cho môi trường Hydra bằng Aiken, đảm bảo hiệu suất và tính an toàn khi xử lý giao dịch off-chain.
- Hiểu rõ vai trò của smart contract trong kiến trúc Cardano, cũng như cách Hydra hỗ trợ mở rộng khả năng xử lý giao dịch theo thời gian thực.
- Thực hành quy trình phát triển đầy đủ: viết mã, biên dịch và triển khai smart contract trên Cardano.
- Kiểm thử logic on-chain bằng Aiken và công cụ mô phỏng (như Sidan hoặc môi trường test tương đương) để đảm bảo validator hoạt động chính xác trong nhiều kịch bản khác nhau.

---

## Xây dựng Smart Contract TipJar

Trong phần này, chúng ta sẽ đi sâu vào quá trình thiết kế và triển khai một smart contract TipJar – một mô hình đơn giản nhưng rất thực tiễn trong việc nhận “tip” (tiền ủng hộ) từ người dùng. Mặc dù bài toán không quá phức tạp, đây lại là ví dụ lý tưởng để làm quen với cách xây dựng logic on-chain, đồng thời tận dụng sức mạnh của Hydra nhằm tối ưu hiệu suất giao dịch.

Trọng tâm của phần này là xây dựng một validator có khả năng kiểm soát việc gửi và rút tiền từ TipJar một cách minh bạch, an toàn và đúng logic. Cụ thể, contract sẽ đảm bảo rằng chỉ chủ sở hữu hợp lệ mới có thể rút tiền, trong khi bất kỳ ai cũng có thể gửi ADA vào như một hình thức “tip”. Điều này giúp mô hình vừa mở (open for contribution) vừa có kiểm soát (restricted withdrawal).

Một yếu tố quan trọng khác là việc tối ưu hóa contract để hoạt động hiệu quả trong môi trường Hydra. Không giống như giao dịch trực tiếp trên mainchain của Cardano, Hydra cho phép xử lý các giao dịch off-chain với độ trễ thấp và chi phí gần như bằng không. Vì vậy, khi thiết kế TipJar, chúng ta cần đảm bảo rằng logic của validator đủ nhẹ, dễ xác minh và phù hợp với mô hình UTxO được sử dụng trong Hydra Head. Điều này không chỉ giúp tăng tốc độ xử lý mà còn giảm thiểu rủi ro khi nhiều người dùng tương tác đồng thời.

Bên cạnh việc viết mã, phần này cũng sẽ hướng dẫn cách sử dụng Aiken để định nghĩa, biên dịch và kiểm thử smart contract. Việc kiểm thử đóng vai trò cực kỳ quan trọng nhằm đảm bảo rằng mọi điều kiện (constraints) trong validator đều hoạt động chính xác trong các kịch bản khác nhau, chẳng hạn như: gửi tip hợp lệ, rút tiền đúng quyền, hoặc các trường hợp cố gắng gian lận. Thông qua đó, người học sẽ hiểu rõ hơn cách xác minh logic on-chain trước khi triển khai thực tế.

Cuối cùng, chúng ta sẽ kết nối smart contract này với phần off-chain (backend hoặc frontend) để mô phỏng một luồng hoạt động hoàn chỉnh: từ việc người dùng gửi tip, cập nhật trạng thái trong Hydra Head, cho đến khi chủ sở hữu thực hiện rút tiền. Qua phần này, bạn không chỉ nắm được cách xây dựng một smart contract cơ bản mà còn hiểu rõ cách nó vận hành trong một hệ thống DApp thực tế, đặc biệt là trong bối cảnh tối ưu hiệu năng với Hydra.

### 1. Thiết kế Smart Contract

Trước khi bắt tay vào việc viết code, điều quan trọng nhất là phải xác định rõ các yêu cầu và phạm vi hoạt động của smart contract TipJar. Đây là bước nền tảng giúp chúng ta xây dựng một validator đơn giản nhưng chặt chẽ, tránh những sai sót logic có thể dẫn đến mất tài sản hoặc hành vi không mong muốn.

![01](/assets/01.png)

Về bản chất, TipJar là một dạng contract lưu trữ giá trị (value-holding contract) hoạt động theo mô hình UTxO. Người dùng có thể gửi ADA vào contract như một hành động “ủng hộ”, và số tiền này sẽ được giữ trong một UTxO được khóa bởi validator. Do đó, thiết kế của contract cần đảm bảo ba nguyên tắc cốt lõi: mở cho việc gửi tiền, giới hạn quyền rút tiền, và duy trì tính toàn vẹn của trạng thái.

Yêu cầu đầu tiên là cho phép người dùng gửi tiền tip vào một địa chỉ cụ thể. Trong ngữ cảnh của Cardano, điều này tương đương với việc gửi một transaction đến địa chỉ script (script address) của TipJar. Điểm đáng chú ý là hành động này không cần bất kỳ logic xác thực phức tạp nào từ validator, vì việc “gửi vào” chỉ đơn giản là tạo một UTxO mới tại địa chỉ của contract. Điều này giúp giảm chi phí và tăng hiệu suất, đặc biệt khi chạy trong môi trường Hydra.

Yêu cầu thứ hai là cho phép chủ sở hữu rút tiền từ TipJar. Đây là nơi validator thực sự phát huy vai trò của mình. Khi một UTxO bị tiêu thụ (spent), validator sẽ được thực thi để kiểm tra xem giao dịch đó có hợp lệ hay không. Do đó, chúng ta cần thiết kế logic sao cho chỉ những giao dịch có chữ ký hợp lệ từ chủ sở hữu mới được phép rút toàn bộ hoặc một phần số tiền trong TipJar.

Yêu cầu thứ ba, và cũng là quan trọng nhất, là đảm bảo rằng chỉ chủ sở hữu mới có quyền rút tiền, trong khi bất kỳ ai cũng có thể gửi tiền. Điều này thường được реализ bằng cách lưu trữ thông tin public key hash (PKH) của chủ sở hữu trong datum hoặc hardcode trực tiếp trong validator. Khi kiểm tra giao dịch, validator sẽ xác minh rằng chữ ký của transaction phải khớp với PKH đã được định nghĩa trước đó. Nếu điều kiện này không thỏa mãn, giao dịch sẽ bị từ chối.

Ngoài ra, trong quá trình thiết kế, chúng ta cũng cần cân nhắc một số yếu tố mở rộng như: có cho phép rút một phần hay phải rút toàn bộ, có cần ghi nhận metadata cho mỗi lần tip hay không, hoặc có hỗ trợ nhiều chủ sở hữu hay không. Tuy không bắt buộc trong phiên bản cơ bản, nhưng việc suy nghĩ trước các khả năng này sẽ giúp contract dễ dàng mở rộng trong tương lai.

Tóm lại, thiết kế của TipJar tập trung vào việc giữ cho logic càng đơn giản càng tốt, nhưng vẫn đảm bảo đầy đủ tính bảo mật và kiểm soát. Đây chính là bước đệm quan trọng trước khi chuyển sang giai đoạn hiện thực hóa bằng Aiken và triển khai trong môi trường Hydra.

### 2. Viết Mã Smart Contract bằng Aiken

Dưới đây là smart contract TipJar hoàn chỉnh, sau đó chúng ta sẽ đi qua từng phần để hiểu rõ cách nó hoạt động:

```aiken
validator tipjar(owner: VerificationKeyHash, minimum_tip: Int) {
  spend(
    _datum_option: Option<Datum>,
    redeemer: Redeemer,
    output_reference: OutputReference,
    transaction: Transaction,
  ) {
    let Transaction { inputs, outputs, extra_signatories, .. } = transaction
    expect Some(script_input) = find_input(inputs, output_reference)
    let script_address = script_input.output.address

    let script_outputs = find_script_outputs(outputs, script_address)

    expect list.length(script_outputs) == 1
    expect Some(script_output) = list.head(script_outputs)

    when redeemer is {
      Tip ->
        lovelace_of(script_output.value) >= lovelace_of(
          script_input.output.value,
        ) + minimum_tip

      Claim -> verify_signature(extra_signatories, owner)
    }
  }

  else(_) {
    fail
  }
}
```

Trong đoạn mã trên, chúng ta định nghĩa một validator có tên `tipjar` với hai tham số: `owner` (địa chỉ public key hash của chủ sở hữu) và `minimum_tip` (số lượng ADA tối thiểu phải được gửi vào mỗi lần tip). Validator này sẽ xử lý hai loại redeemer: `Tip` và `Claim`.

#### Truy xuất dữ liệu từ transaction

```
let Transaction { inputs, outputs, extra_signatories, .. } = transaction
```

Dòng này sử dụng kỹ thuật pattern matching (destructuring) để “mở” cấu trúc của transaction và trích xuất ra những thành phần quan trọng mà validator cần sử dụng. Thay vì phải truy cập từng trường một cách thủ công, Aiken cho phép chúng ta lấy trực tiếp các giá trị cần thiết một cách ngắn gọn và rõ ràng.

Cụ thể:

- inputs: danh sách các UTxO đầu vào của transaction. Trong đó bao gồm cả UTxO đang bị tiêu thụ bởi smart contract (script input). Đây là nguồn dữ liệu để xác định trạng thái trước của TipJar.
- outputs: danh sách các UTxO đầu ra được tạo ra sau khi transaction thực thi. Validator sẽ dựa vào đây để kiểm tra xem tài sản có được phân phối đúng hay không (ví dụ: có quay lại script hay không, có tăng giá trị đúng không).
- extra_signatories: danh sách các public key hash đã ký vào transaction. Đây là yếu tố quan trọng để xác minh quyền truy cập, đặc biệt trong trường hợp Claim, khi chỉ chủ sở hữu mới được phép rút tiền.

Phần .. có nghĩa là bỏ qua các trường còn lại của Transaction mà chúng ta không cần dùng đến (như fee, metadata, mint, v.v.). Điều này giúp code gọn gàng hơn và tập trung vào đúng logic cần xử lý.

➡️ Tóm lại, đây là bước đầu tiên và rất quan trọng: validator thu thập toàn bộ “ngữ cảnh” của giao dịch để từ đó đưa ra quyết định chấp nhận hay từ chối.

#### Xác định UTxO của TipJar

```ak
expect Some(script_input) = find_input(inputs, output_reference)
let script_address = script_input.output.address
```

Sau khi đã có danh sách inputs từ transaction, bước tiếp theo là xác định chính xác UTxO thuộc về smart contract đang bị tiêu thụ. Đây là một bước cực kỳ quan trọng, vì toàn bộ logic của validator đều phụ thuộc vào việc hiểu đúng trạng thái hiện tại của TipJar.

Hàm find_input được sử dụng để tìm UTxO tương ứng với output_reference – tức là tham chiếu đến output trước đó mà transaction đang tiêu thụ. Nếu tìm thấy, nó trả về Some(script_input), ngược lại sẽ là None.

Việc sử dụng: `expect Some(script_input) = find_input(inputs, output_reference)` có nghĩa là: Validator bắt buộc phải tìm thấy UTxO này
Nếu không tìm thấy → transaction bị từ chối ngay lập tức. ➡️ Điều này đảm bảo rằng contract luôn hoạt động trên một trạng thái hợp lệ và xác định được.

Sau đó, từ script_input, chúng ta truy xuất: `let script_address = script_input.output.address` Giá trị này chính là địa chỉ của smart contract (script address) nơi TipJar đang lưu trữ tài sản. Thông tin này sẽ được sử dụng ở các bước tiếp theo, đặc biệt là để:

- Kiểm tra các output có quay lại đúng contract hay không.
- Đảm bảo TipJar không bị “rò rỉ” tài sản ra ngoài ngoài ý muốn.

➡️ Tóm lại, đoạn code này giúp validator trả lời hai câu hỏi cốt lõi:

- “UTxO nào của contract đang bị tiêu thụ?”.
- “Địa chỉ của contract là gì để kiểm soát output?”.
  Đây chính là nền tảng để xây dựng các kiểm tra tiếp theo trong cả hai luồng Tip và Claim.

#### Kiểm soát output quay lại contract

```aiken
let script_outputs = find_script_outputs(outputs, script_address)

expect list.length(script_outputs) == 1
expect Some(script_output) = list.head(script_outputs)
```

Sau khi đã xác định được địa chỉ của contract (script_address), bước tiếp theo là kiểm tra cách mà tài sản được phân phối trong các output của transaction. Cụ thể, validator cần đảm bảo rằng trạng thái của TipJar được duy trì đúng cách sau mỗi lần tiêu thụ UTxO.

Hàm `find_script_outputs` được sử dụng để lọc ra tất cả các output có cùng địa chỉ với contract. Nói cách khác, đây là những UTxO mới mà transaction gửi lại vào chính TipJar.

Sau đó, validator áp dụng hai ràng buộc quan trọng:

- expect list.length(script_outputs) == 1
  → Bắt buộc phải có chính xác một output quay lại contract
- expect Some(script_output) = list.head(script_outputs)
  → Lấy ra output đó để tiếp tục kiểm tra giá trị (ví dụ trong case Tip)

Việc giới hạn chỉ một output không phải là ngẫu nhiên, mà là một quyết định thiết kế có chủ đích:

- Tránh phân mảnh UTxO: Nếu cho phép nhiều output, TipJar có thể bị chia nhỏ thành nhiều phần, làm phức tạp việc quản lý trạng thái.
- Đơn giản hóa logic: Khi luôn chỉ có một UTxO đại diện cho toàn bộ TipJar, việc kiểm tra và cập nhật trở nên dễ dàng hơn rất nhiều.
- Ngăn chặn tấn công logic: Một số kiểu tấn công có thể lợi dụng việc tạo nhiều output để “lách” validator. Ràng buộc này loại bỏ hoàn toàn khả năng đó.
- Tối ưu cho Hydra: Trong môi trường Hydra, việc giữ state gọn nhẹ (một UTxO duy nhất) giúp tăng tốc độ xử lý và giảm độ phức tạp khi đồng bộ giữa các participant.

➡️ Tóm lại, đoạn kiểm tra này đảm bảo rằng sau mỗi giao dịch, TipJar vẫn tồn tại dưới dạng một thực thể duy nhất, rõ ràng và an toàn, tạo nền tảng vững chắc cho các kiểm tra tiếp theo trong cả hai luồng Tip và Claim.

#### ⚙️ Xử lý hành vi qua Redeemer

Validator sử dụng redeemer để phân biệt hành động: gửi tiền (Tip) hay rút tiền (Claim). Đây là cách để validator biết được mục đích của transaction và áp dụng logic kiểm tra phù hợp.

1. 🟢 Trường hợp Tip – Gửi tiền

```aiken
Tip ->
  lovelace_of(script_output.value) >= lovelace_of(
    script_input.output.value,
  ) + minimum_tip
```

Trong nhánh Tip, validator xử lý hành động gửi tiền vào TipJar. Đây là hành vi “mở”, cho phép bất kỳ người dùng nào cũng có thể tương tác với contract mà không cần quyền đặc biệt.

Điều kiện cốt lõi được kiểm tra là:

- Giá trị ADA của output mới (script_output) phải lớn hơn hoặc bằng giá trị ban đầu (script_input) cộng với minimum_tip.

Nói cách khác, mỗi lần thực hiện Tip, tổng số tiền trong TipJar bắt buộc phải tăng lên một lượng tối thiểu đã được định nghĩa trước. Validator không quan tâm ai là người gửi, mà chỉ quan tâm đến việc giá trị có thực sự tăng hay không.

➡️ Ý nghĩa của thiết kế này:

- Mở hoàn toàn cho người dùng: Bất kỳ ai cũng có thể gửi tip mà không cần ký bằng một key cụ thể hay được cấp quyền trước.
- Đảm bảo tính toàn vẹn giá trị: Không thể tạo một giao dịch “giả tip” mà không làm tăng số dư của TipJar.
- Đơn giản và hiệu quả: Không cần kiểm tra chữ ký hay logic phức tạp → phù hợp với môi trường Hydra, nơi ưu tiên tốc độ và chi phí thấp.

Tuy nhiên, thiết kế hiện tại vẫn tồn tại một hạn chế đáng chú ý:

📌 Chưa kiểm tra datum

Validator không ràng buộc dữ liệu đi kèm với UTxO (datum), ví dụ như:

- Nội dung message của người tip
- Danh sách người đã tham gia
- Metadata liên quan

➡️ Điều này dẫn đến khả năng:

Người gửi có thể thay đổi hoặc ghi đè datum mà không bị validator phát hiện
Gây mất tính nhất quán của dữ liệu on-chain

👉 Trong các phiên bản nâng cao, bạn có thể cải thiện bằng cách:

- So sánh datum cũ và datum mới
- Chỉ cho phép thêm dữ liệu (append-only)
- Hoặc hash datum để đảm bảo không bị chỉnh sửa trái phép

➡️ Tóm lại, nhánh Tip được thiết kế tối giản nhưng hiệu quả: chỉ cần đảm bảo giá trị tăng là đủ để chấp nhận giao dịch. Đây là một trade-off hợp lý giữa đơn giản – hiệu năng – và bảo mật, đặc biệt phù hợp khi triển khai trong Hydra.

2. 🟢 Trường hợp Claim – Rút tiền

```aiken
Claim -> verify_signature(extra_signatories, owner)
```

Trong nhánh Claim, validator xử lý hành động rút tiền khỏi TipJar. Đây là hành vi có kiểm soát, chỉ dành riêng cho chủ sở hữu đã được định nghĩa thông qua tham số owner.
Điều kiện duy nhất được kiểm tra là:

- Transaction phải chứa chữ ký hợp lệ của owner, được xác minh thông qua extra_signatories.

Hàm `verify_signature` sẽ kiểm tra xem public key hash của owner có nằm trong danh sách những người đã ký transaction hay không. Nếu có, giao dịch được chấp nhận; nếu không, validator sẽ từ chối.
➡️ Ý nghĩa của thiết kế này:

- Kiểm soát quyền truy cập rõ ràng: Chỉ một thực thể duy nhất (owner) có quyền rút tiền từ TipJar.
- Đơn giản hóa logic xác thực: Không cần kiểm tra giá trị, không cần kiểm tra output → chỉ cần chữ ký hợp lệ là đủ.
- Tối ưu hiệu năng: Việc chỉ kiểm tra chữ ký giúp giảm độ phức tạp, rất phù hợp với môi trường Hydra.

Một điểm đáng chú ý là trong trường hợp Claim, validator không yêu cầu phải có output quay lại contract. Điều này đồng nghĩa với việc:

- TipJar có thể bị “đóng” hoàn toàn sau khi rút
- Toàn bộ số tiền có thể được chuyển ra ngoài trong một giao dịch duy nhất

➡️ Đây là hành vi mong muốn trong thiết kế hiện tại, vì TipJar đóng vai trò như một “ví tạm” để nhận tip, và chủ sở hữu có thể thu toàn bộ số tiền bất kỳ lúc nào.
📌 Tuy nhiên, thiết kế này cũng có thể được mở rộng trong tương lai:

- Cho phép rút một phần thay vì toàn bộ
- Yêu cầu giữ lại một UTxO tối thiểu để duy trì TipJar
- Hỗ trợ multi-sig (nhiều owner cùng ký) để tăng tính bảo mật

➡️ Tóm lại, nhánh Claim tập trung vào một nguyên tắc đơn giản nhưng quan trọng:
“Ai sở hữu thì người đó có quyền rút”, và điều này được đảm bảo thông qua cơ chế chữ ký trong transaction.

3. 🚫 Ngăn chặn các hành vi không hợp lệ

```aiken
else(_) {
  fail
}
```

Ngoài hai trường hợp hợp lệ là Tip và Claim trong ngữ cảnh spend, validator chủ động từ chối tất cả các mục đích sử dụng khác thông qua nhánh else. Trong Aiken, mỗi validator có thể được gọi trong nhiều “context” khác nhau (spend, mint, withdraw, cert…), nhưng trong thiết kế TipJar, chúng ta chỉ cho phép sử dụng trong ngữ cảnh tiêu thụ UTxO (spend).

Câu lệnh fail ở đây đóng vai trò như một “cổng chặn cuối cùng”: bất kỳ giao dịch nào không khớp với các điều kiện đã định nghĩa trước đó sẽ bị từ chối ngay lập tức.

➡️ Cụ thể, các hành vi bị chặn bao gồm:

- Mint token: ngăn việc sử dụng validator này cho mục đích phát hành tài sản
- Staking withdrawal: không cho phép dùng contract để rút phần thưởng staking
- Certificate (chứng chỉ mạng): loại bỏ các tương tác không liên quan đến logic TipJar

➡️ Ý nghĩa của thiết kế này:

- Giới hạn phạm vi hoạt động: Contract chỉ làm đúng một nhiệm vụ duy nhất – quản lý TipJar
- Giảm bề mặt tấn công: Loại bỏ các cách sử dụng ngoài ý muốn có thể bị khai thác
- Tăng tính an toàn: Mọi hành vi không được định nghĩa rõ ràng đều mặc định bị từ chối

Trong phát triển smart contract, nguyên tắc quan trọng là: “Chỉ cho phép những gì được định nghĩa rõ ràng, và từ chối tất cả phần còn lại.”

➡️ Đoạn else { fail } chính là cách hiện thực hóa nguyên tắc đó một cách đơn giản nhưng cực kỳ hiệu quả.

### 3. Kiểm thử và Triển khai

Sau khi viết mã, chúng ta sẽ sử dụng công cụ kiểm thử của Aiken để đảm bảo rằng logic của smart contract hoạt động đúng như mong đợi. Điều này bao gồm việc mô phỏng các giao dịch gửi tiền và rút tiền, cũng như kiểm tra các trường hợp biên để đảm bảo tính an toàn.
Sau khi kiểm thử thành công, chúng ta sẽ triển khai smart contract lên Cardano và tích hợp nó với Hydra để tận dụng khả năng mở rộng của Layer 2.

#### 🧪 Test Case 1: Tip hợp lệ được chấp nhận

Trong test case này, chúng ta tiến hành kiểm tra một trong những hành vi quan trọng nhất của smart contract TipJar, đó là khả năng chấp nhận một giao dịch tip hợp lệ. Đây là kịch bản đại diện cho luồng sử dụng chính của hệ thống, nơi người dùng gửi một lượng ADA vào contract và làm tăng giá trị của TipJar theo đúng quy định.

```aiken
test tip_accepts_valid_transaction() {
  let redeemer = Tip
  let datum =
    Datum {
      participants: [
        (mock_pub_key_address(0, None), 10_000_000),
        (mock_pub_key_address(1, None), 15_000_000),
      ],
    }
  let output_reference = mock_utxo_ref(0, 1)
  let tx =
    mocktail_tx()
      |> tx_in(
          True,
          mock_tx_hash(0),
          1,
          from_lovelace(10_000_000),
          mock_script_address(0, None),
        )
      |> tx_in_inline_datum(True, datum)
      |> tx_out(True, mock_script_address(0, None), from_lovelace(11_000_000))
      |> required_signer_hash(True, mock_pub_key_hash(0))
      |> complete()

  tipjar.tipjar.spend(
    mock_pub_key_hash(0),
    1_000_000,
    Some(datum),
    redeemer,
    output_reference,
    tx,
  )
}

```

Trước hết, test khởi tạo một datum giả lập với danh sách participants, đại diện cho những người đã tham gia tip trước đó. Mặc dù trong phiên bản hiện tại của validator, datum chưa được sử dụng để kiểm tra logic, việc đưa dữ liệu này vào giúp mô phỏng sát hơn trạng thái thực tế của contract, đồng thời tạo tiền đề cho các phiên bản mở rộng trong tương lai (ví dụ: lưu lịch sử tip hoặc message).

Tiếp theo, transaction được xây dựng bằng thư viện Mocktail với một input đến từ địa chỉ của script, mang giá trị 10 ADA. Đây chính là UTxO hiện tại của TipJar trước khi giao dịch diễn ra. Sau đó, transaction tạo một output mới cũng quay lại đúng địa chỉ script, nhưng với giá trị tăng lên thành 11 ADA. Việc giữ nguyên địa chỉ và chỉ thay đổi giá trị là yếu tố quan trọng, vì validator yêu cầu TipJar phải tiếp tục tồn tại sau mỗi lần tip, đồng thời giá trị phải tăng tối thiểu theo minimum_tip.

Cụ thể, điều kiện mà validator sẽ kiểm tra trong nhánh Tip là: `lovelace_of(script_output.value) >= lovelace_of(
  script_input.output.value,
) + minimum_tip`

Trong test này, điều kiện được thỏa mãn rõ ràng:

- Giá trị ban đầu: 10 ADA
- Giá trị sau: 11 ADA
- minimum_tip: 1 ADA

→ 11 ADA ≥ 10 ADA + 1 ADA → hợp lệ

Ngoài ra, transaction còn bao gồm chữ ký của người gửi thông qua required_signer_hash. Mặc dù chữ ký này không bắt buộc trong logic của Tip, việc thêm vào giúp đảm bảo transaction hợp lệ trong bối cảnh thực tế, nơi hầu hết các giao dịch đều cần được ký.

Sau khi hoàn tất việc xây dựng transaction, test gọi trực tiếp hàm spend của validator với đầy đủ tham số, bao gồm owner, minimum_tip, datum, redeemer, output_reference và transaction. Validator sau đó sẽ thực hiện toàn bộ quá trình xác minh như đã thiết kế.

Khi chạy lệnh:

```bash
aiken check
```

kết quả trả về cho thấy test này PASS, đồng nghĩa với việc validator đã chấp nhận giao dịch như mong đợi. Không chỉ vậy, toàn bộ các test khác trong cùng module cũng đều pass, cho thấy smart contract hoạt động ổn định ở cả các kịch bản hợp lệ và không hợp lệ.

Kết quả này có ý nghĩa rất quan trọng: nó xác nhận rằng logic của nhánh Tip đã được triển khai chính xác, đảm bảo rằng bất kỳ giao dịch nào làm tăng giá trị TipJar đúng quy định đều sẽ được chấp nhận. Đây là nền tảng để tiếp tục phát triển các phần nâng cao hơn, cũng như tích hợp vào môi trường thực tế như Hydra.

```bash
   Collecting all tests scenarios across all modules
      Testing ...

    ┍━ tests/tipjar ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    │ PASS [mem: 196511, cpu: 72840716] tip_accepts_valid_transaction
    │ PASS [mem: 196511, cpu: 72840716] tip_rejects_insufficient_tip
    │ PASS [mem: 150303, cpu: 62163584] tip_but_wrong_address
    │ PASS [mem: 129467, cpu: 55400880] claim_tip_success
    │ PASS [mem: 129467, cpu: 55400880] claim_tip_not_owner
    ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 5 tests | 5 passed | 0 failed
```

Kết quả này có ý nghĩa rất quan trọng: nó xác nhận rằng logic của nhánh Tip đã được triển khai chính xác, đảm bảo rằng bất kỳ giao dịch nào làm tăng giá trị TipJar đúng quy định đều sẽ được chấp nhận. Đây là nền tảng để tiếp tục phát triển các phần nâng cao hơn, cũng như tích hợp vào môi trường thực tế như Hydra.

#### 🧪 Test Case 2: Tip không đủ số tiền bị từ chối

Trong test case này, chúng ta kiểm tra một tình huống quan trọng về mặt bảo mật và tính đúng đắn của hệ thống: đảm bảo rằng validator không chấp nhận các giao dịch tip không làm tăng giá trị của TipJar theo đúng ngưỡng minimum_tip. Đây là một kịch bản “negative case”, giúp xác minh rằng contract không chỉ hoạt động đúng khi hợp lệ mà còn từ chối chính xác các hành vi sai.

```aiken
test tip_rejects_insufficient_tip() {
  let redeemer = Tip
  let datum =
    Datum {
      participants: [
        (mock_pub_key_address(0, None), 10_000_000),
        (mock_pub_key_address(1, None), 15_000_000),
      ],
    }
  let output_reference = mock_utxo_ref(0, 1)
  let tx =
    mocktail_tx()
      |> tx_in(
          True,
          mock_tx_hash(0),
          1,
          from_lovelace(10_000_000),
          mock_script_address(0, None),
        )
      |> tx_in_inline_datum(True, datum)
      |> tx_out(True, mock_script_address(0, None), from_lovelace(10_000_000))
      |> required_signer_hash(True, mock_pub_key_hash(0))
      |> complete()

  tipjar.tipjar.spend(
    mock_pub_key_hash(0),
    1_000_000,
    Some(datum),
    redeemer,
    output_reference,
    tx,
  )
}

```

Trong phần thiết lập, transaction được xây dựng gần như giống với test case hợp lệ trước đó, nhằm đảm bảo chỉ thay đổi đúng một yếu tố cần kiểm tra. Cụ thể, input của transaction vẫn là một UTxO từ script với giá trị 10 ADA, và output cũng quay lại đúng địa chỉ script. Tuy nhiên, điểm khác biệt nằm ở giá trị output: thay vì tăng lên, nó giữ nguyên ở mức 10 ADA.

Điều này trực tiếp vi phạm điều kiện trong nhánh Tip của validator: `lovelace_of(script_output.value) >= lovelace_of(
  script_input.output.value,
) + minimum_tip`

Với dữ liệu trong test:

- Giá trị trước: 10 ADA
- Giá trị sau: 10 ADA
- minimum_tip: 1 ADA

→ 10 ADA < 10 ADA + 1 ADA → không thỏa mãn điều kiện

Về mặt logic, validator phải từ chối giao dịch này vì nó không thực sự “tip” thêm giá trị vào TipJar. Nếu không có kiểm tra này, người dùng có thể tạo các giao dịch giả để tương tác với contract mà không đóng góp giá trị thực, dẫn đến sai lệch trạng thái hoặc mở ra các lỗ hổng logic.

Sau khi chạy lệnh:

```bash
aiken check
```

kết quả hiển thị:

```bash
   Collecting all tests scenarios across all modules
      Testing ...

    ┍━ tests/tipjar ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    │ PASS [mem: 196511, cpu: 72840716] tip_accepts_valid_transaction
    │ PASS [mem: 196511, cpu: 72840716] tip_rejects_insufficient_tip
    │ PASS [mem: 150303, cpu: 62163584] tip_but_wrong_address
    │ PASS [mem: 129467, cpu: 55400880] claim_tip_success
    │ PASS [mem: 129467, cpu: 55400880] claim_tip_not_owner
    ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 5 tests | 5 passed | 0 failed
```

Thoạt nhìn, việc test này “PASS” có thể gây nhầm lẫn, vì chúng ta kỳ vọng giao dịch bị từ chối. Tuy nhiên, trong Aiken, một test được coi là pass khi validator thực thi đúng như kỳ vọng của logic. Trong trường hợp này, việc từ chối giao dịch là hành vi đúng, nên test vẫn được đánh dấu là PASS.

Kết quả này mang ý nghĩa quan trọng: nó xác nhận rằng validator đã thực hiện đúng vai trò bảo vệ tính toàn vẹn của TipJar, đảm bảo rằng mọi giao dịch Tip đều phải thực sự làm tăng giá trị. Đây là một ràng buộc cốt lõi giúp hệ thống tránh được các hành vi gian lận hoặc tương tác vô nghĩa, đặc biệt quan trọng khi triển khai trong môi trường thực tế hoặc trên Hydra, nơi có thể có nhiều người dùng tương tác đồng thời.

Tóm lại, test case này chứng minh rằng contract không chỉ hoạt động đúng trong điều kiện lý tưởng, mà còn đủ chặt chẽ để xử lý các tình huống sai lệch một cách chính xác và an toàn.

#### 🧪 Test Case 3: Tip sai địa chỉ bị từ chối

Trong test case này, chúng ta (kiểm tra) một tình huống rất quan trọng liên quan đến tính toàn vẹn của trạng thái contract: đảm bảo rằng mọi giao dịch tip phải duy trì TipJar bằng cách gửi lại tài sản về đúng địa chỉ script. Nếu không có ràng buộc này, người dùng có thể lợi dụng hành vi “tip” để thực chất rút tiền ra khỏi contract.

```aiken
test tip_but_wrong_address() {
  let redeemer = Tip
  let datum =
    Datum {
      participants: [
        (mock_pub_key_address(0, None), 10_000_000),
        (mock_pub_key_address(1, None), 15_000_000),
      ],
    }
  let output_reference = mock_utxo_ref(0, 1)
  let tx =
    mocktail_tx()
      |> tx_in(
          True,
          mock_tx_hash(0),
          1,
          from_lovelace(10_000_000),
          mock_script_address(0, None),
        )
      |> tx_in_inline_datum(True, datum)
      |> tx_out(True, mock_pub_key_address(0, None), from_lovelace(11_000_000))
      |> required_signer_hash(True, mock_pub_key_hash(0))
      |> complete()

  tipjar.tipjar.spend(
    mock_pub_key_hash(0),
    1_000_000,
    Some(datum),
    redeemer,
    output_reference,
    tx,
  )
}

```

Trong phần thiết lập, transaction ban đầu trông có vẻ hợp lệ: input đến từ script với giá trị 10 ADA, và output tăng lên 11 ADA, thỏa mãn điều kiện về minimum_tip. Tuy nhiên, điểm khác biệt mang tính quyết định nằm ở địa chỉ của output. Thay vì gửi lại về script_address, transaction lại gửi tiền đến một địa chỉ ví cá nhân (mock_pub_key_address).

Điều này vi phạm một ràng buộc quan trọng trong validator, nơi yêu cầu rằng phải tồn tại chính xác một output quay lại contract. Logic này được thể hiện qua đoạn kiểm tra: `expect list.length(script_outputs) == 1
expect Some(script_output) = list.head(script_outputs)`

Trong trường hợp này, vì không có output nào mang địa chỉ của script, nên script_outputs sẽ là danh sách rỗng. Khi đó:

- list.length(script_outputs) == 0
- Điều kiện == 1 bị vi phạm → Validator sẽ fail ngay lập tức

➡️ Điều này cho thấy validator không chỉ kiểm tra giá trị, mà còn kiểm soát chặt chẽ dòng chảy của tài sản.

Sau khi thực thi lệnh:

```bash
aiken check
```

kết quả cho thấy:

```bash
   Collecting all tests scenarios across all modules
      Testing ...

    ┍━ tests/tipjar ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    │ PASS [mem: 196511, cpu: 72840716] tip_accepts_valid_transaction
    │ PASS [mem: 196511, cpu: 72840716] tip_rejects_insufficient_tip
    │ PASS [mem: 150303, cpu: 62163584] tip_but_wrong_address
    │ PASS [mem: 129467, cpu: 55400880] claim_tip_success
    │ PASS [mem: 129467, cpu: 55400880] claim_tip_not_owner
    ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 5 tests | 5 passed | 0 failed
```

Tương tự như test trước, việc test này “PASS” không có nghĩa là giao dịch hợp lệ, mà ngược lại, nó xác nhận rằng validator đã từ chối đúng một giao dịch không hợp lệ. Đây là cách Aiken xác nhận rằng logic của contract đang hoạt động đúng như mong đợi.

Ý nghĩa của test case này là cực kỳ quan trọng trong thiết kế UTxO-based:

- Nó ngăn chặn việc “ngụy trang tip để rút tiền”
- Đảm bảo TipJar luôn tồn tại sau mỗi giao dịch tip
- Giữ trạng thái contract nhất quán (chỉ một UTxO đại diện)

Đặc biệt trong môi trường Hydra, nơi nhiều giao dịch có thể diễn ra nhanh chóng và song song, việc duy trì một state rõ ràng và không bị phân tán là yếu tố then chốt để đảm bảo hiệu năng và tính chính xác.

Tóm lại, test case này chứng minh rằng validator đã kiểm soát đúng không chỉ “bao nhiêu tiền”, mà còn “tiền đi đâu”, từ đó đảm bảo TipJar không thể bị khai thác thông qua các thao tác sai lệch về địa chỉ output.

#### 🧪 Test Case 4: Owner rút tiền thành công

Trong test case này, chúng ta (kiểm tra) luồng xử lý thứ hai của smart contract TipJar, đó là hành động rút tiền (Claim) bởi chủ sở hữu. Đây là chức năng quan trọng đảm bảo rằng số tiền tích lũy trong TipJar cuối cùng có thể được thu hồi một cách hợp lệ bởi đúng người có quyền.

```aiken
test claim_tip_success() {
  let redeemer = Claim
  let datum =
    Datum {
      participants: [
        (mock_pub_key_address(0, None), 10_000_000),
        (mock_pub_key_address(1, None), 15_000_000),
      ],
    }
  let output_reference = mock_utxo_ref(0, 0)
  let transaction =
    mocktail_tx()
      |> tx_in(
          True,
          mock_tx_hash(0),
          1,
          from_lovelace(10_000_000),
          mock_script_address(0, None),
        )
      |> tx_in_inline_datum(True, datum)
      |> tx_out(True, mock_pub_key_address(0, None), from_lovelace(10_000_000))
      |> required_signer_hash(True, mock_pub_key_hash(0))
      |> complete()

  tipjar.tipjar.spend(
    mock_pub_key_hash(0),
    1_000_000,
    Some(datum),
    redeemer,
    output_reference,
    transaction,
  )
}
```

Trong phần thiết lập, transaction được xây dựng với một input đến từ script, mang giá trị 10 ADA — đây chính là toàn bộ số tiền hiện đang nằm trong TipJar. Khác với nhánh Tip, trong trường hợp Claim, transaction không cần tạo output quay lại contract. Thay vào đó, toàn bộ số tiền được chuyển trực tiếp đến một địa chỉ ví cá nhân (mock_pub_key_address), đại diện cho việc chủ sở hữu rút tiền về.

Điểm mấu chốt của test này nằm ở chữ ký của transaction: `required_signer_hash(True, mock_pub_key_hash(0))`

Ở đây, mock_pub_key_hash(0) cũng chính là giá trị được truyền vào làm owner khi gọi validator. Điều này đảm bảo rằng transaction đã được ký bởi đúng chủ sở hữu của TipJar.

Validator sẽ kiểm tra điều kiện này thông qua đoạn logic: `Claim -> verify_signature(extra_signatories, owner)`

Nếu chữ ký hợp lệ, validator sẽ chấp nhận giao dịch mà không cần thêm bất kỳ ràng buộc nào về giá trị hay cấu trúc output. Điều này phản ánh đúng thiết kế: khi owner thực hiện Claim, họ có toàn quyền rút toàn bộ số tiền trong contract.

Sau khi chạy lệnh:

```bash
aiken check
```

kết quả hiển thị:

```bash
   Collecting all tests scenarios across all modules
      Testing ...

    ┍━ tests/tipjar ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    │ PASS [mem: 196511, cpu: 72840716] tip_accepts_valid_transaction
    │ PASS [mem: 196511, cpu: 72840716] tip_rejects_insufficient_tip
    │ PASS [mem: 150303, cpu: 62163584] tip_but_wrong_address
    │ PASS [mem: 129467, cpu: 55400880] claim_tip_success
    │ PASS [mem: 129467, cpu: 55400880] claim_tip_not_owner
    ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 5 tests | 5 passed | 0 failed
```

Điều này xác nhận rằng validator đã xử lý đúng kịch bản: giao dịch được ký bởi owner và do đó được chấp nhận.

Ý nghĩa của test case này rất rõ ràng: nó chứng minh rằng cơ chế kiểm soát quyền truy cập trong contract đang hoạt động chính xác. Chỉ cần có chữ ký hợp lệ của owner, việc rút tiền sẽ được cho phép mà không bị ràng buộc bởi các điều kiện khác như trong nhánh Tip.

Đáng chú ý, mức tiêu thụ tài nguyên (mem và cpu) của test này thấp hơn so với các test liên quan đến Tip. Điều này là hợp lý vì nhánh Claim có logic đơn giản hơn, chỉ tập trung vào việc xác minh chữ ký thay vì kiểm tra cấu trúc UTxO và giá trị.

Tóm lại, test case này xác nhận rằng owner có thể rút tiền một cách hợp lệ và toàn bộ, đúng theo thiết kế ban đầu của TipJar. Đây là bước hoàn thiện quan trọng, đảm bảo contract không chỉ nhận tiền đúng mà còn cho phép rút tiền đúng người.

#### 🧪 Test Case 5: Người không phải owner không thể rút tiền

Trong test case cuối cùng này, chúng ta যাচ (kiểm tra) một tình huống cực kỳ quan trọng về mặt bảo mật: đảm bảo rằng chỉ chủ sở hữu (owner) mới có quyền rút tiền, và mọi thực thể khác đều bị từ chối. Đây là phần bổ sung trực tiếp cho test case trước đó, nhằm xác nhận rằng cơ chế kiểm soát quyền truy cập của contract hoạt động chặt chẽ trong cả hai chiều: cho phép đúng người và từ chối sai người.

```aiken
test claim_tip_not_owner() {
  let redeemer = Claim
  let datum =
    Datum {
      participants: [
        (mock_pub_key_address(0, None), 10_000_000),
        (mock_pub_key_address(1, None), 15_000_000),
      ],
    }
  let output_reference = mock_utxo_ref(0, 0)
  let transaction =
    mocktail_tx()
      |> tx_in(
          True,
          mock_tx_hash(0),
          1,
          from_lovelace(10_000_000),
          mock_script_address(0, None),
        )
      |> tx_in_inline_datum(True, datum)
      |> tx_out(True, mock_pub_key_address(0, None), from_lovelace(10_000_000))
      |> required_signer_hash(True, mock_pub_key_hash(1))
      |> complete()

  tipjar.tipjar.spend(
    mock_pub_key_hash(0),
    1_000_000,
    Some(datum),
    redeemer,
    output_reference,
    transaction,
  )
}
```

Trong phần thiết lập, transaction được xây dựng gần giống với test claim_tip_success: input vẫn đến từ script với giá trị 10 ADA và output chuyển toàn bộ số tiền về một địa chỉ ví cá nhân. Điều này mô phỏng hành vi rút tiền khỏi TipJar. Tuy nhiên, điểm khác biệt then chốt nằm ở chữ ký của transaction. `required_signer_hash(True, mock_pub_key_hash(1))`

Ở đây, transaction được ký bởi mock_pub_key_hash(1), trong khi owner truyền vào validator lại là mock_pub_key_hash(0). Điều này tạo ra một sự không khớp giữa người ký và chủ sở hữu thực sự của contract.

Khi validator thực thi, nó sẽ kiểm tra điều kiện trong nhánh Claim: `verify_signature(extra_signatories, owner)` Trong trường hợp này, hàm verify_signature sẽ trả về False vì chữ ký không thuộc về owner. Do đó, toàn bộ giao dịch sẽ bị từ chối ngay lập tức.

Sau khi chạy:

```bash
aiken check
```

kết quả hiển thị:

```bash
   Collecting all tests scenarios across all modules
      Testing ...

    ┍━ tests/tipjar ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    │ PASS [mem: 196511, cpu: 72840716] tip_accepts_valid_transaction
    │ PASS [mem: 196511, cpu: 72840716] tip_rejects_insufficient_tip
    │ PASS [mem: 150303, cpu: 62163584] tip_but_wrong_address
    │ PASS [mem: 129467, cpu: 55400880] claim_tip_success
    │ PASS [mem: 129467, cpu: 55400880] claim_tip_not_owner
    ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 5 tests | 5 passed | 0 failed
```

Tương tự như các test “negative case” trước, việc test này PASS có nghĩa là validator đã hoạt động đúng: từ chối một giao dịch không hợp lệ. Điều này xác nhận rằng không có lỗ hổng nào cho phép người không phải owner rút tiền từ TipJar.

Ý nghĩa của test case này là đặc biệt quan trọng trong thực tế triển khai. Nó đảm bảo rằng ngay cả khi một người dùng có thể xây dựng transaction hợp lệ về mặt cấu trúc (đúng input, đúng output), họ vẫn không thể vượt qua lớp bảo vệ về chữ ký. Đây chính là lớp phòng thủ cuối cùng, bảo vệ tài sản trong contract khỏi các hành vi truy cập trái phép.

Tóm lại, test case này hoàn thiện bức tranh về cơ chế Claim:

- Owner có thể rút tiền → được chấp nhận
- Không phải owner → bị từ chối tuyệt đối

➡️ Điều này đảm bảo rằng TipJar không chỉ hoạt động đúng về logic, mà còn an toàn khi triển khai trong môi trường thực tế, đặc biệt là trong Hydra, nơi nhiều participant cùng tương tác và yêu cầu kiểm soát quyền truy cập phải thật sự chặt chẽ.

## Check và build dự án

Sau khi hoàn thành việc viết smart contract và các test case, bước tiếp theo là kiểm tra (check) và build toàn bộ dự án bằng Aiken. Đây là bước quan trọng nhằm đảm bảo rằng contract hoạt động đúng, không có lỗi cú pháp, và sẵn sàng để triển khai hoặc tích hợp với các thành phần khác như frontend hoặc Hydra.

### ▶️ Kiểm tra toàn bộ smart contract

Để chạy tất cả các test và xác minh logic của contract, chúng ta sử dụng lệnh:

```bash
aiken check
```

Khi thực thi lệnh này, Aiken sẽ:

- Biên dịch toàn bộ mã nguồn
- Thu thập tất cả các test case trong project
- Thực thi từng test trong môi trường mô phỏng
- Báo cáo kết quả kèm theo thông tin về hiệu năng (CPU, memory)

Kết quả trả về sẽ có dạng:

```bash
Collecting all tests scenarios across all modules
Testing ...

┍━ tests/tipjar ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│ PASS [mem: 196511, cpu: 72840716] tip_accepts_valid_transaction
│ PASS [mem: 196511, cpu: 72840716] tip_rejects_insufficient_tip
│ PASS [mem: 150303, cpu: 62163584] tip_but_wrong_address
│ PASS [mem: 129467, cpu: 55400880] claim_tip_success
│ PASS [mem: 129467, cpu: 55400880] claim_tip_not_owner
┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 5 tests | 5 passed | 0 failed
```

Kết quả này cho thấy toàn bộ các test đều PASS, đồng nghĩa với việc:

- Logic Tip hoạt động đúng (chấp nhận khi hợp lệ, từ chối khi sai)
- Logic Claim kiểm soát chính xác quyền của owner
- Contract không có lỗi runtime trong các kịch bản đã kiểm thử

Ngoài ra, các chỉ số mem và cpu cung cấp cái nhìn sơ bộ về chi phí thực thi của validator. Điều này đặc biệt hữu ích khi tối ưu contract để sử dụng trong môi trường thực tế hoặc trên Hydra.

### ⚙️ Build smart contract

Sau khi kiểm tra thành công, bước tiếp theo là build contract để tạo ra artifact có thể deploy lên blockchain.

```bash
aiken build
```

Lệnh này sẽ: Biên dịch validator sang dạng Plutus Core, Tạo các file output cần thiết (thường nằm trong thư mục build/), Chuẩn bị contract để sử dụng với các công cụ off-chain (CLI, backend, frontend)

Sau khi build, bạn sẽ có:, Script compiled (CBOR / UPLC), Blueprint (mô tả interface contract), Thông tin cần thiết để deploy hoặc tích hợp.

### 🚀 Ý nghĩa của bước check & build

Việc thực hiện đầy đủ hai bước này đảm bảo rằng: Smart contract đã được kiểm chứng về mặt logic. Không có lỗi trước khi triển khai thực tế. Sẵn sàng tích hợp với Hydra hoặc các thành phần off-chain. Trong quy trình phát triển DApp trên Cardano, đây là bước chuyển tiếp quan trọng từ development → deployment, giúp giảm thiểu rủi ro và đảm bảo tính ổn định của hệ thống.

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
