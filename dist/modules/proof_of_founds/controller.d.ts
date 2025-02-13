import { IRequest } from "src/types/request";
export declare class ProofOfFoundsController {
    private service;
    getUsersProofs(req: IRequest): Promise<import("../../types/response").ResponseModel<import("../../models/proof_of_founds.model").ProofOfFounds>>;
    updateProofOfFounds(req: IRequest): Promise<import("../../types/response").ResponseModel<unknown>>;
}
