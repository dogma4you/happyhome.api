import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GetSavedListDto {
  @ApiProperty()
  public page: string;
  @ApiProperty()
  public limit: string;
  @ApiPropertyOptional()
  public dateFrom: string;
  @ApiPropertyOptional()
  public dateTo: string;
  @ApiPropertyOptional({
    description: 'All is 0, unlocked is 1, locked is 2'
  })
  public status: string;
  @ApiPropertyOptional()
  public priceFrom: string;
  @ApiPropertyOptional()
  public priceTo: string;
  @ApiPropertyOptional()
  public sortBy: string;
  @ApiPropertyOptional()
  public sortValue: string;
}