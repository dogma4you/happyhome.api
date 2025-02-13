import { Model } from "objection";
import { EmailValidationTypeEnum } from "src/constants/enum";
export declare class EmailValidation extends Model {
    static tableName: string;
    id: number;
    type: EmailValidationTypeEnum;
    code: string;
    email: string;
    verified: number;
    created_at: Date;
    updated_at?: Date;
}
