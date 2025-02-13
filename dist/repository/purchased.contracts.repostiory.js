"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasedContractsRepository = void 0;
const common_1 = require("@nestjs/common");
const purchased_contracts_1 = require("../models/purchased.contracts");
let PurchasedContractsRepository = class PurchasedContractsRepository {
    get model() {
        return purchased_contracts_1.PurchasedContracts.query();
    }
    async create(contract, user, price) {
        return this.model.insert({ contract, user, price });
    }
    async getUserPurchasedContracts(user) {
        return this.model.where({ user });
    }
    async isContractPurchasedByClient(contract, user) {
        return !!this.model.where({ contract, user }).count('*').first();
    }
    async getAdminList(page, limit) {
        const offset = (page - 1) * limit;
        const [totalCount, data] = await Promise.all([
            this.model.where({}).count('*').first(),
            this.model
                .where({})
                .orderBy('purchased_contracts.created_at', 'desc')
                .offset(offset)
                .limit(limit)
        ]);
        return { totalCount: +totalCount.count, data };
    }
};
exports.PurchasedContractsRepository = PurchasedContractsRepository;
exports.PurchasedContractsRepository = PurchasedContractsRepository = __decorate([
    (0, common_1.Injectable)()
], PurchasedContractsRepository);
//# sourceMappingURL=purchased.contracts.repostiory.js.map