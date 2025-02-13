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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_dto_1 = require("../../appDto/admin.dto");
const exeption_factory_1 = require("../../utils/exeption.factory");
const service_1 = require("./service");
const offer_dto_1 = require("../../appDto/offer.dto");
const contracts_dto_1 = require("../../appDto/contracts.dto");
const service_2 = require("../files/service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("../../constants/multer");
const proof_of_founds_dto_1 = require("../../appDto/proof_of_founds.dto");
const address_dto_1 = require("../../appDto/address.dto");
let AdminController = class AdminController {
    async getUsersList(query) {
        return this.service.getUsersList(query);
    }
    async updateOfferStatus(body, params) {
        return this.service.updateUserStatus(params.id, body);
    }
    async userBalanceFill(body, params) {
        return this.service.userBalanceFill(params.id, body);
    }
    async refoundUserBalance(body, params) {
        return this.service.refoundUserBalance(params.id, body);
    }
    async userProofs(req) {
        return this.service.userProofs(+req.params.id, req.body);
    }
    async getTransactionsList(query) {
        return this.service.getTransactions(query);
    }
    async updateTransactionStatus(req) {
        return this.service.updateTransactionStatus(+req.params.id, req.body);
    }
    async getOffersList(query) {
        return this.service.getOffers(query);
    }
    async getOfferById(params) {
        return this.service.getOfferById(params.id);
    }
    async updateOffer(body, params, req) {
        return this.service.updateOffer(body, +params.id, req.admin);
    }
    async approveOffer(params) {
        return this.service.approveOffer(params.id);
    }
    async cancelOffer(params) {
        return this.service.cancelOffer(params.id);
    }
    async sendOfferPriceRange(body, req) {
        return this.service.sendOfferPriceRange(body, req.admin);
    }
    async createContract(body, req) {
        return this.service.createContract(body, req.user);
    }
    async updateContract(body, req) {
        return this.service.updateContract(body, +req.params.id, req.admin);
    }
    async getContractById(req) {
        return this.service.getContractById(+req.params.id, req.admin);
    }
    async deleteContract(req, params) {
        return this.service.deleteContract(params.id);
    }
    async getContracts(query, req) {
        return this.service.getContracts(query, req.admin);
    }
    async getPurchasedContractList(req) {
        return this.service.getPurchasedContractList(req.query);
    }
    async publishContract(req) {
        return this.service.publishContract(+req.params.id);
    }
    async uploadFiles(files, req) {
        return this.uploadService.uploadMultiple(files, req.fileName, req.admin);
    }
    async createEmployee(body, req) {
        return this.service.createEmployee(body, req.admin);
    }
    async getEmployeeList(query) {
        return this.service.getEmployeeList(query);
    }
    async updateEmployee(body, params, req) {
        return this.service.updateEmployee(body, +params.id, req.admin);
    }
    async deleteEmployee(params, req) {
        return this.service.deleteEmployee(+params.id, req.admin);
    }
    async blockEmployee(params, req) {
        return this.service.actionEmployee(+params.id, params.action, req.admin);
    }
    async getPaymentMethods() {
        return this.service.getPaymentMethods();
    }
    async updatePaymentMethod(body) {
        return this.service.updatePayementMethodStatus(body.id, body.status);
    }
    async updateAdminProfile(req) {
        return this.service.updateAdminProfile(req.admin, req.body);
    }
    async updateAppSettings(req) {
        return this.service.updateAppSettings(req.body);
    }
    async getAppSettings() {
        return this.service.getAppSettings();
    }
    async createPaymentInfo(req) {
        return this.service.createPaymentInfo(req.body);
    }
    async updatePaymentInfo(req) {
        return this.service.updatePaymentInfo(+req.params.id, req.body);
    }
    async deletePaymentInfo(req) {
        return this.service.deletePaymentInfo(+req.params.id);
    }
    async getPaymentInfos() {
        return this.service.getPayemtnInfos();
    }
    async getSubscriptions(req) {
        return this.service.getSubscriptions(req.query, req.params.subscription_to);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", service_1.AdminService)
], AdminController.prototype, "service", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", service_2.FileService)
], AdminController.prototype, "uploadService", void 0);
__decorate([
    (0, common_1.Get)('users'),
    (0, swagger_1.ApiQuery)({ type: admin_dto_1.AdminGetUsersDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUsersList", null);
__decorate([
    (0, common_1.Put)('users/:id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id' }),
    (0, swagger_1.ApiBody)({ type: admin_dto_1.UpdateUserByAdminDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateOfferStatus", null);
__decorate([
    (0, common_1.Put)('user/credit/:id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id' }),
    (0, swagger_1.ApiBody)({ type: admin_dto_1.UpdateUsersCreditbalanceDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "userBalanceFill", null);
__decorate([
    (0, common_1.Put)('user/credit/refound/:id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id' }),
    (0, swagger_1.ApiBody)({ type: admin_dto_1.RefoundUsersCreditsBalanceDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "refoundUserBalance", null);
__decorate([
    (0, common_1.Put)('user/proofs/:id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id' }),
    (0, swagger_1.ApiBody)({ type: proof_of_founds_dto_1.AdminProofOfFoundsDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "userProofs", null);
__decorate([
    (0, common_1.Get)('transactions'),
    (0, swagger_1.ApiQuery)({ type: admin_dto_1.AdminGetTransactionsDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getTransactionsList", null);
__decorate([
    (0, common_1.Put)('transactions/:id'),
    (0, swagger_1.ApiBody)({ type: address_dto_1.AdminUpdateTransactionsStatusManualDto }),
    (0, swagger_1.ApiParam)({ type: String, name: 'id' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateTransactionStatus", null);
__decorate([
    (0, common_1.Get)('offers'),
    (0, swagger_1.ApiQuery)({ type: admin_dto_1.AdminGetOffersDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getOffersList", null);
__decorate([
    (0, common_1.Get)('offer/:id'),
    (0, swagger_1.ApiParam)({ type: Number, name: 'id' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getOfferById", null);
__decorate([
    (0, common_1.Put)('offer/:id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateOffer", null);
__decorate([
    (0, common_1.Put)('offer/approve/:id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "approveOffer", null);
__decorate([
    (0, common_1.Put)('offer/cancel/:id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "cancelOffer", null);
__decorate([
    (0, common_1.Post)('offer/send_range'),
    (0, swagger_1.ApiBody)({ type: admin_dto_1.AdminSendOfferRangeDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "sendOfferPriceRange", null);
__decorate([
    (0, common_1.Post)('contract'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [offer_dto_1.CreateOfferDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createContract", null);
__decorate([
    (0, common_1.Put)('contract/:id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateContract", null);
__decorate([
    (0, common_1.Get)('contract/:id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getContractById", null);
__decorate([
    (0, common_1.Delete)('contract/:id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteContract", null);
__decorate([
    (0, common_1.Get)('contracts'),
    (0, swagger_1.ApiQuery)({ type: contracts_dto_1.GetContractsDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getContracts", null);
__decorate([
    (0, common_1.Get)('contracts/purchased'),
    (0, swagger_1.ApiQuery)({ type: String, name: 'page' }),
    (0, swagger_1.ApiQuery)({ type: String, name: 'limit' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPurchasedContractList", null);
__decorate([
    (0, common_1.Put)('contract/publish/:id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'Contract id.' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "publishContract", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, multer_1.multerOptions)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Upload multiple files',
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    }),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "uploadFiles", null);
__decorate([
    (0, common_1.Post)('employee'),
    (0, swagger_1.ApiBody)({ type: admin_dto_1.AdminCreateEmployeeDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createEmployee", null);
__decorate([
    (0, common_1.Get)('employee'),
    (0, swagger_1.ApiQuery)({ type: String, name: 'page' }),
    (0, swagger_1.ApiQuery)({ type: String, name: 'limit' }),
    (0, swagger_1.ApiQuery)({ type: String, name: 'search', required: false }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getEmployeeList", null);
__decorate([
    (0, common_1.Put)('employee/:id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id' }),
    (0, swagger_1.ApiBody)({ type: admin_dto_1.AdminUpdateEmployeeDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateEmployee", null);
__decorate([
    (0, common_1.Delete)('employee/:id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteEmployee", null);
__decorate([
    (0, common_1.Put)('employee/action/:action/:id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id' }),
    (0, swagger_1.ApiParam)({ type: String, name: 'action' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "blockEmployee", null);
__decorate([
    (0, common_1.Get)('payment_methods'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPaymentMethods", null);
__decorate([
    (0, common_1.Put)('payment_method'),
    (0, swagger_1.ApiBody)({ type: admin_dto_1.UpdatePaymentMethodsDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updatePaymentMethod", null);
__decorate([
    (0, common_1.Put)('profile'),
    (0, swagger_1.ApiBody)({ type: admin_dto_1.UpdateAdminUserDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateAdminProfile", null);
__decorate([
    (0, common_1.Put)('settings'),
    (0, swagger_1.ApiBody)({ type: admin_dto_1.UpdateAppSettingsDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateAppSettings", null);
__decorate([
    (0, common_1.Get)('settings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAppSettings", null);
__decorate([
    (0, common_1.Post)('payment_info'),
    (0, swagger_1.ApiBody)({ type: address_dto_1.AdminCreatePayemtnInfo }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createPaymentInfo", null);
__decorate([
    (0, common_1.Put)('payment_info/:id'),
    (0, swagger_1.ApiBody)({ type: address_dto_1.AdminCreatePayemtnInfo }),
    (0, swagger_1.ApiParam)({ type: String, name: 'id' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updatePaymentInfo", null);
__decorate([
    (0, common_1.Delete)('payment_info/:id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deletePaymentInfo", null);
__decorate([
    (0, common_1.Get)('payment_info'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPaymentInfos", null);
__decorate([
    (0, common_1.Get)('subscriptions/:subscription_to'),
    (0, swagger_1.ApiQuery)({ type: String, name: 'page' }),
    (0, swagger_1.ApiQuery)({ type: String, name: 'limit' }),
    (0, swagger_1.ApiParam)({ type: String, name: 'subscription_to' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getSubscriptions", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, swagger_1.ApiTags)('Admin'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: exeption_factory_1.validationExeptionFactory })),
    (0, swagger_1.ApiBearerAuth)('Authorization')
], AdminController);
//# sourceMappingURL=controller.js.map