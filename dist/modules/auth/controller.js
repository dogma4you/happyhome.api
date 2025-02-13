"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("./service");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../guards/auth.guard");
const auth_dto_1 = require("../../appDto/auth.dto");
const exeption_factory_1 = require("../../utils/exeption.factory");
let AuthController = class AuthController {
    async getGuest() {
        return this.service.createGuest();
    }
    async self(req) {
        return req.user;
    }
    async testPipedrive() {
        return this.service.testPipedrive();
    }
    async refreshToken(body) {
        return this.service.refreshToken(body);
    }
    async verifyEmail(query) {
        return this.service.verifyEmail(query);
    }
    async register(body, req) {
        return this.service.register(body, req.guest);
    }
    async login(body) {
        return this.service.login(body);
    }
    async loginAdmin(body) {
        return this.service.loginAdmin(body);
    }
    async resetVerification(query) {
        return this.service.getResetPasswordCode(query);
    }
    async resetPassword(body) {
        return this.service.resetPassword(body);
    }
    async resendVerificationCode(query) {
        return this.service.resendVerificationCode(query.email);
    }
    async verifyCode(body) {
        return this.service.verify(body);
    }
    async deleteAccount(req) {
        return this.service.delete(req.user, req.body);
    }
    async socialLogin(body) {
        return this.service.socialLogin(body);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", service_1.AuthService)
], AuthController.prototype, "service", void 0);
__decorate([
    (0, common_1.Get)('guest'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getGuest", null);
__decorate([
    (0, common_1.Get)('self'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "self", null);
__decorate([
    (0, common_1.Get)('pipedrive'),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "testPipedrive", null);
__decorate([
    (0, common_1.Post)('refresh_token'),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.RefreshTokenDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Get)('verify_email'),
    (0, swagger_1.ApiQuery)({ name: 'email', required: false, description: 'Email' }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: true, description: 'Type' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.VerifyEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.RegistrationDto }),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegistrationDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.LoginDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('employee/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginAdmin", null);
__decorate([
    (0, common_1.Get)('reset_verification'),
    (0, swagger_1.ApiQuery)({ name: 'email', required: false, description: 'Email' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.VerifyEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetVerification", null);
__decorate([
    (0, common_1.Post)('reset_password'),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.ResetPasswordDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)('resend_verification_code'),
    (0, swagger_1.ApiQuery)({ name: 'email', required: false, description: 'Email' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.VerifyEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendVerificationCode", null);
__decorate([
    (0, common_1.Put)('verify'),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.VerifyCodeDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.VerifyCodeDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyCode", null);
__decorate([
    (0, common_1.Put)('account'),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.AuthDeleteAcoountDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteAccount", null);
__decorate([
    (0, common_1.Post)('social_login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SocialLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "socialLogin", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: exeption_factory_1.validationExeptionFactory }))
], AuthController);
//# sourceMappingURL=controller.js.map