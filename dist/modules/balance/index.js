"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalancesModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const service_1 = require("./service");
const paymet_service_1 = require("../../services/paymet.service");
const balance_repository_1 = require("../../repository/balance.repository");
const plans_repository_1 = require("../../repository/plans.repository");
const service_2 = require("../transactions/service");
const transactons_repository_1 = require("../../repository/transactons.repository");
const notifications_repository_1 = require("../../repository/notifications.repository");
const user_repository_1 = require("../../repository/user.repository");
const app_settings_repository_1 = require("../../repository/app.settings.repository");
const socket_service_1 = require("../../services/socket.service");
const events_gateway_1 = require("../../events/events.gateway");
const pipedrive_service_1 = require("../../services/pipedrive.service");
const pipedrive_actions_repository_1 = require("../../repository/pipedrive.actions.repository");
let BalancesModule = class BalancesModule {
};
exports.BalancesModule = BalancesModule;
exports.BalancesModule = BalancesModule = __decorate([
    (0, common_1.Module)({
        controllers: [controller_1.BalanceController],
        providers: [
            service_1.BalanceService,
            paymet_service_1.AuthorizeNetService,
            balance_repository_1.BalanceRepository,
            plans_repository_1.PlansRepository,
            service_2.TransactionService,
            transactons_repository_1.TransactionsRepository,
            notifications_repository_1.NotificationsRepository,
            user_repository_1.UserRepository,
            app_settings_repository_1.AppSettingsRepository,
            socket_service_1.SocketService,
            events_gateway_1.EventsGateway,
            pipedrive_service_1.PipedriveService,
            pipedrive_actions_repository_1.PipedriveActionsRepository
        ]
    })
], BalancesModule);
//# sourceMappingURL=index.js.map