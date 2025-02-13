"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreasRepository = void 0;
const common_1 = require("@nestjs/common");
const areas_model_1 = require("../models/areas.model");
let AreasRepository = class AreasRepository {
    get model() {
        return areas_model_1.Areas.query();
    }
    async create(data) {
        return this.model.insert({ ...data });
    }
    async update(id, data) {
        return this.model.where({ id }).update(data);
    }
    async getOfferAreas(offer) {
        return this.model.where({ offer }).select('*');
    }
    async deleteAreas(ids) {
        return this.model.whereIn('id', ids).delete();
    }
};
exports.AreasRepository = AreasRepository;
exports.AreasRepository = AreasRepository = __decorate([
    (0, common_1.Injectable)()
], AreasRepository);
//# sourceMappingURL=areas.repository.js.map