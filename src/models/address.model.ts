import { Model } from "objection";

export class Address extends Model {
    public static tableName: string = 'addresses';

    public id?: number
    public user: number
    public country: string
    public city: string
    public state: string
    public postalCode: string
    public lat: number
    public lng: number
    public location: any
    public formatted_address: string;
    public street: string
    public createdAt: Date
    public updatedAt: Date
}