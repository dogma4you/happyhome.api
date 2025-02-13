"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSettingsRepository = void 0;
const common_1 = require("@nestjs/common");
const app_settings_model_1 = require("../models/app.settings.model");
let AppSettingsRepository = class AppSettingsRepository {
    get model() {
        return app_settings_model_1.AppSettings.query();
    }
    async update(body) {
        const appSettings = await this.model.where({}).first();
        if (!appSettings)
            return await this.model.insert(body).returning(['*']);
        else
            return await this.model.where({}).update(body);
    }
    async getOne() {
        const appSettings = await this.model.where({}).first();
        if (!appSettings)
            return await this.model.insert({}).returning(['*']);
        return appSettings;
    }
    async getSingleCreditPrice() {
        const appSettings = await this.model.where({}).first();
        return appSettings ? appSettings.singleCreditPrice : 0;
    }
};
exports.AppSettingsRepository = AppSettingsRepository;
exports.AppSettingsRepository = AppSettingsRepository = __decorate([
    (0, common_1.Injectable)()
], AppSettingsRepository);
//# sourceMappingURL=app.settings.repository.js.map