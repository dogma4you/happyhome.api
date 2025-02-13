import { Module } from "@nestjs/common";
import { BalanceController } from "./controller";
import { BalanceService } from "./service";
import { AuthorizeNetService } from "src/services/paymet.service";
import { BalanceRepository } from "src/repository/balance.repository";
import { PlansRepository } from "src/repository/plans.repository";
import { TransactionService } from "../transactions/service";
import { TransactionsRepository } from "src/repository/transactons.repository";
import { NotificationsRepository } from "src/repository/notifications.repository";
import { UserRepository } from "src/repository/user.repository";
import { AppSettingsRepository } from "src/repository/app.settings.repository";
import { SocketService } from "src/services/socket.service";
import { EventsGateway } from "src/events/events.gateway";
import { PipedriveService } from "src/services/pipedrive.service";
import { PipedriveActionsRepository } from "src/repository/pipedrive.actions.repository";
@Module({
    controllers: [BalanceController],
    providers: [
        BalanceService,
        AuthorizeNetService,
        BalanceRepository,
        PlansRepository,
        TransactionService,
        TransactionsRepository,
        NotificationsRepository,
        UserRepository,
        AppSettingsRepository,
        SocketService,
        EventsGateway,
        PipedriveService,
        PipedriveActionsRepository
    ]
})
export class BalancesModule {}