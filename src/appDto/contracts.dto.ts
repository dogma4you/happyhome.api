import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { OfferStatusEnum, SellerTypeEnum, PropertyTypeEnum, PropertyDescriptionTypeEnum } from "src/constants/enum";

export class GetContractsDto {
    @ApiPropertyOptional()
    public search: string;
    
    @ApiProperty()
    public page: string;

    @ApiProperty()
    public limit: string;

    @ApiPropertyOptional({
        description: 'Like 1,2,3'
    })
    public propertyType: string;

    @ApiPropertyOptional()
    public radiusLat: string;

    @ApiPropertyOptional()
    public radiusLng: string;

    @ApiPropertyOptional()
    public radiusVal: string;

    @ApiPropertyOptional()
    public radius: number;

    @ApiPropertyOptional()
    public paid: number;

    @ApiPropertyOptional()
    public listedDurationFrom?: number;

    @ApiPropertyOptional()
    public listedDurationTo?: number;

    @ApiPropertyOptional()
    public zipCode?: string;

    // Range filters
    @ApiPropertyOptional()
    public totalSalesPriceFrom?: number;

    @ApiPropertyOptional()
    public totalSalesPriceTo?: number;

    @ApiPropertyOptional()
    public estAvrFrom?: number;

    @ApiPropertyOptional()
    public estAvrTo?: number;

    @ApiPropertyOptional()
    public estRentMoFrom?: number;

    @ApiPropertyOptional()
    public estRentMoTo?: number;

    @ApiPropertyOptional()
    public priceFrom?: number;

    @ApiPropertyOptional()
    public priceTo?: number;

    @ApiPropertyOptional()
    public estNetProfitFrom?: number;

    @ApiPropertyOptional()
    public estNetProfitTo?: number;

    @ApiPropertyOptional()
    public estRepairCostFrom?: number;

    @ApiPropertyOptional()
    public estRepairCostTo?: number;

    @ApiPropertyOptional()
    public buyersFeeFrom?: number;

    @ApiPropertyOptional()
    public buyersFeeTo?: number;

    @ApiPropertyOptional()
    public earnestMoneyDepFrom?: number;

    @ApiPropertyOptional()
    public earnestMoneyDepTo?: number;

    @ApiPropertyOptional()
    public totalAmountFrom?: number;

    @ApiPropertyOptional()
    public totalAmountTo?: number;

    @ApiPropertyOptional()
    public asignmentFeeFrom?: number;

    @ApiPropertyOptional()
    public asignmentFeeTo?: number;

    @ApiPropertyOptional()
    public northLat: number;
    @ApiPropertyOptional()
    public northLng: number;
    @ApiPropertyOptional()
    public southLat: number;
    @ApiPropertyOptional()
    public southLng: number;
    @ApiPropertyOptional()
    public eastLat: number;
    @ApiPropertyOptional()
    public eastLng: number;
    @ApiPropertyOptional()
    public westLat: number;
    @ApiPropertyOptional()
    public westLng: number;
    @ApiPropertyOptional()
    public withinMapArea: string;

}

export interface IDeleteContractParams {
    id: number;
}

export class UnlockContractDto {
    @ApiProperty()
    public contract: number;
}