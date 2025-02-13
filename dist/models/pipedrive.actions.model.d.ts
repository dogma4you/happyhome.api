import { Model } from "objection";
export declare class PipedriveActions extends Model {
    static tableName: string;
    id?: number;
    user: number;
    offer: number;
    contract: number;
    deal: number;
    person: number;
    created_at: Date;
    updated_at: Date;
}
