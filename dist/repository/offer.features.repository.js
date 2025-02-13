"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferFeaturesRepository = void 0;
const common_1 = require("@nestjs/common");
const offer_features_1 = require("../models/offer.features");
const database_1 = require("../utils/database");
let OfferFeaturesRepository = class OfferFeaturesRepository {
    get model() {
        return offer_features_1.OfferFeatures.query();
    }
    async create(data) {
        return this.model.insert(data).returning('*');
    }
    async getById(id) {
        return this.model.where({ id }).first();
    }
    async getOne(filter) {
        return this.model.where(filter).first();
    }
    async getByOffer(offer) {
        return this.model.where({ offer }).first();
    }
    async update(id, data) {
        return this.model.where({ id }).update(data);
    }
};
exports.OfferFeaturesRepository = OfferFeaturesRepository;
exports.OfferFeaturesRepository = OfferFeaturesRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.UseFilters)(database_1.SqlExceptionFilter)
], OfferFeaturesRepository);
//# sourceMappingURL=offer.features.repository.js.map