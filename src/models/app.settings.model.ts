import { Model } from "objection";

export class AppSettings extends Model {
    public static tableName: string = 'app_settings';

    public paymentFee: number;
    public contractFee: number;
    public singleCreditPrice: number;

    public created_at?: Date
    public updated_at?: Date
}