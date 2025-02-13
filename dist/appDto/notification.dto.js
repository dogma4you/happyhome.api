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
exports.MarkAsSeenNotificationDto = exports.DeleteNotificationDto = exports.GetNotificationDetailsDto = exports.GetNotificationsDto = exports.CreateNotificationDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enum_1 = require("../constants/enum");
let CreateNotificationDto = class CreateNotificationDto {
};
exports.CreateNotificationDto = CreateNotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], CreateNotificationDto.prototype, "ctx", void 0);
exports.CreateNotificationDto = CreateNotificationDto = __decorate([
    (0, common_1.Injectable)()
], CreateNotificationDto);
let GetNotificationsDto = class GetNotificationsDto {
};
exports.GetNotificationsDto = GetNotificationsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.NotificationSeenTypeEnum),
    __metadata("design:type", Number)
], GetNotificationsDto.prototype, "seen", void 0);
exports.GetNotificationsDto = GetNotificationsDto = __decorate([
    (0, common_1.Injectable)()
], GetNotificationsDto);
let GetNotificationDetailsDto = class GetNotificationDetailsDto {
};
exports.GetNotificationDetailsDto = GetNotificationDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], GetNotificationDetailsDto.prototype, "id", void 0);
exports.GetNotificationDetailsDto = GetNotificationDetailsDto = __decorate([
    (0, common_1.Injectable)()
], GetNotificationDetailsDto);
let DeleteNotificationDto = class DeleteNotificationDto {
};
exports.DeleteNotificationDto = DeleteNotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], DeleteNotificationDto.prototype, "id", void 0);
exports.DeleteNotificationDto = DeleteNotificationDto = __decorate([
    (0, common_1.Injectable)()
], DeleteNotificationDto);
let MarkAsSeenNotificationDto = class MarkAsSeenNotificationDto {
};
exports.MarkAsSeenNotificationDto = MarkAsSeenNotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], MarkAsSeenNotificationDto.prototype, "id", void 0);
exports.MarkAsSeenNotificationDto = MarkAsSeenNotificationDto = __decorate([
    (0, common_1.Injectable)()
], MarkAsSeenNotificationDto);
//# sourceMappingURL=notification.dto.js.map