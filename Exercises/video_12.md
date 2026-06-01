# 📝 Bài tập - Chapter 04: Video 12

---

## ✅ Bài 1: Thiết kế Smart Contract TipJar

### 📌 Đề bài

1. Mô tả **3 yêu cầu cốt lõi** khi thiết kế smart contract TipJar và lý do chúng quan trọng.
2. Tại sao "bất kỳ ai cũng có thể gửi tip" là điểm chọn thiết kế chính?
3. Giải thích tại sao phải "Chỉ owner được rút tiền" - nó bảo vệ cái gì?
4. Vai trò của "1 UTxO duy nhất" trong kiến trúc TipJar, đặc biệt trong Hydra Head environment.
5. Làm thế nào thiết kế này so sánh với các DApp micropayment khác (bài tập, donation, tipping)?
6. Nếu bỏ "1 UTxO duy nhất" yêu cầu, hệ thống sẽ xảy ra vấn đề gì?

### 💡 Gợi ý

- **Permissionless contribution**: Không cần whitelist, mở cho toàn bộ network
- **Owner authorization**: Chỉ owner ký được mới rút, sử dụng VerificationKeyHash
- **State consolidation**: 1 UTxO = 1 state = dễ tracking trong Hydra
- **Hydra compatibility**: Hydra Head cần trạng thái tập trung, không phân mảnh
- **Gas efficiency**: Ít input/output = transaction nhỏ = phí thấp
- **Scalability**: Từ microchain này scale lên mainchain với cost không tăng

<details>
<summary>Đáp án</summary>

### 3 Yêu Cầu Cốt Lõi & Lý Do

#### 1️⃣ **Bất Kỳ Ai Cũng Có Thể Gửi Tip (Permissionless)**

**Định nghĩa**:

```
Permissionless = Không cần authorization, không cần whitelist,
bất kỳ ví nào cũng có thể gửi transaction
```

**Tại sao quan trọng**:

- **Toàn cầu**: Bất kỳ người dùng Cardano ở đâu (Nhật Bản, Mỹ, Việt Nam) cũng có thể gửi tip
- **Không phân biệt**: Không có "VIP user" vs "regular user" - tất cả bình đẳng
- **Khuyến khích contribution**: Càng mở → càng nhiều tip → thu nhập cao
- **Compliance**: Không phân biệt người dùng = tuân theo luật pháp nhiều quốc gia hơn

**Hình ảnh hóa**:

```
┌─────────────────────────────────────┐
│         TipJar Smart Contract       │
│                                     │
│  ✅ User A (Tokyo): Gửi 10 ADA     │
│  ✅ User B (Hanoi): Gửi 50 ADA    │
│  ✅ User C (NY): Gửi 25 ADA       │
│  ✅ User D (Berlin): Gửi 100 ADA  │
│                                     │
│  → Total: 185 ADA (không cần KYC)  │
└─────────────────────────────────────┘
```

**Code Impact**:

```aiken
// ✅ Permissionless
when redeemer is {
  Tip -> True  // Bất kỳ ai cũng được, không kiểm tra chữ ký
}

// ❌ Nếu restricted (sai design)
when redeemer is {
  Tip -> {
    list.has(context.transaction.extra_signatories, whitelist_user)  // Sai!
  }
}
```

**Real-world scenario**:

```
Quan sát một streamer Twitch:
- 10,000 viewers
- 1,000 muốn tip (10% conversion)
- TipJar permissionless → tất cả 1,000 có thể gửi ngay
- Một dòng vào thuế = chỉ owner tích cực

Nếu restricted (whitelist):
- Chỉ 100 VIP users được phép
- 900 người khác không thể gửi
- Mất 90% revenue → business fail!
```

#### 2️⃣ **Chỉ Owner Được Rút Tiền (Authorization)**

**Định nghĩa**:

```
Authorization = Chỉ người sở hữu được perform action
xác minh bằng: chữ ký cryptographic của owner
```

