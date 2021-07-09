import { Address, BigInt } from "@graphprotocol/graph-ts"
import { EntityHelper } from "../helpers/EntityHelper"
import { Dough } from "../generated/Dough/Dough"

export class DoughHelper {
  constructor() {}

  static transfer(contract: Address, from: Address, to: Address, amount: BigInt): void {
    let dough = Dough.bind(contract);

    this.incrementAmount(from, amount, dough);
    this.decrementAmount(to, amount, dough);
  }

  static incrementAmount(address: Address, amount: BigInt, dough: Dough): void {
    // loading the Holder Entity, or creating one if doesn't exist yet...
    let holder = EntityHelper.loadHolder(address.toHex(), dough.symbol());

    // loading the Token Entity, or creating one if doesn't exist yet...
    let token = EntityHelper.loadToken(address.toHex(), dough, holder, amount);
    token.balance = token.balance.plus(amount);
    token.save();
  }

  static decrementAmount(address: Address, amount: BigInt, dough: Dough): void {
    // loading the Holder Entity, or creating one if doesn't exist yet...
    let holder = EntityHelper.loadHolder(address.toHex(), dough.symbol());

    // loading the Token Entity, or creating one if doesn't exist yet...
    let token = EntityHelper.loadToken(address.toHex(), dough, holder, amount);
    token.balance = token.balance.minus(amount);
    token.save();
  }  
}