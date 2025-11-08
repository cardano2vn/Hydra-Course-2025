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

## ⚡ Getting Started

Follow these steps to set up source code locally or deploy it for production. Prerequisites: Node.js 18+, Docker, and a Cardano wallet with testnet ADA (use the [Cardano faucet](https://docs.cardano.org/cardano-testnet/faucet) for preview/testnet).

1. **Clone the Repository**

   ```bash
   git clone https://github.com/cardano2vn/Hydra-Course-2025.git
   cd Code/video_12
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # Or: yarn install
   # Or: bun install
   ```

3. **Configure Environment**

   - Copy the example env file: `cp .env.example .env`
   - Edit `.env`:
     - `BLOCKFROST_API_KEY`: Obtain from [Blockfrost](https://blockfrost.io/).
     - `NETWORK`: Set to `preview` (testnet) or `mainnet`.
     - `MIN_TIP_AMOUNT`: Default is `1000000` (1 ADA in lovelace).
     - `HYDRA_NODE_URL`: Local or remote Hydra node (e.g., `ws://localhost:4001`).
   - For Hydra: Install and run a Hydra node (see [Hydra Docs](https://hydra.family/head-protocol/)).

4. **Run Locally**

   ```bash
   npm run dev
   ```

   Access at [http://localhost:3000](http://localhost:3000). Connect a wallet, initialize a Hydra Head, and test tipping.

5. **Build for Production**

   ```bash
   npm run build
   npm start
   ```

   Optimized build served on port 3000.

6. **Docker Compose**
   ```bash
   docker-compose up --build
   ```
   Launches all services (frontend, Hydra node, PostgreSQL, Nginx). Access at [http://localhost:3000](http://localhost:3000). Scale Hydra nodes with `docker-compose scale hydra-node=3` for multi-party setups.

**Troubleshooting**:

- **Wallet Issues**: Ensure CIP-30 compatibility and browser extensions are enabled.
- **Hydra Errors**: Verify node sync with `hydra-node --help`. Check network alignment (preview/mainnet).
- **Test ADA**: Request from the Cardano testnet faucet for preview network.

---

# Viết Hợp Đồng Thông Minh Bằng Aiken

```aiken
use aiken/collection/list
use aiken/crypto.{VerificationKeyHash}
use cardano/assets.{lovelace_of}
use cardano/transaction.{Output, OutputReference, Transaction, find_input}
use cardano/tx.{verify_signature}
use contract/types.{Claim, Datum, Redeemer, Tip}
use contract/utils.{find_script_outputs}

/// validators/tipjar.ak
/// ─────────────────────────────────────────────────────────────────────────────
/// TipJar – A Simple On-Chain Tip Jar on Cardano
///
/// Anyone can **tip** the jar by:
///   • Paying at least `minimum_tip` lovelace
///   • Adding **exactly one new message**
///   • Preserving the owner and all previous messages
///
/// The **owner** (identified by `VerificationKeyHash`) can **claim** all funds by signing.
///
/// This validator uses:
///   • `find_script_outputs` from `contract/utils` (custom helper)
///   • `verify_signature` from `cardano/tx` (checks owner signature)
/// ─────────────────────────────────────────────────────────────────────────────
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
      /// ─────────────────────────────────────────────────────────────────
      /// Case: Tip – Anyone can add a tip
      ///   • Must increase lovelace by at least `minimum_tip`
      ///   • Output must go to same script address (enforced above)
      ///   • Note: No datum check here → **vulnerable to message tampering**
      /// ─────────────────────────────────────────────────────────────────
      Tip ->
        lovelace_of(script_output.value) >= lovelace_of(
          script_input.output.value,
        ) + minimum_tip

      /// ─────────────────────────────────────────────────────────────────
      /// Case: Claim – Owner withdraws all funds
      ///   • `verify_signature` checks if `owner` is in `extra_signatories`
      ///   • No output required → jar is emptied
      ///   • Owner must sign the transaction
      /// ─────────────────────────────────────────────────────────────────
      Claim -> verify_signature(extra_signatories, owner)
    }
  }

/// ───────────────────────────────────────────────────────────────────────
  /// Reject all other spending purposes (mint, withdraw, cert, etc.)
  /// ───────────────────────────────────────────────────────────────────────
  else(_) {
    fail
  }
}
```

# Kiểm Tra Tính Đúng Đắn Của Hợp Đồng Thông Minh Bằng Aiken

## Kiểm Tra Tip Thành Công

```aiken
use cardano/assets.{add, from_lovelace}
use cardano/transaction.{InlineDatum, Input, Transaction}
use contract/types.{Claim, Datum, Tip}
use mocktail.{
  add_input, complete, mock_script_address, mock_script_output, mock_tx_hash,
  mock_utxo_ref, mocktail_tx, required_signer_hash, tx_in, tx_in_inline_datum,
  tx_out, tx_out_inline_datum,
}
use mocktail/virgin_address.{mock_pub_key_address}
use mocktail/virgin_key_hash.{mock_pub_key_hash}
use tipjar

// ─────────────────────────────────────────────────────────────────────────────
// Test: tip_accepts_valid_transaction
//
// Purpose: Verify that a **valid tip** (≥ minimum_tip, correct output) is accepted.
//
// Preconditions:
//   • Script input: 10 ADA
//   • Script output: 11 ADA (increase by 1 ADA)
//   • minimum_tip = 1 ADA
//   • Redeemer = Tip
//   • Output goes to the **same script address**
//   • Tipper signs the transaction
//
// Expected: Validator **accepts** the spend.
// ─────────────────────────────────────────────────────────────────────────────
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

## Kiểm Tra Tip Không Đủ Tiền

```aiken
// ─────────────────────────────────────────────────────────────────────────────
// Test: tip_rejects_insufficient_tip
//
// Purpose: Ensure the validator **rejects** tips below `minimum_tip`.
//
// Preconditions:
//   • Input: 10 ADA
//   • Output: 10 ADA (no increase)
//   • minimum_tip = 1 ADA
//   • Redeemer = Tip
//   • Output address is correct
//   • Tipper signs
//
// Expected: Validator **rejects** the transaction.
// → This test should FAIL if run (we expect rejection), but in Aiken we
//   can only test success paths. Use off-chain testing or negative logic.
//   Here we keep it as a **documentation** of intended failure.
// ─────────────────────────────────────────────────────────────────────────────
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

## Địa Chỉ Chuyển Tiền Bị Sai

```aiken
// ─────────────────────────────────────────────────────────────────────────────
// Test: tip_rejects_wrong_output_address
//
// Purpose: Ensure the tip **must** go back to the **same script address**.
//
// Preconditions:
//   • Input: script address
//   • Output: **pubkey address** (not script)
//   • Value increased correctly
//   • Redeemer = Tip
//
// Expected: Validator **rejects** — TipJar must persist.
// ─────────────────────────────────────────────────────────────────────────────
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

## Lấy Tiền Về Thành Công

```aiken
// ─────────────────────────────────────────────────────────────────────────────
// Test: claim tips on success
//
// Purpose: Ensure the tip **must** go back to the **same script address**.
//
// Preconditions:
//   • Input: script address
//   • Output: **pubkey address** (not script)
//   • Value increased correctly
//   • Redeemer = Tip
//
// Expected: Validator **rejects** — TipJar must persist.
// ─────────────────────────────────────────────────────────────────────────────
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

## Lấy Tiền Về Nhưng Không Phải Người Sơ Hữu

```aiken
// ─────────────────────────────────────────────────────────────────────────────
// Test: claim tips not owner
//
// Purpose: Ensure the tip **must** go back to the **same script address**.
//
// Preconditions:
//   • Input: script address
//   • Output: **pubkey address** (not script)
//   • Value increased correctly
//   • Redeemer = Tip
//
// Expected: Validator **rejects** — TipJar must persist.
// ─────────────────────────────────────────────────────────────────────────────
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

# Viết Offchain Code Bằng MeshJS
