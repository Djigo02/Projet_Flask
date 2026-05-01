export class Money {
  constructor(private readonly amount: number) {
    if (amount < 0) throw new Error('Money cannot be negative');
  }
  value(): number { return this.amount; }
  add(other: Money): Money { return new Money(this.amount + other.amount); }
  subtract(other: Money): Money {
    const result = this.amount - other.amount;
    if (result < 0) throw new Error('Insufficient funds');
    return new Money(result);
  }
}
