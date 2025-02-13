import { Model } from "objection";
export declare class AppSettings extends Model {
    static tableName: string;
    paymentFee: number;
    contractFee: number;
    singleCreditPrice: number;
    created_at?: Date;
    updated_at?: Date;
}
