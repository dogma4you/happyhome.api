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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const exeption_factory_1 = require("../../utils/exeption.factory");
const service_1 = require("./service");
const offer_dto_1 = require("../../appDto/offer.dto");
const auth_guard_1 = require("../../guards/auth.guard");
let OffersController = class OffersController {
    async createOffer(body, req) {
        return this.service.createOffer(body, req.user.id);
    }
    async initOffer(req) {
        return this.service.initOffer(req.user);
    }
    async updateOffer(params, body, req) {
        return this.service.updateOffer(body, +params.id, req.user);
    }
    async getUsersLastOffer(req) {
        return this.service.getUsersLastOffer(req.user);
    }
    async unlockOffer(req, body) {
        return this.service.unlockOffer(req.user, body);
    }
    async submit(req, params) {
        return this.service.submit(+params.id, req.user || req.guest);
    }
    async getUsersList(req) {
        return this.service.getUsersList(req.user.id);
    }
    async createOfferFeatures(body, params, req) {
        return this.service.createOfferFeature(+params.id, body, req.user || req.guest);
    }
};
exports.OffersController = OffersController;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", service_1.OfferService)
], OffersController.prototype, "service", void 0);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [offer_dto_1.CreateOfferDto, Object]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "createOffer", null);
__decorate([
    (0, common_1.Get)('init'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "initOffer", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id' }),
    (0, swagger_1.ApiBody)({ type: offer_dto_1.UpdateOfferBodyDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [offer_dto_1.UpdateOfferParamsDto, Object, Object]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "updateOffer", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "getUsersLastOffer", null);
__decorate([
    (0, common_1.Post)('unlock'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, offer_dto_1.UnlockOfferBodyDto]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "unlockOffer", null);
__decorate([
    (0, common_1.Put)('submit/:id'),
    (0, swagger_1.ApiParam)({
        type: String,
        name: "id"
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "submit", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "getUsersList", null);
__decorate([
    (0, common_1.Post)('features/:id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id' }),
    (0, swagger_1.ApiBody)({ type: offer_dto_1.CreateOfferFeaturesDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "createOfferFeatures", null);
exports.OffersController = OffersController = __decorate([
    (0, common_1.Controller)('offer'),
    (0, swagger_1.ApiTags)('Offer'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: exeption_factory_1.validationExeptionFactory })),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard)
], OffersController);
//# sourceMappingURL=controller.js.map