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
exports.ProofOfFoundsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../guards/auth.guard");
const exeption_factory_1 = require("../../utils/exeption.factory");
const service_1 = require("./service");
const proof_of_founds_dto_1 = require("../../appDto/proof_of_founds.dto");
let ProofOfFoundsController = class ProofOfFoundsController {
    async getUsersProofs(req) {
        return this.service.getUserProofs(req.user);
    }
    async updateProofOfFounds(req) {
        return this.service.updateProofOfFounds(req.body, req.user);
    }
};
exports.ProofOfFoundsController = ProofOfFoundsController;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", service_1.ProofOfFoundsService)
], ProofOfFoundsController.prototype, "service", void 0);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProofOfFoundsController.prototype, "getUsersProofs", null);
__decorate([
    (0, common_1.Put)(''),
    (0, swagger_1.ApiBody)({ type: proof_of_founds_dto_1.ProofOfFoundsUpdateDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProofOfFoundsController.prototype, "updateProofOfFounds", null);
exports.ProofOfFoundsController = ProofOfFoundsController = __decorate([
    (0, common_1.Controller)('proof_of_founds'),
    (0, swagger_1.ApiTags)('Proof_of_founds'),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: exeption_factory_1.validationExeptionFactory }))
], ProofOfFoundsController);
//# sourceMappingURL=controller.js.map