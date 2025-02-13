import { Model } from "objection";
export declare class Plans extends Model {
    static tableName: string;
    id: number;
    title: string;
    description: string;
    discount: number;
    credits: number;
    price: number;
    published: number;
    created_at: Date;
    updated_at: Date;
}
