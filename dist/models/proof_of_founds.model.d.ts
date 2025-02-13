import { Model } from "objection";
import { ProofOfFoundsStatusEnum } from "src/constants/enum";
export declare class ProofOfFounds extends Model {
    static tableName: string;
    id?: number;
    user: number;
    files: string[] | any;
    status: ProofOfFoundsStatusEnum;
    expire_at: Date;
    created_at?: Date;
    updated_at?: Date;
}
