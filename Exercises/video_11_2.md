# 📝 Bài tập - Chapter 04: Video 11-2

---

## ✅ Bài 1: Vai trò On-chain trong TipJar

### 📌 Đề bài

Giải thích chi tiết vai trò của lớp **On-chain** trong hệ thống TipJar sử dụng Hydra. Hãy:

1. **Định nghĩa**: On-chain layer là gì? Nó gồm những thành phần nào?
2. **Smart Contracts**: Tại sao cần validator Aiken?
3. **Bảo mật**: Tại sao gọi nó là "lớp bảo mật cuối cùng"?
4. **Trustlessness**: On-chain đảm bảo tính "trustless" như thế nào?
5. **Trách nhiệm**: On-chain chịu trách nhiệm những gì trong TipJar?

### 💡 Gợi ý chi tiết

- **On-chain = Layer-1**: Cardano blockchain, immutable, public
- **Smart Contract = Validator**: Aiken code that validates ALL transactions
- **Source of truth**: On-chain là chân lý cuối cùng, không ai gian lận được
- **Trustless**: Không cần tin tưởng ai, code tự nói
- **Final settlement**: Hydra xử lý fast, on-chain xác thực cuối cùng

<details>
<summary>Đáp án</summary>

### Định Nghĩa On-chain Layer

**On-chain = Layer-1 Blockchain (Cardano)**

```
Internet
   ↓
┌─────────────────────────────────────┐
│ Off-chain Layer (Backend)           │ ← Fast, centralized
│ - Backend server                    │
│ - Hydra Head                        │
│ - Database                          │
└─────────────────────┬───────────────┘
                      │
         (final settlement)
                      ↓
┌─────────────────────────────────────┐
│ On-chain Layer (Cardano L1)         │ ← Slow, decentralized, immutable
│ - Smart contracts (validators)      │
│ - UTxOs (permanent state)           │
│ - Transaction ledger                │
│ - Consensus (validators)            │
└─────────────────────────────────────┘
```

### Components of On-chain Layer

**1. Smart Contracts (Validators)**

Written in Aiken, deployed to Cardano blockchain:

```aiken
// TipJar validator (on-chain)
validator tipjar(owner: VerificationKeyHash) {
  spend(datum: TipJarDatum, redeemer: Redeemer, ctx: ScriptContext) {
    // This code runs on Cardano L1
    // Every transaction that touches this UTxO must pass this check
    // No exceptions, no shortcuts
  }
}
```

**2. Smart Contract Address**

When deployed, validator gets a **script address**:

```
addr_test1wrpxq24hlz3ch3h6e7j3kfjr2rhmjf3xkyw9...
```

UTxOs locked at this address can ONLY be spent if validator approves.

**3. UTxOs (Permanent State)**

Each UTxO locked on script address contains:

- Value (ADA/tokens)
- Datum (application state)
- Script reference (optional)

**4. Transaction Ledger**

Immutable history of all transactions:

- Block 1: Genesis
- Block 2: TipJar deployed (0 ADA)
- Block 3: User sends 2 ADA tip (✓ validator approved)
- Block 4: User sends 5 ADA tip (✓ validator approved)
- ...
- Forever recorded, never changed

### Why Smart Contracts are Essential

**Without validator:**

```
User: "Send this 100 ADA to me"
Anyone: "Ok, just send it!"
Backend: "Wait, owner said no..."
Network: "Too late, already sent! 💀"
```

**With validator on-chain:**

```
User: "Process this transaction"
Transaction: Includes datum + redeemer
Network: "Running validator check..."
Validator: "Checking... redeemer valid? ✓
            datum correct? ✓
            owner signed? ✓
            amount ok? ✓"
Validator: "APPROVED! Execute transaction ✓"
Ledger: "Permanently recorded"
```

### The "Last Security Layer" Concept

**3-Layer Security for TipJar**:

```
Layer 3 (First Filter): Frontend Validation
├─ User interface checks
├─ "Amount should be > 0"
├─ Can be bypassed (user can manipulate browser)
└─ Purpose: User experience only

Layer 2 (Second Filter): Backend/Off-chain
├─ Server-side checks
├─ "User has enough balance"
├─ Database verification
├─ Can be hacked (server compromised)
└─ Purpose: Quick feedback, UX

Layer 1 (Final Check): On-chain Validator ← TRUSTLESS
├─ Smart contract logic
├─ Cryptographic verification
├─ Immutable, decentralized
├─ CANNOT be bypassed
└─ Purpose: Ultimate security, final authority
```

