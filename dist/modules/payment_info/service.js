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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentInfoService = void 0;
const common_1 = require("@nestjs/common");
const enum_1 = require("../../constants/enum");
const app_settings_repository_1 = require("../../repository/app.settings.repository");
const balance_repository_1 = require("../../repository/balance.repository");
const payment_info_repository_1 = require("../../repository/payment_info.repository");
const plans_repository_1 = require("../../repository/plans.repository");
const transactons_repository_1 = require("../../repository/transactons.repository");
const response_1 = require("../../types/response");
let PaymentInfoService = class PaymentInfoService {
    async getAll() {
        const data = await this.paymentInfoRepository.getAll();
        return (0, response_1.getResponse)(true, 'Payement infos', data);
    }
    async getSingleCreditPrice() {
        const price = await this.appSettingsRepository.getSingleCreditPrice();
        return (0, response_1.getResponse)(true, 'Single credit price', price);
    }
    async successTransaction(transactionId, user) {
        const trx = await this.transactionRepository.getByTrxId(transactionId);
        if (!trx)
            return new common_1.BadRequestException('Invalid transaction!');
        if (trx.user === user.id) {
            if (trx.plan) {
                const userBalance1 = await this.balanceRepository.getBalance(user.id);
                const plan = await this.plansRepository.getById(trx.plan);
                const updatedBalance = !userBalance1.balance || isNaN(userBalance1.credits) ? userBalance1.credits = plan.credits : userBalance1.credits + plan.credits;
                await this.balanceRepository.updateCredits(userBalance1.id, updatedBalance);
            }
            else {
                const userBalance = await this.balanceRepository.getBalance(user.id);
                const updatedBalance = !userBalance.balance || isNaN(userBalance.credits) ? userBalance.credits = trx.credits : userBalance.credits + trx.credits;
                await this.balanceRepository.updateCredits(userBalance.id, updatedBalance);
            }
        }
        else {
            await this.transactionRepository.updateTransactionStatus(trx.id, enum_1.TransactionsStatusEnum.notReceived);
            return new common_1.BadRequestException('Invalid transaction identifere!');
        }
        await this.transactionRepository.updateTransactionStatus(trx.id, enum_1.TransactionsStatusEnum.received);
        return (0, response_1.getResponse)(true, '');
    }
    async paymentCancelCb(transactionId, user) {
        const trx = await this.transactionRepository.getByTrxId(transactionId);
        if (!trx)
            return new common_1.BadRequestException('Invalid transaction');
        if (trx.user !== user.id) {
            await this.transactionRepository.updateTransactionStatus(trx.id, enum_1.TransactionsStatusEnum.notReceived);
            return new common_1.BadRequestException('Invalid transaction identifere!');
        }
        await this.transactionRepository.updateTransactionStatus(trx.id, enum_1.TransactionsStatusEnum.notReceived);
        return (0, response_1.getResponse)(true, '');
    }
};
exports.PaymentInfoService = PaymentInfoService;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", payment_info_repository_1.PaymentInfoRepository)
], PaymentInfoService.prototype, "paymentInfoRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", app_settings_repository_1.AppSettingsRepository)
], PaymentInfoService.prototype, "appSettingsRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", transactons_repository_1.TransactionsRepository)
], PaymentInfoService.prototype, "transactionRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", balance_repository_1.BalanceRepository)
], PaymentInfoService.prototype, "balanceRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", plans_repository_1.PlansRepository)
], PaymentInfoService.prototype, "plansRepository", void 0);
exports.PaymentInfoService = PaymentInfoService = __decorate([
    (0, common_1.Injectable)()
], PaymentInfoService);
//# sourceMappingURL=service.js.map