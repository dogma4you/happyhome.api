import { Model } from "objection";

export class Balances extends Model {
    public static tableName: string = 'balances'

    public id: number;
    public user: number;
    public balance: number;
    public credits: number;
    public created_at: Date;
    public updated_at: Date;
}