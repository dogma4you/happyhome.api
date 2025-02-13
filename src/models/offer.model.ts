import { Model } from "objection";
import { ExteriorTypeEnum, HOATypeEnum, OfferParamsStatusEnum, OfferStatusEnum, PropertyDescriptionTypeEnum, PropertyTypeEnum, SellerTypeEnum } from "src/constants/enum";

export class Offer extends Model {
    public static tableName: string = 'offers';

    public id?: number
    public user: number
    public status: OfferStatusEnum
    public sellerType: SellerTypeEnum
    public address: number
    public propertyType: PropertyTypeEnum
    public descriptionType: PropertyDescriptionTypeEnum
    public builtYear: Date
    public heating: OfferParamsStatusEnum
    public airConditioning: OfferParamsStatusEnum
    public waterSupply: OfferParamsStatusEnum
    public sewer: OfferParamsStatusEnum
    public electricPanel: OfferParamsStatusEnum
    public exteriorType: ExteriorTypeEnum[]
    public lotSize: number
    public currentHOA: HOATypeEnum
    public property_condition: number
    public isSentUploadLink: boolean
    public images: number[]
    public files: string[]
    public price: number;
    public estimated_lower_price: number;
    public estimated_higher_price: number;
    public estimated_date: number;
    public estimated_by: number;
    public created_at?: Date
    public updated_at?: Date
}   