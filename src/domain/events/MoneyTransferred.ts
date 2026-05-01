export class MoneyTransferred {
  constructor(
    public readonly senderId: string,
    public readonly receiverId: string,
    public readonly amount: number,
    public readonly occurredAt: Date = new Date(),
  ) {}
}
