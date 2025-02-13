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
exports.CreateOfferFeaturesDto = exports.SubmitOfferParamsDto = exports.UnlockOfferBodyDto = exports.UpdateOfferBodyDto = exports.UpdateOfferParamsDto = exports.CreateOfferDto = exports.CreatePropertyConditionsDto = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const enum_1 = require("../constants/enum");
const address_dto_1 = require("./address.dto");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const areas_dto_1 = require("./areas.dto");
let CreatePropertyConditionsDto = class CreatePropertyConditionsDto {
};
exports.CreatePropertyConditionsDto = CreatePropertyConditionsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], CreatePropertyConditionsDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreatePropertyConditionsDto.prototype, "roof_and_gutters", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreatePropertyConditionsDto.prototype, "hvac", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreatePropertyConditionsDto.prototype, "plumbing_and_gas", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreatePropertyConditionsDto.prototype, "electrical", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreatePropertyConditionsDto.prototype, "kitchen", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreatePropertyConditionsDto.prototype, "bathrooms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreatePropertyConditionsDto.prototype, "windows", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreatePropertyConditionsDto.prototype, "doors", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreatePropertyConditionsDto.prototype, "water_heater", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreatePropertyConditionsDto.prototype, "foundation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreatePropertyConditionsDto.prototype, "framing", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreatePropertyConditionsDto.prototype, "dry_wall_and_paint", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreatePropertyConditionsDto.prototype, "flooring", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreatePropertyConditionsDto.prototype, "washer_and_dryer", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreatePropertyConditionsDto.prototype, "siding_and_exterior_trim", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreatePropertyConditionsDto.prototype, "patio_and_shed", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreatePropertyConditionsDto.prototype, "landscaping", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreatePropertyConditionsDto.prototype, "optional_features", void 0);
exports.CreatePropertyConditionsDto = CreatePropertyConditionsDto = __decorate([
    (0, common_1.Injectable)()
], CreatePropertyConditionsDto);
let CreateOfferDto = class CreateOfferDto {
};
exports.CreateOfferDto = CreateOfferDto;
__decorate([
    (0, class_validator_1.IsEnum)(enum_1.SellerTypeEnum),
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "sellerType", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => address_dto_1.CreateAddressDto),
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", address_dto_1.CreateAddressDto)
], CreateOfferDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enum_1.PropertyTypeEnum),
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "propertyType", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enum_1.PropertyDescriptionTypeEnum),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "descriptionType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], CreateOfferDto.prototype, "builtYear", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => areas_dto_1.CreateAreaDto),
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateOfferDto.prototype, "areas", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enum_1.OfferParamsStatusEnum),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "heating", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enum_1.OfferParamsStatusEnum),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "airConditioning", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enum_1.OfferParamsStatusEnum),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "waterSupply", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enum_1.OfferParamsStatusEnum),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "sewer", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enum_1.OfferParamsStatusEnum),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "electricPanel", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsEnum)(enum_1.ExteriorTypeEnum, { each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Array)
], CreateOfferDto.prototype, "exteriorType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "lotSize", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enum_1.HOATypeEnum),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "currentHOA", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => CreatePropertyConditionsDto),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", CreatePropertyConditionsDto)
], CreateOfferDto.prototype, "property_condition", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Array)
], CreateOfferDto.prototype, "images", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Array)
], CreateOfferDto.prototype, "files", void 0);
exports.CreateOfferDto = CreateOfferDto = __decorate([
    (0, common_1.Injectable)()
], CreateOfferDto);
let UpdateOfferParamsDto = class UpdateOfferParamsDto {
};
exports.UpdateOfferParamsDto = UpdateOfferParamsDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOfferParamsDto.prototype, "id", void 0);
exports.UpdateOfferParamsDto = UpdateOfferParamsDto = __decorate([
    (0, common_1.Injectable)()
], UpdateOfferParamsDto);
let UpdateOfferBodyDto = class UpdateOfferBodyDto extends CreateOfferDto {
};
exports.UpdateOfferBodyDto = UpdateOfferBodyDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], UpdateOfferBodyDto.prototype, "price", void 0);
exports.UpdateOfferBodyDto = UpdateOfferBodyDto = __decorate([
    (0, common_1.Injectable)()
], UpdateOfferBodyDto);
let UnlockOfferBodyDto = class UnlockOfferBodyDto {
};
exports.UnlockOfferBodyDto = UnlockOfferBodyDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UnlockOfferBodyDto.prototype, "offer", void 0);
exports.UnlockOfferBodyDto = UnlockOfferBodyDto = __decorate([
    (0, common_1.Injectable)()
], UnlockOfferBodyDto);
let SubmitOfferParamsDto = class SubmitOfferParamsDto {
};
exports.SubmitOfferParamsDto = SubmitOfferParamsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], SubmitOfferParamsDto.prototype, "id", void 0);
exports.SubmitOfferParamsDto = SubmitOfferParamsDto = __decorate([
    (0, common_1.Injectable)()
], SubmitOfferParamsDto);
let CreateOfferFeaturesDto = class CreateOfferFeaturesDto {
};
exports.CreateOfferFeaturesDto = CreateOfferFeaturesDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CreateOfferFeaturesDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Boolean)
], CreateOfferFeaturesDto.prototype, "premium_handcape", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Boolean)
], CreateOfferFeaturesDto.prototype, "luxury_flooring", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Boolean)
], CreateOfferFeaturesDto.prototype, "custom_framing", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Boolean)
], CreateOfferFeaturesDto.prototype, "other", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], CreateOfferFeaturesDto.prototype, "description", void 0);
exports.CreateOfferFeaturesDto = CreateOfferFeaturesDto = __decorate([
    (0, common_1.Injectable)()
], CreateOfferFeaturesDto);
//# sourceMappingURL=offer.dto.js.map