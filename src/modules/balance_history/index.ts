import { Module } from "@nestjs/common";
import { BalanceHistoryController } from "./controller";
import { BalanceHistoryService } from "./service";
import { BalanceHistoryRepository } from "src/repository/balance_history.repository";

@Module({
    controllers: [BalanceHistoryController],
    providers: [BalanceHistoryService, BalanceHistoryRepository]
})
export class BalanceHistoryModule {}