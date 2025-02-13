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
exports.PlansService = void 0;
const common_1 = require("@nestjs/common");
const plans_repository_1 = require("../../repository/plans.repository");
const response_1 = require("../../types/response");
let PlansService = class PlansService {
    async runSeed() {
        return this.repository.seed();
    }
    async getPlans() {
        const plans = await this.repository.getPlans();
        return (0, response_1.getResponse)(true, 'Plans', plans);
    }
    async create(data) {
        const activePlans = await this.repository.getActivePlans();
        if (activePlans.length === 3)
            throw new common_1.BadRequestException('Maximum count of active plans is 3.');
        const plan = await this.repository.create(data);
        return (0, response_1.getResponse)(true, 'Plan created!', plan);
    }
    async update(id, data) {
        if (data.published === true) {
            const activePlans = await this.repository.getActivePlans();
            if (activePlans.length === 3)
                throw new common_1.BadRequestException('Maximum count of active plans is 3.');
        }
        await this.repository.update(id, data);
        return (0, response_1.getResponse)(true, 'Plan updated!');
    }
    async delete(id) {
        await this.repository.delete(id);
        return (0, response_1.getResponse)(true, 'Plan deleted!');
    }
};
exports.PlansService = PlansService;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", plans_repository_1.PlansRepository)
], PlansService.prototype, "repository", void 0);
exports.PlansService = PlansService = __decorate([
    (0, common_1.Injectable)()
], PlansService);
//# sourceMappingURL=service.js.map