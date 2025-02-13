"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceRepository = void 0;
const common_1 = require("@nestjs/common");
const balance_model_1 = require("../models/balance.model");
const database_1 = require("../utils/database");
let BalanceRepository = class BalanceRepository {
    get model() {
        return balance_model_1.Balances.query();
    }
    async getBalance(userId) {
        const balance = await this.model.where({ user: userId }).first();
        if (balance)
            return balance;
        return await this.craete(userId);
    }
    async craete(userId) {
        return this.model.insert({ user: userId }).returning('*');
    }
    async updateBalance(id, balance) {
        return this.model.where({ id }).update({ balance });
    }
    async updateCredits(id, credits) {
        return this.model.where({ id }).update({ credits });
    }
};
exports.BalanceRepository = BalanceRepository;
exports.BalanceRepository = BalanceRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.UseFilters)(database_1.SqlExceptionFilter)
], BalanceRepository);
//# sourceMappingURL=balance.repository.js.map