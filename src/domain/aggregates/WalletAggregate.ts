import { UserId } from '../value-objects/UserId';
import { Money } from '../value-objects/Money';

export class WalletAggregate {
  constructor(public readonly userId: UserId, private balance: Money) {}

  getBalance(): Money { return this.balance; }
  credit(amount: Money): void { this.balance = this.balance.add(amount); }
  debit(amount: Money): void { this.balance = this.balance.subtract(amount); }
}
