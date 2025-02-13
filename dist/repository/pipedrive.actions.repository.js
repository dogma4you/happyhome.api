"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipedriveActionsRepository = void 0;
const common_1 = require("@nestjs/common");
const pipedrive_actions_model_1 = require("../models/pipedrive.actions.model");
let PipedriveActionsRepository = class PipedriveActionsRepository {
    get model() {
        return pipedrive_actions_model_1.PipedriveActions.query();
    }
    async create(data) {
        return this.model.insert(data);
    }
    async getOne(filter) {
        return this.model.where(filter).first();
    }
    async updateOne(id, data) {
        return this.model.where({ id }).update(data);
    }
};
exports.PipedriveActionsRepository = PipedriveActionsRepository;
exports.PipedriveActionsRepository = PipedriveActionsRepository = __decorate([
    (0, common_1.Injectable)()
], PipedriveActionsRepository);
//# sourceMappingURL=pipedrive.actions.repository.js.map