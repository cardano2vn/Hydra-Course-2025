# 📝 Bài tập - Chapter 04: Video 12

---

## ✅ Bài 1: Thiết kế Smart Contract TipJar

### 📌 Đề bài

Mô tả **3 yêu cầu cốt lõi** khi thiết kế smart contract TipJar và lý do chúng quan trọng.

### 💡 Gợi ý

- Gửi tip (open)
- Rút tiền (restricted)
- Tối ưu cho Hydra

<details>
<summary>Đáp án</summary>

### 3 yêu cầu cốt lõi:

1. **Bất kỳ ai cũng có thể gửi tip** — Mở cho contribution, không cần kiểm tra chữ ký.
2. **Chỉ owner mới được rút tiền (Claim)** — Bảo vệ tài sản bằng chữ ký.
3. **Giữ một UTxO duy nhất** — Tránh phân mảnh, dễ quản lý trạng thái trong Hydra.

👉 Kết luận: Thiết kế đơn giản nhưng chặt chẽ, phù hợp với mô hình UTxO và Hydra.

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
