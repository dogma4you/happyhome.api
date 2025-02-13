import { Model } from "objection";
export declare class Subscriptions extends Model {
    static tableName: string;
    id: number;
    email: string;
    subscription_to: string;
    created_at: Date;
    updated_at: Date;
}
