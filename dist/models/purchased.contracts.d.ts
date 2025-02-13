import { Model } from "objection";
export declare class PurchasedContracts extends Model {
    static tableName: string;
    id: number;
    user: number;
    contract: number;
    price: number;
    created_at: Date;
    updated_at: Date;
}
