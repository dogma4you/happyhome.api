import { Injectable } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";
import { AdminEmployeeActionTypeEnum, OfferStatusEnum, PropertyDescriptionTypeEnum, PropertyTypeEnum, SellerTypeEnum, UserActivityTypeEnum } from "src/constants/enum";
import { CreateOfferDto } from "./offer.dto";

@Injectable()
export class AdminGetUsersDto {
    @ApiPropertyOptional()
    public search: string;

    @ApiProperty()
    public page: string;
    
    @ApiProperty()
    public limit: string;

    @ApiPropertyOptional()
    public sortKey: string;

    @ApiPropertyOptional()
    public sortValue: string;

}

@Injectable()
export class AdminGetTransactionsDto {
    @ApiProperty()
    public page: string;
    
    @ApiProperty()
    public limit: string;
}

export class AdminGetOffersDto {
    @ApiProperty()
    public page: string;

    @ApiProperty()
    public limit: string;

    // @ApiPropertyOptional()
    // public bedroomsMin: number;

    // @ApiPropertyOptional()
    // public bedroomsMax: number;

    @ApiPropertyOptional()
    public status: OfferStatusEnum;

    @ApiPropertyOptional()
    public sellerType: SellerTypeEnum;

    @ApiPropertyOptional()
    public propertyType: PropertyTypeEnum;

    @ApiPropertyOptional()
    public descriptionType: PropertyDescriptionTypeEnum;

    // @ApiPropertyOptional()
    // public builtYearMin: number;

    // @ApiPropertyOptional()
    // public builtYearMax: number;

    // @ApiPropertyOptional()
    // public squareFeetMin: number;

    // @ApiPropertyOptional()
    // public squareFeetMax: number;

    // @ApiPropertyOptional()
    // public bathroomsMin: number;

    // @ApiPropertyOptional()
    // public bathroomsMax: number;

    @ApiPropertyOptional()
    public lotSizeMin: number;

    @ApiPropertyOptional()
    public search: string;

    @ApiPropertyOptional()
    public lotSizeMax: number;

}

@Injectable()
export class AdminApproveOfferDto {
    @ApiProperty()
    public id: number;
}

@Injectable()
export class AdminCancelOfferDto {
    @ApiProperty()
    public id: number;
}

@Injectable()
export class AdminSendOfferRangeDto {
    @ApiProperty()
    public id: number;

    @ApiProperty()
    public from: number;

    @ApiProperty()
    public to: number;
}

@Injectable()
export class AdminCreateEmployeeDto {
    @ApiProperty()
    @IsString()
    public first_name: string

    @ApiProperty()
    @IsString()
    public last_name: string

    @ApiProperty()
    @IsEmail()
    public email: string

    @ApiPropertyOptional()
    public phone: string
}

export class AdminGetEmployeeDto {
    @ApiProperty()
    public page: string;
    
    @ApiProperty()
    public limit: string;

    @ApiPropertyOptional()
    public search: string;
}


export class AdminUpdateEmployeeDto {
    @ApiPropertyOptional()
    public first_name: string

    @ApiPropertyOptional()
    public last_name: string

    @ApiPropertyOptional()
    public email: string

    @ApiPropertyOptional()
    public phone: string

    @ApiPropertyOptional()
    public status: number
};

export class AdminDeleteEmployeeParamsDto {
    @ApiProperty()
    public id: string;
}
export class AdminUpdateEmployeeActionParamsDto {
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public action: AdminEmployeeActionTypeEnum;
}

export class AdminUpdateEmployeeParamsDto {
    @ApiProperty()
    public id: string;
}

export class UpdatePaymentMethodsDto {
    @ApiProperty()
    public id: number;
    @ApiProperty()
    public status:  number;
}

export class UpdateAdminUserDto {
    @ApiPropertyOptional()
    public email: string;
    @ApiPropertyOptional()
    public phone: string;
    @ApiPropertyOptional()
    public first_name: string;
    @ApiPropertyOptional()
    public last_name: string;
    @ApiPropertyOptional()
    public password: string;
}

export class UpdateUserByAdminDto {
    @ApiProperty()
    public status: UserActivityTypeEnum
}

export class UpdateUsersCreditbalanceDto {
    @ApiProperty()
    public credits: number;
}

export class RefoundUsersCreditsBalanceDto {
    @ApiProperty()
    public credits: number;
}

export class UpdateContractByAdminDto extends CreateOfferDto {
    @ApiPropertyOptional()
    public expire_at: Date;

    @ApiPropertyOptional()
    public totalSalesPrice: number;
    @ApiPropertyOptional()
    public estAvr: number;
    @ApiPropertyOptional()
    public estRentMo: number;
    @ApiPropertyOptional()
    public price: number;
    @ApiPropertyOptional()
    public estNetProfit: number;
    @ApiPropertyOptional()
    public estRepairCost: number;
    @ApiPropertyOptional()
    public buyersFee: number;
    @ApiPropertyOptional()
    public earnestMoneyDep: number;
    @ApiPropertyOptional()
    public totalAmount: number;
    @ApiPropertyOptional()
    public asignmentFee: number;

    @ApiPropertyOptional()
    public asignmentContract: string;
    @ApiPropertyOptional()
    public realEstatePurchseAgreement: string;
    @ApiPropertyOptional()
    public competitiveMarketAnalisys: string;
    @ApiPropertyOptional()
    public scopeOfWork: string;

    @ApiPropertyOptional()
    public status: any;
}

export class UpdateAppSettingsDto {
    @ApiPropertyOptional()
    public paymentFee: number;

    @ApiPropertyOptional()
    public contractFee: number;

    @ApiPropertyOptional()
    public singleCreditPrice: number;
}