**Real Attack Scenario:**

```
Scenario: Malicious backend developer

Attack idea: Steal user tips by forging transactions

Step 1: Frontend check
  Attacker: Removes frontend validation
  System: ✓ Passes (no validation on client)

Step 2: Backend check
  Attacker: Modifies backend code to approve fake txs
  System: ✓ Passes (attacker controls server)

Step 3: On-chain validator
  Transaction arrives at blockchain
  Validator checks: datum signed by owner? ✗
  Result: TRANSACTION REJECTED ✗
  Attacker: Cannot proceed (code cannot lie)

Conclusion: Attacker failed!
           Backend compromise is NOT enough
           On-chain validator is UNBREAKABLE
```

### Trustlessness: How On-chain Delivers

**What is "Trustless"?**

```
Traditional system (requires trust):
  Users → Trust → Backend Server → Trust → Bank

  If backend is hacked: users lose money
  If bank is corrupt: users lose money
  Users MUST trust everyone in the chain

On-chain system (trustless):
  Users → Code → Blockchain → Code → Consensus

  If backend is hacked: money still protected by code
  If 1 node is dishonest: 1000s other nodes verify
  Users trust MATHEMATICS, not humans
```

**How On-chain Ensures Trustlessness:**

1. **Immutable Code**
   - Validator deployed, cannot be changed
   - Code IS the rule (not some database entry)

2. **Public Verification**
   - Anyone can run the validator code locally
   - "Don't trust me, verify yourself"
   - 10,000+ Cardano nodes run same code

3. **Cryptographic Proof**
   - Transactions signed with private keys
   - Private key = proof of ownership
   - Cannot forge without key

4. **Consensus**
   - 51%+ of validators must agree
   - Single bad actor cannot win
   - Byzantine fault tolerance

### On-chain Responsibilities in TipJar

**What On-chain Validates:**

```
When user sends tip (off-chain creates transaction):

1. Datum validation
   ✓ Check: TipJarDatum structure is valid
   ✗ Reject: Malformed datum

2. Redeemer validation
   ✓ Check: Redeemer type matches expected
   ✗ Reject: Invalid action

3. Value preservation
   ✓ Check: New value = old value + tip amount
   ✗ Reject: Money disappeared/created

4. Authorization
   ✓ Check: Transaction signed by owner (if claiming)
   ✗ Reject: Unsigned tx

5. State consistency
   ✓ Check: New state follows business logic
   ✗ Reject: Violates rules
```

**Example TipJar Validator Logic:**

```aiken
validator tipjar(owner: VerificationKeyHash) {
  spend(datum: TipJarDatum, redeemer: Redeemer, ctx: ScriptContext) {
    case redeemer is {
      Tip { amount } -> {
        // Validations:
        // 1. Amount must be positive
        let amount_valid = amount > 0

        // 2. New UTxO must exist on script
        let new_utxo_exists =
          list.any(
            ctx.transaction.outputs,
            fn(o) { o.address == ctx.script_address }
          )

        // 3. Value must increase
        let value_increases = ctx.transaction.inputs_value <
                             ctx.transaction.outputs_value

        // All must be true
        amount_valid && new_utxo_exists && value_increases
      }

      Claim -> {
        // Only owner can claim (must sign transaction)
        list.has(
          ctx.transaction.extra_signatories,
          owner
        )
      }
    }
  }
}
```

### Why Cardano Layer-1 Specifically?

**Advantages:**

- ✅ Proof-of-stake (energy efficient)
- ✅ eUTxO model (composable, parallelizable)
- ✅ Aiken language (type-safe, modern)
- ✅ Mature security record (since 2017)

**Disadvantages:**

- ❌ Slower than Ethereum (250 TPS)
- ❌ Smaller ecosystem than ETH
- ❌ Less DeFi liquidity

**Solution for TipJar:**

```
Cardano L1: Provides security
          Provides decentralization
          Provides trustlessness

Hydra L2:  Provides speed (1000+ TPS)
          Provides low cost (fractions of cent)
          Provides instant UX

Together: Best of both worlds ✓
```

### On-chain Cost Implications

**Layer-1 Transaction Costs:**

