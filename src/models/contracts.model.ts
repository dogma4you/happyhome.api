import { Model } from "objection";
import { ContractsStatusTypeEnum, ExteriorTypeEnum, HOATypeEnum, OfferParamsStatusEnum, PropertyDescriptionTypeEnum, PropertyTypeEnum, SellerTypeEnum } from "src/constants/enum";

export class Contract extends Model {
    public static tableName: string = 'contracts';

    public id?: number
    public offer: number
    public status: ContractsStatusTypeEnum
    public address: number
    public propertyType: PropertyTypeEnum
    public descriptionType: PropertyDescriptionTypeEnum
    public expire_at: Date
    public expire_at_updated_at: Date
    public builtYear: Date
    public squareFeet: number
    public bedrooms: number
    public bathrooms: number
    public heating: OfferParamsStatusEnum
    public airConditioning: OfferParamsStatusEnum
    public waterSupply: OfferParamsStatusEnum
    public sewer: OfferParamsStatusEnum
    public electricPanel: OfferParamsStatusEnum
    public exteriorType: ExteriorTypeEnum[] | any
    public lotSize: number
    public currentHOA: HOATypeEnum
    public property_condition: number
    public images: number[] | any;
    public files: number[] | any;
    public deleted: number;

    public totalSalesPrice: number;
    public estAvr: number;
    public estRentMo: number;
    public price: number;
    public estNetProfit: number;
    public estRepairCost: number;
    public buyersFee: number;
    public earnestMoneyDep: number;
    public totalAmount: number;
    public asignmentFee: number;

    public asignmentContract: string;
    public realEstatePurchseAgreement: string;
    public competitiveMarketAnalisys: string;
    public scopeOfWork: string;
    public purchasement: number;

    public created_at?: Date
    public updated_at?: Date
}   