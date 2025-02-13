import { Inject, Injectable } from "@nestjs/common";
import { BalanceHistoryRepository } from "src/repository/balance_history.repository";

@Injectable()
export class BalanceHistoryService {
    @Inject()
    private balanceHistoryRepository: BalanceHistoryRepository;
}