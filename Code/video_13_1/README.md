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

---

<div align="center">

## 📚 **Tài liệu tham khảo**

**Tóm tắt các bài học quan trọng và chuẩn bị nền tảng vững chắc để bước vào giai đoạn phát triển Hydra DApp một cách an toàn, ổn định và hiệu quả.**

<p>

<a href="https://lms.cardano2vn.io/courses/hydra-on-cardano-complete-step-by-step-dapp-guide/lesson/13-1-integrating-smart-contracts-with-the-hydra-backend-connecting-off-chain-code-to-hydra-heads"><img src="https://img.shields.io/badge/LMS-Course-blue?style=for-the-badge&logo=googleclassroom"/></a>
<a href="https://docs.google.com/presentation/d/1vtL6KIxv8E67ui-pN5xlh4SnCIOyUmgG/edit?slide=id.p1#slide=id.p1"><img src="https://img.shields.io/badge/Slides-Presentation-orange?style=for-the-badge&logo=googleslides"/></a>
<a href="https://github.com/cardano2vn/Hydra-Course-2025/tree/main/Code/video_13_1"><img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github"/></a>
<a href="https://hydra-course-2025.vercel.app/document/chapter-04/video-13-1"><img src="https://img.shields.io/badge/Article-Read-green?style=for-the-badge&logo=readthedocs"/></a>
<a href="https://www.youtube.com/watch?v=C03JzwGPrdk&t=578s"><img src="https://img.shields.io/badge/YouTube-Watch-red?style=for-the-badge&logo=youtube"/></a>

</p>

</div>
