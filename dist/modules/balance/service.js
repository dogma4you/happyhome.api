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
exports.BalanceService = void 0;
const common_1 = require("@nestjs/common");
const balance_repository_1 = require("../../repository/balance.repository");
const plans_repository_1 = require("../../repository/plans.repository");
const paymet_service_1 = require("../../services/paymet.service");
const service_1 = require("../transactions/service");
const enum_1 = require("../../constants/enum");
const response_1 = require("../../types/response");
const notifications_repository_1 = require("../../repository/notifications.repository");
const user_repository_1 = require("../../repository/user.repository");
const app_settings_repository_1 = require("../../repository/app.settings.repository");
const uuid_1 = require("../../utils/uuid");
const socket_service_1 = require("../../services/socket.service");
const pipedrive_service_1 = require("../../services/pipedrive.service");
const pipedrive_actions_repository_1 = require("../../repository/pipedrive.actions.repository");
let BalanceService = class BalanceService {
    async getBalance(user) {
        return (0, response_1.getResponse)(true, 'User balance', await this.balanceRepository.getBalance(user.id));
    }
    async fill(user, data) {
        if (+data.price <= 0)
            return new common_1.BadRequestException('Price must be > then 0');
        const transactionId = (0, uuid_1.generateTranssactionId)();
        const trx = await this.transactionService.create({
            transactionId,
            user: user.id,
            price: +data.price,
            type: enum_1.TransactionsTypeEnum.balanceFill
        });
        try {
            const notification = await this.notificationRepository.createForAdmin({
                title: 'Balance fill request!',
                description: `${user.first_name} ${user.last_name} sent balance fill request!`,
                ctx: {
                    type: enum_1.NotificationCtxTypeEnum.transaction,
                    ref: trx.id
                }
            });
            await this.socketService.sendNotificationToAdmin(notification);
        }
        catch (error) {
            console.error('fill', error.message);
        }
        const action = await this.pipedriveActionsRepository.getOne({
            user: user.id
        });
        await this.pipedriveService.createDeal({
            title: `${user.first_name} ${user.last_name} create a balance fill request.`,
            value: data.price,
            currency: 'USD',
            stage_id: 34,
            person_id: action.person
        });
        return (0, response_1.getResponse)(true, 'Balance fill request created!');
    }
    async fillCreditBalanceByCount(credits, user, res) {
        if (!credits || credits === 0)
            return new common_1.BadRequestException('Invalid credit count');
        const singleCreditPrice = await this.appSettingsRepository.getSingleCreditPrice();
        if (!singleCreditPrice || singleCreditPrice === 0)
            return new common_1.BadRequestException('Enable to by conuted credits, because single credit price dont set!');
        const price = singleCreditPrice * credits;
        const transactionId = (0, uuid_1.generateTranssactionId)();
        const trxData = {
            type: enum_1.TransactionsTypeEnum.creditsFill,
            transactionId,
            user: user.id,
            price,
            credits
        };
        const transactionRef = await this.transactionService.create(trxData);
        const trx = await this.paymentService.createPayemtnTransactionRender(price, res, transactionId);
        try {
            const notification = await this.notificationRepository.createForAdmin({
                title: 'Credit fill',
                description: `${user.first_name} ${user.last_name} fills credit balance`,
                ctx: {
                    type: enum_1.NotificationCtxTypeEnum.transaction,
                    ref: transactionRef.id
                }
            });
            await this.socketService.sendNotificationToAdmin(notification);
        }
        catch (error) {
            console.error('fillCreditBalanceByCount', error.message);
        }
        return trx;
    }
    async fillCreditBalanceByPlan(planId, user, res) {
        const plan = await this.plansRepository.getById(planId);
        if (!plan)
            return new common_1.BadRequestException('Invalid plan id!');
        if (!plan.published)
            return new common_1.BadRequestException('Inposible to buy current plan!');
        const transactionId = (0, uuid_1.generateTranssactionId)();
        const trxData = {
            transactionId,
            user: user.id,
            price: plan.price,
            type: enum_1.TransactionsTypeEnum.creditsFill,
            credits: plan.credits,
            plan: plan.id
        };
        const transaction = await this.transactionService.create(trxData);
        console.log(transaction, 'need to send to authorize.net');
        const trx = await this.paymentService.createPayemtnTransactionRender(+plan.price, res, transactionId);
        try {
            const notification = await this.notificationRepository.createForAdmin({
                title: 'Credit fill',
                description: `${user.first_name} ${user.last_name} fills credit balance`,
                ctx: {
                    type: enum_1.NotificationCtxTypeEnum.transaction,
                    ref: transaction.id
                }
            });
            await this.socketService.sendNotificationToAdmin(notification);
        }
        catch (error) {
            console.error('fillCreditBalanceByPlan', error.message);
        }
        return trx;
    }
    async fillCreditBalance(user, data, res) {
        if (!data.plan && !data.credits)
            return new common_1.BadRequestException('Credit info not found!');
        if (data.plan)
            return await this.fillCreditBalanceByPlan(data.plan, user, res);
        else
            return await this.fillCreditBalanceByCount(data.credits, user, res);
    }
};
exports.BalanceService = BalanceService;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", balance_repository_1.BalanceRepository)
], BalanceService.prototype, "balanceRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", paymet_service_1.AuthorizeNetService)
], BalanceService.prototype, "paymentService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", plans_repository_1.PlansRepository)
], BalanceService.prototype, "plansRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", service_1.TransactionService)
], BalanceService.prototype, "transactionService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", notifications_repository_1.NotificationsRepository)
], BalanceService.prototype, "notificationRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", user_repository_1.UserRepository)
], BalanceService.prototype, "userRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", app_settings_repository_1.AppSettingsRepository)
], BalanceService.prototype, "appSettingsRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", socket_service_1.SocketService)
], BalanceService.prototype, "socketService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", pipedrive_service_1.PipedriveService)
], BalanceService.prototype, "pipedriveService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", pipedrive_actions_repository_1.PipedriveActionsRepository)
], BalanceService.prototype, "pipedriveActionsRepository", void 0);
exports.BalanceService = BalanceService = __decorate([
    (0, common_1.Injectable)()
], BalanceService);
//# sourceMappingURL=service.js.map