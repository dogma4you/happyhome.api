import { Model } from "objection";
export declare class PayedOffers extends Model {
    static tableName: string;
    id: number;
    offer: number;
    user: number;
    transaction: number;
    created_at?: Date;
    updated_at?: Date;
}
