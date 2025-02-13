import { Inject, Injectable } from "@nestjs/common";
import { ProofOfFoundsUpdateDto } from "src/appDto/proof_of_founds.dto";
import { User } from "src/models/user.model";
import { PipedriveActionsRepository } from "src/repository/pipedrive.actions.repository";
import { ProofOfFoundsRepository } from "src/repository/proof_of_founds.repository";
import { PipedriveService } from "src/services/pipedrive.service";
import { getResponse } from "src/types/response";

@Injectable()
export class ProofOfFoundsService {

    @Inject()
    private proofOfFoundsRepository: ProofOfFoundsRepository;
    @Inject()
    private pipedriveService: PipedriveService;
    @Inject()
    private pipedriveActionsRepository: PipedriveActionsRepository;

    public async getUserProofs(user: User) {
        const proofs = await this.proofOfFoundsRepository.getUserProofs(user.id);
        return getResponse(true, 'Proofs!', proofs)
    }
    
    public async updateProofOfFounds(data: ProofOfFoundsUpdateDto, user: User) {
        const proofs = await this.proofOfFoundsRepository.getUserProofs(user.id);   
        await this.proofOfFoundsRepository.updateUserProofs(proofs.id, data.files);

        try {
            const action = await this.pipedriveActionsRepository.getOne({
                user: user.id
            })
    
            if (action.deal) {
                await this.pipedriveService.updateDeal(action.deal, {
                    title: `${user.first_name} ${user.last_name} updated proofs of founds`,
                    stage_id: 21
                })
            } else {
                const deal = await this.pipedriveActionsRepository.create({
                    title: `${user.first_name} ${user.last_name} updated proofs of founds`,
                    value: 0,
                    currency: 'USD',
                    stage_id: 21,
                    person_id: action.person
                })
                await this.pipedriveActionsRepository.updateOne(action.id, {
                    deal: deal.id
                })
            }
        } catch (error) {
            console.log(error);
        }

        return getResponse(true, 'Proofs updated!')
    }

}