import { Module } from "@nestjs/common";
import { ContractController } from "./controller";
import { ContractService } from "./service";
import { ContractRepository } from "src/repository/contract.repository";
import { PayedContractsRepository } from "src/repository/payed_contracts.repository";
import { BalanceRepository } from "src/repository/balance.repository";
import { SavedContractsRepository } from "src/repository/saved.contracts.repository";
import { SavedListsRepository } from "src/repository/saved_lists.repository";
import { PurchasedContractsRepository } from "src/repository/purchased.contracts.repostiory";
import { SocketService } from "src/services/socket.service";
import { NotificationsRepository } from "src/repository/notifications.repository";
import { EventsGateway } from "src/events/events.gateway";
import { UserRepository } from "src/repository/user.repository";
import { ProofOfFoundsRepository } from "src/repository/proof_of_founds.repository";
import { PipedriveService } from "src/services/pipedrive.service";
import { PipedriveActionsRepository } from "src/repository/pipedrive.actions.repository";

@Module({
    controllers: [ContractController],
    providers: [
        ContractService,
        PayedContractsRepository,
        ContractRepository,
        PayedContractsRepository,
        BalanceRepository,
        SavedContractsRepository,
        SavedListsRepository,
        PurchasedContractsRepository,
        SocketService,
        NotificationsRepository,
        EventsGateway,
        UserRepository,
        ProofOfFoundsRepository,
        PipedriveService,
        PipedriveActionsRepository
    ]
})
export class ContractsModule {};