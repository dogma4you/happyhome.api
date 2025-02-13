"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const service_1 = require("./service");
const user_repository_1 = require("../../repository/user.repository");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const jwt_service_1 = require("../../services/jwt.service");
const mailer_service_1 = require("../../services/mailer.service");
const email_verification_repository_1 = require("../../repository/email.verification.repository");
const hash_service_1 = require("../../services/hash.service");
const user_settings_1 = require("../../repository/user_settings");
const balance_repository_1 = require("../../repository/balance.repository");
const saved_lists_repository_1 = require("../../repository/saved_lists.repository");
const socket_service_1 = require("../../services/socket.service");
const notifications_repository_1 = require("../../repository/notifications.repository");
const events_gateway_1 = require("../../events/events.gateway");
const pipedrive_service_1 = require("../../services/pipedrive.service");
const pipedrive_actions_repository_1 = require("../../repository/pipedrive.actions.repository");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
            }),
        ],
        controllers: [controller_1.AuthController],
        providers: [
            service_1.AuthService,
            user_repository_1.UserRepository,
            jwt_service_1.JwtStrategy,
            mailer_service_1.MailerService,
            email_verification_repository_1.VerifyEmailRepository,
            hash_service_1.HashService,
            user_settings_1.UserSettingsRepository,
            balance_repository_1.BalanceRepository,
            saved_lists_repository_1.SavedListsRepository,
            socket_service_1.SocketService,
            notifications_repository_1.NotificationsRepository,
            events_gateway_1.EventsGateway,
            pipedrive_service_1.PipedriveService,
            pipedrive_actions_repository_1.PipedriveActionsRepository
        ]
    })
], AuthModule);
//# sourceMappingURL=index.js.map