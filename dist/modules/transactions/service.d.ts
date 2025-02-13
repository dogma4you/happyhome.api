import { CreateTransactionDto } from "src/appDto/transactions.dto";
import { User } from "src/models/user.model";
export declare class TransactionService {
    private transactionRepository;
    create(data: CreateTransactionDto): Promise<import("../../models/transactions.model").Transactions>;
    getUsersTransactions(user: User, page: number, limit: number): Promise<import("src/types/response").ResponseModel<{
        totalCount: number;
        data: import("../../models/transactions.model").Transactions[];
    }>>;
}
