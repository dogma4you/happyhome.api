import { Module } from "@nestjs/common";
import { AdminController } from "./controller";
import { AdminService } from "./service";
import { UserRepository } from "src/repository/user.repository";
import { TransactionsRepository } from "src/repository/transactons.repository";
import { OffersRepository } from "src/repository/offers.repository";
import { NotificationsRepository } from "src/repository/notifications.repository";
import { ContractRepository } from "src/repository/contract.repository";
import { AddressRepository } from "src/repository/address.repository";
import { PropertyConditionsRepository } from "src/repository/propertyConditions.repository";
import { FileService } from "../files/service";
import { HashService } from "src/services/hash.service";
import { MailerService } from "src/services/mailer.service";
import { PaymentMethodsRepository } from "src/repository/payment_methods.repository";
import { FileRepository } from "src/repository/file.repository";
import { AppSettingsRepository } from "src/repository/app.settings.repository";
import { BalanceRepository } from "src/repository/balance.repository";
import { ProofOfFoundsRepository } from "src/repository/proof_of_founds.repository";
import { PaymentInfoRepository } from "src/repository/payment_info.repository";
import { SocketService } from "src/services/socket.service";
import { EventsGateway } from "src/events/events.gateway";
import { PurchasedContractsRepository } from "src/repository/purchased.contracts.repostiory";
import { SubscriptionRepository } from "src/repository/subscription.repository";
import { PipedriveService } from "src/services/pipedrive.service";
import { PipedriveActionsRepository } from "src/repository/pipedrive.actions.repository";

@Module({
    controllers: [AdminController],
    providers: [
        AdminService,
        UserRepository,
        TransactionsRepository,
        OffersRepository,
        NotificationsRepository,
        ContractRepository,
        AddressRepository,
        PropertyConditionsRepository,
        FileService,
        MailerService,
        HashService,
        PaymentMethodsRepository,
        FileRepository,
        AppSettingsRepository,
        BalanceRepository,
        ProofOfFoundsRepository,
        PaymentInfoRepository,
        SocketService,
        EventsGateway,
        PurchasedContractsRepository,
        SubscriptionRepository,
        PipedriveService,
        PipedriveActionsRepository
    ]
})
export class AdminModule {};