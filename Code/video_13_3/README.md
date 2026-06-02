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

---

<div align="center">

## 📚 **Tài liệu tham khảo**

**Tóm tắt các bài học quan trọng và chuẩn bị nền tảng vững chắc để bước vào giai đoạn phát triển Hydra DApp một cách an toàn, ổn định và hiệu quả.**

<p>

<a href="https://lms.cardano2vn.io/courses/hydra-on-cardano-complete-step-by-step-dapp-guide/lesson/13-3-integrating-smart-contracts-with-the-hydra-backend-connecting-off-chain-code-to-hydra-heads"><img src="https://img.shields.io/badge/LMS-Course-blue?style=for-the-badge&logo=googleclassroom"/></a>
<a href="https://drive.google.com/open?id=1lxAstrlECIdY-09-4ZDMXzWiIdiy0naa&usp=drive_copy"><img src="https://img.shields.io/badge/Slides-Presentation-orange?style=for-the-badge&logo=googleslides"/></a>
<a href="https://github.com/cardano2vn/Hydra-Course-2025/tree/main/Code/video_13_3"><img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github"/></a>
<a href="https://hydra-course-2025.vercel.app/document/chapter-04/video-13-3"><img src="https://img.shields.io/badge/Article-Read-green?style=for-the-badge&logo=readthedocs"/></a>
<a href="https://www.youtube.com/watch?v=Rpv8bAgLVPE&t=18s"><img src="https://img.shields.io/badge/YouTube-Watch-red?style=for-the-badge&logo=youtube"/></a>

</p>

</div>
