use aiken/collection/list
use cardano/address.{Address}
use cardano/transaction.{
  Output
}


/// Find all outputs that are paying into the given script hash, if any. This is useful for
/// contracts running over multiple transactions.
pub fn find_script_outputs(
  outputs: List<Output>,
  script_address: Address,
) -> List<Output> {
  outputs
    |> list.filter(
        fn(output) {
          output.address.payment_credential == script_address.payment_credential
        },
      )
}
