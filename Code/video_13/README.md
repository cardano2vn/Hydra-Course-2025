<div align="center">

<img src="https://www.cardano2vn.io/_next/static/media/loading.db59b266.png" width="120" alt="Hydra Tutorial" />

# **Tích hợp Hợp đồng Thông minh với Hệ thống phụ trợ Hydra**

**Quá trình tích hợp giữa smart contract chạy trên Cardano (on-chain) và hệ thống Hydra ở lớp mở rộng (Layer 2), thông qua các thành phần off-chain như backend và SDK.**

[![Ubuntu](https://img.shields.io/badge/Ubuntu-22.04+-E95420?logo=ubuntu)](https://ubuntu.com/download/server)
[![Cardano Node](https://img.shields.io/badge/Cardano%20Node-10.5.1+-4287D6?logo=cardano)](https://github.com/IntersectMBO/cardano-node/releases)
[![Hydra](https://img.shields.io/badge/Hydra%20Node-1.0.0+-00FF00?logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDBGRjAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAtMThjLTQuNDEgMC04IDMuNTktOCA4czMuNTkgOCA4IDggOC0zLjU5IDgtOHptMC0xNGMtMy4zMSAwLTYgMi42OS02IDZzMi42OSA2IDYgNiA2LTIuNjkgNi02em0wLTEyYy0yLjIxIDAtNCAxLjc5LTQgNHMxLjc5IDQgNCA0IDQtMS43OSA0LTQtMS43OSA0LTQgNHptMC0xMGMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjkgMi0yLTJ6Ii8+PC9zdmc+)](https://hydra.family/head-protocol)
[![Aiken](https://img.shields.io/badge/Aiken-v1.1.2-7B42BC?logo=haskell)](https://aiken-lang.org)
[![Plutus](https://img.shields.io/badge/Plutus-Haskell-8A2BE2)](https://plutus.cardano.org)
[![License: CC-BY-SA 4.0](https://img.shields.io/badge/License-MIT-FFBB00.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

---

</div>

## Giới thiệu

Tầng off-chain là một thành phần quan trọng trong kiến trúc của hệ thống TipJar, đóng vai trò xử lý toàn bộ logic nằm ngoài blockchain (on-chain). Đây là lớp trung gian giúp giảm tải đáng kể cho smart contract, đồng thời tăng hiệu năng tổng thể của hệ thống bằng cách xử lý các tác vụ phức tạp trước khi dữ liệu được đưa lên Hydra hoặc Cardano Layer 1.

Khác với on-chain layer vốn bị giới hạn bởi tốc độ xác thực và chi phí giao dịch, off-chain layer cho phép hệ thống linh hoạt hơn trong việc xử lý logic nghiệp vụ, điều phối transaction và quản lý trạng thái ứng dụng. Đây cũng là nơi diễn ra phần lớn hoạt động của hệ thống như xây dựng transaction, xác thực dữ liệu đầu vào, đồng bộ trạng thái giữa các thành phần và giao tiếp với Hydra Head.

Một vai trò quan trọng khác của off-chain layer là đảm bảo sự kết nối liền mạch giữa frontend, backend và blockchain. Thay vì để frontend giao tiếp trực tiếp với smart contract, mọi yêu cầu đều được xử lý thông qua lớp off-chain, giúp chuẩn hóa luồng dữ liệu, tăng tính bảo mật và giảm độ phức tạp cho client-side.

Ngoài ra, off-chain layer còn đóng vai trò là “bộ điều phối trung tâm” (orchestration layer), chịu trách nhiệm kết nối giữa các công nghệ khác nhau trong hệ thống như Lucid, Mesh SDK và Hydra SDK. Nhờ đó, toàn bộ kiến trúc có thể vận hành một cách đồng bộ, trong đó mỗi lớp đều có nhiệm vụ rõ ràng nhưng vẫn phối hợp chặt chẽ với nhau.

Trong bối cảnh các ứng dụng Web3 hiện đại như TipJar, việc xây dựng một off-chain layer mạnh mẽ là yếu tố bắt buộc để đảm bảo trải nghiệm người dùng mượt mà, tốc độ xử lý nhanh và khả năng mở rộng lâu dài. Đặc biệt khi kết hợp với Hydra, off-chain layer trở thành cầu nối quan trọng giúp chuyển đổi các thao tác của người dùng thành các giao dịch realtime, nhưng vẫn giữ được tính an toàn và minh bạch của blockchain.

---

## Mục tiêu

Off-chain layer trong hệ thống TipJar được thiết kế với các mục tiêu chính như sau:

- Xây dựng một lớp xử lý trung gian để giảm tải cho smart contract on-chain
- Điều phối toàn bộ luồng transaction trong hệ thống một cách nhất quán và có kiểm soát
- Tích hợp với Hydra Head để hỗ trợ xử lý giao dịch theo thời gian thực (realtime execution)
- Quản lý và đồng bộ trạng thái giữa frontend, backend và blockchain
- Tối ưu hiệu năng hệ thống, giảm độ trễ và cải thiện khả năng phản hồi
- Đảm bảo tính nhất quán dữ liệu trong môi trường phân tán (distributed environment)
- Hoàn thiện kiến trúc DApp theo hướng production-ready trên Cardano

---

## 🧩 Off-chain TipJar – MeshTxBuilder (Tip & Claim Logic Layer)

MeshTxBuilder là một lớp mở rộng từ MeshAdapter, đóng vai trò trung tâm trong việc xử lý toàn bộ logic nghiệp vụ ở tầng off-chain của hệ thống TipJar. Lớp này được thiết kế nhằm hiện thực hóa hai chức năng cốt lõi của hệ thống là gửi tip (tip) và rút tiền (claim), đồng thời đảm bảo sự tương thích chặt chẽ với mô hình UTxO của Cardano và logic validator từ smart contract Aiken.

Ở góc độ kiến trúc, MeshTxBuilder hoạt động như một application-level transaction builder, nơi toàn bộ dữ liệu từ người dùng, trạng thái blockchain và logic smart contract được kết hợp để tạo ra các transaction hợp lệ. Thay vì xử lý trực tiếp trên blockchain, lớp này đóng vai trò trung gian, chịu trách nhiệm xây dựng, cập nhật và chuẩn bị transaction trước khi được gửi lên mạng Cardano hoặc Hydra Layer 2.

Trong chức năng tip(), hệ thống cho phép người dùng gửi ADA vào smart contract và cập nhật trạng thái tip được lưu trữ trong datum của UTxO. Quá trình này không chỉ đơn thuần là chuyển tiền, mà còn bao gồm việc đọc trạng thái hiện tại từ blockchain, giải mã datum, cập nhật dữ liệu tip theo từng người dùng và tạo ra một state mới hoàn chỉnh. Điều này đảm bảo rằng mọi giao dịch tip đều được ghi nhận một cách minh bạch, có thể kiểm chứng và không làm mất đi lịch sử dữ liệu trước đó.

Ngược lại, chức năng claim() được thiết kế dành riêng cho chủ sở hữu của smart contract, cho phép rút toàn bộ số tiền đang được lưu trữ trong TipJar. Trước khi thực hiện giao dịch, hệ thống sẽ xác thực quyền sở hữu thông qua validator trên blockchain, đảm bảo chỉ đúng owner mới có thể kích hoạt hành động rút tiền. Nếu điều kiện hợp lệ, toàn bộ UTxO sẽ được giải phóng và chuyển về ví của chủ sở hữu, đồng thời trạng thái trên blockchain được cập nhật lại theo mô hình UTxO.

Về mặt kỹ thuật, MeshTxBuilder kết hợp ba thành phần quan trọng trong hệ sinh thái Cardano. Thứ nhất là Mesh SDK, chịu trách nhiệm xây dựng transaction và quản lý UTxO ở tầng off-chain. Thứ hai là smart contract Aiken, cung cấp logic xác thực (validator) để đảm bảo tính đúng đắn của các giao dịch. Thứ ba là mô hình UTxO của Cardano, đóng vai trò nền tảng trong việc quản lý trạng thái hệ thống một cách bất biến và có thể kiểm chứng.

Nhờ sự kết hợp này, MeshTxBuilder không chỉ là một lớp xây dựng transaction đơn thuần, mà còn đóng vai trò như một state management engine ở tầng off-chain, nơi mọi hành động của người dùng được chuyển đổi thành state transition rõ ràng trên blockchain. Điều này giúp hệ thống TipJar đảm bảo được cả ba yếu tố quan trọng: tính minh bạch, tính bảo mật và khả năng mở rộng trong môi trường Web3.

### ⚙️ Tip

Hàm tip() là thành phần cốt lõi trong hệ thống TipJar, chịu trách nhiệm xử lý toàn bộ logic khi người dùng thực hiện hành động gửi tip vào smart contract. Đây không chỉ là một thao tác chuyển ADA thông thường, mà là một quá trình cập nhật trạng thái (state transition) trên mô hình UTxO của Cardano, trong đó toàn bộ dữ liệu tip được lưu trữ trong datum của smart contract.

#### 🔄 1. Khởi tạo dữ liệu ví người dùng

Ở bước đầu tiên, hệ thống gọi hàm getWalletForTx() để lấy toàn bộ thông tin cần thiết phục vụ cho việc xây dựng transaction trên Cardano. Đây là bước khởi tạo quan trọng, đảm bảo mọi dữ liệu đầu vào đều sẵn sàng trước khi tiến hành các bước xử lý tiếp theo.

```ts
const { utxos, collateral, walletAddress } = await this.getWalletForTx();
```

Ở bước đầu tiên, hệ thống gọi hàm getWalletForTx() để truy xuất toàn bộ dữ liệu cần thiết từ ví người dùng, phục vụ cho việc xây dựng transaction trên Cardano. Đây là bước khởi tạo quan trọng vì mọi transaction theo mô hình UTxO đều cần xác định rõ nguồn input ngay từ đầu.

Trong đó, UTxOs là tập hợp các đầu ra chưa được tiêu thụ trong ví, đóng vai trò là input chính cho transaction. Mỗi UTxO chứa giá trị ADA (lovelace) và có thể kèm theo token hoặc dữ liệu script. Hệ thống sẽ sử dụng một hoặc nhiều UTxO để đảm bảo đủ giá trị cho giao dịch và phí mạng.

Tiếp theo là collateral, một UTxO đặc biệt được dùng làm tài sản đảm bảo khi transaction tương tác với smart contract Plutus. Collateral chỉ được sử dụng trong trường hợp có script validation, nhằm đảm bảo nếu logic on-chain thất bại thì hệ thống vẫn có cơ chế xử lý rủi ro và phí phạt.

Cuối cùng là walletAddress, địa chỉ ví của người dùng, đóng vai trò xác định người gửi giao dịch. Ngoài ra, nó còn được dùng để nhận lại phần ADA dư (change output) sau khi trừ phí và giá trị đã gửi.

Tổng thể, bước khởi tạo này giúp hệ thống chuẩn bị đầy đủ “đầu vào giao dịch” theo đúng mô hình UTxO của Cardano. Nếu thiếu một trong các thành phần như UTxO, collateral hoặc wallet address, transaction sẽ không thể được xây dựng hợp lệ hoặc có nguy cơ bị từ chối khi submit lên blockchain.

#### 📦 2. Lấy trạng thái hiện tại từ smart contract

Ở bước này, hệ thống truy vấn các UTxO đang tồn tại tại địa chỉ smart contract (spendAddress) nhằm xác định trạng thái hiện tại của TipJar trên blockchain. Trong Cardano, trạng thái của smart contract không được lưu trong database như hệ thống truyền thống mà được biểu diễn trực tiếp thông qua UTxO tại script address, vì vậy việc “đọc state” thực chất chính là truy vấn các UTxO tại contract.

```ts
const utxo = (await this.fetcher.fetchAddressUTxOs(this.spendAddress))[0];
```

Nếu hệ thống tìm thấy UTxO tại spendAddress, điều đó có nghĩa TipJar đã từng được sử dụng trước đó. UTxO này sẽ chứa giá trị ADA đã được tip và có thể kèm theo datum mô tả trạng thái hiện tại của contract. Khi đó, transaction mới sẽ consume UTxO cũ và tạo ra UTxO mới với trạng thái đã được cập nhật.

Ngược lại, nếu không tồn tại UTxO nào, đây là lần đầu tiên contract được sử dụng. Hệ thống sẽ tiến hành khởi tạo state ban đầu bằng cách tạo UTxO mới tại script address, kèm theo datum khởi tạo để thiết lập trạng thái ban đầu của TipJar.

Cách tiếp cận này thể hiện rõ mô hình UTxO của Cardano, trong đó toàn bộ trạng thái ứng dụng được lưu trữ on-chain một cách minh bạch, không phụ thuộc vào backend trung gian, đảm bảo tính nhất quán và khả năng kiểm chứng cao trong toàn hệ thống.
.

#### 🧠 3. Giải mã và xử lý datum (state on-chain)

```ts
const datumList = this.convertDatum(utxo.output.plutusData as string);
```

Sau khi lấy được UTxO từ smart contract, hệ thống tiến hành giải mã datum – phần dữ liệu đại diện cho state của ứng dụng on-chain. Trong Cardano, datum thường được encode dưới dạng CBOR (Concise Binary Object Representation) để tối ưu lưu trữ và truyền tải, nên cần được decode về cấu trúc dễ xử lý hơn trong ứng dụng off-chain.

Kết quả sau khi giải mã thường được chuyển thành một danh sách dữ liệu có dạng:

```ts
[{ address: string, amount: number }];
```

Trong đó mỗi record đại diện cho một người đã từng tip, bao gồm địa chỉ ví và tổng số tiền đã gửi. Tiếp theo, hệ thống kiểm tra xem người dùng hiện tại đã từng tip trước đó hay chưa bằng cách tìm kiếm trong danh sách datum:

```ts
const existing = datumList.find((datum) => datum.address === walletAddress);
```

Nếu người dùng đã tồn tại, hệ thống sẽ cộng dồn số tiền tip mới vào giá trị cũ:

```ts
if (existing) {
  existing.amount += Number(amount);
}
```

Ngược lại, nếu chưa từng tip trước đó, hệ thống sẽ tạo một record mới và thêm vào danh sách datum:

```ts
if (!existing) {
  datumList.push({
    address: walletAddress,
    amount: Number(amount),
  });
}
```

Cơ chế này thể hiện rõ đặc trưng của mô hình UTxO trong Cardano: state không được cập nhật trực tiếp như database truyền thống, mà mỗi lần thay đổi sẽ tạo ra một UTxO mới với datum mới. Quy trình luôn diễn ra theo chuỗi: giải mã state → tính toán state mới → tạo datum mới → thay thế UTxO cũ.

#### ⚙️ 4. Xây dựng transaction với smart contract

Khi UTxO tại smart contract đã tồn tại, hệ thống sẽ tiến hành xây dựng transaction để consume state cũ và tạo state mới, đảm bảo mô hình UTxO luôn được cập nhật theo từng lần tip.

```ts
.spendingPlutusScriptV3()
.txIn(utxo.input.txHash, utxo.input.outputIndex)
.txInScript(this.spendScriptCbor)
.txInInlineDatumPresent()
.txInRedeemerValue(mConStr0([]))
```

🔹 Giải thích từng thành phần

- spendingPlutusScriptV3(): Kích hoạt chế độ transaction dành cho smart contract Plutus V3 (hoặc Aiken compiler target), cho phép thực thi validator on-chain.
- txIn(utxo.input.txHash, utxo.input.outputIndex): Xác định UTxO hiện tại sẽ bị consume. Đây chính là state cũ của TipJar cần được cập nhật.
- txInScript(this.spendScriptCbor): Gắn smart contract (Plutus script CBOR) vào transaction để blockchain có thể thực thi logic validation.
- txInInlineDatumPresent(): Cho phép đọc datum hiện tại từ UTxO, tức là state đang được lưu trên chain.
- txInRedeemerValue(mConStr0([])): Cung cấp redeemer để xác định hành động được thực thi trong validator. Ở đây mConStr0([]) đại diện cho action “tip”.

#### 💰 5. Tính toán giá trị UTxO mới

```ts
.txOut(this.spendAddress, [
  {
    unit: "lovelace",
    quantity: String(
      utxo.output.amount.reduce((total, asset) => {
        if (asset.unit === "lovelace") {
          return total + Number(asset.quantity);
        }
        return total;
      }, Number(amount)),
    ),
  },
])
```

Ở bước này, hệ thống tiến hành tính toán lại giá trị ADA sẽ được lưu trong UTxO mới tại smart contract sau khi thực hiện tip. Mục tiêu là đảm bảo toàn bộ trạng thái mới được phản ánh chính xác trên blockchain.

Quá trình tính toán diễn ra theo nguyên tắc:

- Đầu tiên, hệ thống lấy toàn bộ giá trị ADA hiện có trong UTxO cũ
- Sau đó lọc ra các asset có unit = "lovelace"
- Cộng dồn toàn bộ giá trị này với số tiền tip mới (amount)
- Kết quả cuối cùng được dùng để tạo UTxO mới tại spendAddress

Cụ thể, phần reduce() được sử dụng để duyệt qua danh sách tài sản trong UTxO hiện tại và tính tổng số ADA:

```ts
utxo.output.amount.reduce((total, asset) => {
  if (asset.unit === "lovelace") {
    return total + Number(asset.quantity);
  }
  return total;
}, Number(amount));
```

#### 🧾 6. Encode lại datum mới

```ts
.txOutInlineDatumValue(
  mConStr0(
    datumList.map((d) => mConStr0([d.address, d.amount]))
  )
)
```

Sau khi đã xử lý logic cập nhật state ở bước trước, hệ thống tiến hành encode lại datum mới để lưu trữ trên blockchain. Datum này đại diện cho toàn bộ trạng thái hiện tại của TipJar sau khi đã cộng thêm tip mới.

Quá trình thực hiện như sau:

- Danh sách datumList (đã được cập nhật ở bước xử lý state) sẽ được duyệt qua từng phần tử
- Mỗi record { address, amount } được encode lại thành dạng mConStr0([address, amount])
- Toàn bộ danh sách tiếp tục được bọc trong một constructor tổng mConStr0(...) để tạo cấu trúc datum hoàn chỉnh

#### 🆕 7. Trường hợp chưa có UTxO (khởi tạo contract)

```ts
} else {
  unsignedTx
    .txOut(this.spendAddress, [
      {
        unit: "lovelace",
        quantity: amount,
      },
    ])
    .txOutInlineDatumValue(
      mConStr0([mConStr0([walletAddress, Number(amount)])]),
    );
}
```

Trong trường hợp đây là lần đầu tiên TipJar được sử dụng và tại spendAddress chưa tồn tại bất kỳ UTxO nào, hệ thống sẽ thực hiện khởi tạo trạng thái ban đầu của smart contract.

Cụ thể, transaction sẽ tạo một UTxO mới tại địa chỉ của contract bằng cách gửi trực tiếp giá trị ADA (lovelace) vào script address:

- txOut(this.spendAddress, ...) → tạo UTxO mới tại smart contract
- unit: "lovelace" → chỉ định tài sản là ADA
- quantity: amount → số tiền tip ban đầu được gửi vào contract

Tiếp theo, hệ thống khởi tạo datum ban đầu để lưu state đầu tiên của TipJar:

```ts
.txOutInlineDatumValue(
  mConStr0([mConStr0([walletAddress, Number(amount)])]),
);
```

Datum này chứa: địa chỉ người dùng đầu tiên thực hiện tip số tiền tip ban đầu được encode theo cấu trúc mConStr0 để phù hợp với Plutus/Aiken format

#### 🔐 8. Hoàn thiện transaction

Sau khi đã xây dựng toàn bộ logic smart contract (tạo/consume UTxO và encode datum), hệ thống tiến hành bước cuối cùng để hoàn thiện transaction trước khi ký và gửi lên blockchain.

```ts
unsignedTx
  .selectUtxosFrom(utxos)
  .changeAddress(walletAddress)
  .txInCollateral(collateral.input.txHash, collateral.input.outputIndex)
  .setNetwork(APP_NETWORK);
```

Ở bước cuối cùng, hệ thống tiến hành hoàn thiện transaction trước khi ký và gửi lên blockchain. Trước hết, các UTxO từ ví người dùng được chọn làm input thông qua selectUtxosFrom(utxos), đảm bảo đủ giá trị để thực hiện giao dịch và thanh toán phí mạng. Sau đó, địa chỉ ví người dùng được thiết lập làm changeAddress, giúp nhận lại phần ADA dư sau khi transaction được xử lý, tránh thất thoát giá trị.

Tiếp theo, collateral được gán vào transaction bằng txInCollateral, đây là tài sản đảm bảo được sử dụng trong quá trình thực thi smart contract Plutus, đặc biệt trong trường hợp validation thất bại để cover chi phí theo cơ chế của Cardano. Cuối cùng, hệ thống xác định network bằng setNetwork(APP_NETWORK) để đảm bảo transaction được gửi đúng môi trường (testnet hoặc mainnet).

👉 Đây là bước hoàn thiện cuối cùng, đưa transaction vào trạng thái sẵn sàng để ký và broadcast lên mạng Cardano.

### ⚙️ Claim

Hàm claim được thiết kế để người dùng rút toàn bộ tài sản đang bị khóa trong smart contract về ví cá nhân. Trước tiên, hệ thống lấy toàn bộ thông tin cần thiết từ ví người dùng thông qua getWalletForTx(), bao gồm danh sách UTxOs để làm input cho transaction, collateral dùng để đảm bảo an toàn khi thực thi smart contract, và địa chỉ ví (walletAddress) để nhận tài sản sau khi claim. Đồng thời, hệ thống truy vấn UTxO hiện đang tồn tại tại spendAddress – chính là state hiện tại của TipJar trên blockchain – để xác định dữ liệu cần xử lý.

Từ UTxO này, transaction được xây dựng bằng cách kích hoạt Plutus smart contract thông qua spendingPlutusScriptV3(), sau đó consume UTxO hiện tại bằng txIn(txHash, outputIndex). Hệ thống đồng thời lấy datum hiện tại bằng txInInlineDatumPresent() và truyền redeemer mConStr1([]) để báo cho validator biết đây là hành động “claim”. Smart contract logic được gắn vào transaction thông qua txInScript(this.spendScriptCbor) để đảm bảo toàn bộ điều kiện on-chain được kiểm tra đầy đủ.

Sau khi validate, toàn bộ giá trị đang bị khóa trong UTxO được trả về ví người dùng thông qua txOut(walletAddress, utxo.output.amount). Song song đó, hệ thống thiết lập changeAddress(walletAddress) để xử lý phần ADA dư (nếu có) và requiredSignerHash để xác thực chữ ký của chủ ví, đảm bảo chỉ owner mới có quyền rút tiền.

Tiếp theo, hệ thống chọn thêm UTxO từ ví bằng selectUtxosFrom(utxos) để đảm bảo đủ phí giao dịch, đồng thời gán collateral bằng txInCollateral(...) nhằm hỗ trợ an toàn khi thực thi script Plutus. Cuối cùng, network được thiết lập qua setNetwork(APP_NETWORK) để xác định môi trường chạy (testnet hoặc mainnet), và transaction được hoàn tất bằng unsignedTx.complete().

👉 Toàn bộ quá trình này thể hiện đầy đủ flow “consume state → validate on-chain → release funds”, là cơ chế cốt lõi của smart contract trên Cardano trong mô hình UTxO.

#### 🔹 1. Khởi tạo dữ liệu ví người dùng

```ts
const { utxos, collateral, walletAddress } = await this.getWalletForTx();
```

Ở bước đầu tiên, hệ thống tiến hành lấy toàn bộ thông tin cần thiết từ ví người dùng thông qua hàm getWalletForTx() để chuẩn bị xây dựng transaction trên Cardano.

Trong đó:

- utxos: danh sách các UTxO hiện có trong ví, được sử dụng làm input cho transaction để đảm bảo đủ tài nguyên thực hiện giao dịch và trả phí mạng
- collateral: một UTxO đặc biệt dùng làm tài sản đảm bảo khi transaction tương tác với smart contract Plutus, giúp xử lý trường hợp script validation thất bại
- walletAddress: địa chỉ ví của người dùng, được dùng làm nơi nhận lại toàn bộ tài sản sau khi thực hiện claim

👉 Đây là dữ liệu nền tảng bắt buộc để đảm bảo transaction có thể được xây dựng hợp lệ theo mô hình UTxO của Cardano.

#### 🔹 2. Lấy UTxO từ smart contract

```ts
const utxo = (await this.fetcher.fetchAddressUTxOs(this.spendAddress))[0];
console.log(utxo);
```

Ở bước này, hệ thống tiến hành truy vấn các UTxO đang tồn tại tại địa chỉ smart contract (spendAddress) thông qua fetchAddressUTxOs(). Đây là cách để đọc trạng thái hiện tại của TipJar trực tiếp từ blockchain.

UTxO được lấy ra chính là state hiện tại của smart contract, vì trong mô hình UTxO của Cardano, toàn bộ trạng thái ứng dụng được lưu dưới dạng các UTxO tại script address thay vì lưu trong database.

- [0] được sử dụng để lấy UTxO đầu tiên, với giả định rằng contract chỉ duy trì một state duy nhất tại thời điểm hiện tại
- console.log(utxo) được dùng để debug, giúp kiểm tra nội dung state đang tồn tại trên chain (bao gồm amount, datum, và các thông tin liên quan)

👉 Đây là bước quan trọng để “đọc state từ blockchain”, làm cơ sở cho việc xử lý và cập nhật trạng thái trong các bước tiếp theo.

#### 🔹 3. Consume UTxO + kích hoạt smart contract

Ở bước này, hệ thống bắt đầu kích hoạt quá trình thực thi smart contract trên blockchain bằng cách xây dựng phần “spend” của transaction theo chuẩn Plutus V3.

```ts
.spendingPlutusScriptV3()
.txIn(utxo.input.txHash, utxo.input.outputIndex)
.txInInlineDatumPresent()
.txInRedeemerValue(mConStr1([]))
.txInScript(this.spendScriptCbor)
```

Cụ thể:

- spendingPlutusScriptV3(): khai báo transaction sẽ tương tác với smart contract sử dụng Plutus V3 validator, cho phép thực thi logic on-chain
- txIn(utxo.input.txHash, utxo.input.outputIndex): xác định và consume UTxO hiện tại của contract, tức là state đang được khóa trong TipJar sẽ bị sử dụng và thay thế
- txInInlineDatumPresent(): chỉ định rằng datum (state hiện tại của contract) sẽ được lấy trực tiếp từ UTxO để phục vụ cho quá trình validate
- txInRedeemerValue(mConStr1([])): truyền redeemer vào validator, ở đây mConStr1([]) đại diện cho action “claim”, giúp smart contract biết đây là yêu cầu rút tiền
- txInScript(this.spendScriptCbor): gắn smart contract (CBOR bytecode) vào transaction để blockchain có thể thực thi và kiểm tra logic

👉 Đây chính là bước “chạy validator on-chain”, nơi toàn bộ logic của smart contract được thực thi để quyết định transaction có hợp lệ hay không trước khi tiếp tục xử lý.

#### 🔹 4. Trả toàn bộ tài sản về ví user

```ts
.txOut(walletAddress, utxo.output.amount)
```

Ở bước này, hệ thống tạo một output mới trong transaction để chuyển toàn bộ giá trị đang bị khóa trong smart contract về ví của người dùng.

Cụ thể:

- walletAddress: địa chỉ ví người dùng, đóng vai trò là nơi nhận lại toàn bộ tài sản sau khi claim thành công
- utxo.output.amount: toàn bộ giá trị hiện có trong UTxO của smart contract, bao gồm ADA (lovelace) và các asset đi kèm nếu có

Khi transaction được thực thi, UTxO cũ tại smart contract sẽ bị consume, và một UTxO mới sẽ được tạo tại ví người dùng với toàn bộ giá trị tương ứng.

👉 Đây chính là hành động “claim funds”, nơi tài sản được giải phóng khỏi smart contract và chuyển về quyền sở hữu của user.

#### 🔹 5. Thiết lập change address và signer

```ts
.changeAddress(walletAddress)
.requiredSignerHash(
deserializeAddress(walletAddress).pubKeyHash
)
```

Ở bước này, hệ thống thiết lập các thông tin quan trọng liên quan đến việc hoàn thiện transaction và đảm bảo tính bảo mật khi thực hiện claim.

Cụ thể:

- changeAddress(walletAddress): xác định địa chỉ ví của người dùng sẽ nhận lại phần ADA dư sau khi transaction được thực hiện. Trong quá trình xây dựng transaction, nếu tổng input lớn hơn tổng output (bao gồm fee), phần chênh lệch sẽ được hoàn trả về địa chỉ này
- requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash): chỉ định rằng transaction bắt buộc phải được ký bởi chủ sở hữu ví tương ứng với pubKeyHash. Điều này đảm bảo rằng chỉ người sở hữu private key của ví mới có quyền thực hiện claim

👉 Cơ chế này giúp đảm bảo tính an toàn tuyệt đối, ngăn chặn việc bất kỳ bên thứ ba nào có thể rút tài sản từ smart contract nếu không có chữ ký hợp lệ của chủ ví.

#### 🔹 6. Chọn input từ ví và collateral

Ở bước này, hệ thống tiến hành chuẩn bị tài nguyên từ ví người dùng để đảm bảo transaction có thể được thực thi thành công trên blockchain.

```ts
.selectUtxosFrom(utxos)
.txInCollateral(
collateral.input.txHash,
collateral.input.outputIndex
)
```

Cụ thể:

- selectUtxosFrom(utxos): lựa chọn các UTxO từ ví người dùng để làm input cho transaction, đồng thời đảm bảo đủ ADA để chi trả phí giao dịch (transaction fee) và các chi phí phát sinh trong quá trình xử lý
- txInCollateral(collateral.input.txHash, collateral.input.outputIndex): gán collateral vào transaction. Đây là UTxO dự phòng được sử dụng trong trường hợp smart contract Plutus execution thất bại, giúp hệ thống có cơ chế xử lý rủi ro theo yêu cầu của Cardano

👉 Đây là bước chuẩn bị tài nguyên cuối cùng, đảm bảo transaction có đủ input và cơ chế an toàn trước khi được ký và gửi lên mạng blockchain.

🔹 7. Chọn network và hoàn tất transaction

```ts
.setNetwork(APP_NETWORK);

return await unsignedTx.complete();
```

Ở bước cuối cùng, hệ thống tiến hành cấu hình môi trường mạng và hoàn tất việc xây dựng transaction trước khi ký và gửi lên blockchain.

Cụ thể:

- setNetwork(APP_NETWORK): xác định network mà transaction sẽ được thực thi, có thể là testnet (preview/preprod) hoặc mainnet. Việc này đảm bảo transaction được build đúng theo tham số và rule của từng môi trường blockchain
- complete(): thực hiện bước cuối cùng của transaction builder, bao gồm việc tổng hợp toàn bộ input, output, fee, script, datum và signer để tạo ra một unsigned transaction hoàn chỉnh, sẵn sàng cho bước ký và submit

👉 Đây là bước kết thúc toàn bộ pipeline transaction, đưa transaction từ trạng thái “builder” sang trạng thái “ready to sign & submit” trên mạng Cardano.

## 🧪 Testcase Tip & Claim với TipJar Validator

Đoạn code test này mô phỏng toàn bộ luồng hoạt động của TipJar smart contract trên Cardano, bao gồm hai chức năng chính: Tip (gửi tiền vào contract) và Claim (rút tiền từ contract). Test được thực hiện bằng Jest với môi trường sử dụng Mesh SDK và Blockfrost provider để tương tác với blockchain testnet.

Trước tiên, hệ thống khởi tạo một ví Cardano bằng MeshWallet, sử dụng mnemonic phrase từ biến môi trường APP_MNEMONIC. Ví này được cấu hình với networkId tương ứng môi trường đang chạy (testnet), đồng thời tích hợp fetcher và submitter từ Blockfrost để đọc dữ liệu blockchain và gửi transaction.

```ts
meshWallet = new MeshWallet({
  accountIndex: 0,
  networkId: APP_NETWORK_ID,
  fetcher: blockfrostProvider,
  submitter: blockfrostProvider,
  key: {
    type: "mnemonic",
    words: APP_MNEMONIC.split(" ") || [],
  },
});
```

Ngoài ra, hệ thống định nghĩa thêm địa chỉ owner đại diện cho chủ sở hữu smart contract, được sử dụng trong quá trình validate logic on-chain.

```ts
owner =
  "addr_test1qrr879mjnxd3gjqjdgjxkwzfcnvcgsve927scqk5fc3gfs2hs03pn7uhujentyhzq3ays72u4xtfrlahyjalujhxufsqdeezc0";
```

### 🔹 Test Tip

Test case Tip mô phỏng hành động người dùng gửi ADA vào smart contract TipJar. Trong bước này, hệ thống khởi tạo một instance MeshTxBuilder với các tham số quan trọng như ví người dùng (meshWallet), địa chỉ owner của smart contract (owner), và mức tip tối thiểu (minimumTip). Những tham số này giúp đảm bảo transaction được xây dựng đúng theo logic của validator trước khi tương tác với blockchain.

```ts
const meshTxBuilder = new MeshTxBuilder({
  meshWallet,
  owner,
  minimumTip: 10_000_000,
});
```

Sau khi builder được khởi tạo, hệ thống gọi hàm tip() để bắt đầu quá trình xây dựng unsigned transaction. Trong hàm này, giá trị amount được truyền vào sẽ đại diện cho số ADA mà người dùng muốn gửi vào smart contract TipJar.

```ts
const unsignedTx = await meshTxBuilder.tip({
  amount: "123456789",
});
```

Khi transaction đã được build hoàn chỉnh, hệ thống chuyển sang bước ký giao dịch bằng ví người dùng thông qua signTx(). Đây là bước xác thực quyền sở hữu, đảm bảo chỉ chủ ví mới có thể tạo và gửi transaction hợp lệ.

```ts
const signedTx = await meshWallet.signTx(unsignedTx, true);
const txHash = await meshWallet.submitTx(signedTx);

blockfrostProvider.onTxConfirmed(txHash, () => {
  console.log("https://preview.cexplorer.io/tx/" + txHash);
});
```

Sau khi ký thành công, transaction được gửi lên blockchain bằng submitTx(). Lúc này, transaction sẽ được broadcast lên mạng Cardano để chờ xử lý và xác nhận bởi các node. Cuối cùng, hệ thống sử dụng event listener từ Blockfrost để theo dõi trạng thái transaction. Khi transaction được xác nhận thành công trên blockchain, hệ thống sẽ log đường dẫn explorer tương ứng để người dùng có thể kiểm tra kết quả trực tiếp. 👉 Tổng thể, test case Tip đảm bảo toàn bộ luồng từ build transaction → sign → submit → confirm hoạt động chính xác trong môi trường Cardano testnet.

### 🔹 Test Claim

Test case Claim mô phỏng hành vi người dùng rút toàn bộ tài sản đang bị khóa trong smart contract TipJar về ví cá nhân. Khác với test Tip (ghi dữ liệu vào contract), luồng này tập trung vào việc consume UTxO hiện tại của smart contract và giải phóng toàn bộ giá trị đang lưu trữ trên blockchain.

Trong bước đầu tiên, hệ thống gọi hàm claim() từ MeshTxBuilder để xây dựng một unsigned transaction. Hàm này sẽ tự động tìm UTxO đang tồn tại tại spendAddress, kích hoạt validator, và tạo transaction logic để rút toàn bộ tài sản về ví người dùng.

```ts
const unsignedTx = await meshTxBuilder.claim();
```

Sau khi transaction được xây dựng hoàn chỉnh, hệ thống tiếp tục thực hiện bước ký giao dịch bằng ví người dùng thông qua signTx(). Đây là bước xác thực quyền sở hữu, đảm bảo chỉ chủ ví hợp lệ mới có thể thực hiện hành động rút tiền từ smart contract.

```ts
const signedTx = await meshWallet.signTx(unsignedTx, true);
```

Tiếp theo, transaction đã ký sẽ được gửi lên blockchain bằng submitTx(), nơi nó được broadcast đến mạng Cardano và chờ các node xác nhận.

```ts
const txHash = await meshWallet.submitTx(signedTx);
```

Cuối cùng, hệ thống theo dõi trạng thái transaction thông qua Blockfrost listener. Khi transaction được xác nhận thành công trên blockchain, hệ thống có thể log hoặc hiển thị link explorer để kiểm tra kết quả thực tế. 👉 Test case Claim đảm bảo toàn bộ luồng consume state → validate on-chain → release funds → confirm transaction hoạt động chính xác, từ đó hoàn thiện vòng đời của smart contract TipJar trên Cardano.

## 🌊 Hydra Adapter – Kiến trúc điều phối Hydra + Smart Contract

HydraAdapter là lớp trung gian đóng vai trò kết nối giữa Mesh SDK, Hydra Head và smart contract Plutus, giúp thống nhất toàn bộ luồng xử lý từ ví người dùng cho đến cả Layer 1 (Cardano) và Layer 2 (Hydra). Nói cách khác, đây là lớp “orchestrator” chịu trách nhiệm điều phối transaction và state giữa hai môi trường blockchain khác nhau.

### 🔧 1. Khởi tạo HydraAdapter

```ts
export class HydraAdapter {
  public meshTxBuilder!: MeshTxBuilder;
  public hydraTxBuilder!: MeshTxBuilder;
  public hydraInstance!: HydraInstance;
  public hydraProvider: HydraProvider;
  public spendAddress: string;
```

👉 Giải thích:

Trong phần khai báo ban đầu, hệ thống định nghĩa các instance cốt lõi phục vụ cho toàn bộ kiến trúc Hydra:

- meshTxBuilder: được sử dụng để xây dựng transaction trên Layer 1 (Cardano mainnet/testnet). Đây là builder chính cho các giao dịch on-chain truyền thống
- hydraTxBuilder: là phiên bản transaction builder dành riêng cho Layer 2 (Hydra), tối ưu cho môi trường off-chain nhanh và stateful
- hydraInstance: đóng vai trò điều khiển toàn bộ vòng đời của Hydra Head, bao gồm commit state, đóng head (close) và đẩy dữ liệu về L1 (fanout)
- hydraProvider: là lớp kết nối trực tiếp tới Hydra node, chịu trách nhiệm gửi/nhận dữ liệu và tương tác với Hydra network
- spendAddress: là địa chỉ của smart contract (Plutus script address), nơi lưu trữ state UTxO của ứng dụng trên blockchain

👉 Tổng thể, phần khởi tạo này thiết lập nền tảng để HydraAdapter có thể điều phối đồng thời cả Layer 1 và Layer 2 trong cùng một hệ thống thống nhất.

### ⚙️ 2. Constructor – Setup smart contract + Hydra

```ts
constructor({
meshWallet,
hydraProvider,
owner,
minimumTip,
}: {
meshWallet: MeshWallet;
hydraProvider: HydraProvider;
owner: string;
minimumTip: number;
}) {}
```

👉 Giải thích:

Constructor của HydraAdapter được dùng để khởi tạo toàn bộ cấu hình ban đầu cho hệ thống trước khi tương tác với cả Layer 1 và Hydra Layer 2. Nó nhận vào các tham số quan trọng để thiết lập context hoạt động của smart contract và blockchain environment.

Cụ thể:

- meshWallet: ví người dùng dùng để ký transaction, truy xuất UTxO và thực hiện các thao tác on-chain
- hydraProvider: provider kết nối tới Hydra node, giúp gửi lệnh và nhận dữ liệu từ Hydra Head
- owner: địa chỉ chủ sở hữu của smart contract, được dùng để cấu hình validator và xác định quyền trong logic on-chain
- minimumTip: giá trị tối thiểu cho mỗi lần tip, được inject vào smart contract như một rule on-chain để đảm bảo điều kiện validate

👉 Tóm lại, constructor này đóng vai trò “bootstrap configuration”, thiết lập toàn bộ context cần thiết để HydraAdapter có thể vận hành đồng thời giữa Cardano Layer 1 và Hydra Layer 2.

#### 🔹 Khởi tạo Hydra instance + Mesh builder

```ts
this.hydraInstance = new HydraInstance({
  submitter: blockfrostProvider,
  provider: this.hydraProvider,
  fetcher: blockfrostProvider,
});

this.meshTxBuilder = new MeshTxBuilder({
  fetcher: this.fetcher,
});
```

👉 Giải thích:

Ở bước này, hệ thống tiến hành khởi tạo hai thành phần cốt lõi để vận hành song song giữa Layer 1 (Cardano) và Layer 2 (Hydra).

Trước hết, HydraInstance được tạo ra như một “engine điều khiển” cho Hydra Head. Trong đó:

- submitter: chịu trách nhiệm gửi transaction lên blockchain thông qua Blockfrost provider
- provider: kết nối trực tiếp tới Hydra node, dùng để điều phối trạng thái trong Hydra Head
- fetcher: dùng để truy vấn dữ liệu từ blockchain, đảm bảo Hydra có thể đồng bộ state với Layer 1

👉 HydraInstance đóng vai trò trung tâm trong việc quản lý lifecycle của Hydra Head như commit, update state, fanout hoặc close head.

#### 🔹 Load smart contract + apply params

```ts
this.spendCompileCode = this.readValidator("tipjar.tipjar.spend");

this.spendScriptCbor = applyParamsToScript(this.spendCompileCode, [
  mPubKeyAddress(
    deserializeAddress(owner).pubKeyHash,
    deserializeAddress(owner).stakeCredentialHash,
  ),
  minimumTip,
]);
```

👉 Giải thích:

Ở bước này, hệ thống tiến hành nạp smart contract (Plutus validator) và “đóng gói” các tham số runtime vào trong script để tạo ra một phiên bản contract có thể sử dụng thực tế trên blockchain.

Đầu tiên, readValidator("tipjar.tipjar.spend") được gọi để lấy mã nguồn compiled của smart contract từ file plutus.json. Đây là validator gốc chứa toàn bộ logic on-chain của TipJar, nhưng ở trạng thái chưa được parameter hóa.

Tiếp theo, hệ thống sử dụng applyParamsToScript() để inject các tham số động vào smart contract, biến nó từ một “template contract” thành một instance cụ thể có thể deploy và sử dụng.

Trong đó:

- owner pubKeyHash + stakeCredentialHash: được tạo bằng mPubKeyAddress(deserializeAddress(owner).pubKeyHash, deserializeAddress(owner).stakeCredentialHash), dùng để xác định chủ sở hữu hợp lệ của contract trong logic on-chain
- minimumTip: giá trị tối thiểu cho mỗi lần tip, được nhúng trực tiếp vào validator để enforce rule ngay từ layer on-chain

👉 Sau khi inject xong, kết quả thu được là spendScriptCbor, tức phiên bản smart contract dạng CBOR đã được parameter hóa, sẵn sàng để: tạo script address. validate transaction, deploy lên Cardano hoặc Hydra

👉 Tóm lại, bước này biến smart contract từ dạng “code tĩnh” thành một contract động có cấu hình runtime, phù hợp với từng instance ứng dụng cụ thể.

#### 🔹 Tạo script address

```ts
this.spendAddress = serializeAddressObj(
  scriptAddress(
    deserializeAddress(
      serializePlutusScript(this.spendScript, undefined, APP_NETWORK_ID)
        .address,
    ).scriptHash,
    "",
    false,
  ),
  APP_NETWORK_ID,
);
```

👉 Giải thích:

Ở bước này, hệ thống tiến hành chuyển smart contract (Plutus script) thành một script address trên Cardano, tức là địa chỉ mà UTxO của contract sẽ được lưu trữ và truy vấn.

Quy trình diễn ra theo nhiều tầng chuyển đổi:

Đầu tiên, serializePlutusScript(this.spendScript, ...) sẽ serialize smart contract đã được parameter hóa (CBOR) thành định dạng mà Cardano hiểu được. Kết quả trả về bao gồm một địa chỉ tạm thời chứa script.

Tiếp theo, deserializeAddress(...).scriptHash được sử dụng để trích xuất script hash từ Plutus script. Script hash chính là định danh duy nhất của smart contract trên blockchain, đóng vai trò tương tự “public key” nhưng dành cho script.

Sau đó, scriptAddress(scriptHash, "", false) được dùng để xây dựng lại địa chỉ theo chuẩn Cardano, trong đó:

- scriptHash: định danh của smart contract
- "": không sử dụng staking credential
- false: chỉ định đây là script address bình thường (không phải enterprise/stake address biến thể)

Cuối cùng, serializeAddressObj(..., APP_NETWORK_ID) đảm bảo địa chỉ được encode đúng theo network (testnet hoặc mainnet), tránh sai lệch môi trường khi deploy hoặc test.

👉 Kết quả của toàn bộ quá trình này là spendAddress – địa chỉ chính thức của smart contract trên blockchain, nơi mọi UTxO của TipJar sẽ được lưu trữ, truy vấn và xử lý trong các transaction sau này.

### 🚀 3. Initialize Hydra

```ts
public async initialize(): Promise<void> {
    await this.connect();
    const protocolParameters = await this.hydraProvider.fetchProtocolParameters();

    this.hydraTxBuilder = new MeshTxBuilder({
        params: protocolParameters,
        fetcher: this.hydraProvider,
        submitter: this.hydraProvider,
        isHydra: true,
    });
}
```

👉 Giải thích:
Hàm initialize() được sử dụng để khởi tạo môi trường Hydra trước khi thực hiện bất kỳ transaction nào trên Layer 2. Đây là bước quan trọng nhằm đảm bảo Hydra node và transaction builder hoạt động đồng bộ với nhau.

Đầu tiên, hệ thống gọi await this.connect() để thiết lập kết nối tới Hydra node thông qua hydraProvider. Điều này đảm bảo ứng dụng có thể giao tiếp với Hydra Head và gửi/nhận dữ liệu trong môi trường off-chain.

Tiếp theo, hệ thống lấy về protocolParameters bằng fetchProtocolParameters(). Đây là tập hợp các thông số cấu hình của mạng Cardano (như fee, cost models, execution units…), nhưng được Hydra cung cấp lại để đảm bảo transaction trong Layer 2 vẫn tuân theo rule của mạng gốc.

Sau khi có đầy đủ tham số, hệ thống khởi tạo hydraTxBuilder:

- params: protocol parameters dùng để tính fee và validate transaction
- fetcher: Hydra provider để truy vấn dữ liệu trong Hydra environment
- submitter: Hydra provider để gửi transaction vào Hydra Head
- isHydra: true: bật chế độ Layer 2, tối ưu cho môi trường Hydra (low latency, off-chain execution)

👉 Tóm lại, bước này thiết lập một transaction builder chuyên biệt cho Hydra, giúp hệ thống có thể xử lý giao dịch nhanh hơn nhiều so với Layer 1, đồng thời vẫn đảm bảo tính nhất quán với Cardano blockchain.

### 🔌 4. Connect / Lifecycle Hydra

```ts
public connect = async () => {
  await this.hydraProvider.connect();
};

public disconnect = async () => {
  await this.hydraProvider.disconnect();
};

public init = async () => {
  await this.connect();
  await this.hydraProvider.init();
};

public close = async () => {
  await this.connect();
  await this.hydraProvider.close();
};
```

👉 Giải thích:

Đoạn code này quản lý vòng đời (lifecycle) của Hydra Head, giúp hệ thống điều khiển việc kết nối, khởi tạo và đóng Hydra một cách an toàn và có kiểm soát.

Trước hết, connect() được sử dụng để thiết lập kết nối tới Hydra node thông qua hydraProvider. Đây là bước bắt buộc để ứng dụng có thể giao tiếp với Hydra network và gửi hoặc nhận dữ liệu trong môi trường Layer 2.

Ngược lại, disconnect() dùng để ngắt hoàn toàn kết nối với Hydra node, giải phóng tài nguyên và đảm bảo không còn session nào đang hoạt động.

Hàm init() là bước khởi tạo Hydra Head. Trước tiên nó gọi connect() để đảm bảo đã có kết nối ổn định, sau đó gọi hydraProvider.init() để tạo một Hydra Head mới. Đây là bước quan trọng để bắt đầu một môi trường Layer 2 riêng biệt, nơi các giao dịch có thể được xử lý off-chain với tốc độ cao.

Cuối cùng, close() được sử dụng để đóng Hydra Head. Tương tự init(), nó cũng đảm bảo đã kết nối trước khi gọi hydraProvider.close(), giúp kết thúc session Hydra một cách an toàn và đồng bộ state về lại Layer 1 nếu cần.

👉 Tóm lại, nhóm hàm này điều khiển toàn bộ vòng đời của Hydra Head:

- connect() → mở kết nối
- init() → tạo Hydra Head
- close() → đóng Hydra Head
- disconnect() → ngắt kết nối

👉 Đây là lớp quản lý lifecycle cốt lõi giúp Hydra hoạt động ổn định trong suốt quá trình xử lý giao dịch Layer 2.

### 📥 5. Commit (đưa state vào Hydra)

```ts
public commit = async ({ utxo, blueprint = false }) => {}
```

👉 Ý nghĩa:

Hàm commit được sử dụng để đưa một UTxO từ Layer 1 (Cardano) vào Hydra Head (Layer 2). Đây là bước quan trọng giúp “migrate state” từ blockchain chính sang môi trường off-chain tốc độ cao để xử lý nhanh hơn.

#### 🔹 Build transaction cơ bản

```ts
const unsignedTx = this.meshTxBuilder
  .selectUtxosFrom(utxos)
  .txInCollateral(collateral.input.txHash, collateral.input.outputIndex)
  .changeAddress(walletAddress)
  .setFee("0")
  .setNetwork(APP_NETWORK);
```

👉 Giải thích:

Đoạn này khởi tạo transaction nền tảng trước khi commit vào Hydra.

- selectUtxosFrom(utxos): chọn các UTxO từ ví người dùng để làm input, đảm bảo đủ tài nguyên cho transaction
- txInCollateral(...): gán collateral để bảo vệ transaction khi có smart contract execution (nếu có lỗi validation sẽ dùng collateral theo cơ chế của Cardano)
- changeAddress(walletAddress): chỉ định địa chỉ nhận lại phần ADA dư sau khi transaction được xử lý
- setFee("0"): thiết lập phí bằng 0 vì Hydra hoặc L2 có thể xử lý fee theo cơ chế riêng hoặc tối ưu off-chain
- setNetwork(APP_NETWORK): xác định môi trường mạng (testnet hoặc mainnet) để đảm bảo transaction được build đúng context

👉 Tổng thể, đoạn này chuẩn bị đầy đủ input + collateral + change + network, tạo nền tảng cho việc đưa UTxO vào Hydra Head ở các bước tiếp theo.

#### 🔹 Nếu là smart contract

```ts
if (utxo && blueprint) {
  unsignedTx
    .spendingPlutusScriptV3()
    .txIn(utxo.input.txHash, utxo.input.outputIndex)
    .txInInlineDatumPresent()
    .txInRedeemerValue(mConStr0([]))
    .txInScript(this.spendScriptCbor);
}
```

👉 Giải thích:

Đoạn code này được kích hoạt khi UTxO được đưa vào Hydra có liên quan đến smart contract (Plutus script) và blueprint = true, tức là cần xử lý logic on-chain trước khi commit vào Hydra Head.

Cụ thể, hệ thống sẽ biến transaction thành một Plutus spending transaction:

- spendingPlutusScriptV3(): kích hoạt chế độ transaction dành cho smart contract sử dụng Plutus V3 validator
- txIn(utxo.input.txHash, utxo.input.outputIndex): consume UTxO hiện tại từ smart contract, tức là “lấy state ra để xử lý”
- txInInlineDatumPresent(): lấy datum đang được lưu trực tiếp trong UTxO để phục vụ cho quá trình validate
- txInRedeemerValue(mConStr0([])): truyền redeemer vào validator, ở đây mConStr0([]) đại diện cho action cụ thể (ví dụ: commit hoặc update state)
- txInScript(this.spendScriptCbor): gắn smart contract (CBOR bytecode) vào transaction để blockchain thực thi logic kiểm tra

👉 Tóm lại, đoạn này thực hiện consume UTxO + chạy validator on-chain, đảm bảo rằng mọi state được đưa vào Hydra đều đã được kiểm chứng hợp lệ bởi smart contract trước khi chuyển sang Layer 2.

#### 🔹 Encode datum nếu có

```ts
if (utxo.output.plutusData) {
  unsignedTx
    .txOut(utxo.output.address, utxo.output.amount)
    .txOutInlineDatumValue(utxo.output.plutusData, "CBOR");
}
```

👉 Giải thích:

Đoạn code này xử lý trường hợp UTxO đi kèm datum (state của smart contract), nhằm đảm bảo trạng thái của ứng dụng được giữ nguyên khi đưa vào Hydra hoặc khi chuyển tiếp giữa các bước xử lý.

Cụ thể:

- utxo.output.plutusData: kiểm tra xem UTxO có chứa datum hay không. Datum chính là dữ liệu trạng thái của smart contract được lưu on-chain
- txOut(utxo.output.address, utxo.output.amount): tạo lại output với đúng địa chỉ và giá trị ban đầu của UTxO, đảm bảo không làm thay đổi tài sản
- txOutInlineDatumValue(..., "CBOR"): gắn lại datum vào output theo định dạng CBOR, giúp blockchain và Hydra có thể đọc lại trạng thái một cách chính xác

👉 Ý nghĩa quan trọng: Bước này đảm bảo rằng state của smart contract không bị mất hoặc thay đổi, mà được “đóng gói” lại cùng UTxO khi chuyển sang Hydra hoặc khi tiếp tục xử lý transaction.

👉 Tóm lại, đây là bước giữ nguyên state on-chain bằng cách encode lại datum, giúp đảm bảo tính nhất quán dữ liệu trong toàn bộ lifecycle của UTxO.

#### 🔹 Submit vào Hydra

```ts
const cborHex = await unsignedTx.complete();
return await this.hydraInstance.commitBlueprint(
  utxo.input.txHash,
  utxo.input.outputIndex,
  {
    cborHex,
    description: "",
    type: "Tx ConwayEra",
  },
);
```

👉 Giải thích:

Đây là bước cuối cùng trong quy trình commit UTxO vào Hydra Head, nơi transaction đã được xây dựng hoàn chỉnh sẽ được đóng gói và gửi vào Layer 2 để xử lý.

Trước hết, unsignedTx.complete() được gọi để finalize transaction. Ở bước này, toàn bộ thông tin như input, output, fee, script, datum và collateral sẽ được tổng hợp lại thành một transaction hoàn chỉnh dưới dạng CBOR hex (cborHex), sẵn sàng để submit.

Sau đó, hệ thống gọi hydraInstance.commitBlueprint(), đây là hàm chịu trách nhiệm gửi transaction vào Hydra Head theo dạng blueprint commit.

Trong đó:

- utxo.input.txHash + outputIndex: xác định chính xác UTxO đang được commit vào Hydra
- cborHex: transaction đã được serialize hoàn chỉnh để Hydra có thể xử lý
- description: metadata mô tả transaction (ở đây để trống)
- type: "Tx ConwayEra": chỉ định định dạng transaction theo Conway era của Cardano

👉 Kết quả của bước này là UTxO từ Layer 1 được đưa vào Hydra Head, sẵn sàng cho các xử lý off-chain với tốc độ cao và độ trễ thấp.

👉 Tóm lại, đây là bước “final submit”, nơi transaction được chính thức chuyển từ builder state sang Hydra execution layer.

### 🔁 6. Deposit (incremental update Hydra)

```ts
await this.hydraProvider.subscribeSnapshotUtxo();
```

👉 Giải thích:

Ở bước này, hệ thống bắt đầu đồng bộ trạng thái hiện tại của Hydra Head trước khi thực hiện cập nhật incremental. subscribeSnapshotUtxo() giúp client nhận snapshot UTxO mới nhất từ Hydra, đảm bảo rằng state local và state trong Hydra Head không bị lệch.

Việc sync này rất quan trọng vì Hydra hoạt động theo mô hình stateful off-chain, nên mọi thay đổi đều cần dựa trên snapshot mới nhất để tránh conflict hoặc stale data.

```ts
return await this.hydraInstance.incrementalBlueprintCommit(
  utxo.input.txHash,
  utxo.input.outputIndex,
  { cborHex },
);
```

👉 Giải thích:

Sau khi đã đồng bộ state, hệ thống tiến hành thực hiện incremental commit vào Hydra Head thông qua incrementalBlueprintCommit(). Khác với commit() (full commit), phương thức này chỉ cập nhật một phần state thay đổi, thay vì đưa toàn bộ UTxO vào Hydra lại từ đầu.

Cụ thể:

- utxo.input.txHash + outputIndex: xác định UTxO đang được cập nhật
- cborHex: transaction đã được serialize, chứa logic cập nhật state mới
- incrementalBlueprintCommit: chỉ gửi phần thay đổi vào Hydra Head, giúp tối ưu hiệu năng và giảm overhead so với full commit

👉 Ý nghĩa quan trọng: Không reset toàn bộ state Hydra, Chỉ cập nhật phần dữ liệu thay đổi, Giảm latency và tăng hiệu suất xử lý real-time
👉 Tóm lại, đây là cơ chế “partial state update” trong Hydra, giúp hệ thống đạt hiệu năng cao khi xử lý nhiều giao dịch liên tục trong Layer 2.

### 🔓 7. Decommit (rút khỏi Hydra)

```ts
const unsignedTx = this.hydraTxBuilder
  .selectUtxosFrom(utxos)
  .txInCollateral(collateral.input.txHash, collateral.input.outputIndex)
  .changeAddress(walletAddress)
  .setFee("0")
  .setNetwork(APP_NETWORK);
```

👉 Giải thích:

Đoạn code này bắt đầu quá trình decommit, tức là đưa tài sản từ Hydra Head (Layer 2) quay trở lại Layer 1 (Cardano). Đây là bước quan trọng để “thoát” khỏi môi trường off-chain và đưa state trở lại blockchain chính.

Cụ thể:

- selectUtxosFrom(utxos): chọn các UTxO đang tồn tại trong Hydra context để làm input cho transaction L2
- txInCollateral(...): gán collateral để đảm bảo an toàn khi xử lý transaction có liên quan đến script
- changeAddress(walletAddress): chỉ định địa chỉ ví người dùng sẽ nhận lại tài sản sau khi decommit
- setFee("0"): đặt phí bằng 0 vì Hydra xử lý off-chain, fee có thể được tối ưu trong quá trình exit
- setNetwork(APP_NETWORK): xác định môi trường mạng (testnet/mainnet) để đảm bảo transaction được build đúng context

👉 Tóm lại, đây là bước chuẩn bị transaction trong Hydra Layer 2 environment trước khi đưa tài sản quay lại Layer 1.

```ts
return await unsignedTx.complete();
```

👉 Giải thích:

Sau khi transaction được xây dựng hoàn chỉnh, complete() sẽ serialize toàn bộ dữ liệu (input, output, script, fee…) thành một transaction hợp lệ.

Kết quả trả về là một transaction đã sẵn sàng để: ký bằng ví người dùng, hoặc submit ra Layer 1 (Cardano blockchain)
👉 Ý nghĩa quan trọng: Đây là bước “exit Hydra Head”, Chuyển state từ Layer 2 → Layer 1, Kết thúc vòng đời xử lý off-chain
👉 Tóm lại, decommit là cơ chế đưa dữ liệu từ Hydra trở lại blockchain chính một cách an toàn và có kiểm soát.

### 🧠 8. Decode datum

```ts
public convertDatum = function (plutusData: string) {
  const datum = deserializeDatum(plutusData || "");

  return datum.fields.map((item: any) => {
    const address = Buffer.from(item.fields[0].bytes, "hex").toString("utf8");
    const amount = item.fields[1].int;

    return { address, amount };
  });
};
```

👉 Giải thích:

Hàm convertDatum được sử dụng để giải mã datum (dữ liệu on-chain của smart contract) từ định dạng CBOR sang dạng object dễ xử lý trong ứng dụng.

Đầu tiên, deserializeDatum(plutusData || "") sẽ chuyển chuỗi CBOR (Plutus data format) thành cấu trúc dữ liệu nội bộ mà hệ thống có thể đọc được. Datum trong Cardano thường được encode dưới dạng binary/CBOR nên không thể sử dụng trực tiếp.

Sau khi giải mã, hệ thống truy cập vào datum.fields, đây là nơi chứa danh sách các record dữ liệu được lưu trong smart contract.

Tiếp theo, mỗi item trong fields sẽ được parse như sau:

- item.fields[0].bytes: chứa địa chỉ người dùng ở dạng hex, sau đó được convert từ hex → utf8 bằng Buffer.from(...).toString("utf8") để lấy lại địa chỉ ví dạng readable
- item.fields[1].int: chứa số lượng ADA (hoặc amount) mà người dùng đã tip hoặc lưu trong contract

Cuối cùng, hàm trả về một mảng object có cấu trúc rõ ràng:

```ts
[{ address: string, amount: number }];
```

👉 Ý nghĩa quan trọng: Chuyển dữ liệu từ on-chain format (CBOR) sang off-chain usable object. Giúp frontend/backend dễ dàng hiển thị hoặc xử lý logic. Là bước bridge giữa smart contract state và application state
👉 Tóm lại, đây là hàm “decoder” giúp biến dữ liệu blockchain phức tạp thành cấu trúc dữ liệu đơn giản và dễ sử dụng trong hệ thống.

## 🌊 HydraTxBuilder – Tip & Claim logic trên Hydra

HydraTxBuilder là lớp kế thừa từ HydraAdapter, vì vậy nó thừa hưởng toàn bộ cấu hình nền tảng gồm Hydra instance, Mesh TxBuilder, smart contract Plutus và provider kết nối blockchain. Thay vì phải xử lý lại các bước khởi tạo phức tạp, lớp này chỉ tập trung vào phần business logic của ứng dụng TipJar.

Về bản chất, toàn bộ hệ thống TipJar trên Hydra được xây dựng xoay quanh mô hình UTxO state machine, trong đó mỗi transaction không chỉ chuyển tiền mà còn đồng thời thay đổi trạng thái (state) của smart contract thông qua datum.

Trong thiết kế này, HydraTxBuilder chỉ đảm nhận hai luồng nghiệp vụ chính:

### 💰 1. Tip – gửi tiền vào smart contract (Hydra state update)

```ts
tip = async ({ amount }: { amount: string }): Promise<string> => {};
```

Hàm tip() được thiết kế để xử lý hành động người dùng gửi ADA vào hệ thống TipJar chạy trên Hydra. Tuy nhiên, về bản chất, đây không chỉ là một giao dịch chuyển tiền thông thường mà là một quá trình thay đổi trạng thái (state transition) trong mô hình UTxO của Cardano.

Khi người dùng thực hiện tip, hệ thống sẽ không ghi đè dữ liệu cũ như trong database truyền thống. Thay vào đó, toàn bộ trạng thái của TipJar được biểu diễn thông qua datum gắn với UTxO, và mỗi lần tip sẽ tạo ra một UTxO mới mang theo state đã được cập nhật.

Trong quá trình xử lý, hệ thống sẽ đọc trạng thái hiện tại từ smart contract, sau đó giải mã datum từ CBOR sang cấu trúc dữ liệu có thể sử dụng. Từ đó, logic ứng dụng sẽ kiểm tra xem người dùng đã từng tip trước đó hay chưa để quyết định cách cập nhật state.

Nếu người dùng đã tồn tại trong datum, hệ thống sẽ cộng dồn số tiền tip mới vào giá trị cũ. Ngược lại, nếu đây là lần đầu tiên người dùng tip, một record mới sẽ được thêm vào danh sách state.

#### 🔹 1. Lấy dữ liệu ví + UTxO contract

```ts
const { utxos, collateral, walletAddress } = await this.getWalletForHydraTx();
```

Trong bước này, hệ thống tiến hành chuẩn bị toàn bộ dữ liệu đầu vào cần thiết để xây dựng một transaction trên Hydra. Đây là bước khởi đầu quan trọng vì Hydra hoạt động dựa trên mô hình UTxO, nên mọi state và tài nguyên đều phải được truy xuất rõ ràng trước khi xử lý logic tip hoặc claim.

Trước hết, hàm getWalletForHydraTx() được gọi để lấy thông tin từ ví người dùng. Kết quả trả về bao gồm ba thành phần chính:

- utxos: danh sách UTxO hiện có trong ví người dùng, được sử dụng làm input để trả phí giao dịch và cung cấp tài nguyên cho transaction
- collateral: một UTxO đặc biệt dùng làm tài sản đảm bảo khi thực thi smart contract, giúp hệ thống an toàn nếu validator thất bại
- walletAddress: địa chỉ ví của người dùng, đóng vai trò là nguồn gửi và nhận tài sản trong transaction

Sau đó, hệ thống truy vấn trạng thái hiện tại của smart contract thông qua Hydra provider:

```ts
const utxo = (await this.hydraProvider.fetchAddressUTxOs(this.spendAddress))[0];
```

Đoạn code này lấy UTxO đang tồn tại tại spendAddress, tức là state hiện tại của TipJar trong Hydra Head. Việc lấy [0] giả định rằng contract chỉ duy trì một state chính tại một thời điểm.

👉 Tổng kết lại, bước này đóng vai trò như một giai đoạn load state và chuẩn bị execution context, bao gồm: dữ liệu từ ví người dùng tài sản đảm bảo (collateral) trạng thái hiện tại của smart contract

👉 Đây chính là bước “đọc toàn bộ input state từ Hydra” trước khi thực hiện bất kỳ thay đổi nào trong hệ thống.

#### 🔹 2. Khởi tạo transaction builder

```ts
const unsignedTx = this.hydraTxBuilder;
```

Ở bước này, hệ thống tiến hành khởi tạo transaction builder cho Hydra Layer 2, thông qua hydraTxBuilder. Đây là thành phần chịu trách nhiệm xây dựng toàn bộ cấu trúc giao dịch trước khi được ký và gửi lên Hydra Head.

Thay vì tạo một transaction từ đầu, hệ thống sử dụng một instance đã được cấu hình sẵn trong HydraAdapter. Điều này giúp đảm bảo rằng transaction luôn tuân thủ các tham số cần thiết như: protocol parameters của Hydra cấu hình network cơ chế xử lý UTxO trong Layer 2 hỗ trợ Plutus script execution

Về mặt kiến trúc, hydraTxBuilder đóng vai trò là transaction engine của Hydra, tương tự như MeshTxBuilder trong Layer 1 nhưng được tối ưu cho môi trường off-chain và real-time execution. Điều này có nghĩa là:

- transaction không chỉ được build mà còn được tối ưu cho Hydra Head
- có thể xử lý state nhanh hơn so với Layer 1
- hỗ trợ các thao tác như commit, deposit, decommit trong cùng một pipeline

👉 Tóm lại, dòng code này không đơn thuần là khởi tạo một biến, mà là bước kích hoạt engine xây dựng transaction trên Layer 2, làm nền tảng cho toàn bộ logic tip hoặc claim phía sau.

#### 🔹 3. Nếu contract đã tồn tại state

```ts
if (utxo) {
}
```

Trong bước này, hệ thống kiểm tra xem TipJar smart contract đã có state trước đó hay chưa. Nếu utxo tồn tại, điều đó có nghĩa là contract đã từng được sử dụng và đang chứa dữ liệu on-chain trong Hydra.

🧠 3.1 Decode datum (state hiện tại)

```ts
const datum = this.convertDatum(utxo.output.plutusData as string);
```

👉 Giải thích:

Datum trong Cardano được lưu dưới dạng CBOR (binary format), vì vậy cần phải giải mã trước khi xử lý logic.

Sau khi decode, dữ liệu được chuyển về dạng dễ thao tác: 👉 Đây chính là “database on-chain” của TipJar.

```ts
[{ address, amount }];
```

🧠 3.2 Update logic tip

```ts
const existing = datum.find((d) => d.address === walletAddress);
```

👉 kiểm tra user đã tip chưa

Nếu đã tồn tại:
existing.amount += Number(amount);
Nếu chưa:
datum.push({
address: walletAddress,
amount: Number(amount),
});

👉 Đây là logic state machine:

update user cũ
hoặc thêm user mới

🔥 3.3 Consume UTxO + update state
unsignedTx
.spendingPlutusScriptV3()
.txIn(utxo.input.txHash, utxo.input.outputIndex)
.txInScript(this.spendScriptCbor)
.txInInlineDatumPresent()
.txInRedeemerValue(mConStr0([]))

👉 Ý nghĩa:

consume state cũ
chạy validator
lấy datum hiện tại
gửi action “tip”

💰 3.4 Tính lại tổng ADA
.txOut(this.spendAddress, [
{
unit: "lovelace",
quantity: String(
utxo.output.amount.reduce((total, asset) => {
if (asset.unit === "lovelace") {
return total + Number(asset.quantity);
}
return total;
}, Number(amount)),
),
},
])

👉 Ý nghĩa:

lấy tổng ADA cũ
amount mới
tạo UTxO mới

👉 Đây là state immutability (UTxO model)

🧾 3.5 Encode datum mới
.txOutInlineDatumValue(
mConStr0(
datum.map((d) =>
mConStr0([d.address, d.amount])
)
)
);

👉 Lưu lại state mới lên blockchain:

[{ address, amount }]

#### 🆕 4. Nếu chưa có UTxO (init state)

```ts
} else {
```

👉 Giải thích:

Đây là trường hợp TipJar chưa từng được sử dụng trước đó, tức là chưa có UTxO nào tồn tại tại smart contract address. Vì vậy, hệ thống sẽ thực hiện bước khởi tạo state đầu tiên (bootstrap state).

Ở giai đoạn này, không có dữ liệu cũ để đọc hoặc cập nhật, nên toàn bộ state sẽ được tạo mới từ đầu.

💰 4.1 Tạo UTxO mới tại smart contract

```ts
.txOut(this.spendAddress, [
  {
    unit: "lovelace",
    quantity: amount,
  },
])
```

👉 Giải thích:

Hệ thống tạo một UTxO mới tại spendAddress (smart contract address) và gửi vào đó số ADA ban đầu.

- spendAddress: địa chỉ của TipJar smart contract
- lovelace: đơn vị nhỏ nhất của ADA
- amount: số tiền tip đầu tiên

👉 Đây là bước “seed funding” cho contract.

🧾 4.2 Khởi tạo datum (state ban đầu)

```ts
.txOutInlineDatumValue(
  mConStr0([
    mConStr0([walletAddress, Number(amount)]),
  ])
);
```

👉 Giải thích:

Vì đây là lần đầu tiên contract được khởi tạo, hệ thống sẽ tạo datum ban đầu với cấu trúc đơn giản: chỉ có 1 user, chỉ có 1 record tip

Cấu trúc state: `[[walletAddress, amount]]`

#### ⚙️ 5. Final transaction setup

Ở bước này, hệ thống tiến hành hoàn thiện transaction trước khi build, đảm bảo mọi thành phần cần thiết đã được gán đầy đủ để transaction có thể chạy hợp lệ trên Hydra / Cardano.

```ts
unsignedTx
  .selectUtxosFrom(utxos)
  .changeAddress(walletAddress)
  .setFee("0")
  .txInCollateral(collateral.input.txHash, collateral.input.outputIndex)
  .setNetwork(APP_NETWORK);
```

Trước hết, selectUtxosFrom(utxos) được sử dụng để lấy các UTxO từ ví người dùng. Các UTxO này đóng vai trò là input cho transaction, đồng thời cung cấp tài sản để trả phí và đảm bảo đủ điều kiện thực thi theo mô hình UTxO của Cardano.

Tiếp theo, changeAddress(walletAddress) xác định địa chỉ nhận lại phần tài sản dư sau khi transaction được thực thi. Điều này đảm bảo rằng không có ADA hoặc token nào bị thất thoát trong quá trình xử lý.

Sau đó, setFee("0") thiết lập phí giao dịch bằng 0 trong bối cảnh Hydra hoặc môi trường test, nơi phí có thể được tối ưu hoặc xử lý bởi hệ thống thay vì người dùng.

Tiếp theo, txInCollateral(...) được dùng để gán collateral cho transaction. Đây là một cơ chế an toàn trong Plutus, giúp đảm bảo nếu smart contract thất bại thì vẫn có tài sản bảo chứng để xử lý, tránh làm hỏng toàn bộ transaction.

Cuối cùng, setNetwork(APP_NETWORK) xác định môi trường blockchain mà transaction sẽ được build, chẳng hạn như testnet hoặc mainnet, nhằm đảm bảo các tham số protocol được áp dụng đúng.

👉 Tóm lại, đoạn này là bước chuẩn bị cuối cùng của transaction, nơi hệ thống gom toàn bộ input, output, collateral và network config để sẵn sàng cho bước build và submit.

#### 🚀 6. Build transaction

```ts
return await unsignedTx.complete();
```

Ở bước cuối cùng này, hệ thống thực hiện quá trình build transaction hoàn chỉnh từ toàn bộ cấu hình đã được thiết lập ở các bước trước đó. Đây là giai đoạn quan trọng vì nó chuyển transaction từ dạng “builder logic” sang dạng “transaction thực thi được trên blockchain”.

Khi gọi complete(), toàn bộ dữ liệu bên trong unsignedTx sẽ được tổng hợp lại, bao gồm UTxO input đã chọn, các output, datum của smart contract (nếu có), redeemer, script Plutus, fee và collateral. Sau đó, hệ thống sẽ tiến hành serialize toàn bộ transaction theo chuẩn Cardano.

Kết quả trả về của hàm này là một chuỗi CBOR hex transaction, đây là định dạng chuẩn mà Cardano sử dụng để biểu diễn một transaction đã được mã hóa. Transaction này chưa được ký và chưa được gửi lên mạng, nhưng đã ở trạng thái sẵn sàng để xử lý tiếp.

Từ CBOR này, hệ thống sẽ tiếp tục bước tiếp theo là ký bằng ví người dùng (sign transaction) và submit lên Hydra hoặc Cardano network để thực thi.

👉 Tóm lại, complete() là bước “đóng gói cuối cùng” giúp chuyển toàn bộ logic tip/claim thành một transaction hợp lệ, có thể ký và broadcast lên blockchain.

### 🔓 2. Claim – rút toàn bộ tiền từ TipJar

```ts
claim = async (): Promise<string> => {};
```

Hàm claim() được sử dụng để thực hiện hành động rút toàn bộ số tiền đang được lưu trong smart contract TipJar về ví của người dùng. Đây là bước ngược lại hoàn toàn với tip(), nơi thay vì cập nhật state, hệ thống sẽ consume (tiêu thụ) toàn bộ UTxO hiện tại của contract.

Về bản chất, trong mô hình UTxO của Cardano, việc claim không phải là “đọc và xóa dữ liệu” như database truyền thống, mà là: lấy UTxO hiện tại của smart contract, kích hoạt validator với action “claim”, tiêu thụ UTxO đó (consume state), tạo output mới trả toàn bộ tài sản về ví người dùng

👉 Nói cách khác, claim() chính là quá trình kết thúc vòng đời của state trong TipJar, nơi toàn bộ ADA đang được giữ trong contract sẽ được chuyển lại cho owner hoặc người đủ điều kiện theo logic của smart contract.

#### 🔹 1. Lấy data ví + contract UTxO

```ts
const { utxos, collateral, walletAddress } = await this.getWalletForHydraTx();

const utxo = (await this.hydraProvider.fetchAddressUTxOs(this.spendAddress))[0];
```

Ở bước đầu tiên của hàm claim(), hệ thống tiến hành thu thập toàn bộ dữ liệu cần thiết để xây dựng transaction rút tiền từ smart contract TipJar trên Hydra.

Trước hết, hàm getWalletForHydraTx() được gọi để lấy thông tin từ ví người dùng. Kết quả trả về bao gồm ba thành phần quan trọng:

- utxos: danh sách UTxO thuộc về ví người dùng, được sử dụng để làm input cho transaction và đảm bảo đủ tài nguyên để xử lý phí và execution
- collateral: UTxO dùng làm tài sản đảm bảo khi thực thi smart contract, giúp - transaction an toàn trong trường hợp validator thất bại
- walletAddress: địa chỉ ví của người dùng, đóng vai trò là nơi nhận lại toàn bộ ADA sau khi claim thành công

Sau đó, hệ thống truy vấn trạng thái hiện tại của smart contract thông qua Hydra provider:

```ts
const utxo = (await this.hydraProvider.fetchAddressUTxOs(this.spendAddress))[0];
```

Đoạn code này lấy UTxO đang tồn tại tại spendAddress, tức là toàn bộ state hiện tại của TipJar trong Hydra Head. Việc lấy phần tử [0] giả định rằng contract chỉ duy trì một UTxO chính tại một thời điểm, đại diện cho toàn bộ trạng thái ứng dụng.

👉 Tóm lại, bước này có vai trò như “load execution context”, bao gồm: dữ liệu ví người dùng (inputs + collateral). trạng thái hiện tại của smart contract (UTxO + datum).

👉 Đây là bước chuẩn bị nền tảng trước khi hệ thống tiến hành consume state và thực hiện hành vi claim.

#### 🔓 2. Consume UTxO (claim logic)

```ts
.spendingPlutusScriptV3()
.txIn(utxo.input.txHash, utxo.input.outputIndex)
.txInInlineDatumPresent()
.txInRedeemerValue(mConStr1([]))
.txInScript(this.spendScriptCbor)
```

Ở bước này, hệ thống bắt đầu thực hiện quá trình consume UTxO của smart contract để kích hoạt logic claim trong TipJar. Đây là giai đoạn quan trọng vì nó quyết định toàn bộ state hiện tại của contract sẽ bị tiêu thụ và chuyển sang trạng thái kết thúc. Trước hết, spendingPlutusScriptV3() được sử dụng để chỉ định rằng transaction này sẽ chạy dưới Plutus V3 validator, tức là mọi logic on-chain sẽ được kiểm tra bởi smart contract trước khi transaction được chấp nhận. Tiếp theo, txIn(utxo.input.txHash, utxo.input.outputIndex) xác định UTxO hiện tại của TipJar sẽ bị consume. Đây chính là state đang được lưu trong contract, bao gồm toàn bộ dữ liệu tip trước đó.

Sau đó, txInInlineDatumPresent() đảm bảo rằng datum (tức state hiện tại của contract) sẽ được đưa vào transaction để validator có thể đọc và xử lý logic liên quan. Điểm quan trọng nhất nằm ở txInRedeemerValue(mConStr1([])). Giá trị mConStr1([]) đóng vai trò như một signal “claim” gửi vào smart contract, giúp validator phân biệt đây là hành động rút tiền chứ không phải tip. Khi nhận được redeemer này, contract sẽ thực thi logic tương ứng để cho phép consume state. Cuối cùng, txInScript(this.spendScriptCbor) gắn toàn bộ compiled Plutus script vào transaction, giúp validator có thể thực thi kiểm tra logic on-chain một cách chính xác.

👉 Tóm lại, bước này chính là quá trình kích hoạt smart contract để consume toàn bộ state hiện tại của TipJar và chuẩn bị cho việc rút tiền về ví người dùng.

#### 💰 3. Trả tiền về user

```ts
.txOut(walletAddress, utxo.output.amount)
```

Ở bước này, hệ thống thực hiện việc chuyển toàn bộ giá trị đang bị khóa trong smart contract TipJar về ví của người dùng sau khi UTxO đã được consume hợp lệ ở bước trước.

Cụ thể, walletAddress chính là địa chỉ ví người dùng, đóng vai trò là điểm nhận tài sản sau khi claim thành công. Trong khi đó, utxo.output.amount là toàn bộ số ADA (và các asset nếu có) đang được lưu trong UTxO của contract tại thời điểm hiện tại.

Khi transaction được thực thi, Cardano sẽ tạo ra một UTxO mới tại walletAddress chứa toàn bộ giá trị này, đồng thời UTxO cũ trong smart contract đã bị tiêu thụ ở bước spendingPlutusScriptV3, nên trạng thái cũ không còn tồn tại nữa.

👉 Nói cách khác, đây chính là bước “giải phóng tài sản” từ contract, nơi toàn bộ số tiền trong TipJar được chuyển thẳng về ví người dùng và kết thúc vòng đời của state trong claim flow.

#### 🔐 4. Security check

```ts
.requiredSignerHash(
deserializeAddress(walletAddress).pubKeyHash
)
```

Ở bước này, hệ thống thiết lập cơ chế xác thực quyền sở hữu ví trước khi cho phép thực hiện claim. Cụ thể, deserializeAddress(walletAddress).pubKeyHash sẽ trích xuất public key hash từ địa chỉ ví người dùng, đây là định danh mật mã đại diện cho chủ sở hữu thực sự của ví trên Cardano.

Sau đó, requiredSignerHash(...) được thêm vào transaction để bắt buộc rằng transaction phải được ký bởi đúng private key tương ứng với pubKeyHash này. Nếu chữ ký không hợp lệ hoặc không khớp với địa chỉ ví, transaction sẽ bị từ chối ngay trong quá trình validation.

👉 Điều này đảm bảo rằng chỉ chủ sở hữu hợp pháp của ví mới có quyền thực hiện claim từ smart contract, ngăn chặn mọi hành vi rút tiền trái phép và đảm bảo tính an toàn ở mức cryptographic trong toàn bộ hệ thống.

#### ⚙️ 5. Final setup

```ts
.changeAddress(walletAddress)
.selectUtxosFrom(utxos)
.setFee("0")
.txInCollateral(...)
.setNetwork(APP_NETWORK);
```

Ở bước này, hệ thống thực hiện hoàn thiện cấu hình cuối cùng của transaction trước khi build và ký, đảm bảo mọi thành phần cần thiết đã được thiết lập đầy đủ để transaction có thể hoạt động hợp lệ trên Hydra / Cardano.

Trước hết, changeAddress(walletAddress) được dùng để xác định địa chỉ nhận lại toàn bộ tài sản sau khi claim thành công. Điều này đảm bảo rằng số ADA được rút từ smart contract sẽ được chuyển về đúng ví người dùng.

Tiếp theo, selectUtxosFrom(utxos) chọn các UTxO từ ví người dùng để làm input cho transaction, giúp đảm bảo có đủ tài nguyên để xử lý phí và thực thi logic on-chain nếu cần.

Sau đó, setFee("0") thiết lập phí giao dịch bằng 0 trong môi trường Hydra hoặc test, nơi fee có thể được tối ưu hoặc xử lý khác so với Layer 1 truyền thống.

Tiếp đến, txInCollateral(...) gán collateral UTxO vào transaction. Đây là cơ chế bảo vệ khi chạy Plutus script, giúp đảm bảo rằng nếu validator thất bại thì vẫn có tài sản bảo chứng để xử lý an toàn, tránh làm hỏng toàn bộ transaction.

Cuối cùng, setNetwork(APP_NETWORK) xác định môi trường blockchain mà transaction sẽ được build, chẳng hạn như testnet hoặc mainnet, nhằm đảm bảo tất cả tham số protocol được áp dụng đúng với mạng đang sử dụng.

👉 Tóm lại, đây là bước “chốt cấu hình transaction”, nơi hệ thống gom đầy đủ input, output, collateral và network trước khi chuyển sang giai đoạn build CBOR và submit.

#### 🚀 6. Build tx

```ts
return await unsignedTx.complete();
```

Ở bước cuối cùng này, hệ thống tiến hành build toàn bộ transaction thành định dạng có thể ký và submit lên blockchain hoặc Hydra. Đây là giai đoạn chuyển từ cấu trúc transaction dạng builder sang một transaction thực tế đã được serialize.

Khi gọi complete(), toàn bộ các thành phần đã được cấu hình trước đó như UTxO input, output, datum, redeemer, script Plutus, collateral, fee và network sẽ được tổng hợp lại và xử lý theo chuẩn Cardano.

Kết quả trả về là một CBOR hex transaction, đây là dạng dữ liệu đã được mã hóa, sẵn sàng để ví người dùng ký (sign) và gửi lên mạng lưới để thực thi.

👉 Tóm lại, bước này đóng vai trò như “bước đóng gói cuối cùng”, biến toàn bộ logic claim thành một transaction hợp lệ, sẵn sàng để ký và submit lên blockchain.

## 🌊 Hydra Test Suite – Tổng quan

Đây là một bộ test được thiết kế để mô phỏng toàn bộ vòng đời hoạt động của Hydra Head kết hợp với smart contract TipJar, từ giai đoạn khởi tạo, vận hành cho đến đóng và chuyển trạng thái về Layer 1.

Cụ thể, hệ thống sẽ bắt đầu bằng việc khởi tạo Hydra Head (init), nơi một state channel được mở giữa các participant để cho phép xử lý giao dịch off-chain với tốc độ cao. Sau khi Hydra Head được tạo, các bước tiếp theo sẽ kiểm tra toàn bộ cơ chế quản lý vòng đời của nó như close (đóng Hydra Head) và fanout (phân phối toàn bộ state về Layer 1) nhằm đảm bảo dữ liệu luôn có thể đồng bộ ngược về blockchain chính.

Bên cạnh lifecycle, bộ test còn mô phỏng cơ chế commit và decommit tài sản giữa Layer 1 và Layer 2, trong đó commit dùng để đưa UTxO từ main chain vào Hydra Head để xử lý, còn decommit cho phép rút tài sản từ Hydra trở lại Layer 1 khi cần thiết.

Cuối cùng, phần quan trọng nhất là kiểm thử logic ứng dụng thông qua smart contract TipJar, bao gồm hai hành động chính là tip (gửi ADA và cập nhật state trong Hydra) và claim (rút toàn bộ ADA từ contract trong Hydra environment). Đây là phần thể hiện rõ nhất khả năng xử lý state realtime của Hydra so với mô hình truyền thống trên Layer 1.

👉 Tóm lại, toàn bộ test suite này không chỉ kiểm tra Hydra Head mà còn mô phỏng đầy đủ một hệ thống dApp end-to-end, từ quản lý state, smart contract execution cho đến luồng tài sản giữa Layer 1 và Layer 2.

### ⚙️ 1. Setup môi trường test

```ts
beforeEach(async function () {
  await sodium.ready;

  meshWallet = new MeshWallet({
    accountIndex: 0,
    networkId: APP_NETWORK_ID,
    fetcher: blockfrostProvider,
    submitter: blockfrostProvider,
    key: {
      type: "mnemonic",
      words: APP_MNEMONIC?.split(" "),
    },
  });

  hydraProvider = new HydraProvider({
    httpUrl: isCreator ? HYDRA_HTTP_URL : HYDRA_HTTP_URL_SUB,
  });

  owner =
    "addr_test1qrr879mjnxd3gjqjdgjxkwzfcnvcgsve927scqk5fc3gfs2hs03pn7uhujentyhzq3ays72u4xtfrlahyjalujhxufsqdeezc0";
});
```

Trước khi chạy bất kỳ test nào, hệ thống sẽ thực hiện bước khởi tạo toàn bộ môi trường Hydra testing, đảm bảo mọi thành phần cần thiết đã sẵn sàng để mô phỏng một Hydra Head hoàn chỉnh.

Đầu tiên, await sodium.ready được gọi để đảm bảo thư viện cryptographic libsodium đã được khởi tạo đầy đủ. Đây là thành phần quan trọng dùng cho các thao tác liên quan đến mã hóa, ký số và xác thực trong quá trình tạo và xử lý transaction.

Tiếp theo, MeshWallet được khởi tạo để đại diện cho ví Cardano của người dùng trong môi trường test. Ví này đóng vai trò thực hiện các chức năng như ký transaction (signTx), truy vấn UTxO, và submit transaction lên mạng. Các thông số như accountIndex, networkId, fetcher, submitter và mnemonic được cung cấp để đảm bảo ví hoạt động đúng trong môi trường testnet.

Sau đó, HydraProvider được khởi tạo với httpUrl, giúp kết nối tới Hydra node. Tùy thuộc vào biến isCreator, hệ thống sẽ kết nối tới node creator hoặc follower, từ đó mô phỏng vai trò của các participant trong Hydra Head.

Cuối cùng, biến owner được gán là địa chỉ ví của smart contract TipJar. Đây là địa chỉ đóng vai trò quản lý và xác định quyền sở hữu logic trong toàn bộ test suite.

👉 Tóm lại, bước này tạo ra nền tảng runtime hoàn chỉnh cho Hydra test, bao gồm: môi trường cryptography (sodium). ví Cardano (MeshWallet). kết nối Hydra node (HydraProvider). owner smart contract

👉 Đây là điều kiện bắt buộc để mọi test liên quan đến Hydra Head có thể hoạt động chính xác và nhất quán

### 🔧 2. Hydra lifecycle tests

Trong phần này, hệ thống kiểm tra toàn bộ vòng đời (lifecycle) của một Hydra Head, từ lúc khởi tạo, vận hành đến khi đóng và đồng bộ trạng thái về Layer 1. Đây là các bước quan trọng để đảm bảo Hydra hoạt động đúng như một state channel hoàn chỉnh.

#### 🚀 Init Hydra Head

```ts
await hydraTxBuilder.init();
```

👉 Giải thích:

Bước này dùng để khởi tạo một Hydra Head mới, tức là mở một state channel giữa các participant.

Khi gọi init():

- một Hydra Head được tạo trên Hydra network
- các node tham gia bắt đầu đồng bộ trạng thái
- sẵn sàng cho việc xử lý giao dịch off-chain

👉 Đây là bước “mở kênh” để bắt đầu giao dịch tốc độ cao trong Layer 2.

#### ❌ Close Hydra Head

```ts
await hydraTxBuilder.close();
```

👉 Giải thích: Bước này dùng để đóng Hydra Head đang hoạt động.

Khi gọi close():

- Hydra Head ngừng nhận giao dịch mới
- trạng thái cuối cùng được cố định
- chuẩn bị cho quá trình settlement về Layer 1

👉 Đây là bước kết thúc giai đoạn xử lý off-chain.

#### 🌊 Fanout

```ts
await hydraTxBuilder.fanout();
```

👉 Giải thích:

Đây là bước phân phối toàn bộ trạng thái cuối cùng từ Hydra Head về Layer 1 (Cardano main chain). Khi thực hiện fanout():

- toàn bộ UTxO trong Hydra được đưa trở lại blockchain chính
- state cuối cùng được ghi nhận on-chain
- đảm bảo tính minh bạch và đồng bộ dữ liệu

👉 Đây là bước “settlement cuối cùng” của Hydra lifecycle.

### 💰 3. Commit funds vào Hydra

Trong bước này, hệ thống thực hiện thao tác đưa tài sản từ Layer 1 (Cardano main chain) vào Hydra Head, để bắt đầu xử lý ở Layer 2 với tốc độ nhanh hơn và chi phí thấp hơn. Đây là bước khởi tạo dòng tài sản bên trong state channel của Hydra.

#### 🧾 Commit empty state

```ts
await hydraTxBuilder.commit({});
```

👉 Giải thích:

Trường hợp này hệ thống thực hiện commit rỗng, tức là mở Hydra Head mà chưa đưa bất kỳ UTxO nào vào.

dùng để khởi tạo trạng thái ban đầu
kiểm tra khả năng mở Hydra Head
chuẩn bị môi trường trước khi có dữ liệu thực tế

👉 Đây là bước “khởi động channel” không chứa tài sản.

#### 💸 Commit UTxO từ wallet

```ts
const utxo = (await meshWallet.getUtxos())[6];
await hydraTxBuilder.commit({ utxo: utxo });
```

👉 Giải thích:

Ở bước này, hệ thống lấy một UTxO từ ví người dùng và đưa trực tiếp vào Hydra Head.

- meshWallet.getUtxos() → lấy danh sách tài sản từ ví
- [6] → chọn một UTxO cụ thể
- commit() → chuyển UTxO từ Layer 1 sang Layer 2

👉 Sau khi commit: tài sản không còn nằm trên main chain, được đưa vào Hydra state, có thể sử dụng cho tip/claim/deposit nhanh hơn. 👉 Đây là bước “nạp vốn vào Hydra”.

#### 🧠 Commit smart contract UTxO

```ts
const utxo = (
  await blockfrostProvider.fetchAddressUTxOs(hydraTxBuilder.spendAddress)
)[1];

await hydraTxBuilder.commit({
  utxo: utxo,
  blueprint: true,
});
```

👉 Giải thích:

Trường hợp này phức tạp hơn vì hệ thống không chỉ commit tài sản mà còn commit UTxO chứa smart contract state (TipJar) vào Hydra.

- lấy UTxO từ spendAddress (smart contract)
- commit vào Hydra Head
- blueprint: true nghĩa là UTxO này có chứa Plutus script logic

👉 Điều này cho phép: mang cả state + logic của TipJar vào Hydra. chạy smart contract ngay trong Layer 2. xử lý tip/claim realtime mà không cần Layer 1

### 🔁 4. Increment commit (deposit)

```ts
await hydraTxBuilder.deposit({
  utxo: utxo,
});
```

Trong bước này, hệ thống thực hiện thao tác deposit (nạp thêm tài sản vào Hydra Head), nhưng không tạo một commit mới hoàn toàn mà chỉ cập nhật (increment) vào state hiện tại của Hydra.

Về mặt kiến trúc, deposit() sẽ đưa thêm UTxO từ Layer 1 hoặc ví người dùng vào trong Hydra Head, giúp mở rộng hoặc tăng giá trị tài sản đang được xử lý trong state channel. Tuy nhiên, khác với commit() ban đầu, bước này không khởi tạo trạng thái mới mà chỉ bổ sung vào state đã tồn tại, giúp tối ưu hiệu suất và giảm overhead.

👉 Ý nghĩa chính: cập nhật thêm tài sản vào Hydra Head. không tạo commit mới. chỉ “increment” state hiện tại trong Layer 2

### 🔓 5. Decommit (rút khỏi Hydra)

```ts
const utxo = await hydraProvider.fetchAddressUTxOs(
  await meshWallet.getChangeAddress(),
)[0];
await hydraTxBuilder.decommit({ utxo: utxo });
```

Ở bước này, hệ thống thực hiện decommit, tức là rút tài sản từ Hydra Head quay trở lại Layer 1 (Cardano main chain).

Trước tiên, hệ thống lấy UTxO hiện tại từ địa chỉ ví người dùng thông qua fetchAddressUTxOs. UTxO này đại diện cho tài sản đang tồn tại trong Hydra state và có thể được chuyển ngược về blockchain chính.

Sau đó, decommit() được gọi để tạo transaction đưa tài sản ra khỏi Hydra Head. Transaction này sẽ được chuẩn bị để publish lên Layer 1, nơi nó sẽ được xác nhận bởi blockchain Cardano như một giao dịch bình thường.

👉 Ý nghĩa chính: rút tài sản từ Hydra về Layer 1. kết thúc trạng thái xử lý trong Hydra Head. chuẩn bị transaction để submit lên main chain

### 💰 6. Tip trong Hydra

```ts
const unsignedTx = await hydraTxBuilder.tip({
  amount: String(Number(10000000)),
});

const signedTx = await meshWallet.signTx(unsignedTx, false);
const txHash = await hydraTxBuilder.hydraProvider.submitTx(signedTx);
```

Trong bước này, hệ thống thực hiện chức năng gửi ADA vào TipJar trực tiếp trong Hydra Head, tức là toàn bộ giao dịch diễn ra ở Layer 2 thay vì phải đi qua Layer 1 của Cardano.

Đầu tiên, hydraTxBuilder.tip() được gọi để xây dựng một transaction tip. Giá trị amount được truyền vào chính là số ADA mà người dùng muốn gửi vào TipJar. Ở đây, hệ thống sẽ tạo ra một transaction có khả năng cập nhật state của smart contract trong Hydra environment.

Sau khi transaction được build, nó được ký bởi ví người dùng thông qua meshWallet.signTx(unsignedTx, false). Bước này đảm bảo rằng giao dịch được xác thực bằng private key, chỉ chủ sở hữu ví mới có quyền thực hiện hành động tip.

Cuối cùng, transaction đã ký được gửi trực tiếp vào Hydra Head bằng hydraProvider.submitTx(signedTx). Khác với Layer 1, quá trình này không cần chờ xác nhận từ blockchain chính, nên trạng thái được cập nhật gần như ngay lập tức trong Hydra state channel.

👉 Tóm lại, bước tip trong Hydra cho phép:

- gửi ADA vào TipJar trong Layer 2
- cập nhật state on-chain trong Hydra Head
- xử lý giao dịch realtime mà không cần L1 confirmation

👉 Đây là cơ chế giúp Hydra đạt được tốc độ xử lý rất cao so với mô hình blockchain truyền thống.

### 🔓 7. Claim trong Hydra

```ts
const unsignedTx = await hydraTxBuilder.claim();
const signedTx = await meshWallet.signTx(unsignedTx, false);
const txHash = await hydraTxBuilder.hydraProvider.submitTx(signedTx);
```

Trong bước này, hệ thống thực hiện chức năng rút toàn bộ ADA đang được lưu trong TipJar ngay trong Hydra Head, thay vì phải chờ xác nhận từ Layer 1 như cách truyền thống.

Trước hết, hydraTxBuilder.claim() được gọi để xây dựng một transaction dạng claim. Transaction này sẽ consume UTxO hiện tại của smart contract TipJar trong Hydra state, đồng thời kích hoạt logic validator để xác thực hành vi rút tiền.

Sau khi transaction được build, nó sẽ được đưa vào bước ký thông qua meshWallet.signTx(unsignedTx, false). Tại đây, ví người dùng sử dụng private key để ký transaction, đảm bảo rằng chỉ chủ sở hữu hợp lệ mới có thể thực hiện thao tác claim.

Cuối cùng, transaction đã ký được gửi trực tiếp vào Hydra Head thông qua hydraProvider.submitTx(signedTx). Khác với Layer 1, bước này diễn ra gần như tức thì vì Hydra xử lý state off-chain trong state channel, giúp giảm đáng kể độ trễ xác nhận.

👉 Tóm lại, bước claim trong Hydra cho phép:

rút toàn bộ ADA từ TipJar
consume state (UTxO) ngay trong Hydra Head
thực thi transaction realtime mà không cần chờ blockchain Layer 1

👉 Đây là minh chứng rõ ràng cho khả năng xử lý low-latency state transition của Hydra so với Cardano Layer 1 truyền thống.

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
