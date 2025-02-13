import { ExteriorTypeEnum, HOATypeEnum, OfferParamsStatusEnum, PropertyDescriptionTypeEnum, PropertyTypeEnum, SellerTypeEnum } from "src/constants/enum";
import { CreateAddressDto } from "./address.dto";
import { CreateAreaDto } from "./areas.dto";
export declare class CreatePropertyConditionsDto {
    id?: number | string | any;
    roof_and_gutters: number;
    hvac: number;
    plumbing_and_gas: number;
    electrical: number;
    kitchen: number;
    bathrooms: number;
    windows: number;
    doors: number;
    water_heater: number;
    foundation: number;
    framing: number;
    dry_wall_and_paint: number;
    flooring: number;
    washer_and_dryer: number;
    siding_and_exterior_trim: number;
    patio_and_shed: number;
    landscaping: number;
    optional_features: number;
}
export declare class CreateOfferDto {
    sellerType: SellerTypeEnum;
    address: CreateAddressDto;
    propertyType: PropertyTypeEnum;
    descriptionType: PropertyDescriptionTypeEnum;
    builtYear: Date;
    areas: CreateAreaDto[];
    heating: OfferParamsStatusEnum;
    airConditioning: OfferParamsStatusEnum;
    waterSupply: OfferParamsStatusEnum;
    sewer: OfferParamsStatusEnum;
    electricPanel: OfferParamsStatusEnum;
    exteriorType: ExteriorTypeEnum[];
    lotSize: number;
    currentHOA: HOATypeEnum;
    property_condition: CreatePropertyConditionsDto;
    images: any[];
    files: any[];
}
export declare class UpdateOfferParamsDto {
    id: string;
}
export declare class UpdateOfferBodyDto extends CreateOfferDto {
    price: number;
}
export declare class UnlockOfferBodyDto {
    offer: number;
}
export declare class SubmitOfferParamsDto {
    id: string | number;
}
export declare class CreateOfferFeaturesDto {
    id?: number;
    premium_handcape: boolean;
    luxury_flooring: boolean;
    custom_framing: boolean;
    other: boolean;
    description: string;
}
