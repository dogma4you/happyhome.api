import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class FillBalanceDto {
    @ApiProperty()
    public price: number | string;
}

export class FillCreditBalanceDto {
    @ApiPropertyOptional()
    public plan: number;

    @ApiPropertyOptional()
    public credits: number;
}