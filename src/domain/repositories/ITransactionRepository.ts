import { Transaction } from '../entities/Transaction';

export interface ITransactionRepository {
  create(tx: Transaction): Promise<void>;
  findByUserId(userId: string): Promise<Transaction[]>;
}
