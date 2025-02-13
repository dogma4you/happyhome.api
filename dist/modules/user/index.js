"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const service_1 = require("./service");
const hash_service_1 = require("../../services/hash.service");
const user_repository_1 = require("../../repository/user.repository");
const user_settings_1 = require("../../repository/user_settings");
const events_gateway_1 = require("../../events/events.gateway");
const pipedrive_service_1 = require("../../services/pipedrive.service");
const pipedrive_actions_repository_1 = require("../../repository/pipedrive.actions.repository");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [controller_1.UserController],
        providers: [
            service_1.UserService,
            hash_service_1.HashService,
            user_repository_1.UserRepository,
            user_settings_1.UserSettingsRepository,
            events_gateway_1.EventsGateway,
            pipedrive_service_1.PipedriveService,
            pipedrive_actions_repository_1.PipedriveActionsRepository
        ]
    })
], UsersModule);
//# sourceMappingURL=index.js.map