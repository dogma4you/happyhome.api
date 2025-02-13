"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlansRepository = void 0;
const common_1 = require("@nestjs/common");
const plans_model_1 = require("../models/plans.model");
let PlansRepository = class PlansRepository {
    get model() {
        return plans_model_1.Plans.query();
    }
    async seed() {
        const models = [
            { name: "rookie plan", credits: 5, price: 450 },
            { name: "seasoned plan", credits: 10, price: 850 },
            { name: "professional plan", credits: 20, price: 1600 },
        ];
        return await this.model.insert(models);
    }
    async getById(id) {
        return this.model.findById(id);
    }
    async getPlans() {
        return this.model.where({}).returning('*');
    }
    async getActivePlans() {
        return this.model.where({ published: true });
    }
    async create(data) {
        return this.model.insert(data).returning('*');
    }
    async update(id, data) {
        return this.model.where({ id }).update(data);
    }
    async delete(id) {
        return this.model.deleteById(id);
    }
};
exports.PlansRepository = PlansRepository;
exports.PlansRepository = PlansRepository = __decorate([
    (0, common_1.Injectable)()
], PlansRepository);
//# sourceMappingURL=plans.repository.js.map