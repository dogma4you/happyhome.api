import { ApiProperty } from "@nestjs/swagger";

export class CreateSubscriptionDto {
  @ApiProperty()
  public email: string;
  @ApiProperty()
  public subscription_to: string;
}