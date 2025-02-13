import { Model } from "objection";

export class PayedOffers extends Model {
    public static tableName: string = 'payed_offers';

    public id: number;

    public offer: number;
    public user: number;
    public transaction: number;

    public created_at?: Date
    public updated_at?: Date
}