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
exports.SavedListsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../guards/auth.guard");
const exeption_factory_1 = require("../../utils/exeption.factory");
const service_1 = require("./service");
let SavedListsController = class SavedListsController {
    saveContract(req) {
        return this.service.saveContract(+req.params.contract, req.user);
    }
    async deleteFromSavedList(req) {
        return this.service.deleteContract(+req.params.contract, req.user);
    }
    async getSavedList(req) {
        return this.service.getList(req.query, req.user);
    }
};
exports.SavedListsController = SavedListsController;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", service_1.SavedListService)
], SavedListsController.prototype, "service", void 0);
__decorate([
    (0, common_1.Put)('/:contract'),
    (0, swagger_1.ApiParam)({ type: String, name: 'contract' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SavedListsController.prototype, "saveContract", null);
__decorate([
    (0, common_1.Delete)('/:contract'),
    (0, swagger_1.ApiParam)({ type: String, name: 'contract' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SavedListsController.prototype, "deleteFromSavedList", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiQuery)({ required: true, type: String, name: 'page' }),
    (0, swagger_1.ApiQuery)({ required: true, type: String, name: 'limit' }),
    (0, swagger_1.ApiQuery)({ required: false, type: String, name: 'dateFrom' }),
    (0, swagger_1.ApiQuery)({ required: false, type: String, name: 'dateTo' }),
    (0, swagger_1.ApiQuery)({ required: false, type: String, name: 'status' }),
    (0, swagger_1.ApiQuery)({ required: false, type: String, name: 'priceFrom' }),
    (0, swagger_1.ApiQuery)({ required: false, type: String, name: 'priceTo' }),
    (0, swagger_1.ApiQuery)({ required: false, type: String, name: 'sortBy' }),
    (0, swagger_1.ApiQuery)({ required: false, type: String, name: 'sortValue' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SavedListsController.prototype, "getSavedList", null);
exports.SavedListsController = SavedListsController = __decorate([
    (0, common_1.Controller)('saved_lists'),
    (0, swagger_1.ApiTags)('Saved lists'),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: exeption_factory_1.validationExeptionFactory }))
], SavedListsController);
//# sourceMappingURL=controller.js.map