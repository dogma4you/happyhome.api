import { Injectable } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TransactionsTypeEnum } from "src/constants/enum";

@Injectable()
export class CreateTransactionDto {
    @ApiProperty()
    public transactionId: string;
    @ApiProperty()
    public user: number;
    @ApiProperty()
    public price: number;
    @ApiProperty()
    public type: TransactionsTypeEnum;
}