"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const common_1 = require("@nestjs/common");
const auth_1 = require("./auth");
const offer_1 = require("./offer");
const files_1 = require("./files");
const user_1 = require("./user");
const user_settings_1 = require("./user_settings");
const notifications_1 = require("./notifications");
const balance_1 = require("./balance");
const plans_1 = require("./plans");
const transactions_1 = require("./transactions");
const credits_1 = require("./credits");
const balance_history_1 = require("./balance_history");
const webhook_1 = require("./webhook");
const auth_middleware_1 = require("../middleware/auth.middleware");
const admin_middleware_1 = require("../middleware/admin.middleware");
const admin_1 = require("./admin");
const contracts_1 = require("./contracts");
const proof_of_founds_1 = require("./proof_of_founds");
const payment_info_1 = require("./payment_info");
const saved_list_1 = require("./saved_list");
const subscriptions_1 = require("./subscriptions");
let ApiModule = class ApiModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.Authentication)
            .exclude({ path: '/auth/guest', method: common_1.RequestMethod.GET }, { path: '/auth/refresh_token', method: common_1.RequestMethod.POST }, { path: '/auth/social_login', method: common_1.RequestMethod.POST }, { path: '/auth/verify_email', method: common_1.RequestMethod.GET }, { path: '/auth/login', method: common_1.RequestMethod.POST }, { path: '/auth/register', method: common_1.RequestMethod.POST }, { path: '/auth/employee/login', method: common_1.RequestMethod.POST }, { path: '/auth/reset_verification', method: common_1.RequestMethod.GET }, { path: '/auth/reset_password', method: common_1.RequestMethod.POST }, { path: '/auth/reset_verification_code', method: common_1.RequestMethod.GET }, { path: '/auth/verify', method: common_1.RequestMethod.PUT }, { path: '/files/:fileName', method: common_1.RequestMethod.GET }, { path: '/subsctiptions', method: common_1.RequestMethod.POST })
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL })
            .apply(admin_middleware_1.AdminAuthentication)
            .forRoutes({ path: '/admin/*', method: common_1.RequestMethod.ALL });
    }
};
exports.ApiModule = ApiModule;
exports.ApiModule = ApiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_1.AuthModule,
            offer_1.OffersModule,
            files_1.FilesModule,
            user_1.UsersModule,
            user_settings_1.UserSettingsModule,
            notifications_1.NotificationsModule,
            balance_1.BalancesModule,
            plans_1.PlansModule,
            transactions_1.TransactionsModule,
            credits_1.CreditsModule,
            balance_history_1.BalanceHistoryModule,
            webhook_1.WebhookModule,
            admin_1.AdminModule,
            contracts_1.ContractsModule,
            proof_of_founds_1.ProofOfFoundsModule,
            payment_info_1.PaymentInfosModule,
            saved_list_1.SavedListsModule,
            subscriptions_1.SubscriptionsModule
        ],
        controllers: [],
        providers: [],
    })
], ApiModule);
;
//# sourceMappingURL=api.module.js.map