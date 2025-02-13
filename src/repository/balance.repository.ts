import { Injectable, UseFilters } from "@nestjs/common"
import { Balances } from "src/models/balance.model"
import { SqlExceptionFilter } from "src/utils/database"

@Injectable()
@UseFilters(SqlExceptionFilter)
export class BalanceRepository {
    private get model() {
        return Balances.query()
    }
    public async getBalance(userId: number) {
        const balance = await this.model.where({ user: userId }).first()
        if (balance) return balance
        return await this.craete(userId)
    }

    public async craete(userId: number) {
        return this.model.insert({ user: userId }).returning('*')
    }

    public async updateBalance(id: number, balance: number) {
        return this.model.where({ id }).update({ balance })
    }

    public async updateCredits(id: number, credits: number) {
        return this.model.where({ id }).update({ credits })
    }
}