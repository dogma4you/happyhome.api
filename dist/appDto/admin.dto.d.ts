import { AdminEmployeeActionTypeEnum, OfferStatusEnum, PropertyDescriptionTypeEnum, PropertyTypeEnum, SellerTypeEnum, UserActivityTypeEnum } from "src/constants/enum";
import { CreateOfferDto } from "./offer.dto";
export declare class AdminGetUsersDto {
    search: string;
    page: string;
    limit: string;
    sortKey: string;
    sortValue: string;
}
export declare class AdminGetTransactionsDto {
    page: string;
    limit: string;
}
export declare class AdminGetOffersDto {
    page: string;
    limit: string;
    status: OfferStatusEnum;
    sellerType: SellerTypeEnum;
    propertyType: PropertyTypeEnum;
    descriptionType: PropertyDescriptionTypeEnum;
    lotSizeMin: number;
    search: string;
    lotSizeMax: number;
}
export declare class AdminApproveOfferDto {
    id: number;
}
export declare class AdminCancelOfferDto {
    id: number;
}
export declare class AdminSendOfferRangeDto {
    id: number;
    from: number;
    to: number;
}
export declare class AdminCreateEmployeeDto {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}
export declare class AdminGetEmployeeDto {
    page: string;
    limit: string;
    search: string;
}
export declare class AdminUpdateEmployeeDto {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    status: number;
}
export declare class AdminDeleteEmployeeParamsDto {
    id: string;
}
export declare class AdminUpdateEmployeeActionParamsDto {
    id: string;
    action: AdminEmployeeActionTypeEnum;
}
export declare class AdminUpdateEmployeeParamsDto {
    id: string;
}
export declare class UpdatePaymentMethodsDto {
    id: number;
    status: number;
}
export declare class UpdateAdminUserDto {
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    password: string;
}
export declare class UpdateUserByAdminDto {
    status: UserActivityTypeEnum;
}
export declare class UpdateUsersCreditbalanceDto {
    credits: number;
}
export declare class RefoundUsersCreditsBalanceDto {
    credits: number;
}
export declare class UpdateContractByAdminDto extends CreateOfferDto {
    expire_at: Date;
    totalSalesPrice: number;
    estAvr: number;
    estRentMo: number;
    price: number;
    estNetProfit: number;
    estRepairCost: number;
    buyersFee: number;
    earnestMoneyDep: number;
    totalAmount: number;
    asignmentFee: number;
    asignmentContract: string;
    realEstatePurchseAgreement: string;
    competitiveMarketAnalisys: string;
    scopeOfWork: string;
    status: any;
}
export declare class UpdateAppSettingsDto {
    paymentFee: number;
    contractFee: number;
    singleCreditPrice: number;
}
