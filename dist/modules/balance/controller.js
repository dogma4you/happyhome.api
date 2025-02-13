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
exports.BalanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../guards/auth.guard");
const exeption_factory_1 = require("../../utils/exeption.factory");
const service_1 = require("./service");
const balance_dto_1 = require("../../appDto/balance.dto");
let BalanceController = class BalanceController {
    async getBalance(req) {
        return this.service.getBalance(req.user);
    }
    async fillBalance(req, body) {
        return this.service.fill(req.user, body);
    }
    async fillCreditBalance(req, res, body) {
        return this.service.fillCreditBalance(req.user, body, res);
    }
};
exports.BalanceController = BalanceController;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", service_1.BalanceService)
], BalanceController.prototype, "service", void 0);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BalanceController.prototype, "getBalance", null);
__decorate([
    (0, common_1.Post)('fill'),
    (0, swagger_1.ApiBody)({ type: balance_dto_1.FillBalanceDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BalanceController.prototype, "fillBalance", null);
__decorate([
    (0, common_1.Post)('credit'),
    (0, swagger_1.ApiBody)({ type: balance_dto_1.FillCreditBalanceDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], BalanceController.prototype, "fillCreditBalance", null);
exports.BalanceController = BalanceController = __decorate([
    (0, common_1.Controller)('balance'),
    (0, swagger_1.ApiTags)('Balance'),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: exeption_factory_1.validationExeptionFactory }))
], BalanceController);
//# sourceMappingURL=controller.js.map