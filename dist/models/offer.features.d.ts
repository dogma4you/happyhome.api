import { Model } from "objection";
export declare class OfferFeatures extends Model {
    static tableName: string;
    id?: number;
    offer: number;
    premium_handcape: boolean;
    luxury_flooring: boolean;
    custom_framing: boolean;
    other: boolean;
    description: string;
    created_at?: Date;
    updated_at?: Date;
}
