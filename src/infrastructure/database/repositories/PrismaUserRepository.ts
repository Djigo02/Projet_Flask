import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { User } from '../../../domain/entities/User';
import { UserId } from '../../../domain/value-objects/UserId';
import { prisma } from '../prisma';

export class PrismaUserRepository implements IUserRepository {
  async create(email: string, passwordHash: string): Promise<User> { const row = await prisma.user.create({ data: { email, passwordHash } }); return new User(new UserId(row.id), row.email, row.passwordHash); }
  async findByEmail(email: string): Promise<User | null> { const row = await prisma.user.findUnique({ where: { email } }); return row ? new User(new UserId(row.id), row.email, row.passwordHash) : null; }
  async findById(id: string): Promise<User | null> { const row = await prisma.user.findUnique({ where: { id } }); return row ? new User(new UserId(row.id), row.email, row.passwordHash) : null; }
}
