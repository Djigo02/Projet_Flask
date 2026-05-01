import { WalletAggregate } from '../aggregates/WalletAggregate';

export interface IWalletRepository {
  create(userId: string): Promise<void>;
  findByUserId(userId: string): Promise<WalletAggregate | null>;
  save(wallet: WalletAggregate): Promise<void>;
}
