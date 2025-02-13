import { Model } from "objection";
export declare class SavedLists extends Model {
    static tableName: string;
    id?: number;
    user: number;
    created_at: Date;
    updated_at?: Date;
}
