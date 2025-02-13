import { Injectable } from "@nestjs/common";
import { Balances } from "src/models/balance.model";

@Injectable()
export class BalanceHistoryRepository {
    private get model() {
        return Balances.query()
    }
}