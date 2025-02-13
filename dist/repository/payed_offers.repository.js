"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayedOffersRepository = void 0;
const common_1 = require("@nestjs/common");
const payed_offers_model_1 = require("../models/payed_offers.model");
let PayedOffersRepository = class PayedOffersRepository {
    get model() {
        return payed_offers_model_1.PayedOffers.query();
    }
    async create(user, offer) {
        return this.model.insert({
            user, offer
        });
    }
    async getUserPayedOffer(user, offer) {
        return this.model.findOne({ user, offer });
    }
};
exports.PayedOffersRepository = PayedOffersRepository;
exports.PayedOffersRepository = PayedOffersRepository = __decorate([
    (0, common_1.Injectable)()
], PayedOffersRepository);
//# sourceMappingURL=payed_offers.repository.js.map