**Tại sao quan trọng**:

- **Bảo vệ tài sản**: Ai gửi tip mất quyền rút, chỉ owner rút được
- **Minh bạch**: Tất cả biết ai sở hữu TipJar (owner được công khai)
- **Tránh theft**: Nếu không kiểm tra chữ ký → hacker rút hết → game over
- **Hợp pháp**: Quy luật "sở hữu" được mã hóa trong code

**Hình ảnh hóa**:

```
┌────────────────────────────────────────┐
│      TipJar 185 ADA (100% owner)      │
│                                        │
│  Owner: addr1qy7nj36x2k5gf0rhj45...  │  ← Công khai
│                                        │
│  ❌ Hacker: Không thể rút              │
│  ❌ User A: Không thể rút              │
│  ✅ Owner (với private key): Rút 185   │
│                                        │
│  UTxO = 0 (destroyed)                 │
└────────────────────────────────────────┘
```

**Code Impact**:

```aiken
// ✅ Authorized (chỉ owner)
when redeemer is {
  Claim -> {
    let must_be_owner =
      list.has(context.transaction.extra_signatories, owner)
    must_be_owner
  }
}

// ❌ Nếu permissionless (sai design)
when redeemer is {
  Claim -> True  // Ai cũng rút được → tài sản mất!
}
```

**Real-world scenario**:

```
Content creator xyz.com kiếm được 100,000 ADA từ tips.

Với authorization:
✅ xyz.com sở hữu, kiểm soát, rút được tiền

Nếu không có authorization (Claim permissionless):
❌ Attacker rút 100,000 ADA ngay lập tức
❌ Tất cả users tức giận (tip biến mất)
❌ Content creator phá sản
❌ TipJar bị lạm dụng → nobody uses

Kết quả: Business model collapse!
```

#### 3️⃣ **Giữ 1 UTxO Duy Nhất (State Consolidation)**

**Định nghĩa**:

```
State Consolidation = Tất cả trạng thái (tiền) hội tụ vào 1 UTxO
Thay vì chia thành nhiều UTxO nhỏ lẻ
```

**Tại sao quan trọng**:

- **Không phân mảnh**: 1 UTxO = 185 ADA, thay vì 1000 UTxO × 0.185 ADA
- **Transaction size nhỏ**: Xử lý 1 UTxO vs 1000 UTxO → 1000x khác biệt!
- **Hydra compatibility**: Hydra Head cần state "atomic" (1 state/owner)
- **Predictable cost**: Gas = hằng số, không phụ thuộc số tip
- **Settlement dễ**: Khi settle lên L1, chỉ cần 1 transaction

**Hình ảnh hóa**:

```
❌ Sai (Fragmented):
Tip 1: UTxO (10 ADA)  ← User A gửi
Tip 2: UTxO (50 ADA)  ← User B gửi
Tip 3: UTxO (25 ADA)  ← User C gửi
...
Tip 1000: UTxO (5 ADA) ← User Z gửi

Khi claim: input 1000 UTxO → gas 💥 BOOM!

✅ Đúng (Consolidated):
TipJar UTxO (185 ADA)  ← Tất cả hội tụ vào 1 UTxO

Khi claim: input 1 UTxO → gas ✅ OK!
```

**Code Impact**:

```aiken
// ✅ 1 UTxO duy nhất
Tip -> {
  let script_outputs =
    context.outputs
    |> list.filter(fn(out) { out.address == script_address })

  // Đảm bảo exactly 1 output
  let exactly_one =
    list.length(script_outputs) == 1

  exactly_one  // TRUE → validation pass
}

// ❌ Nếu cho phép nhiều output (sai design)
Tip -> True  // Không check → nhiều UTxO
```

**Real-world scenario (Hydra context)**:

