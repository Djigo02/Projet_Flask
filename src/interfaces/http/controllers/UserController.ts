import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { RegisterUserUseCase } from '../../../application/use-cases/RegisterUserUseCase';
import { PrismaUserRepository } from '../../../infrastructure/database/repositories/PrismaUserRepository';
import { PrismaWalletRepository } from '../../../infrastructure/database/repositories/PrismaWalletRepository';
import { JwtTokenService } from '../../../infrastructure/external-services/JwtTokenService';

const userRepo = new PrismaUserRepository();
const walletRepo = new PrismaWalletRepository();
const tokenService = new JwtTokenService();

export class UserController {
  async register(req: Request, res: Response): Promise<void> {
    const useCase = new RegisterUserUseCase(userRepo, walletRepo);
    const output = await useCase.execute(req.body);
    res.status(201).json(output);
  }

  async login(req: Request, res: Response): Promise<void> {
    const user = await userRepo.findByEmail(req.body.email);
    if (!user || !(await bcrypt.compare(req.body.password, user.passwordHash))) {
      res.status(401).json({ message: 'Invalid credentials' }); return;
    }
    const token = tokenService.sign({ sub: user.id.toString() });
    res.json({ accessToken: token });
  }

  async profile(req: Request, res: Response): Promise<void> {
    const user = await userRepo.findById((req as any).userId);
    res.json({ id: user?.id.toString(), email: user?.email });
  }
}
