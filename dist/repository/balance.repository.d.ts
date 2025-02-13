import { Balances } from "src/models/balance.model";
export declare class BalanceRepository {
    private get model();
    getBalance(userId: number): Promise<Balances>;
    craete(userId: number): Promise<Balances>;
    updateBalance(id: number, balance: number): Promise<number>;
    updateCredits(id: number, credits: number): Promise<number>;
}
