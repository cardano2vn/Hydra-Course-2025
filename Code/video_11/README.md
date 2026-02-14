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

Hướng dẫn này giúp bạn:

- **Cài đặt Bun** — JavaScript/TypeScript Runtime
- **Cài đặt Aiken** — toolchain viết/biên dịch smart contract Cardano bằng ngôn ngữ Aiken.
- **Tổ chức cấu trúc thư mục hợp lý** — dễ maintain, test, CI/CD và tích hợp Hydra.
- **Chuẩn bị dữ liệu mẫu (fixtures)** — fixtures UTxO, keys testnet, sample transaction để test nhanh.
- **Chạy, build, test & deploy** — quy trình phát triển smart contract từ đầu đến cuối.

Dự án trong thư mục `contract/` chứa một **template validator Aiken** hỗ trợ nhiều purpose: mint, spend, withdraw, governance. Bạn sẽ triển khai logic thực tế theo yêu cầu ứng dụng (ví dụ: tự động commit ADA vào Hydra Head, kiểm tra chữ ký, quản lý timelock, v.v.).

## Mục Tiêu

- ✅ Template validator Aiken đa mục đích.
- ✅ Hỗ trợ Plutus v3 (compatible với Hydra & mainnet).
- ✅ Cấu trúc modular: `validators/`, `lib/`, `env/` cho code organize tốt
- ✅ Test framework tích hợp (Aiken test).
- ✅ Blueprint JSON sinh tự động (dùng cho frontend: React, Mesh, Lucid…).

---

## Cấu Trúc Thư Mục

Gợi ý tổ chức cho dự án on-chain + off-chain + test:

```
tipjar/
├─ contract/                  # Dự án Aiken chính
│  ├─ validators/             # Các validator .ak (placeholder.ak)
│  │  └─ hello-world.ak       # Template: mint, spend, withdraw, governance
│  ├─ lib/                    # Helper modules (utility functions)
│  ├─ env/                    # Cấu hình môi trường (preview/preprod/mainnet)
│  ├─ build/                  # Artifacts (generated) - IGNORE in git
│  │  ├─ default/
│  │  └─ ...
│  ├─ aiken.toml              # Config: compiler, plutus version, dependencies
│  ├─ aiken.lock              # Lock file (auto-generated)
│  └─ plutus.json             # Generated: compiled bytecode & schema
├─ tests/                     # Frontend (Next.js)
│  ├─ mesh.test.ts                # Landing page
│  ├─ layout.tsx              # Root layout
│  ├─ globals.css             # Styling
│  └─ ...
├─ txbuilder/                 # Helper scripts
│  └─ mesh.txbuilder.ts       # Deploy helpers
├─ adapters/                 # Helper scripts
│  └─ mesh.adapter.ts       # Deploy helpers
├─ README.md                  # Hướng dẫn này
├─ package.json               # Node.js dependencies
├─ tsconfig.json              # TypeScript config
└─ .gitignore                 # Ignore artifacts, keys, db
```

---

## Yêu Cầu Hệ Thống

### Bắt buộc

- **OS**: Ubuntu 22.04 / WSL2 (Windows) / macOS
- **Bun**: 20+ (cho frontend)
- **Aiken**: 1.1.5+ (toolchain Plutus scripting)

---

## Cài Đặt Chi Tiết (Bước Theo Bước)

### Bước 1: Cập nhật hệ thống & cài công cụ cơ bản

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y curl wget git jq build-essential ca-certificates
```

### Bước 2: Cài Node.js (nếu chưa có)

```bash
# Dùng NVM (khuyến nghị)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
node --version  # v18.x.x
npm --version   # 9.x.x
```

### Bước 3: Cài Aiken (Smart Contract Toolchain)

```bash
# Tải và cài script chính thức
curl -sSf https://raw.githubusercontent.com/input-output-hk/aiken/master/install.sh | sh

