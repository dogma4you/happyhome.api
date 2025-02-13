import { Model } from "objection";
export declare class SavedContracts extends Model {
    static tableName: string;
    id?: number;
    user: number;
    saved_list: number;
    contract: number;
    created_at: Date;
    updated_at?: Date;
    count: any;
}
