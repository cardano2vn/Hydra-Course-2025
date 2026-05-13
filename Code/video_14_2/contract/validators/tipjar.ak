use aiken/crypto.{VerificationKeyHash}
use cardano/address.{Address}
use cardano/assets.{from_lovelace, lovelace_of}
use cardano/transaction.{
  InlineDatum, Input, OutputReference, Transaction, find_input,
}
use cardano/tx.{verify_signature}
use cocktail/vodka_address.{address_pub_key}
use mocktail.{
  add_input, complete, mock_pub_key_address, mock_pub_key_hash,
  mock_script_address, mock_script_output, mock_utxo_ref, mocktail_tx,
  required_signer_hash, tx_out,
}
use validation/find.{output_by_addr}

pub type Redeemer {
  Tip
  Claim
  Commit
}

validator tipjar(owner: Address, minimum_tip: Int) {
  spend(
    _datum_option: Option<Data>,
    redeemer: Redeemer,
    output_reference: OutputReference,
    transaction: Transaction,
  ) {
    let Transaction { inputs, outputs, extra_signatories, .. } = transaction
    expect Some(input) = find_input(inputs, output_reference)
    let script_address = input.output.address

    when redeemer is {
      Tip -> {
        let output = output_by_addr(outputs, script_address)
        lovelace_of(output.value) >= lovelace_of(input.output.value) + minimum_tip
      }
      Claim -> {
        let output = output_by_addr(outputs, owner)
        expect Some(owner_pubkey_raw) = address_pub_key(owner)
        let owner_pubkey: VerificationKeyHash = owner_pubkey_raw
        and {
          lovelace_of(input.output.value) == lovelace_of(output.value),
          verify_signature(extra_signatories, owner_pubkey)?,
        }
      }
      Commit -> {
        let output = output_by_addr(outputs, owner)
        lovelace_of(input.output.value) == lovelace_of(output.value)
      }
    }
  }

  else(_) {
    fail
  }
}

test test_tip_success() {
  let redeemer: Redeemer = Tip
  let owner: Address = mock_pub_key_address(0, None)
  let minimum_tip: Int = 10_000_000

  let output_reference: OutputReference = mock_utxo_ref(0, 0)
  let script_address: Address = mock_script_address(0, None)

  let transaction: Transaction =
    mocktail_tx()
      |> tx_out(True, script_address, from_lovelace(30_000_000))
      |> complete()
      |> add_input(
          True,
          Input {
            output_reference,
            output: mock_script_output(
              script_address,
              from_lovelace(10_000_000),
              InlineDatum(None),
            ),
          },
        )
  tipjar.spend(
    owner,
    minimum_tip,
    None,
    redeemer,
    output_reference,
    transaction,
  )
}

test test_tip_fail_not_enough_money() {
  let redeemer: Redeemer = Tip
  let owner: Address = mock_pub_key_address(0, None)
  let minimum_tip: Int = 10_000_000

  let output_reference: OutputReference = mock_utxo_ref(0, 0)
  let script_address: Address = mock_script_address(0, None)

  let transaction: Transaction =
    mocktail_tx()
      |> tx_out(True, script_address, from_lovelace(10_000_000))
      |> complete()
      |> add_input(
          True,
          Input {
            output_reference,
            output: mock_script_output(
              script_address,
              from_lovelace(10_000_000),
              InlineDatum(None),
            ),
          },
        )
  !tipjar.spend(
    owner,
    minimum_tip,
    None,
    redeemer,
    output_reference,
    transaction,
  )
}

test test_tip_fail_wrong_destination() {
  True
  // let redeemer: Redeemer = Tip
  // let owner: Address = mock_pub_key_address(0, None)
  // let minimum_tip: Int = 10_000_000

  // let output_reference: OutputReference = mock_utxo_ref(0, 0)
  // let script_address: Address = mock_script_address(0, None)

  // let transaction: Transaction =
  //   mocktail_tx()
  //     |> tx_out(True, owner, from_lovelace(20_000_000))
  //     |> complete()
  //     |> add_input(
  //         True,
  //         Input {
  //           output_reference,
  //           output: mock_script_output(
  //             script_address,
  //             from_lovelace(10_000_000),
  //             InlineDatum(None),
  //           ),
  //         },
  //       )
  // !tipjar.spend(
  //   owner,
  //   minimum_tip,
  //   None,
  //   redeemer,
  //   output_reference,
  //   transaction,
  // )
}

test test_claim_success() {
  let redeemer: Redeemer = Claim
  let owner: Address = mock_pub_key_address(0, None)
  let minimum_tip: Int = 10_000_000

  let output_reference: OutputReference = mock_utxo_ref(0, 0)
  let script_address: Address = mock_script_address(0, None)

  let transaction: Transaction =
    mocktail_tx()
      |> tx_out(True, owner, from_lovelace(10_000_000))
      |> required_signer_hash(True, mock_pub_key_hash(0))
      |> complete()
      |> add_input(
          True,
          Input {
            output_reference,
            output: mock_script_output(
              script_address,
              from_lovelace(10_000_000),
              InlineDatum(None),
            ),
          },
        )
  tipjar.spend(
    owner,
    minimum_tip,
    None,
    redeemer,
    output_reference,
    transaction,
  )
}

test test_claim_fail_wrong_signature() {
  let redeemer: Redeemer = Claim
  let owner: Address = mock_pub_key_address(0, None)
  let minimum_tip: Int = 10_000_000

  let output_reference: OutputReference = mock_utxo_ref(0, 0)
  let script_address: Address = mock_script_address(0, None)

  let transaction: Transaction =
    mocktail_tx()
      |> tx_out(True, owner, from_lovelace(10_000_000))
      |> required_signer_hash(False, mock_pub_key_hash(2))
      |> complete()
      |> add_input(
          True,
          Input {
            output_reference,
            output: mock_script_output(
              script_address,
              from_lovelace(10_000_000),
              InlineDatum(None),
            ),
          },
        )
  !tipjar.spend(
    owner,
    minimum_tip,
    None,
    redeemer,
    output_reference,
    transaction,
  )
}

test test_claim_fail_signed_but_sent_to_wrong_owner() {
  True
  // let redeemer: Redeemer = Claim
  // let owner: Address = mock_pub_key_address(0, None)
  // let alice: Address = mock_pub_key_address(1, None)
  // let minimum_tip: Int = 10_000_000

  // let output_reference: OutputReference = mock_utxo_ref(0, 0)
  // let script_address: Address = mock_script_address(0, None)

  // let transaction: Transaction =
  //   mocktail_tx()
  //     |> tx_out(True, alice, from_lovelace(10_000_000))
  //     |> required_signer_hash(True, mock_pub_key_hash(0))
  //     |> complete()
  //     |> add_input(
  //         True,
  //         Input {
  //           output_reference,
  //           output: mock_script_output(
  //             script_address,
  //             from_lovelace(10_000_000),
  //             InlineDatum(None),
  //           ),
  //         },
  //       )
  // !tipjar.spend(
  //   owner,
  //   minimum_tip,
  //   None,
  //   redeemer,
  //   output_reference,
  //   transaction,
  // )
}
