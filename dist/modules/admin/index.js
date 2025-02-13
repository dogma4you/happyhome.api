"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const service_1 = require("./service");
const user_repository_1 = require("../../repository/user.repository");
const transactons_repository_1 = require("../../repository/transactons.repository");
const offers_repository_1 = require("../../repository/offers.repository");
const notifications_repository_1 = require("../../repository/notifications.repository");
const contract_repository_1 = require("../../repository/contract.repository");
const address_repository_1 = require("../../repository/address.repository");
const propertyConditions_repository_1 = require("../../repository/propertyConditions.repository");
const service_2 = require("../files/service");
const hash_service_1 = require("../../services/hash.service");
const mailer_service_1 = require("../../services/mailer.service");
const payment_methods_repository_1 = require("../../repository/payment_methods.repository");
const file_repository_1 = require("../../repository/file.repository");
const app_settings_repository_1 = require("../../repository/app.settings.repository");
const balance_repository_1 = require("../../repository/balance.repository");
const proof_of_founds_repository_1 = require("../../repository/proof_of_founds.repository");
const payment_info_repository_1 = require("../../repository/payment_info.repository");
const socket_service_1 = require("../../services/socket.service");
const events_gateway_1 = require("../../events/events.gateway");
const purchased_contracts_repostiory_1 = require("../../repository/purchased.contracts.repostiory");
const subscription_repository_1 = require("../../repository/subscription.repository");
const pipedrive_service_1 = require("../../services/pipedrive.service");
const pipedrive_actions_repository_1 = require("../../repository/pipedrive.actions.repository");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        controllers: [controller_1.AdminController],
        providers: [
            service_1.AdminService,
            user_repository_1.UserRepository,
            transactons_repository_1.TransactionsRepository,
            offers_repository_1.OffersRepository,
            notifications_repository_1.NotificationsRepository,
            contract_repository_1.ContractRepository,
            address_repository_1.AddressRepository,
            propertyConditions_repository_1.PropertyConditionsRepository,
            service_2.FileService,
            mailer_service_1.MailerService,
            hash_service_1.HashService,
            payment_methods_repository_1.PaymentMethodsRepository,
            file_repository_1.FileRepository,
            app_settings_repository_1.AppSettingsRepository,
            balance_repository_1.BalanceRepository,
            proof_of_founds_repository_1.ProofOfFoundsRepository,
            payment_info_repository_1.PaymentInfoRepository,
            socket_service_1.SocketService,
            events_gateway_1.EventsGateway,
            purchased_contracts_repostiory_1.PurchasedContractsRepository,
            subscription_repository_1.SubscriptionRepository,
            pipedrive_service_1.PipedriveService,
            pipedrive_actions_repository_1.PipedriveActionsRepository
        ]
    })
], AdminModule);
;
//# sourceMappingURL=index.js.map