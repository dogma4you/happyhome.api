import { Module } from "@nestjs/common";
import { TransactionsController } from "./controller";
import { TransactionService } from "./service";
import { TransactionsRepository } from "src/repository/transactons.repository";

@Module({
    controllers: [TransactionsController],
    providers: [TransactionService, TransactionsRepository]
})
export class TransactionsModule {}