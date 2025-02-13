"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsRepository = void 0;
const common_1 = require("@nestjs/common");
const transactions_model_1 = require("../models/transactions.model");
const user_model_1 = require("../models/user.model");
let TransactionsRepository = class TransactionsRepository {
    get model() {
        return transactions_model_1.Transactions.query();
    }
    async create(data) {
        return this.model.insert(data);
    }
    async getById(id) {
        return this.model.where({ id }).first();
    }
    async getByTrxId(trx) {
        return this.model.where({ transactionId: trx }).first();
    }
    async getUsersTransactions(user, page, limit) {
        const offset = (page - 1) * limit;
        const [countResult, data] = await Promise.all([
            this.model
                .where({ user })
                .clone()
                .count('*'),
            this.model
                .where({ user })
                .join('users', 'transactions.user', 'users.id')
                .leftJoin('plans', function () {
                this.on('transactions.plan', '=', 'plans.id').andOnNotNull('transactions.plan');
            })
                .select('transactions.*', 'users.first_name as first_name', 'users.email as email')
                .orderBy('transactions.created_at', 'desc')
                .offset(offset)
                .limit(limit)
        ]);
        const totalCount = +countResult[0]['count'];
        return {
            totalCount,
            data,
        };
    }
    async getTransactions(page, limit) {
        const offset = (page - 1) * limit;
        const [countResult, data] = await Promise.all([
            this.model.clone().count('*'),
            this.model
                .leftJoin('users', 'transactions.user', '=', 'users.id')
                .leftJoin('public.plans', 'transactions.plan', '=', 'plans.id')
                .select('transactions.*', transactions_model_1.Transactions.raw(`
                        json_build_object(
                            'id', plans.id,
                            'title', plans.title,
                            'description', plans.description,
                            'price', plans.price,
                            'discount', plans.discount,
                            'credits', plans.credits
                        ) as plan
                    `), user_model_1.User.raw(`
                        json_build_object(
                            'id', users.id,
                            'first_name', users.first_name,
                            'last_name', users.last_name,
                            'email', users.email
                        ) as user
                        `))
                .orderBy('transactions.created_at', 'desc')
                .offset(offset)
                .limit(limit)
        ]);
        const totalCount = +countResult[0]['count'];
        return {
            totalCount,
            data,
        };
    }
    async updateTransactionStatus(id, status) {
        return this.model.where({ id }).update({ status }).returning('*');
    }
};
exports.TransactionsRepository = TransactionsRepository;
exports.TransactionsRepository = TransactionsRepository = __decorate([
    (0, common_1.Injectable)()
], TransactionsRepository);
//# sourceMappingURL=transactons.repository.js.map