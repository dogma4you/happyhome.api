"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentInfoRepository = void 0;
const common_1 = require("@nestjs/common");
const payment_info_model_1 = require("../models/payment_info.model");
const database_1 = require("../utils/database");
let PaymentInfoRepository = class PaymentInfoRepository {
    get model() {
        return payment_info_model_1.PaymentInfo.query();
    }
    async create(data) {
        return this.model.insert({ ...data, reference_number: 'null' }).returning('*');
    }
    async update(id, data) {
        return this.model.where({ id }).update(data);
    }
    async delete(id) {
        return this.model.deleteById(id);
    }
    async getAll() {
        return this.model.where({}).select('*');
    }
};
exports.PaymentInfoRepository = PaymentInfoRepository;
exports.PaymentInfoRepository = PaymentInfoRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.UseFilters)(database_1.SqlExceptionFilter)
], PaymentInfoRepository);
//# sourceMappingURL=payment_info.repository.js.map