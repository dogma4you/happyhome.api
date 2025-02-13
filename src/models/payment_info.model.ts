import { Model } from "objection";

export class PaymentInfo extends Model {
    public static tableName: string = 'payment_infos'

    public id: number;

    public recipient: string;
    public bank_name: string;
    public bank_address: string;
    public routing_number: string;
    public account_number: string;
    public account_type: string;
    public reference_number: string;

    public created_at: Date;
    public updated_at: Date;
}