```
Typical Cardano transaction: ~200,000 lovelace = 0.2 ADA
Value in USD (at $1 ADA): $0.20 per transaction

For TipJar with Hydra:
├─ 1000 tips off-chain (free)
└─ 1 settlement on L1 = $0.20 for 1000 tips
   = $0.0002 per tip (negligible!)

Without Hydra (all on-chain):
├─ 1000 tips × $0.20 = $200 total fees
└─ User average tip: $2
   = 10% goes to fees (terrible UX)
```

### Architecture Diagram

```
TipJar Architecture (On-chain perspective):

        User sends tip
              ↓
        Backend (off-chain) builds TX
              ↓
        Hydra processes (off-chain, fast)
              ↓
        When settle: TX → Cardano Layer-1
              ↓
        Validator runs:
        ┌────────────────────────────┐
        │ pub fn spend(...) {         │
        │   check_datum ✓            │
        │   check_redeemer ✓         │
        │   check_value ✓            │
        │   check_signatures ✓       │
        │   return true              │
        │ }                          │
        └────────────────────────────┘
              ↓
        Transaction APPROVED ✓
        Permanently on ledger
```

👉 **Kết luận**:
On-chain layer trong TipJar:

- ✅ **Trustless**: No one can lie, code enforces rules
- ✅ **Immutable**: Once on-chain, cannot be reversed
- ✅ **Decentralized**: Verified by thousands of nodes
- ✅ **Final Authority**: What on-chain says, goes
- ✅ **Security Layer**: Protects against all attacks

**Hydra + On-chain Combination**:

```
Hydra: Speed + Cost optimization
On-chain: Trust + Security + Finality
= Optimal DApp architecture for TipJar
```

</details>

---

## ✅ Bài 2: Mô hình eUTxO

### 📌 Đề bài

Giải thích chi tiết mô hình **eUTxO** trong Cardano và vai trò của nó trong smart contract. Hãy:

1. **Định nghĩa eUTxO**: Extended UTxO là gì? So sánh với account-based?
2. **Cấu trúc**: UTxO gồm những phần nào (value, datum, script)?
3. **State Transition**: Cách thức chuyển state từ UTxO này sang UTxO khác?
4. **Ví dụ TipJar**: eUTxO hoạt động như thế nào trong TipJar?
5. **Lợi ích**: Tại sao eUTxO tốt hơn account-based model?

### 💡 Gợi ý chi tiết

- **Extended UTxO**: Mỗi UTxO có thể có attached data (datum)
- **Account-based**: Global mutable state (Ethereum style)
- **Datum + Redeemer**: Input validation mechanism
- **Parallel**: Multiple users can tip simultaneously (no conflicts)
- **Immutable**: Each UTxO is permanent once created

<details>
<summary>Đáp án</summary>

### What is eUTxO?

**UTxO (Unspent Transaction Output)**:

Traditional model (Bitcoin):

```
Transaction creates outputs
Output = {address, value}

User spends output:
  Input: Old UTxO
  Output: New UTxO
  = Simple, safe, but limited
```

**eUTxO (Extended UTxO) - Cardano's Innovation**:

```
Transaction creates outputs with MORE info
Output = {
  address,        ← Where locked
  value,          ← How much ADA/tokens
  datum,          ← Custom data (state)
  script ref      ← Optional reference
}

User spends eUTxO:
  Input: Old eUTxO with datum
  Redeemer: Action/intent (custom data)
  Context: Transaction details
  Validation: Run script with all 3 inputs
  = Flexible, programmable, parallel-safe
```

### eUTxO vs Account-Based Comparison

**Account-Based (Ethereum)**:

```
Global State Storage
┌────────────────────────┐
│ Smart Contract         │
│ balance = 1000 ADA     │
│ tips = []              │
│ owner = alice          │
└────────────────────────┘
         ↓
User wants to tip:
  Read: balance = 1000
  Check: amount > 0 ✓
  Update: balance = 1005
  Write: balance = 1005
         ↓
Problem: Sequential access only!
        Only 1 transaction per block can modify
        Multiple transactions conflict
```

**eUTxO (Cardano)**:

