import { ApiProperty } from "@nestjs/swagger";

export class SuccessTransactionDto {
  @ApiProperty()
  public transaction: string;
}