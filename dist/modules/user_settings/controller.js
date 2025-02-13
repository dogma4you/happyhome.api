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
exports.UserSettingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../guards/auth.guard");
const exeption_factory_1 = require("../../utils/exeption.factory");
const service_1 = require("./service");
const user_settings_dto_1 = require("../../appDto/user_settings.dto");
let UserSettingsController = class UserSettingsController {
    async getSettings(req) {
        return this.service.getSettings(req.user.id);
    }
    async updateUserSettings(req) {
        return this.service.update(req.user, req.body);
    }
};
exports.UserSettingsController = UserSettingsController;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", service_1.UserSettingsService)
], UserSettingsController.prototype, "service", void 0);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserSettingsController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiBody)({ type: user_settings_dto_1.UpdateUserSettingsDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserSettingsController.prototype, "updateUserSettings", null);
exports.UserSettingsController = UserSettingsController = __decorate([
    (0, common_1.Controller)('settings'),
    (0, swagger_1.ApiTags)('User settings'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: exeption_factory_1.validationExeptionFactory })),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard)
], UserSettingsController);
//# sourceMappingURL=controller.js.map