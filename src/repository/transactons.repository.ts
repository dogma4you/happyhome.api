import { Injectable } from "@nestjs/common";
import { CreateTransactionDto } from "src/appDto/transactions.dto";
import { TransactionsStatusEnum } from "src/constants/enum";
import { Plans } from "src/models/plans.model";
import { Transactions } from "src/models/transactions.model";
import { User } from "src/models/user.model";

@Injectable()
export class TransactionsRepository {
    private get model() {
        return Transactions.query()
    }

    public async create(data: CreateTransactionDto) {
        return this.model.insert(data);
    }

    public async getById(id: number) {
        return this.model.where({ id }).first()
    }

    public async getByTrxId(trx: string) {
        return this.model.where({ transactionId: trx }).first()
    }

    public async getUsersTransactions(user: number, page: number, limit: number) {
        const offset = (page - 1) * limit;
        const [countResult, data] = await Promise.all([
            this.model
            .where({ user })
            .clone()
            .count('*'),
            this.model
            .where({ user })
            .join('users', 'transactions.user', 'users.id')
            .leftJoin('plans', function() {
                this.on('transactions.plan', '=', 'plans.id').andOnNotNull('transactions.plan');
            })
            .select(
            'transactions.*',
            'users.first_name as first_name',
            'users.email as email',
            )
            .orderBy('transactions.created_at', 'desc')
            .offset(offset)
            .limit(limit)
        ])
        const totalCount = +countResult[0]['count'];
        return {
          totalCount,
          data,
        };
    }

    public async getTransactions(page: number, limit: number) {
        const offset = (page - 1) * limit;
        
        const [countResult, data] = await Promise.all([
            this.model.clone().count('*'),
            this.model
                .leftJoin('users', 'transactions.user', '=', 'users.id')
                .leftJoin('public.plans', 'transactions.plan', '=', 'plans.id') // Specify schema if necessary
                .select(
                    'transactions.*',
                    Transactions.raw(`
                        json_build_object(
                            'id', plans.id,
                            'title', plans.title,
                            'description', plans.description,
                            'price', plans.price,
                            'discount', plans.discount,
                            'credits', plans.credits
                        ) as plan
                    `),
                    User.raw(`
                        json_build_object(
                            'id', users.id,
                            'first_name', users.first_name,
                            'last_name', users.last_name,
                            'email', users.email
                        ) as user
                        `)
                )
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

    public async updateTransactionStatus(id: number, status: TransactionsStatusEnum) {
        return this.model.where({ id }).update({ status }).returning('*');
    }
}