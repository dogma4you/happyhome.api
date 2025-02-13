import { Model } from "objection";
import { TransactionsStatusEnum, TransactionsTypeEnum } from "src/constants/enum";
export declare class Transactions extends Model {
    static tableName: string;
    id: number;
    status: TransactionsStatusEnum;
    type: TransactionsTypeEnum;
    user: number;
    transactionId: string;
    price: number;
    credits: number;
    plan: number;
    created_at: Date;
    updated_at: Date;
}
