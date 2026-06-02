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

<div align="center">

## 📚 **Tài liệu tham khảo**

**Tóm tắt các bài học quan trọng và chuẩn bị nền tảng vững chắc để bước vào giai đoạn phát triển Hydra DApp một cách an toàn, ổn định và hiệu quả.**

<p>

<a href="https://lms.cardano2vn.io/courses/hydra-on-cardano-complete-step-by-step-dapp-guide/lesson/13-2-integrating-smart-contracts-with-the-hydra-backend-connecting-off-chain-code-to-hydra-heads"><img src="https://img.shields.io/badge/LMS-Course-blue?style=for-the-badge&logo=googleclassroom"/></a>
<a href="https://drive.google.com/open?id=1ftBqkDCQRDTDG2D6OofHMMs6uxjb-9jB&usp=drive_copy"><img src="https://img.shields.io/badge/Slides-Presentation-orange?style=for-the-badge&logo=googleslides"/></a>
<a href="https://github.com/cardano2vn/Hydra-Course-2025/tree/main/Code/video_13_2"><img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github"/></a>
<a href="https://hydra-course-2025.vercel.app/document/chapter-04/video-13-2"><img src="https://img.shields.io/badge/Article-Read-green?style=for-the-badge&logo=readthedocs"/></a>
<a href="https://www.youtube.com/watch?v=WVYARQD6D14&t=6s"><img src="https://img.shields.io/badge/YouTube-Watch-red?style=for-the-badge&logo=youtube"/></a>

</p>

</div>
