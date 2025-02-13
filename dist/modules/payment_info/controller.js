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
exports.PaymentsInfosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../guards/auth.guard");
const exeption_factory_1 = require("../../utils/exeption.factory");
const service_1 = require("./service");
const cb_dto_1 = require("../../appDto/cb.dto");
let PaymentsInfosController = class PaymentsInfosController {
    async getPaymentInfos() {
        return this.service.getAll();
    }
    async getSingleCreditPrice() {
        return this.service.getSingleCreditPrice();
    }
    async paymentSuccessCb(req) {
        return this.service.successTransaction(req.body.transaction, req.user);
    }
    async paymentCancelCb(req) {
        return this.service.paymentCancelCb(req.body.transaction, req.user);
    }
};
exports.PaymentsInfosController = PaymentsInfosController;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", service_1.PaymentInfoService)
], PaymentsInfosController.prototype, "service", void 0);
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsInfosController.prototype, "getPaymentInfos", null);
__decorate([
    (0, common_1.Get)('single_credit_price'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsInfosController.prototype, "getSingleCreditPrice", null);
__decorate([
    (0, common_1.Post)('payment-success'),
    (0, swagger_1.ApiBody)({ type: cb_dto_1.SuccessTransactionDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsInfosController.prototype, "paymentSuccessCb", null);
__decorate([
    (0, common_1.Post)('payment-cancel'),
    (0, swagger_1.ApiBody)({ type: cb_dto_1.SuccessTransactionDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsInfosController.prototype, "paymentCancelCb", null);
exports.PaymentsInfosController = PaymentsInfosController = __decorate([
    (0, common_1.Controller)('payment_infos'),
    (0, swagger_1.ApiTags)('Payment_infos'),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: exeption_factory_1.validationExeptionFactory }))
], PaymentsInfosController);
//# sourceMappingURL=controller.js.map