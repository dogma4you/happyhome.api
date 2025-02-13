import { Model } from "objection";

export class PayedContracts extends Model {
    public static tableName: string = 'payed_contracts';

    public id: number;

    public contract: number;
    public user: number;
    public transaction: number;

    public created_at?: Date
    public updated_at?: Date
}