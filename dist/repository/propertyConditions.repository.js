"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyConditionsRepository = void 0;
const common_1 = require("@nestjs/common");
const property_conditions_1 = require("../models/property_conditions");
let PropertyConditionsRepository = class PropertyConditionsRepository {
    get model() {
        return property_conditions_1.PropertyConditions.query();
    }
    async create(data) {
        return this.model.insert(data);
    }
    async getById(id) {
        return this.model.where({ id }).first();
    }
    async update(id, data) {
        return this.model.where({ id }).update(data);
    }
};
exports.PropertyConditionsRepository = PropertyConditionsRepository;
exports.PropertyConditionsRepository = PropertyConditionsRepository = __decorate([
    (0, common_1.Injectable)()
], PropertyConditionsRepository);
//# sourceMappingURL=propertyConditions.repository.js.map