import { Model } from "objection";
export declare class PaymentInfo extends Model {
    static tableName: string;
    id: number;
    recipient: string;
    bank_name: string;
    bank_address: string;
    routing_number: string;
    account_number: string;
    account_type: string;
    reference_number: string;
    created_at: Date;
    updated_at: Date;
}
