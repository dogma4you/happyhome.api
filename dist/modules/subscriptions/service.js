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
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const subscription_repository_1 = require("../../repository/subscription.repository");
const response_1 = require("../../types/response");
let SubscriptionService = class SubscriptionService {
    async create(data) {
        const existsSubscriptions = await this.repository.getByEmail(data.email);
        const existsBelongins = existsSubscriptions.filter(x => x.subscription_to === data.subscription_to.toLowerCase());
        if (existsBelongins.length)
            return new common_1.BadRequestException('Subscription already created');
        await this.repository.create(data.email, data.subscription_to.toLowerCase());
        return (0, response_1.getResponse)(true, 'Subscription created');
    }
    async getAll(data, subscription_to) {
        const page = +data.page || 1, limit = +data.limit || 20;
        return this.repository.getAll(page, limit, subscription_to);
    }
};
exports.SubscriptionService = SubscriptionService;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", subscription_repository_1.SubscriptionRepository)
], SubscriptionService.prototype, "repository", void 0);
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)()
], SubscriptionService);
//# sourceMappingURL=service.js.map