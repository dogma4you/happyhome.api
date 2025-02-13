import { Model } from "objection";
export declare class PayedContracts extends Model {
    static tableName: string;
    id: number;
    contract: number;
    user: number;
    transaction: number;
    created_at?: Date;
    updated_at?: Date;
}
