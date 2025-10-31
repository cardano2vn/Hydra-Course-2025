use aiken/crypto.{VerificationKeyHash}
use cardano/address.{Address}

pub type Datum {
  participants: List<(Address, Int)>,
}

pub type Redeemer {
  Tip
  Claim
}
