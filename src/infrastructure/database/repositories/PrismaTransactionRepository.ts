import { ITransactionRepository } from '../../../domain/repositories/ITransactionRepository';
import { Transaction } from '../../../domain/entities/Transaction';
import { prisma } from '../prisma';
import { TransactionId } from '../../../domain/value-objects/TransactionId';
import { UserId } from '../../../domain/value-objects/UserId';
import { Money } from '../../../domain/value-objects/Money';

export class PrismaTransactionRepository implements ITransactionRepository {
  async create(tx: Transaction): Promise<void> { await prisma.transaction.create({ data: { id: tx.id.toString(), senderId: tx.senderId.toString(), receiverId: tx.receiverId.toString(), amount: tx.amount.value(), status: tx.status } }); }
  async findByUserId(userId: string): Promise<Transaction[]> { const rows = await prisma.transaction.findMany({ where: { OR: [{ senderId: userId }, { receiverId: userId }] } }); return rows.map((r) => new Transaction(new TransactionId(r.id), new UserId(r.senderId), new UserId(r.receiverId), new Money(Number(r.amount)), r.status)); }
}
