import { Model } from "objection";
import { BalanceHistoryActionTypeEnum } from "src/constants/enum";
export declare class BalanceHistory extends Model {
    static tableName: string;
    id: number;
    balance: number;
    action: BalanceHistoryActionTypeEnum;
    value: number;
    balanceBefore: number;
    balanceAfter: number;
    transaction: number;
    created_at: Date;
    updated_at: Date;
}
