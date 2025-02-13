import { Injectable } from "@nestjs/common";
import { ArrayNotEmpty, IsArray, IsEnum, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";
import { ExteriorTypeEnum, HOATypeEnum, OfferParamsStatusEnum, PropertyDescriptionTypeEnum, PropertyTypeEnum, SellerTypeEnum } from "src/constants/enum";
import { CreateAddressDto } from "./address.dto";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CreateAreaDto } from "./areas.dto";

@Injectable()
export class CreatePropertyConditionsDto {
    @ApiPropertyOptional()
    public id?: number | string | any;

    @ApiPropertyOptional()
    public roof_and_gutters: number

    @ApiPropertyOptional()
    public hvac: number

    @ApiPropertyOptional()
    public plumbing_and_gas: number

    @ApiPropertyOptional()
    public electrical: number

    @ApiPropertyOptional()
    public kitchen: number

    @ApiPropertyOptional()
    public bathrooms: number

    @ApiPropertyOptional()
    public windows: number

    @ApiPropertyOptional()
    public doors: number

    @ApiPropertyOptional()
    public water_heater: number

    @ApiPropertyOptional()
    public foundation: number

    @ApiPropertyOptional()
    public framing: number

    @ApiPropertyOptional()
    public dry_wall_and_paint: number

    @ApiPropertyOptional()
    public flooring: number

    @ApiPropertyOptional()
    public washer_and_dryer: number

    @ApiPropertyOptional()
    public siding_and_exterior_trim: number

    @ApiPropertyOptional()
    public patio_and_shed: number

    @ApiPropertyOptional()
    public landscaping: number

    @ApiPropertyOptional()
    public optional_features: number
}

@Injectable()
export class CreateOfferDto {
    @IsEnum(SellerTypeEnum)
    @ApiPropertyOptional()
    @IsOptional()
    public sellerType: SellerTypeEnum
    
    @ValidateNested()
    @Type(() => CreateAddressDto)
    @ApiPropertyOptional()
    @IsOptional()
    public address: CreateAddressDto

    @IsEnum(PropertyTypeEnum)
    @ApiPropertyOptional()
    @IsOptional()
    public propertyType: PropertyTypeEnum

    @IsEnum(PropertyDescriptionTypeEnum)
    @IsOptional()
    @ApiPropertyOptional()
    public descriptionType: PropertyDescriptionTypeEnum

    @ApiPropertyOptional()
    public builtYear: Date
    
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested()
    @Type(() => CreateAreaDto)
    @ApiPropertyOptional()
    @IsOptional()
    public areas: CreateAreaDto[]

    // @IsNumber()
    // @Min(1)
    // @ApiPropertyOptional()
    // @IsOptional()
    // public squareFeet: number

    // @IsNumber()
    // @ApiPropertyOptional()
    // @IsOptional()
    // public bedrooms: number
    
    // @IsNumber()
    // @ApiPropertyOptional()
    // @IsOptional()
    // public bathrooms: number

    @IsEnum(OfferParamsStatusEnum)
    @IsOptional()
    @ApiPropertyOptional()
    public heating: OfferParamsStatusEnum

    @IsEnum(OfferParamsStatusEnum)
    @IsOptional()
    @ApiPropertyOptional()
    public airConditioning: OfferParamsStatusEnum

    @IsEnum(OfferParamsStatusEnum)
    @IsOptional()
    @ApiPropertyOptional()
    public waterSupply: OfferParamsStatusEnum

    @IsEnum(OfferParamsStatusEnum)
    @IsOptional()
    @ApiPropertyOptional()
    public sewer: OfferParamsStatusEnum

    @IsEnum(OfferParamsStatusEnum)
    @IsOptional()
    @ApiPropertyOptional()
    public electricPanel: OfferParamsStatusEnum
    
    @IsArray()
    @ArrayNotEmpty()
    @IsEnum(ExteriorTypeEnum, { each: true })
    @IsOptional()
    @ApiPropertyOptional()
    public exteriorType: ExteriorTypeEnum[]

    @IsNumber()
    @Min(1)
    @IsOptional()
    @ApiPropertyOptional()
    public lotSize: number

    @IsEnum(HOATypeEnum)
    @IsOptional()
    @ApiPropertyOptional()
    public currentHOA: HOATypeEnum

    @ValidateNested()
    @IsOptional()
    @Type(() => CreatePropertyConditionsDto)
    @ApiPropertyOptional()
    public property_condition: CreatePropertyConditionsDto // need to unpack

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    @ApiPropertyOptional()
    public images: any[]

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    @ApiPropertyOptional()
    public files: any[]
}

@Injectable()
export class UpdateOfferParamsDto {
    @IsString()
    public id: string
}

@Injectable()
export class UpdateOfferBodyDto extends CreateOfferDto {
    @ApiPropertyOptional()
    public price: number;
}

@Injectable()
export class UnlockOfferBodyDto {
    @ApiProperty()
    public offer: number;
}

@Injectable()
export class SubmitOfferParamsDto {
    @ApiProperty()
    public id: string | number;
}

@Injectable()
export class CreateOfferFeaturesDto {
    @ApiPropertyOptional()
    public id?: number;
    @ApiPropertyOptional()
    public premium_handcape: boolean
    @ApiPropertyOptional()
    public luxury_flooring: boolean
    @ApiPropertyOptional()
    public custom_framing: boolean
    @ApiPropertyOptional()
    public other: boolean
    @ApiPropertyOptional()
    public description: string
}