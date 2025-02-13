import { Module } from "@nestjs/common";
import { ProofOfFoundsController } from "./controller";
import { ProofOfFoundsService } from "./service";
import { ProofOfFoundsRepository } from "src/repository/proof_of_founds.repository";
import { PipedriveService } from "src/services/pipedrive.service";
import { PipedriveActionsRepository } from "src/repository/pipedrive.actions.repository";

@Module({
    controllers: [ProofOfFoundsController],
    providers: [
        ProofOfFoundsService,
        ProofOfFoundsRepository,
        PipedriveService,
        PipedriveActionsRepository
    ]
})
export class ProofOfFoundsModule {}