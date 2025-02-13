import { Model } from "objection";

export class OfferFeatures extends Model {
    public static tableName: string = 'offer_features';

    public id?: number
    public offer: number
    public premium_handcape: boolean
    public luxury_flooring: boolean
    public custom_framing: boolean
    public other: boolean
    public description: string
    public created_at?: Date
    public updated_at?: Date
}   