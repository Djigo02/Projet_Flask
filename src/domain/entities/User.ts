import { UserId } from '../value-objects/UserId';

export class User {
  constructor(
    public readonly id: UserId,
    public readonly email: string,
    public readonly passwordHash: string,
  ) {
    if (!email.includes('@')) throw new Error('Invalid email');
  }
}