# Thêm vào PATH
export PATH="$HOME/.local/bin:$PATH"
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Kiểm tra
aiken --version
# Output: aiken v1.1.15 (hoặc cao hơn)
```

### Bước 4: Clone / Thiết lập dự án

```bash
# Clone repo (nếu chưa có)
git clone <repo-url>
cd Code/video_11

# Hoặc nếu đã có folder
cd Hydra-Course-2025/Code/video_11
```

### Bước 5: Cài dependencies frontend & chạy dev server

```bash
# Cài npm packages
npm install

# Chạy frontend (dev mode)
npm run dev
# Output: Local: http://localhost:3000
```

Mở browser và truy cập `http://localhost:3000` để xem landing page.

### Bước 6: Build & kiểm tra smart contract Aiken

```bash
# Di chuyển vào thư mục contract
cd contract

# Static checks & tests (nếu có)
aiken check
# Output: "All checks passed!" nếu không lỗi

# Build artifacts (Plutus v3)
aiken build
# Output:
#   ✓ Compiling aiken/contracts
#   ✓ Building artifacts
#   Generated: build/default/..., plutus.json
```

**Kết quả**:

- `contract/build/` chứa compiled scripts (.plutus, .cbor)
- `contract/plutus.json` chứa blueprint (schema, bytecode, hash)

### Bước 7: (Tùy chọn) Kiểm tra artifacts

```bash
# Xem danh sách validators đã compile
jq '.validators[] | .title' contract/plutus.json

# Output:
#   "placeholder.placeholder.mint"
#   "placeholder.placeholder.spend"
#   "placeholder.placeholder.withdraw"
#   ...
```

---

## Mô Tả Chi Tiết Mã Nguồn

### 1) Frontend (`app/` — Next.js)

**File**: `app/page.tsx`

- Trang landing hiển thị logo Hydra, thông tin dự án, và links nhanh.
- Liên kết đến `README.md`, thư mục `contract/`, và tài nguyên bên ngoài (Hydra official).

**File**: `app/layout.tsx`

- Root layout, metadata trang (title, description), lang = `vi`.

**File**: `app/globals.css`

- CSS toàn cục, biến màu (background, foreground, muted).

**Tên**: Hiện tại đây là demo UI; không tích hợp runtime với Cardano node hay Hydra Head trong JS. Phục vụ mục đích giáo dục & documentation.

### 2) Smart Contracts (`contract/` — Aiken)

#### `contract/aiken.toml`

Cấu hình dự án Aiken:

```toml
name = "cardano2vn/contract"
version = "0.0.0"
compiler = "v1.1.15"        # Phiên bản Aiken
plutus = "v3"               # Target Plutus version
license = "Apache-2.0"

[[dependencies]]
name = "aiken-lang/stdlib"  # Standard library
version = "v3.0.0"
source = "github"

[[dependencies]]
name = "sidan-lab/vodka"    # Utility library
version = "0.1.21"
source = "github"
```

**Ý nghĩa**:

- Compiler `v1.1.15` dùng để biên dịch các file `.ak`.
- `plutus = "v3"` sinh ra Plutus v3 scripts (hỗ trợ Hydra & current mainnet).
- Dependencies tự động pull từ GitHub.

#### `contract/validators/placeholder.ak`

Template validator Aiken chứa 6+ handlers:

```aiken
validator placeholder {
  mint(_redeemer: Data, _policy_id: PolicyId, _self: Transaction) {
    todo @"mint logic goes here"
  }

  spend(_datum: Option<Data>, _redeemer: Data, _utxo: OutputReference, _self: Transaction) {
    todo @"spend logic goes here"
  }

  withdraw(_redeemer: Data, _account: Credential, _self: Transaction) {
    todo @"withdraw logic goes here"
  }

  publish(_redeemer: Data, _certificate: Certificate, _self: Transaction) {
    todo @"publish logic goes here"
  }

  vote(_redeemer: Data, _voter: Voter, _self: Transaction) {
    todo @"vote logic goes here"
  }

  propose(_redeemer: Data, _proposal: ProposalProcedure, _self: Transaction) {
    todo @"propose logic goes here"
  }
}
```

