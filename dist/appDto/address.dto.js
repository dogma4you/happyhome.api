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
exports.AdminUpdateTransactionsStatusManualDto = exports.AdminCreatePayemtnInfo = exports.CreateAddressDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enum_1 = require("../constants/enum");
let CreateAddressDto = class CreateAddressDto {
};
exports.CreateAddressDto = CreateAddressDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "postal_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAddressDto.prototype, "lat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAddressDto.prototype, "lng", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "formatted_address", void 0);
exports.CreateAddressDto = CreateAddressDto = __decorate([
    (0, common_1.Injectable)()
], CreateAddressDto);
let AdminCreatePayemtnInfo = class AdminCreatePayemtnInfo {
};
exports.AdminCreatePayemtnInfo = AdminCreatePayemtnInfo;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminCreatePayemtnInfo.prototype, "recipient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminCreatePayemtnInfo.prototype, "bank_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminCreatePayemtnInfo.prototype, "bank_address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminCreatePayemtnInfo.prototype, "routing_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminCreatePayemtnInfo.prototype, "account_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminCreatePayemtnInfo.prototype, "account_type", void 0);
exports.AdminCreatePayemtnInfo = AdminCreatePayemtnInfo = __decorate([
    (0, common_1.Injectable)()
], AdminCreatePayemtnInfo);
let AdminUpdateTransactionsStatusManualDto = class AdminUpdateTransactionsStatusManualDto {
};
exports.AdminUpdateTransactionsStatusManualDto = AdminUpdateTransactionsStatusManualDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AdminUpdateTransactionsStatusManualDto.prototype, "status", void 0);
exports.AdminUpdateTransactionsStatusManualDto = AdminUpdateTransactionsStatusManualDto = __decorate([
    (0, common_1.Injectable)()
], AdminUpdateTransactionsStatusManualDto);
//# sourceMappingURL=address.dto.js.map