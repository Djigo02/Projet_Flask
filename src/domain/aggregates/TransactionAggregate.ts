import { Transaction } from '../entities/Transaction';

export class TransactionAggregate {
  constructor(public readonly transaction: Transaction) {}
  markSuccess(): void { this.transaction.status = 'SUCCESS'; }
  markFailed(): void { this.transaction.status = 'FAILED'; }
}
