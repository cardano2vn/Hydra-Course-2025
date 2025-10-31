use aiken/collection/list
use aiken/crypto.{VerificationKeyHash}
use cardano/assets.{lovelace_of}
use cardano/transaction.{Output, OutputReference, Transaction, find_input}
use cardano/tx.{verify_signature}
use contract/types.{Claim, Datum, Redeemer, Tip}

validator tipjar(owner: VerificationKeyHash, minimum_tip: Int) {
  spend(
    datum_option: Option<Datum>,
    redeemer: Redeemer,
    output_reference: OutputReference,
    transaction: Transaction,
  ) {
    let Transaction { inputs, outputs, extra_signatories, .. } = transaction
    when redeemer is {
      Tip -> True
      Claim -> verify_signature(extra_signatories)
    }
  }

  else(_) {
    fail
  }
}