```
Distributed State (each UTxO independent)
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ UTxO #1      │  │ UTxO #2      │  │ UTxO #3      │
│ value: 500   │  │ value: 300   │  │ value: 200   │
│ datum: {...} │  │ datum: {...} │  │ datum: {...} │
└──────────────┘  └──────────────┘  └──────────────┘
         ↓              ↓                  ↓
User 1 can modify #1, User 2 can modify #2, User 3 can modify #3
SIMULTANEOUSLY! NO CONFLICTS!
```

**Detailed Table**:

| Aspect            | Account-Based             | eUTxO                        |
| ----------------- | ------------------------- | ---------------------------- |
| **State storage** | Centralized, mutable      | Distributed, immutable       |
| **Concurrency**   | Sequential (must lock)    | Parallel (independent UTxOs) |
| **Conflicts**     | Common (shared state)     | Never (each UTxO unique)     |
| **State history** | Only latest               | Every version preserved      |
| **Verification**  | Trust contract logic      | Math + consensus             |
| **Scalability**   | TPS limited by sequencing | TPS limited by network only  |

### eUTxO Structure In Detail

**Anatomy of Single UTxO**:

```
UTxO on TipJar contract
┌─────────────────────────────────────────────────┐
│ METADATA                                        │
├─────────────────────────────────────────────────┤
│ Output Index: 0                                 │
│ Transaction ID: abc123def456...                 │
│ UTxO ID: abc123def456...#0                      │
├─────────────────────────────────────────────────┤
│ ADDRESS (Script Address)                        │
│ addr_test1wrpxq24hlz3ch3h6e7j3kfjr2rhmjf...  │
│ (Only tipjar validator can unlock this)         │
├─────────────────────────────────────────────────┤
│ VALUE                                           │
│ ├─ ADA: 102_000_000 lovelace (102 ADA)        │
│ └─ Tokens: {policy#tokenname: 1}               │
├─────────────────────────────────────────────────┤
│ DATUM (Application State)                       │
│ {                                               │
│   owner: pk_alice,                              │
│   total_collected: 500_000_000,  (500 ADA)     │
│   tips: [                                       │
│     {from: pk_bob, amount: 2_000_000},         │
│     {from: pk_carol, amount: 5_000_000}        │
│   ]                                             │
│ }                                               │
├─────────────────────────────────────────────────┤
│ DATUM HASH (for reference UTxOs)               │
│ hash(datum) = 5f1c7e...                        │
└─────────────────────────────────────────────────┘
```

**Each Component Explained**:

1. **Address = Ownership rule**
   - Regular address: controlled by private key
   - Script address: controlled by validator logic

2. **Value = Assets**
   - ADA: always present
   - Tokens: optional (NFTs, stablecoins, etc.)

3. **Datum = State**
   - Can be ANY Aiken type (record, list, enum)
   - Must be valid according to script
   - Locked inside UTxO (cannot change without spending)

4. **Script Reference**
   - Optional: include validator code inline
   - Reduces TX size when spending
   - Useful for complex validators

### State Transition: From UTxO to UTxO

**Simple Flow**:

```
BEFORE (State 0):
UTxO #0 on script
├─ Value: 100 ADA
├─ Datum: {owner: alice, total: 0}

USER ACTION:
Bob wants to send 5 ADA tip

TRANSACTION (off-chain builds):
Input:
  └─ Spends UTxO #0
     Redeemer: Tip {amount: 5_000_000}

Validation (script runs):
  ✓ Check datum structure valid
  ✓ Check redeemer == Tip
  ✓ Check amount > 0
  ✓ Check output on script address
  ✓ Check value increased by 5 ADA
  Result: TRUE

Output:
  └─ New UTxO #1 on script
     Value: 105 ADA
     Datum: {owner: alice, total: 500_000_000 + 5_000_000}

AFTER (State 1):
UTxO #1 (replaces #0)
├─ Value: 105 ADA
├─ Datum: {owner: alice, total: 5}
```

**Multi-Step Scenario**:

```
State 0: UTxO #0 (100 ADA, tips=[])
    ↓ (Bob tips 2 ADA) - script validates
State 1: UTxO #1 (102 ADA, tips=[{Bob, 2}])
    ↓ (Carol tips 5 ADA) - script validates
State 2: UTxO #2 (107 ADA, tips=[{Bob, 2}, {Carol, 5}])
    ↓ (Owner claims, signature checked) - script validates
State 3: UTxO #3 (0 ADA, empty) + separate payment to alice
```

### TipJar eUTxO Data Model

