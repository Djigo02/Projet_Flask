import { Request, Response } from 'express';
import { TransferMoneyUseCase } from '../../../application/use-cases/TransferMoneyUseCase';
import { PrismaWalletRepository } from '../../../infrastructure/database/repositories/PrismaWalletRepository';
import { PrismaTransactionRepository } from '../../../infrastructure/database/repositories/PrismaTransactionRepository';
import { prisma } from '../../../infrastructure/database/prisma';
import { env } from '../../../infrastructure/config/env';

const walletRepo = new PrismaWalletRepository();
const txRepo = new PrismaTransactionRepository();

export class TransferController {
  async transfer(req: Request, res: Response): Promise<void> {
    const useCase = new TransferMoneyUseCase(walletRepo, txRepo, prisma, env.transferLimit);
    await useCase.execute((req as any).userId, req.body.receiverId, req.body.amount);
    res.status(200).json({ message: 'Transfer successful' });
  }

  async history(req: Request, res: Response): Promise<void> {
    const list = await txRepo.findByUserId((req as any).userId);
    res.json(list);
  }
}
