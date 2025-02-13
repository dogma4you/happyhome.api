import { Model } from "objection";

export class Areas extends Model {
    public static tableName: string = 'areas';

    public id?: number

    public offer: number;
    public contract: number;
    public isOffer: number;

    public square_feet: number;
    public bedrooms: number;
    public bathrooms: number;
    

    public createdAt: Date
    public updatedAt: Date
}