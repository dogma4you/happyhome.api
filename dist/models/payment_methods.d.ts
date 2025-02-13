import { Model } from "objection";
export declare class PaymentMethods extends Model {
    static tableName: string;
    id: number;
    name: string;
    status: number;
    created_at?: Date;
    updated_at?: Date;
}
