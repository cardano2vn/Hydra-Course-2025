use aiken/collection/list
use aiken/crypto.{VerificationKeyHash}
use cardano/transaction.{OutputReference, Transaction}
use mocktail.{complete, mocktail_tx, required_signer_hash}
use mocktail/virgin_key_hash.{mock_pub_key_hash}
use mocktail/virgin_output_reference.{mock_utxo_ref}


//
// Datum defines the owner of the UTxO.
// Only this owner is allowed to spend it.
//
pub type Datum {
  owner: VerificationKeyHash,
}


//
// Redeemer carries a message that must match
// an expected value in order to unlock the UTxO.
//
pub type Redeemer {
  msg: ByteArray,
}


//
// Hello World validator
//
// Spending conditions:
// 1. A datum must be present
// 2. Redeemer message must be exactly "Hello, World!"
// 3. The transaction must be signed by the datum owner
//
validator hello_world {
  //
  // Spend validator logic
  //
  spend(
    datum_opt: Option<Datum>,
    redeemer: Redeemer,
    _input: OutputReference,
    tx: Transaction,
  ) {
    expect Some(datum) = datum_opt
    let must_say_hello = redeemer.msg == "Hello, World!"
    let must_be_signed = list.has(tx.extra_signatories, datum.owner)
    must_say_hello && must_be_signed
  }

  //
  // Any other action is rejected
  //
  else(_) {
    fail
  }
}

//
// Helper function to create a mock transaction
//
// - If `is_owner_signed` is True, the owner's key
//   is added to extra_signatories
// - Used only for testing
//
fn mock_tx(is_owner_signed: Bool) -> Transaction {
  mocktail_tx()
    |> required_signer_hash(is_owner_signed, mock_pub_key_hash(0))
    |> complete()
}

test test_hello_world() {
  let datum = Some(Datum { owner: mock_pub_key_hash(0) })
  let redeemer = Redeemer { msg: "Hello, World!" }
  let tx = mock_tx(True)
  hello_world.spend(datum, redeemer, mock_utxo_ref(0, 0), tx)
}

//
// Test case: successful spend
//
// Conditions:
// - Correct redeemer message
// - Owner signature present
//
test test_failed_hello_world_incorrect_redeemer() {
  let datum = Some(Datum { owner: mock_pub_key_hash(0) })
  let redeemer = Redeemer { msg: "GM World!" }
  let tx = mock_tx(True)
  !hello_world.spend(datum, redeemer, mock_utxo_ref(0, 0), tx)
}

//
// Test case: failure due to incorrect redeemer message
//
// Even with a valid signature, the spend must fail
//
test test_failed_hello_world_without_signer() {
  let datum = Some(Datum { owner: mock_pub_key_hash(0) })
  let redeemer = Redeemer { msg: "Hello, World!" }
  let tx = mock_tx(False)
  !hello_world.spend(datum, redeemer, mock_utxo_ref(0, 0), tx)
}