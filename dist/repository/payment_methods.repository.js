"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodsRepository = void 0;
const common_1 = require("@nestjs/common");
const payment_methods_1 = require("../models/payment_methods");
let PaymentMethodsRepository = class PaymentMethodsRepository {
    get model() {
        return payment_methods_1.PaymentMethods.query();
    }
    async getList() {
        return this.model.where({});
    }
    async getById(id) {
        return this.model.where({ id }).first();
    }
    async updateStatus(id, status) {
        return this.model.where({ id }).update({ status });
    }
};
exports.PaymentMethodsRepository = PaymentMethodsRepository;
exports.PaymentMethodsRepository = PaymentMethodsRepository = __decorate([
    (0, common_1.Injectable)()
], PaymentMethodsRepository);
//# sourceMappingURL=payment_methods.repository.js.map