```
TipJar hoạt động trên Hydra Head (microchain)

Hydra Head:
- Chạy offline, xử lý ~1000 TPS
- Trạng thái = {owner, UTxOs}

Với 1 UTxO:
├─ Tip transaction: Tăng value của 1 UTxO
├─ Logic: simple, fast, no conflicts
└─ Settle lên L1: 1 transaction duy nhất

Với nhiều UTxOs (sai design):
├─ Tip transaction: Tạo output riêng
├─ Logic: phức tạp, tracking nhiều UTxO
├─ Conflicts: 2 users claim simultaneously → conflict!
└─ Settle lên L1: 1000 transactions → gas explosion!

Kết luận: Hydra + 1 UTxO = match made in heaven
```

### 🎯 Tại Sao Thiết Kế Này Tối Ưu Cho Hydra?

**Hydra Head là gì**:

```
Hydra = Off-chain Layer
- Xử lý transaction offline (1000+ TPS)
- Trạng thái tập trung (1 state per participant)
- Settle lên L1 khi cần (final settlement)
```

**Hydra yêu cầu gì**:

```
✅ State consolidation (1 state per owner)
✅ Fast settlement (ít UTxO → ít transaction)
✅ Predictable cost (gas hằng số)
❌ State fragmentation (nhiều UTxO → xung đột)
```

**TipJar thiết kế phù hợp**:

```
┌──────────────────────────────────────┐
│       Hydra Head (Microchain)        │
│                                      │
│  xyz.com:                            │
│  - Local state: 185 ADA (1 UTxO)    │
│  - Transactions: Tip (add value)    │
│  - No conflicts (1 owner = 1 state) │
│                                      │
│  Then: Settle → 1 transaction → L1  │
└──────────────────────────────────────┘
```

### 📊 So Sánh: 3 Cách Thiết Kế TipJar

| Tiêu chí      | Permissionless | Owner-only       | 1 UTxO     | Design  |
| ------------- | -------------- | ---------------- | ---------- | ------- |
| **Gửi tip**   | ✅ Bất kỳ ai   | ❌ Chỉ user list | N/A        | Tối ưu  |
| **Rút tiền**  | ❌ Ai cũng rút | ✅ Chỉ owner     | N/A        | Tối ưu  |
| **State**     | N/A            | N/A              | ✅ 1 UTxO  | Tối ưu  |
| **Hydra fit** | ⭐⭐⭐⭐⭐     | ⭐⭐⭐⭐⭐       | ⭐⭐⭐⭐⭐ | Perfect |

### 💡 Insights: Vì Sao Đây Là Best Practice

**1. Economics of Incentives**:

```
Permissionless tip:
→ 1000 people can send
→ Even if 1% convert = 10 tips
→ vs 0% if restricted

Math: Permissionless revenue >>> Restricted revenue
```

**2. Trust Model**:

```
Owner-only withdrawal:
→ Everyone knows exactly who owns the money
→ Cryptographic proof via signature
→ No intermediaries (trustless)
→ Validator code enforces = code is law
```

**3. Scalability**:

```
1 UTxO design:
→ On Hydra: 1000 tips/sec, 1 UTxO
→ On L1: Settle 1 transaction, final
→ Cost: ~0.5 ADA per settlement
→ vs Fragmented: 1000 transactions = 500 ADA cost!

Math: 1 UTxO design saves 99.9% cost
```

### 🏗️ Architecture Diagram

