import { Model } from "objection";
import { TransactionsStatusEnum, TransactionsTypeEnum } from "src/constants/enum"

export class Transactions extends Model {
    public static tableName: string = 'transactions'

    public id: number;

    public status: TransactionsStatusEnum;
    public type: TransactionsTypeEnum;
    public user: number;
    public transactionId: string;
    public price: number;
    public credits: number;
    public plan: number;

    public created_at: Date;
    public updated_at: Date;
}