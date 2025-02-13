"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAppSettingsDto = exports.UpdateContractByAdminDto = exports.RefoundUsersCreditsBalanceDto = exports.UpdateUsersCreditbalanceDto = exports.UpdateUserByAdminDto = exports.UpdateAdminUserDto = exports.UpdatePaymentMethodsDto = exports.AdminUpdateEmployeeParamsDto = exports.AdminUpdateEmployeeActionParamsDto = exports.AdminDeleteEmployeeParamsDto = exports.AdminUpdateEmployeeDto = exports.AdminGetEmployeeDto = exports.AdminCreateEmployeeDto = exports.AdminSendOfferRangeDto = exports.AdminCancelOfferDto = exports.AdminApproveOfferDto = exports.AdminGetOffersDto = exports.AdminGetTransactionsDto = exports.AdminGetUsersDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enum_1 = require("../constants/enum");
const offer_dto_1 = require("./offer.dto");
let AdminGetUsersDto = class AdminGetUsersDto {
};
exports.AdminGetUsersDto = AdminGetUsersDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], AdminGetUsersDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminGetUsersDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminGetUsersDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], AdminGetUsersDto.prototype, "sortKey", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], AdminGetUsersDto.prototype, "sortValue", void 0);
exports.AdminGetUsersDto = AdminGetUsersDto = __decorate([
    (0, common_1.Injectable)()
], AdminGetUsersDto);
let AdminGetTransactionsDto = class AdminGetTransactionsDto {
};
exports.AdminGetTransactionsDto = AdminGetTransactionsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminGetTransactionsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminGetTransactionsDto.prototype, "limit", void 0);
exports.AdminGetTransactionsDto = AdminGetTransactionsDto = __decorate([
    (0, common_1.Injectable)()
], AdminGetTransactionsDto);
class AdminGetOffersDto {
}
exports.AdminGetOffersDto = AdminGetOffersDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminGetOffersDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminGetOffersDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], AdminGetOffersDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], AdminGetOffersDto.prototype, "sellerType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], AdminGetOffersDto.prototype, "propertyType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], AdminGetOffersDto.prototype, "descriptionType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], AdminGetOffersDto.prototype, "lotSizeMin", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], AdminGetOffersDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], AdminGetOffersDto.prototype, "lotSizeMax", void 0);
let AdminApproveOfferDto = class AdminApproveOfferDto {
};
exports.AdminApproveOfferDto = AdminApproveOfferDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AdminApproveOfferDto.prototype, "id", void 0);
exports.AdminApproveOfferDto = AdminApproveOfferDto = __decorate([
    (0, common_1.Injectable)()
], AdminApproveOfferDto);
let AdminCancelOfferDto = class AdminCancelOfferDto {
};
exports.AdminCancelOfferDto = AdminCancelOfferDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AdminCancelOfferDto.prototype, "id", void 0);
exports.AdminCancelOfferDto = AdminCancelOfferDto = __decorate([
    (0, common_1.Injectable)()
], AdminCancelOfferDto);
let AdminSendOfferRangeDto = class AdminSendOfferRangeDto {
};
exports.AdminSendOfferRangeDto = AdminSendOfferRangeDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AdminSendOfferRangeDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AdminSendOfferRangeDto.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AdminSendOfferRangeDto.prototype, "to", void 0);
exports.AdminSendOfferRangeDto = AdminSendOfferRangeDto = __decorate([
    (0, common_1.Injectable)()
], AdminSendOfferRangeDto);
let AdminCreateEmployeeDto = class AdminCreateEmployeeDto {
};
exports.AdminCreateEmployeeDto = AdminCreateEmployeeDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminCreateEmployeeDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminCreateEmployeeDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AdminCreateEmployeeDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], AdminCreateEmployeeDto.prototype, "phone", void 0);
exports.AdminCreateEmployeeDto = AdminCreateEmployeeDto = __decorate([
    (0, common_1.Injectable)()
], AdminCreateEmployeeDto);
class AdminGetEmployeeDto {
}
exports.AdminGetEmployeeDto = AdminGetEmployeeDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminGetEmployeeDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminGetEmployeeDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], AdminGetEmployeeDto.prototype, "search", void 0);
class AdminUpdateEmployeeDto {
}
exports.AdminUpdateEmployeeDto = AdminUpdateEmployeeDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], AdminUpdateEmployeeDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], AdminUpdateEmployeeDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], AdminUpdateEmployeeDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], AdminUpdateEmployeeDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], AdminUpdateEmployeeDto.prototype, "status", void 0);
;
class AdminDeleteEmployeeParamsDto {
}
exports.AdminDeleteEmployeeParamsDto = AdminDeleteEmployeeParamsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminDeleteEmployeeParamsDto.prototype, "id", void 0);
class AdminUpdateEmployeeActionParamsDto {
}
exports.AdminUpdateEmployeeActionParamsDto = AdminUpdateEmployeeActionParamsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminUpdateEmployeeActionParamsDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AdminUpdateEmployeeActionParamsDto.prototype, "action", void 0);
class AdminUpdateEmployeeParamsDto {
}
exports.AdminUpdateEmployeeParamsDto = AdminUpdateEmployeeParamsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminUpdateEmployeeParamsDto.prototype, "id", void 0);
class UpdatePaymentMethodsDto {
}
exports.UpdatePaymentMethodsDto = UpdatePaymentMethodsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UpdatePaymentMethodsDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UpdatePaymentMethodsDto.prototype, "status", void 0);
class UpdateAdminUserDto {
}
exports.UpdateAdminUserDto = UpdateAdminUserDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateAdminUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateAdminUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateAdminUserDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateAdminUserDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateAdminUserDto.prototype, "password", void 0);
class UpdateUserByAdminDto {
}
exports.UpdateUserByAdminDto = UpdateUserByAdminDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UpdateUserByAdminDto.prototype, "status", void 0);
class UpdateUsersCreditbalanceDto {
}
exports.UpdateUsersCreditbalanceDto = UpdateUsersCreditbalanceDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UpdateUsersCreditbalanceDto.prototype, "credits", void 0);
class RefoundUsersCreditsBalanceDto {
}
exports.RefoundUsersCreditsBalanceDto = RefoundUsersCreditsBalanceDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RefoundUsersCreditsBalanceDto.prototype, "credits", void 0);
class UpdateContractByAdminDto extends offer_dto_1.CreateOfferDto {
}
exports.UpdateContractByAdminDto = UpdateContractByAdminDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], UpdateContractByAdminDto.prototype, "expire_at", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], UpdateContractByAdminDto.prototype, "totalSalesPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], UpdateContractByAdminDto.prototype, "estAvr", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], UpdateContractByAdminDto.prototype, "estRentMo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], UpdateContractByAdminDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], UpdateContractByAdminDto.prototype, "estNetProfit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], UpdateContractByAdminDto.prototype, "estRepairCost", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], UpdateContractByAdminDto.prototype, "buyersFee", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], UpdateContractByAdminDto.prototype, "earnestMoneyDep", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], UpdateContractByAdminDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], UpdateContractByAdminDto.prototype, "asignmentFee", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateContractByAdminDto.prototype, "asignmentContract", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateContractByAdminDto.prototype, "realEstatePurchseAgreement", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateContractByAdminDto.prototype, "competitiveMarketAnalisys", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateContractByAdminDto.prototype, "scopeOfWork", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], UpdateContractByAdminDto.prototype, "status", void 0);
class UpdateAppSettingsDto {
}
exports.UpdateAppSettingsDto = UpdateAppSettingsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], UpdateAppSettingsDto.prototype, "paymentFee", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], UpdateAppSettingsDto.prototype, "contractFee", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], UpdateAppSettingsDto.prototype, "singleCreditPrice", void 0);
//# sourceMappingURL=admin.dto.js.map