"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionRepository = void 0;
const common_1 = require("@nestjs/common");
const subscriptions_model_1 = require("../models/subscriptions.model");
let SubscriptionRepository = class SubscriptionRepository {
    get model() {
        return subscriptions_model_1.Subscriptions.query();
    }
    async create(email, subscription_to) {
        return this.model.insert({ email, subscription_to });
    }
    async getAll(page, limit, subscription_to) {
        const offset = (page - 1) * limit;
        const [countResult, data] = await Promise.all([
            this.model
                .where({ subscription_to })
                .count('*'),
            this.model
                .where({ subscription_to })
                .orderBy('subsctiptions.created_at', 'desc')
                .offset(offset)
                .limit(limit)
        ]);
        const totalCount = +countResult[0]['count'];
        return {
            totalCount,
            data,
        };
    }
    async getByEmail(email) {
        return this.model.where({ email });
    }
};
exports.SubscriptionRepository = SubscriptionRepository;
exports.SubscriptionRepository = SubscriptionRepository = __decorate([
    (0, common_1.Injectable)()
], SubscriptionRepository);
//# sourceMappingURL=subscription.repository.js.map