import { ProofOfFoundsStatusEnum } from "src/constants/enum";
import { ProofOfFounds } from "src/models/proof_of_founds.model";
export declare class ProofOfFoundsRepository {
    private get model();
    getUserProofs(user: number): Promise<ProofOfFounds>;
    createUserProofs(user: number, files: string[]): Promise<ProofOfFounds>;
    updateUserProofs(id: number, files: string[]): Promise<number>;
    adminUpdateStatus(id: number, status: ProofOfFoundsStatusEnum): Promise<number>;
    adminUpdate(id: number, data: object): Promise<number>;
}