**On-chain representation**:

```aiken
pub type TipJarDatum {
  owner: VerificationKeyHash,
  total_collected: Int,  // in lovelace
  tips: List<Tip>,
  version: Int,
}

pub type Tip {
  from: VerificationKeyHash,
  amount: Int,
  timestamp: Int,
}

pub type Redeemer {
  Tip { amount: Int }
  Claim
}
```

**State transitions in practice**:

```
Initial TipJar creation (off-chain):
  create_datum(owner=alice, total=0, tips=[], version=1)
  lock on script with 0 ADA

User Bob tips 2 ADA:
  read UTxO datum
  create new datum with:
    total += 2,
    tips += [Tip{from: bob, amount: 2}],
    version += 1
  spend UTxO with Redeemer::Tip
  lock new UTxO with +2 ADA

User Carol tips 5 ADA:
  read UTxO datum (now version 2)
  create new datum with:
    total += 5,
    tips += [Tip{from: carol, amount: 5}],
    version += 1
  spend UTxO with Redeemer::Tip
  lock new UTxO with +5 ADA

Alice claims tips:
  read UTxO datum (now version 3, total 7 ADA)
  spend UTxO with Redeemer::Claim (alice signs)
  output 7 ADA to alice's wallet
  create new empty UTxO for next tips
```

### Why eUTxO Enables Parallelism

**Example: 3 concurrent tips (Hydra scenario)**

```
Scenario A: Account-based (Ethereum)
┌─────────────────────────────────┐
│ Shared state: balance = 100     │
└────────────┬────────────────────┘
             ├─ Tx1: balance += 2
             │       Read: 100 → Add 2 → Write: 102
             │
             ├─ Tx2: balance += 5
             │       Read: ? (100 or 102?)
             │       CONFLICT! Must wait for Tx1
             │
             └─ Tx3: balance += 3
                    Read: ? (102 or 107?)
                    CONFLICT! Must wait for Tx1 & Tx2

Result: SEQUENTIAL
        TX1 → TX2 → TX3
        Speed: 1 TPS (approximately)

Scenario B: eUTxO (Cardano + Hydra)
Initial: UTxO #0 (100 ADA)
    ├─ User1 builds Tx1: Spend #0, create #1 (102 ADA)
    ├─ User2 builds Tx2: Spend #0, create #2 (105 ADA)
    ├─ User3 builds Tx3: Spend #0, create #3 (103 ADA)
    │
    ├─ Hydra Head processes all 3 SIMULTANEOUSLY
    │  (they don't conflict - each spends different UTxO if separated)
    │
    └─ Result: All 3 accepted (with ordering for blockchain)

Result: PARALLEL in Hydra
        TX1, TX2, TX3 all process
        Speed: 1000+ TPS possible
```

**Key insight**: eUTxO allows **true parallelism** because each transaction independently modifies different UTxOs, vs account-based which must serialize access to shared global state.

### eUTxO Benefits for TipJar

**1. Scalability**

```
Account-based: 1000 tips = 1000 sequential operations = slow
eUTxO: 1000 tips = parallel processing = fast
```

**2. No MEV (Miner Extractable Value)**

```
Account-based: Ordering matters, MEV attacks possible
eUTxO: No ordering dependency, MEV-resistant
```

**3. Deterministic Execution**

```
Account-based: Same code, different inputs → different results
eUTxO: Same code, same inputs → always same result
```

**4. Composability**

```
Multiple TipJars running parallel:
  TipJar 1 + TipJar 2 + TipJar 3 = no conflicts
  All work independently and simultaneously
```

👉 **Kết luận**:
eUTxO model:

- ✅ **Distributed**: Each UTxO independent
- ✅ **Parallel**: Multiple TXs simultaneously
- ✅ **Immutable**: State history preserved
- ✅ **Deterministic**: Predictable outcomes
- ✅ **Scalable**: Designed for 1000s TPS

**For TipJar**:

```
Account-model: Cannot scale 1000 concurrent tips
eUTxO + Hydra: Handles 1000 concurrent tips easily
= Perfect fit for micropayment system
```

</details>

---

## ✅ Bài 3: Datum và Redeemer trong hello_world

### 📌 Đề bài

Mô tả cấu trúc **Datum** và **Redeemer** trong smart contract `hello_world`.

### 💡 Gợi ý

