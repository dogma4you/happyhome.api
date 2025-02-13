import { Model } from "objection";
export declare class Address extends Model {
    static tableName: string;
    id?: number;
    user: number;
    country: string;
    city: string;
    state: string;
    postalCode: string;
    lat: number;
    lng: number;
    location: any;
    formatted_address: string;
    street: string;
    createdAt: Date;
    updatedAt: Date;
}
