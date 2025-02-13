import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateAreaDto {
    @ApiPropertyOptional()
    public id?: number;
    @ApiProperty()
    public square_feet: number;
    @ApiProperty()
    public bedrooms: number;
    @ApiProperty()
    public bathrooms: number;
}