```
Before Transaction:

┌─────────────────────────────────────────┐
│         Cardano Blockchain              │
│                                         │
│  address1qy7... (TipJar owner)         │
│  └─ UTxO: 185 ADA [validator script]   │
│                                         │
└─────────────────────────────────────────┘

Transaction: User A tips 10 ADA

┌─────────────────────────────────────────┐
│         Cardano Blockchain              │
│                                         │
│  address1qy7... (TipJar owner)         │
│  └─ UTxO: 195 ADA [validator script]   │  ← Value increased!
│                                         │
│  Validation:                            │
│  ✅ Input: 185 ADA                     │
│  ✅ Output: 195 ADA (= 185 + 10)       │
│  ✅ 1 script output duy nhất            │
│  ✅ No owner signature required         │
│                                         │
└─────────────────────────────────────────┘

When Owner Claims:

┌─────────────────────────────────────────┐
│         Cardano Blockchain              │
│                                         │
│  address1qy7... (TipJar owner)         │
│  └─ EMPTY [validator removed]          │
│                                         │
│  owner_address: 195 ADA [wallet]       │
│  (Claimed successfully!)                │
│                                         │
│  Validation:                            │
│  ✅ Owner signature present              │
│  ✅ No script output (UTxO consumed)    │
│  ✅ 195 ADA transferred to owner        │
│                                         │
└─────────────────────────────────────────┘
```

### ✅ Kết Luận

**3 Yêu Cầu = 3 Pillar Của TipJar Design**:

1. **Permissionless Tip**
   - 📊 Maximize revenue (mở cho tất cả)
   - 🌍 Sát Cardano's philosophy (decentralized)
   - 💰 Nobody left behind (fairness)

2. **Owner-Only Withdrawal**
   - 🔒 Protect assets (chỉ owner rút)
   - 🛡️ Prevent theft (validator enforces)
   - 📜 Legal clarity (ai sở hữu thì ai rút)

3. **1 UTxO Consolidation**
   - ⚡ Hydra optimization (dành cho L2)
   - 💸 Gas efficiency (settle cost ~0.5 ADA)
   - 🎯 Simplicity (code easy to audit)

**Điều Này Chứng Minh**:

```
Good smart contract design =
Combination of good economics + good technology

TipJar achieves:
✅ Maximize incentives (permissionless)
✅ Protect security (owner-only)
✅ Optimize scalability (1 UTxO)

Result: Best-practice TipJar for Cardano/Hydra
```

</details>

---

## ✅ Bài 2: Cấu trúc Validator TipJar

### 📌 Đề bài

Giải thích cấu trúc validator `tipjar` trong Aiken, bao gồm tham số và redeemer.

### 💡 Gợi ý

- owner: VerificationKeyHash
- minimum_tip: Int
- Redeemer: Tip | Claim

<details>
<summary>Đáp án</summary>

```aiken
pub type Redeemer {
  Tip
  Claim
}

validator tipjar(owner: VerificationKeyHash, minimum_tip: Int) {
  spend(datum: Void, redeemer: Redeemer, context: ScriptContext) {
    when redeemer is {
      Tip -> { ... }      // Cho phép gửi tip
      Claim -> { ... }    // Chỉ owner được rút
    }
  }
}
```

**Tham số**:

- `owner`: VerificationKeyHash - chủ sở hữu TipJar (người duy nhất có thể rút tiền)
- `minimum_tip`: Int - số Lovelace tối thiểu mỗi lần gửi tip

**Redeemer**:

- `Tip` → Gửi tiền vào TipJar (bất kỳ ai cũng được)
- `Claim` → Rút tiền từ TipJar (chỉ owner)

👉 Kết luận: Validator sử dụng **parameterized validator** (nhận tham số lúc compile) để tạo ra nhiều instance của TipJar với owner khác nhau. Redeemer là **tagged union** để phân biệt hành động và áp dụng logic khác nhau.

</details>

---

## ✅ Bài 3: Logic Redeemer Tip

### 📌 Đề bài

Phân tích logic xử lý khi `redeemer` là `Tip` - cách validator cho phép bất kỳ ai gửi tip vào TipJar và kiểm tra giá trị tối thiểu.

### 💡 Gợi ý

- Bất kỳ ai cũng được gửi (không cần verify signature)
- Kiểm tra minimum_tip
- Input + Output phải tăng giá trị
- Script output phải lưu trữ toàn bộ tiền trong UTxO

<details>
<summary>Đáp án</summary>

**Logic khi Redeemer là Tip**:

