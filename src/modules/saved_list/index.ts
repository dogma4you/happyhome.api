import { Module } from "@nestjs/common";
import { SavedListsController } from "./controller";
import { SavedListService } from "./service";
import { SavedListsRepository } from "src/repository/saved_lists.repository";
import { ContractRepository } from "src/repository/contract.repository";
import { SavedContractsRepository } from "src/repository/saved.contracts.repository";
import { PayedContractsRepository } from "src/repository/payed_contracts.repository";
import { PipedriveService } from "src/services/pipedrive.service";
import { PipedriveActionsRepository } from "src/repository/pipedrive.actions.repository";

@Module({
  controllers: [SavedListsController],
  providers: [
    SavedListService,
    SavedListsRepository,
    ContractRepository,
    SavedContractsRepository,
    SavedListsRepository,
    PayedContractsRepository,
    PipedriveService,
    PipedriveActionsRepository
  ]
})
export class SavedListsModule {}