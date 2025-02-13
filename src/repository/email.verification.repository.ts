import { Injectable, UseFilters } from "@nestjs/common";
import { EmailValidationTypeEnum } from "src/constants/enum";
import { EmailValidation } from "src/models/email.verify";
import { SqlExceptionFilter } from "src/utils/database";

@Injectable()
@UseFilters(SqlExceptionFilter)
export class VerifyEmailRepository {
    private get model() {
        return EmailValidation.query()
    }

    public async create(code: string, email: string, type: EmailValidationTypeEnum) {
        const existVerification = await this.model.where({ email })
        if (existVerification.length) await this.delete(existVerification[0].id)
        return this.model.insert({
            code, email, type
        })
    }

    public async getByEmail(email: string) {
        const verification = await this.model.where({ email })
        return verification.length ? verification[0] : null
    }

    public async delete (id: number) {
        await this.model.deleteById(id)
    }

    public async update(email: string, body: object): Promise<void> {
        await this.model.where({ email }).update(body)
    }
}