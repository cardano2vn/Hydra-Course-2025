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
