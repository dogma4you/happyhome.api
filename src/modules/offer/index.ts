import { Module } from "@nestjs/common";
import { OfferService } from "./service";
import { OffersController } from "./controller";
import { OffersRepository } from "src/repository/offers.repository";
import { AddressRepository } from "src/repository/address.repository";
import { PropertyConditionsRepository } from "src/repository/propertyConditions.repository";
import { PayedContractsRepository } from "src/repository/payed_contracts.repository";
import { BalanceRepository } from "src/repository/balance.repository";
import { AreasRepository } from "src/repository/areas.repository";
import { OfferFeaturesRepository } from "src/repository/offer.features.repository";
import { UserRepository } from "src/repository/user.repository";
import { EventsGateway } from "src/events/events.gateway";
import { NotificationsRepository } from "src/repository/notifications.repository";
import { SocketService } from "src/services/socket.service";
import { PipedriveService } from "src/services/pipedrive.service";
import { PipedriveActionsRepository } from "src/repository/pipedrive.actions.repository";

@Module({
    controllers: [OffersController],
    providers: [OfferService,
        OffersRepository,
        AddressRepository,
        PropertyConditionsRepository,
        PayedContractsRepository,
        BalanceRepository,
        AreasRepository,
        OfferFeaturesRepository,
        EventsGateway,
        UserRepository,
        NotificationsRepository,
        SocketService,
        PipedriveService,
        PipedriveActionsRepository
    ]
})
export class OffersModule {}