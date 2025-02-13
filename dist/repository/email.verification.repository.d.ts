import { EmailValidationTypeEnum } from "src/constants/enum";
import { EmailValidation } from "src/models/email.verify";
export declare class VerifyEmailRepository {
    private get model();
    create(code: string, email: string, type: EmailValidationTypeEnum): Promise<EmailValidation>;
    getByEmail(email: string): Promise<EmailValidation>;
    delete(id: number): Promise<void>;
    update(email: string, body: object): Promise<void>;
}
