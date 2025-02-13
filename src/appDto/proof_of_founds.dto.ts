import { ApiPropertyOptional } from "@nestjs/swagger";
import { ProofOfFoundsStatusEnum } from "src/constants/enum";

export class ProofOfFoundsUpdateDto {
    @ApiPropertyOptional()
    public files: string[]
}

export class AdminProofOfFoundsDto {
    @ApiPropertyOptional()
    public files: string[]
    @ApiPropertyOptional()
    public status: ProofOfFoundsStatusEnum;
    @ApiPropertyOptional()
    public expire_at: Date;
}