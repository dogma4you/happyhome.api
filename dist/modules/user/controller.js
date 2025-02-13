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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../guards/auth.guard");
const exeption_factory_1 = require("../../utils/exeption.factory");
const service_1 = require("./service");
const user_dto_1 = require("../../appDto/user.dto");
const password_guard_1 = require("../../guards/password.guard");
const events_gateway_1 = require("../../events/events.gateway");
let UserController = class UserController {
    async getSelf(req) {
        return this.service.getSelf(req.user);
    }
    async forgotPassword(req, body) {
        return this.service.forgotPassword(body, req.user);
    }
    async updateInfo(req, body) {
        return await this.service.updateInfo(req.user || req.guest || req.admin, body);
    }
    async getMessage(req) {
        return this.socketService.sendNotificationToUser(req.user.id, { notification: true });
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", service_1.UserService)
], UserController.prototype, "service", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", events_gateway_1.EventsGateway)
], UserController.prototype, "socketService", void 0);
__decorate([
    (0, common_1.Get)('self'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getSelf", null);
__decorate([
    (0, common_1.Put)('forgot_password'),
    (0, swagger_1.ApiBody)({ type: user_dto_1.ForgotPasswordDto }),
    (0, common_1.UseGuards)(password_guard_1.PasswordGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Put)('personal_info'),
    (0, swagger_1.ApiBody)({ type: user_dto_1.UpdatePersonalInfoDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateInfo", null);
__decorate([
    (0, common_1.Post)('message'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMessage", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: exeption_factory_1.validationExeptionFactory })),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard)
], UserController);
//# sourceMappingURL=controller.js.map