"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyEmailRepository = void 0;
const common_1 = require("@nestjs/common");
const email_verify_1 = require("../models/email.verify");
const database_1 = require("../utils/database");
let VerifyEmailRepository = class VerifyEmailRepository {
    get model() {
        return email_verify_1.EmailValidation.query();
    }
    async create(code, email, type) {
        const existVerification = await this.model.where({ email });
        if (existVerification.length)
            await this.delete(existVerification[0].id);
        return this.model.insert({
            code, email, type
        });
    }
    async getByEmail(email) {
        const verification = await this.model.where({ email });
        return verification.length ? verification[0] : null;
    }
    async delete(id) {
        await this.model.deleteById(id);
    }
    async update(email, body) {
        await this.model.where({ email }).update(body);
    }
};
exports.VerifyEmailRepository = VerifyEmailRepository;
exports.VerifyEmailRepository = VerifyEmailRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.UseFilters)(database_1.SqlExceptionFilter)
], VerifyEmailRepository);
//# sourceMappingURL=email.verification.repository.js.map