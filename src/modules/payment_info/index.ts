import { Module } from "@nestjs/common";
import { PaymentsInfosController } from "./controller";
import { PaymentInfoService } from "./service";
import { PaymentInfoRepository } from "src/repository/payment_info.repository";
import { AppSettingsRepository } from "src/repository/app.settings.repository";
import { TransactionsRepository } from "src/repository/transactons.repository";
import { BalanceRepository } from "src/repository/balance.repository";
import { PlansRepository } from "src/repository/plans.repository";
import { SocketService } from "src/services/socket.service";
import { EventsGateway } from "src/events/events.gateway";
import { UserRepository } from "src/repository/user.repository";

@Module({
  controllers: [PaymentsInfosController],
  providers: [
    PaymentInfoService,
    PaymentInfoRepository,
    AppSettingsRepository,
    TransactionsRepository,
    BalanceRepository,
    PlansRepository,
    // SocketService,
    // EventsGateway,
    UserRepository
  ]
})
export class PaymentInfosModule {};