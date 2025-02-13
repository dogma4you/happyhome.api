"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffersModule = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("./service");
const controller_1 = require("./controller");
const offers_repository_1 = require("../../repository/offers.repository");
const address_repository_1 = require("../../repository/address.repository");
const propertyConditions_repository_1 = require("../../repository/propertyConditions.repository");
const payed_contracts_repository_1 = require("../../repository/payed_contracts.repository");
const balance_repository_1 = require("../../repository/balance.repository");
const areas_repository_1 = require("../../repository/areas.repository");
const offer_features_repository_1 = require("../../repository/offer.features.repository");
const user_repository_1 = require("../../repository/user.repository");
const events_gateway_1 = require("../../events/events.gateway");
const notifications_repository_1 = require("../../repository/notifications.repository");
const socket_service_1 = require("../../services/socket.service");
const pipedrive_service_1 = require("../../services/pipedrive.service");
const pipedrive_actions_repository_1 = require("../../repository/pipedrive.actions.repository");
let OffersModule = class OffersModule {
};
exports.OffersModule = OffersModule;
exports.OffersModule = OffersModule = __decorate([
    (0, common_1.Module)({
        controllers: [controller_1.OffersController],
        providers: [service_1.OfferService,
            offers_repository_1.OffersRepository,
            address_repository_1.AddressRepository,
            propertyConditions_repository_1.PropertyConditionsRepository,
            payed_contracts_repository_1.PayedContractsRepository,
            balance_repository_1.BalanceRepository,
            areas_repository_1.AreasRepository,
            offer_features_repository_1.OfferFeaturesRepository,
            events_gateway_1.EventsGateway,
            user_repository_1.UserRepository,
            notifications_repository_1.NotificationsRepository,
            socket_service_1.SocketService,
            pipedrive_service_1.PipedriveService,
            pipedrive_actions_repository_1.PipedriveActionsRepository
        ]
    })
], OffersModule);
//# sourceMappingURL=index.js.map