**Chi tiết từng handler**:

1. **`mint`**: Kiểm tra quy tắc mint token (ví dụ: giới hạn số lượng, verify policy).
2. **`spend`**: Kiểm tra khi UTxO được chi tiêu (datum + redeemer + output).
3. **`withdraw`**: Kiểm tra rút tiền từ script account (withdrawal certificates).
4. **`publish`**: Xác thực publish certificate (governance/stake pool).
5. **`vote`**: Xác thực governance vote.
6. **`propose`**: Xác thực governance proposal.

**Hiện tại**: Tất cả handler đều là `todo @"..."` — bạn cần viết logic Boolean trả về `True`/`False` để approve/reject.

#### `contract/plutus.json`

Generated artifact sau `aiken build`. Chứa:

- **preamble**: metadata (title, version, compiler, plutusVersion).
- **validators**: array các validator compiled với `compiledCode` (bytecode CBOR/hex) và `hash`.
- **definitions**: schema (Data types).

Ví dụ entry:

```json
{
  "title": "placeholder.placeholder.mint",
  "redeemer": {
    "title": "_redeemer",
    "schema": { "$ref": "#/definitions/Data" }
  },
  "compiledCode": "58d001010029...", // Bytecode hex
  "hash": "f2388d136606a27c4a531d0040c3e12e07eb95cd5011793c160707dc"
}
```

**Dùng cho**:

- Deploy lên blockchain (register script).
- Frontend: tạo transaction submit (Mesh, Lucid SDK).
- Testing: verify script hash, interact qua cardano-cli.

#### `contract/lib/`

Thư mục chứa helper modules (functions, types). Hiện empty (tùy chọn mở rộng).

#### `contract/env/`

Cấu hình môi trường (preview, preprod, mainnet). Hiện empty; dùng để:

- Set `network_id`, `utxo_cost_per_word`, constants per network.
- Aiken parse & apply conditional logic khi build cho từng env.

---

## Workflow Phát Triển Smart Contract

### Workflow cơ bản:

1. **Viết logic** trong `validators/*.ak`
   - Thay `todo` bằng biểu thức Aiken thực tế.
   - Ví dụ: `(redeemer == 42) && (length(signers) > 0)` → True = OK, False = reject.

2. **Chạy kiểm tra tĩnh** (Aiken check)

   ```bash
   aiken check
   ```

   - Verify syntax, type safety, unused variables.

3. **Viết test unit** (tùy chọn, trong `validators/` hoặc `tests/`)

   ```aiken
   test mint_success() {
     placeholder.mint(Data, Policy_123, dummy_tx) == True
   }
   ```

   - Chạy: `aiken check` (auto-runs tests)

4. **Build artifacts** (tạo Plutus v3)

   ```bash
   aiken build
   ```

   - Output: `build/default/`, `plutus.json`

5. **Test integration** (với node/CLI)
   - Dùng `cardano-cli` + node socket để:
     - Tạo transaction → attach script → sign → submit.
     - Verify script execution trên blockchain.

6. **Deploy** (optional)
   - Upload script hash vào on-chain record.
   - Tích hợp vào ứng dụng (Hydra Head, dApp frontend, v.v.).

---

## Chuẩn Bị Dữ Liệu Mẫu (Fixtures)

Để test deterministic & nhanh, hãy tạo thư mục `samples/` chứa UTxO fixtures, keys, và mẫu transaction.

### Cấu trúc `samples/`:

```
samples/
├─ utxos/
│  ├─ alice_utxo.json
│  └─ bob_utxo.json
├─ keys/
│  ├─ alice.vkey
│  ├─ alice.skey           # SENSITIVE: NEVER commit real keys!
│  ├─ bob.vkey
│  └─ bob.skey
└─ txs/
   ├─ commit_sample.json
   └─ close_sample.json
```