```aiken
Tip -> {
  let input_value = context.inputs |> list.find(...) |> .output.value
  let output_value = context.outputs |> list.find(...) |> .value

  // 1. Kiểm tra value tăng lên
  let value_increased = output_value >= input_value + minimum_tip

  // 2. Không cần kiểm tra chữ ký (mở cho ai cũng gửi tip)
  let only_tip = True

  value_increased && only_tip
}
```

**Chi tiết**:

- **Bất kỳ ai cũng có thể gửi**: Không kiểm tra `extra_signatories`, tức là không cần "ủy quyền" hay "chữ ký đặc biệt"
- **Giá trị phải tăng**: `output_value >= input_value + minimum_tip` đảm bảo tip được gửi vào
- **Script output duy nhất**: Chỉ 1 UTxO output từ script, chứa toàn bộ tiền (đơn giản & tránh phân mảnh)

👉 Kết luận: Redeemer `Tip` là "mở" (permissionless) nhưng vẫn kiểm soát giá trị. Điều này khuyến khích contribution mà vẫn đảm bảo chất lượng (minimum_tip).

</details>

---

## ✅ Bài 4: Logic Redeemer Claim

### 📌 Đề bài

Phân tích logic xử lý khi `redeemer` là `Claim` - cách validator đảm bảo chỉ owner mới được rút toàn bộ tiền từ TipJar.

### 💡 Gợi ý

- Kiểm tra chữ ký của owner
- Extra signatories phải chứa owner
- Rút toàn bộ tiền (không để lại)
- Không có script output (UTxO bị consume)

<details>
<summary>Đáp án</summary>

**Logic khi Redeemer là Claim**:

```aiken
Claim -> {
  // 1. Kiểm tra chữ ký của owner
  let must_be_signed = list.has(context.transaction.extra_signatories, owner)

  // 2. Không có script output (rút hết tiền)
  let no_script_output =
    context.outputs
    |> list.filter(fn(out) { out.address == script_address })
    |> list.length == 0

  must_be_signed && no_script_output
}
```

**Chi tiết**:

- **Kiểm tra chữ ký**: `list.has(context.transaction.extra_signatories, owner)` - chỉ owner ký thì mới được phép Claim
- **Không có script output**: Sau khi Claim, UTxO này biến mất (rút hết tiền)
- **Toàn bộ tiền về owner**: Không giữ lại gì trong script

**So sánh Tip vs Claim**:

| Khía cạnh        | Tip          | Claim                     |
| ---------------- | ------------ | ------------------------- |
| **Quyền**        | Bất kỳ ai    | Chỉ owner                 |
| **Chữ ký**       | Không cần    | Bắt buộc                  |
| **Input→Output** | Value tăng   | Không có output (consume) |
| **Script state** | Vẫn còn UTxO | UTxO bị destroy           |
| **Mục đích**     | Gửi tiền vào | Rút hết tiền ra           |

👉 Kết luận: Redeemer `Claim` là "hạn chế" (permissioned) - chỉ owner có thể rút. Điều này bảo vệ tài sản khỏi bị ai tự ý lấy đi.

</details>

---

## ✅ Bài 5: Kiểm soát UTxO trong TipJar

### 📌 Đề bài

Giải thích tại sao validator yêu cầu **chỉ duy nhất 1 script output** trong redeemer `Tip` và cách code kiểm tra điều này. Tại sao không cho phép nhiều UTxO?

### 💡 Gợi ý

- Tránh phân mảnh (fragmentation)
- Dễ quản lý trạng thái trong Hydra Head
- Simplicity & efficiency
- `find_script_outputs` function

<details>
<summary>Đáp án</summary>

**Cách kiểm tra 1 script output duy nhất**:

```aiken
let script_outputs =
  context.outputs
  |> list.filter(fn(out) { out.address == script_address })

let exactly_one_output = list.length(script_outputs) == 1

expect Some(script_output) = list.head(script_outputs)

exactly_one_output && script_output.value == expected_value
```

