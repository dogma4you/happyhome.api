"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedListsRepository = void 0;
const common_1 = require("@nestjs/common");
const saved_lists_model_1 = require("../models/saved_lists.model");
const database_1 = require("../utils/database");
let SavedListsRepository = class SavedListsRepository {
    get model() {
        return saved_lists_model_1.SavedLists.query();
    }
    async create(user) {
        return this.model.insert({ user });
    }
    async getById(id) {
        return this.model.where({ id }).first();
    }
    async getByUserId(user) {
        let data = await this.model.where({ user }).first();
        if (!data)
            data = await this.create(user);
        return data;
    }
};
exports.SavedListsRepository = SavedListsRepository;
exports.SavedListsRepository = SavedListsRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.UseFilters)(database_1.SqlExceptionFilter)
], SavedListsRepository);
//# sourceMappingURL=saved_lists.repository.js.map