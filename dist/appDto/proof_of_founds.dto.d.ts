import { ProofOfFoundsStatusEnum } from "src/constants/enum";
export declare class ProofOfFoundsUpdateDto {
    files: string[];
}
export declare class AdminProofOfFoundsDto {
    files: string[];
    status: ProofOfFoundsStatusEnum;
    expire_at: Date;
}
