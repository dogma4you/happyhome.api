import { Model } from "objection";
import { ExteriorTypeEnum, HOATypeEnum, OfferParamsStatusEnum, OfferStatusEnum, PropertyDescriptionTypeEnum, PropertyTypeEnum, SellerTypeEnum } from "src/constants/enum";
export declare class Offer extends Model {
    static tableName: string;
    id?: number;
    user: number;
    status: OfferStatusEnum;
    sellerType: SellerTypeEnum;
    address: number;
    propertyType: PropertyTypeEnum;
    descriptionType: PropertyDescriptionTypeEnum;
    builtYear: Date;
    heating: OfferParamsStatusEnum;
    airConditioning: OfferParamsStatusEnum;
    waterSupply: OfferParamsStatusEnum;
    sewer: OfferParamsStatusEnum;
    electricPanel: OfferParamsStatusEnum;
    exteriorType: ExteriorTypeEnum[];
    lotSize: number;
    currentHOA: HOATypeEnum;
    property_condition: number;
    isSentUploadLink: boolean;
    images: number[];
    files: string[];
    price: number;
    estimated_lower_price: number;
    estimated_higher_price: number;
    estimated_date: number;
    estimated_by: number;
    created_at?: Date;
    updated_at?: Date;
}
