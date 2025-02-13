import { Model } from "objection";
export declare class Balances extends Model {
    static tableName: string;
    id: number;
    user: number;
    balance: number;
    credits: number;
    created_at: Date;
    updated_at: Date;
}
