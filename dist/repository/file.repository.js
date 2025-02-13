"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRepository = void 0;
const common_1 = require("@nestjs/common");
const files_1 = require("../models/files");
const database_1 = require("../utils/database");
let FileRepository = class FileRepository {
    get model() {
        return files_1.Files.query();
    }
    async create(data) {
        return this.model.insert(data).returning('*');
    }
    async getByNames(list, user) {
        return this.model.where({ user }).whereIn('name', list);
    }
    async getByName(name) {
        return this.model.where({ name }).first();
    }
};
exports.FileRepository = FileRepository;
exports.FileRepository = FileRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.UseFilters)(database_1.SqlExceptionFilter)
], FileRepository);
//# sourceMappingURL=file.repository.js.map