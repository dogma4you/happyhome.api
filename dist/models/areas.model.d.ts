import { Model } from "objection";
export declare class Areas extends Model {
    static tableName: string;
    id?: number;
    offer: number;
    contract: number;
    isOffer: number;
    square_feet: number;
    bedrooms: number;
    bathrooms: number;
    createdAt: Date;
    updatedAt: Date;
}
