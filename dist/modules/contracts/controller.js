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
exports.ContractController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../guards/auth.guard");
const exeption_factory_1 = require("../../utils/exeption.factory");
const service_1 = require("./service");
const contracts_dto_1 = require("../../appDto/contracts.dto");
let ContractController = class ContractController {
    async getList(query, req) {
        return this.service.getList(query, req.user);
    }
    async unlock(req) {
        return this.service.unlock(req.body, req.user);
    }
    async getListedById(req) {
        return this.service.getListedById(+req.params.id, req.user);
    }
    async purchase(req) {
        return this.service.purchase(+req.params.contract, req.user);
    }
    async getPurchasedList(req) {
        return this.service.getPurchasedList(req.user);
    }
    async getContractsInfos(req) {
        return this.service.getContractsInfos(req.user);
    }
};
exports.ContractController = ContractController;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", service_1.ContractService)
], ContractController.prototype, "service", void 0);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiQuery)({ type: contracts_dto_1.GetContractsDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "getList", null);
__decorate([
    (0, common_1.Put)('unlock'),
    (0, swagger_1.ApiBody)({ type: contracts_dto_1.UnlockContractDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "unlock", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "getListedById", null);
__decorate([
    (0, common_1.Put)('purchase/:contract'),
    (0, swagger_1.ApiParam)({ type: String, name: 'contract' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "purchase", null);
__decorate([
    (0, common_1.Get)('purchase/list'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "getPurchasedList", null);
__decorate([
    (0, common_1.Get)('/all/info'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "getContractsInfos", null);
exports.ContractController = ContractController = __decorate([
    (0, common_1.Controller)('contracts'),
    (0, swagger_1.ApiTags)('Contracts'),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: exeption_factory_1.validationExeptionFactory }))
], ContractController);
//# sourceMappingURL=controller.js.map