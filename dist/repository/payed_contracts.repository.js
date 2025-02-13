"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayedContractsRepository = void 0;
const common_1 = require("@nestjs/common");
const payed_contracts_model_1 = require("../models/payed_contracts.model");
let PayedContractsRepository = class PayedContractsRepository {
    get model() {
        return payed_contracts_model_1.PayedContracts.query();
    }
    async create(user, contract) {
        return this.model.insert({
            user, contract
        });
    }
    async getUsersPayedContracts(user) {
        return this.model.where({ user });
    }
    async getUserPayedOffer(user, contract) {
        return this.model.findOne({ user, contract });
    }
    async isUserPayedContract(user, contract) {
        return !!await this.model.where({ user, contract }).first();
    }
    async getPayedContractsCount(user) {
        return this.model.where({ user }).count();
    }
    async removeAll(contract) {
        return this.model.where({ contract }).delete();
    }
};
exports.PayedContractsRepository = PayedContractsRepository;
exports.PayedContractsRepository = PayedContractsRepository = __decorate([
    (0, common_1.Injectable)()
], PayedContractsRepository);
//# sourceMappingURL=payed_contracts.repository.js.map