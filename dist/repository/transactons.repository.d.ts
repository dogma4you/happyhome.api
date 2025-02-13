import { CreateTransactionDto } from "src/appDto/transactions.dto";
import { TransactionsStatusEnum } from "src/constants/enum";
import { Transactions } from "src/models/transactions.model";
export declare class TransactionsRepository {
    private get model();
    create(data: CreateTransactionDto): Promise<Transactions>;
    getById(id: number): Promise<Transactions>;
    getByTrxId(trx: string): Promise<Transactions>;
    getUsersTransactions(user: number, page: number, limit: number): Promise<{
        totalCount: number;
        data: Transactions[];
    }>;
    getTransactions(page: number, limit: number): Promise<{
        totalCount: number;
        data: Transactions[];
    }>;
    updateTransactionStatus(id: number, status: TransactionsStatusEnum): Promise<Transactions[]>;
}
