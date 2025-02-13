import { Model } from "objection";
import { BalanceHistoryActionTypeEnum } from "src/constants/enum";

export class BalanceHistory extends Model {
    public static tableName: string = 'balance_histroy';

    public id: number;
    public balance: number;
    public action: BalanceHistoryActionTypeEnum;
    public value: number;
    public balanceBefore: number;
    public balanceAfter: number;
    public transaction: number;
    public created_at: Date;
    public updated_at: Date;
}