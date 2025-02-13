import { Inject, Injectable } from "@nestjs/common";
import { CreateTransactionDto } from "src/appDto/transactions.dto";
import { User } from "src/models/user.model";
import { TransactionsRepository } from "src/repository/transactons.repository";
import { getResponse } from "src/types/response";

@Injectable()
export class TransactionService {
    @Inject()
    private transactionRepository: TransactionsRepository

    public async create(data: CreateTransactionDto) {
        return this.transactionRepository.create(data);
    }

    public async getUsersTransactions(user: User, page: number, limit: number) {
        const list = await this.transactionRepository.getUsersTransactions(user.id, page, limit);
        return getResponse(true, 'Transactions list', list)
    }
}