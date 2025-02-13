import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreatePlanDto {
    @ApiProperty()
    public title: string;
    @ApiProperty()
    public credits: number;
    @ApiProperty()
    public price: number;
    @ApiPropertyOptional()
    public discount: number;
    @ApiPropertyOptional()
    public description: string;
}

export class UpdatePlanDto {
    @ApiPropertyOptional()
    public name: string;
    @ApiPropertyOptional()
    public credits: number;
    @ApiPropertyOptional()
    public price: number;
    @ApiPropertyOptional()
    public discount: number;
    @ApiPropertyOptional()
    public description: string;
    @ApiPropertyOptional()
    public published: boolean;
}