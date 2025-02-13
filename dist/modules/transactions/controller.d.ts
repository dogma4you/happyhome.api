import { IRequest } from "src/types/request";
export declare class TransactionsController {
    private service;
    getUsersTransactions(req: IRequest): Promise<import("../../types/response").ResponseModel<{
        totalCount: number;
        data: import("../../models/transactions.model").Transactions[];
    }>>;
}