- Owner
- Message
- Xác thực

<details>
<summary>Đáp án</summary>

**Datum**:

```aiken
pub type Datum {
  owner: VerificationKeyHash,
}
```

→ Lưu chủ sở hữu của UTxO.

**Redeemer**:

```aiken
pub type Redeemer {
    message: String,
}
```

→ Chứa thông điệp do người dùng cung cấp (phải là "Hello, World!").
👉 Kết luận: Datum kiểm soát “ai”, Redeemer kiểm soát “làm gì”.

</details>

---

## ✅ Bài 4: Logic Validator

### 📌 Đề bài

Phân tích logic chính trong hàm spend của validator hello_world.

### 💡 Gợi ý

- must_say_hello
- must_be_signed
- expect Some(datum)

<details>
<summary>Đáp án</summary>

Validator kiểm tra 2 điều kiện chính:

- must_say_hello: redeemer.msg == "Hello, World!"
- must_be_signed: Giao dịch phải được ký bởi datum.owner (kiểm tra trong tx.extra_signatories)

Ngoài ra dùng expect Some(datum) = datum_opt để đảm bảo UTxO có Datum hợp lệ.
Nếu không thỏa mãn → giao dịch thất bại.

```aiken
pub fn spend(datum: Datum, redeemer: Redeemer, context: ScriptContext) -> Bool {
  let must_say_hello = redeemer.message == "Hello, World!"
  let must_be_signed = list.has(context.transaction.extra_signatories, datum.owner)

  must_say_hello && must_be_signed
}
```

👉 Kết luận: Đây là nền tảng để xây dựng logic phức tạp hơn cho TipJar (gửi tip, rút tiền…). Validator là gatekeeper để bảo vệ mọi thay đổi trạng thái.

</details>

---

## ✅ Bài 5: So sánh On-chain và Off-chain

### 📌 Đề bài

So sánh trách nhiệm và vai trò của On-chain (Aiken) và Off-chain (Backend + Hydra) khi xây dựng TipJar trên Cardano + Hydra.

### 💡 Gợi ý

- Bảo mật vs Hiệu năng
- Validator vs State Management
- Layer-1 vs Hydra Head
- Trustless vs User Experience

<details>
<summary>Đáp án</summary>

| Tiêu chí                | On-chain (Aiken/Validator)                                   | Off-chain (Backend + Hydra)                            |
| ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------ |
| **Bảo mật**             | Cao - Validator là final check, không thể gian lận           | Thấp hơn - Chỉ hỗ trợ, phải chịu mộtxem xét cuối cùng  |
| **Hiệu năng**           | Chậm & Đắt - Phải xác thực trên Layer-1                      | Nhanh & Rẻ - Xử lý realtime trên Hydra Head            |
| **Logic**               | Logic cốt lõi & ràng buộc bắt buộc (tất cả tx phải tuân thủ) | Xây dựng giao dịch, quản lý state tạm thời trong Hydra |
| **Vai trò**             | Bảo vệ tài sản, đảm bảo không ai xâm phạm                    | Cải thiện UX, tăng throughput, quản lý luồng công việc |
| **Thời điểm hoạt động** | Khi đóng Head (settle) hoặc nghi ngờ mâu thuẫn               | Liên tục trong Hydra Head cho đến khi đóng             |

**Chi tiết từng vai trò:**

**On-chain (Validator Aiken)**:

- Kiểm tra tất cả input/output UTxO có hợp lệ
- Xác minh chữ ký và điều kiện logic
- Bảo vệ chống lại hành vi độc hại
- Là "nguồn chân lý" cuối cùng trong hệ thống

**Off-chain (Backend + Hydra)**:

- Nhận yêu cầu từ client (gửi tip, rút tiền)
- Xây dựng giao dịch phù hợp với datum/redeemer
- Quản lý state tạm thời trong Hydra Head
- Khi đủ điều kiện → hợp nhất lên Layer-1
- Validator Aiken sẽ kiểm tra lần cuối trước khi confirm

👉 Kết luận: **On-chain + Off-chain + Hydra** tạo thành mô hình hoàn hảo:

- ✅ Bảo mật (On-chain validator)
- ✅ Hiệu năng (Hydra Head)
- ✅ Trải nghiệm tốt (Off-chain orchestration)
- ✅ Trustless & Decentralized

</details>
