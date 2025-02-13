import { ProofOfFoundsUpdateDto } from "src/appDto/proof_of_founds.dto";
import { User } from "src/models/user.model";
export declare class ProofOfFoundsService {
    private proofOfFoundsRepository;
    private pipedriveService;
    private pipedriveActionsRepository;
    getUserProofs(user: User): Promise<import("src/types/response").ResponseModel<import("../../models/proof_of_founds.model").ProofOfFounds>>;
    updateProofOfFounds(data: ProofOfFoundsUpdateDto, user: User): Promise<import("src/types/response").ResponseModel<unknown>>;
}
