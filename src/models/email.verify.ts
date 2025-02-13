import { Model } from "objection"
import { EmailValidationTypeEnum } from "src/constants/enum";

export class EmailValidation extends Model {
    public static tableName: string = 'email_verifications';


    public id: number;
    public type: EmailValidationTypeEnum;
    public code: string;
    public email: string;
    public verified: number;
    public created_at: Date;
    public updated_at?: Date;
}