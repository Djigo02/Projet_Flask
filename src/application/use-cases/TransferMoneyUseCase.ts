import { PrismaClient } from '@prisma/client';
import { IWalletRepository } from '../../domain/repositories/IWalletRepository';
import { ITransactionRepository } from '../../domain/repositories/ITransactionRepository';
import { Transaction } from '../../domain/entities/Transaction';
import { TransactionId } from '../../domain/value-objects/TransactionId';
import { UserId } from '../../domain/value-objects/UserId';
import { Money } from '../../domain/value-objects/Money';
import { MoneyTransferred } from '../../domain/events/MoneyTransferred';

export class TransferMoneyUseCase {
  constructor(
    private readonly walletRepo: IWalletRepository,
    private readonly txRepo: ITransactionRepository,
    private readonly prisma: PrismaClient,
    private readonly transferLimit: number,
  ) {}

  async execute(senderId: string, receiverId: string, amount: number): Promise<void> {
    if (amount > this.transferLimit) throw new Error('Transfer limit exceeded');

    await this.prisma.$transaction(async () => {
      const sender = await this.walletRepo.findByUserId(senderId);
      const receiver = await this.walletRepo.findByUserId(receiverId);
      if (!sender || !receiver) throw new Error('Wallet not found');

      const money = new Money(amount);
      sender.debit(money);
      receiver.credit(money);
      await this.walletRepo.save(sender);
      await this.walletRepo.save(receiver);

      const tx = new Transaction(new TransactionId(crypto.randomUUID()), new UserId(senderId), new UserId(receiverId), money, 'SUCCESS');
      await this.txRepo.create(tx);
      const event = new MoneyTransferred(senderId, receiverId, amount);
      void event;
    });
  }
}
