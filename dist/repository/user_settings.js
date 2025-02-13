"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSettingsRepository = void 0;
const common_1 = require("@nestjs/common");
const user_settings_1 = require("../models/user_settings");
const database_1 = require("../utils/database");
let UserSettingsRepository = class UserSettingsRepository {
    get model() {
        return user_settings_1.UserSettings.query();
    }
    async create(user) {
        return this.model.insert({ user }).returning('*');
    }
    async update(user, body) {
        return this.model.where({ user }).update(body);
    }
    async findByUser(user) {
        const exists = await this.model.findOne({ user });
        if (exists)
            return exists;
        else
            return this.create(user);
    }
    async delete(user) {
        return this.model.where({ user }).delete();
    }
};
exports.UserSettingsRepository = UserSettingsRepository;
exports.UserSettingsRepository = UserSettingsRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.UseFilters)(database_1.SqlExceptionFilter)
], UserSettingsRepository);
//# sourceMappingURL=user_settings.js.map