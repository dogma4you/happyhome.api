"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofOfFoundsRepository = void 0;
const common_1 = require("@nestjs/common");
const enum_1 = require("../constants/enum");
const proof_of_founds_model_1 = require("../models/proof_of_founds.model");
let ProofOfFoundsRepository = class ProofOfFoundsRepository {
    get model() {
        return proof_of_founds_model_1.ProofOfFounds.query();
    }
    async getUserProofs(user) {
        const proof = await this.model.where({ user }).first();
        if (proof)
            return proof;
        else
            return await this.createUserProofs(user, []);
    }
    async createUserProofs(user, files) {
        return this.model.insert({ user, files: JSON.stringify(files), status: enum_1.ProofOfFoundsStatusEnum.pending }).returning('*');
    }
    async updateUserProofs(id, files) {
        return this.model.where({ id }).update({ files: JSON.stringify(files), status: enum_1.ProofOfFoundsStatusEnum.pending });
    }
    async adminUpdateStatus(id, status) {
        return this.model.where({ id }).update({ status });
    }
    async adminUpdate(id, data) {
        return this.model.where({ id }).update(data);
    }
};
exports.ProofOfFoundsRepository = ProofOfFoundsRepository;
exports.ProofOfFoundsRepository = ProofOfFoundsRepository = __decorate([
    (0, common_1.Injectable)()
], ProofOfFoundsRepository);
//# sourceMappingURL=proof_of_founds.repository.js.map