import { Model } from "objection";

export class PaymentMethods extends Model {
    public static tableName: string = 'payment_methods';

    public id: number;

    public name: string;
    public status: number;

    public created_at?: Date
    public updated_at?: Date
}