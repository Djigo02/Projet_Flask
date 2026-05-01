import { TransactionId } from '../value-objects/TransactionId';
import { UserId } from '../value-objects/UserId';
import { Money } from '../value-objects/Money';

export type TransactionStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export class Transaction {
  constructor(
    public readonly id: TransactionId,
    public readonly senderId: UserId,
    public readonly receiverId: UserId,
    public readonly amount: Money,
    public status: TransactionStatus,
  ) {}
}
