import { IWalletRepository } from '../../../domain/repositories/IWalletRepository';
import { WalletAggregate } from '../../../domain/aggregates/WalletAggregate';
import { UserId } from '../../../domain/value-objects/UserId';
import { Money } from '../../../domain/value-objects/Money';
import { prisma } from '../prisma';

export class PrismaWalletRepository implements IWalletRepository {
  async create(userId: string): Promise<void> { await prisma.wallet.create({ data: { userId, balance: 0 } }); }
  async findByUserId(userId: string): Promise<WalletAggregate | null> { const row = await prisma.wallet.findUnique({ where: { userId } }); return row ? new WalletAggregate(new UserId(row.userId), new Money(Number(row.balance))) : null; }
  async save(wallet: WalletAggregate): Promise<void> { await prisma.wallet.update({ where: { userId: wallet.userId.toString() }, data: { balance: wallet.getBalance().value() } }); }
}