### Ví dụ `samples/utxos/alice_utxo.json`:

```json
{
  "txHash": "be3fa4c1234567890abcdef0123456789abcdef0123456789abcdef0c01b",
  "txIx": 0,
  "address": "addr_test1qz2fxv2umyhttkxyxp8x0dlvedkqxm8zjqvu5u6pn5xknqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq9fxsw",
  "amount": {
    "lovelace": 100000000 // 100 ADA
  }
}
```

### Ví dụ `samples/keys/alice.vkey` (public key):

```json
{
  "type": "PaymentVerificationKeyShelley_ed25519",
  "description": "Payment Verification Key",
  "cborHex": "582000000000000000000000000000000000000000000000000000000000000000"
}
```

**Lưu ý**:

- **Không commit** `*.skey` (private keys) vào Git public repo.
- Dùng `.gitignore`:
  ```
  samples/keys/*.skey
  build/
  *.socket
  db/
  ```

### Script mẫu `scripts/build-and-test.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "=== Building Aiken contracts ==="
cd contract
aiken check
aiken build

echo "=== Verifying artifacts ==="
if [ -f plutus.json ]; then
    VALIDATOR_COUNT=$(jq '.validators | length' plutus.json)
    echo "✓ Generated $VALIDATOR_COUNT validators in plutus.json"
else
    echo "✗ plutus.json not found!"
    exit 1
fi

echo "=== Build complete ==="
echo "Artifacts location: $(pwd)/build"
echo "Blueprint: $(pwd)/plutus.json"
```

**Chạy**: `bash scripts/build-and-test.sh`

---

## Cách Sử Dụng Fixtures

Fixtures giúp:

1. **Test script** (Aiken unit test với mock UTxO).
2. **Thử nghiệm giao dịch** (build tx dùng fixtures + cardano-cli).
3. **CI/CD** (reproducible test environment).

Ví dụ: tạo script helper `scripts/build-tx.sh` để dùng fixtures:

```bash
#!/usr/bin/env bash
# Ví dụ: build transaction dùng fixture alice_utxo.json

TX_HASH=$(jq -r '.txHash' samples/utxos/alice_utxo.json)
TX_IX=$(jq -r '.txIx' samples/utxos/alice_utxo.json)
AMOUNT=$(jq -r '.amount.lovelace' samples/utxos/alice_utxo.json)

echo "Building tx from UTxO: $TX_HASH#$TX_IX (amount: $AMOUNT lovelace)"

# ... continue with cardano-cli build-raw ...
```

---

## Lưu Ý Bảo Mật & Thực Hành Tốt

1. **Không commit private keys**
   - `*.skey` file phải trong `.gitignore`.
   - Dùng env vars hoặc secrets manager cho CI.

2. **Kiểm tra phiên bản**
   - Ensure `aiken`, `cardano-node`, `cardano-cli` versions tương thích.
   - Check `aiken.toml` vs compiler version mà bạn cài.

3. **Test trước deploy**
   - Chạy `aiken check` & `aiken build` → không lỗi.
   - Viết test unit → `aiken check` auto-run tests.
   - Test integration trên testnet trước mainnet.

4. **Backup & version control**
   - Git commit khi source code stable.
   - Tag releases (v1.0.0, v1.1.0).

5. **Audit & review**
   - Code review trước deploy production.
   - Aiken code siêu ngắn & dễ audit.

---

<div align="center">

## Kết Luận

Bạn đã sẵn sàng phát triển smart contract Hydra!  

Thay `todo` trong `placeholder.ak` bằng logic của bạn, chạy `aiken check && aiken build`, rồi tích hợp vào frontend.  

Cộng đồng Cardano Việt Nam luôn sẵn sàng hỗ trợ.  

**Chúc bạn sớm triển khai thành công dApp đầu tiên trên Hydra Head!**

Trân trọng,  
**Nguyễn Duy Khánh**  
Hydra Course 2025 – Cardano2VN

</div>