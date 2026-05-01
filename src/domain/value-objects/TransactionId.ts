export class TransactionId {
  constructor(private readonly value: string) {
    if (!value) throw new Error('TransactionId cannot be empty');
  }
  toString(): string { return this.value; }
}