**Tại sao 1 UTxO duy nhất?**

1. **Tránh Fragmentation** (phân mảnh):
   - Nếu mỗi tip tạo output riêng → sau vài tip sẽ có 10, 100, 1000 UTxO
   - Khi Claim, phải xử lý tất cả → transaction phức tạp, tốn gas

2. **Dễ quản lý trong Hydra Head**:
   - Hydra xử lý trạng thái tập trung → 1 UTxO duy nhất là ideal
   - Tất cả tip đều "merge" vào 1 UTxO → trạng thái đơn giản

3. **Efficiency & Predictability**:
   - Validator logic đơn giản → dễ audit
   - Tx size dự đoán được (không phụ thuộc số tip)
   - Chi phí gas cố định

**Hình dung**:

```
❌ Sai (nhiều UTxO):
TipJar UTxO #1 (100 ADA)
TipJar UTxO #2 (50 ADA)
TipJar UTxO #3 (75 ADA)
... (phân mảnh, khó quản lý)

✅ Đúng (1 UTxO duy nhất):
TipJar UTxO (225 ADA) ← tất cả tip hội tụ
```

👉 Kết luận: Design "1 UTxO duy nhất" là **constraint thông minh**:

- Bảo vệ khỏi phân mảnh
- Phù hợp với mô hình Hydra
- Giữ code simple và gas efficient
- Là best practice cho smart contract trên Cardano

</details>

---

## ✅ Bài 6: Datum & Redeemer trong TipJar (Khác biệt với hello_world)

### 📌 Đề bài

So sánh cấu trúc Datum và Redeemer giữa `hello_world` (Video 11) và `tipjar` (Video 12). Tại sao TipJar không cần Datum?

### 💡 Gợi ý

- hello_world: Datum chứa owner
- tipjar: Datum = Void
- Parameterized validator
- State management khác nhau

<details>
<summary>Đáp án</summary>

**So sánh cấu trúc**:

| Tiêu chí               | hello_world                               | tipjar                                   |
| ---------------------- | ----------------------------------------- | ---------------------------------------- |
| **Datum**              | `Datum { owner: VerificationKeyHash }`    | `Void` (không dùng)                      |
| **Redeemer**           | `Redeemer { message: String }`            | `Redeemer { Tip \| Claim }`              |
| **Owner lưu ở đâu**    | Trong Datum (mỗi UTxO có owner khác nhau) | Trong validator parameter (compile-time) |
| **Trạng thái**         | UTxO lưu trạng thái (owner)               | UTxO chỉ lưu value (tiền)                |
| **Sử dụng trường hợp** | Linh hoạt (multiple owners per script)    | TipJar cố định (1 owner)                 |

**Tại sao TipJar = Void Datum?**

```aiken
// ❌ Cách 1: Giống hello_world (lưu owner trong Datum)
pub type Datum {
  owner: VerificationKeyHash
}
validator tipjar() {  // Không có parameter
  ...
}
// → Phải check Datum mỗi lần, phức tạp hơn

// ✅ Cách 2: TipJar (owner = parameter)
pub type Datum = Void  // Không cần lưu trạng thái
validator tipjar(owner: VerificationKeyHash) {  // Owner cố định
  ...
}
// → Đơn giản, owner xác định lúc deploy
```

**Ưu điểm của cách TipJar**:

- **Gas efficiency**: Không lưu trữ Datum trên chain
- **Type safety**: Validator compile sẵn với owner cụ thể
- **Simplicity**: Logic ngắn gọn hơn
- **Phù hợp Hydra**: Trạng thái tập trung (1 owner per script instance)

👉 Kết luận: `hello_world` sử dụng Datum để linh hoạt (mỗi UTxO owner khác nhau), còn `tipjar` sử dụng parameterized validator để cố định owner (tiết kiệm gas, đơn giản hơn). Cách chọn phụ thuộc vào **use case**.

</details>
