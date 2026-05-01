import bcrypt from 'bcryptjs';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IWalletRepository } from '../../domain/repositories/IWalletRepository';
import { RegisterDto } from '../dtos/AuthDtos';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly walletRepo: IWalletRepository,
  ) {}

  async execute(input: RegisterDto): Promise<{ id: string; email: string }> {
    const existing = await this.userRepo.findByEmail(input.email);
    if (existing) throw new Error('Email already exists');
    const hash = await bcrypt.hash(input.password, 10);
    const user = await this.userRepo.create(input.email, hash);
    await this.walletRepo.create(user.id.toString());
    return { id: user.id.toString(), email: user.email };
  }
}
