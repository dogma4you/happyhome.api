"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofOfFoundsService = void 0;
const common_1 = require("@nestjs/common");
const pipedrive_actions_repository_1 = require("../../repository/pipedrive.actions.repository");
const proof_of_founds_repository_1 = require("../../repository/proof_of_founds.repository");
const pipedrive_service_1 = require("../../services/pipedrive.service");
const response_1 = require("../../types/response");
let ProofOfFoundsService = class ProofOfFoundsService {
    async getUserProofs(user) {
        const proofs = await this.proofOfFoundsRepository.getUserProofs(user.id);
        return (0, response_1.getResponse)(true, 'Proofs!', proofs);
    }
    async updateProofOfFounds(data, user) {
        const proofs = await this.proofOfFoundsRepository.getUserProofs(user.id);
        await this.proofOfFoundsRepository.updateUserProofs(proofs.id, data.files);
        try {
            const action = await this.pipedriveActionsRepository.getOne({
                user: user.id
            });
            if (action.deal) {
                await this.pipedriveService.updateDeal(action.deal, {
                    title: `${user.first_name} ${user.last_name} updated proofs of founds`,
                    stage_id: 21
                });
            }
            else {
                const deal = await this.pipedriveActionsRepository.create({
                    title: `${user.first_name} ${user.last_name} updated proofs of founds`,
                    value: 0,
                    currency: 'USD',
                    stage_id: 21,
                    person_id: action.person
                });
                await this.pipedriveActionsRepository.updateOne(action.id, {
                    deal: deal.id
                });
            }
        }
        catch (error) {
            console.log(error);
        }
        return (0, response_1.getResponse)(true, 'Proofs updated!');
    }
};
exports.ProofOfFoundsService = ProofOfFoundsService;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", proof_of_founds_repository_1.ProofOfFoundsRepository)
], ProofOfFoundsService.prototype, "proofOfFoundsRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", pipedrive_service_1.PipedriveService)
], ProofOfFoundsService.prototype, "pipedriveService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", pipedrive_actions_repository_1.PipedriveActionsRepository)
], ProofOfFoundsService.prototype, "pipedriveActionsRepository", void 0);
exports.ProofOfFoundsService = ProofOfFoundsService = __decorate([
    (0, common_1.Injectable)()
], ProofOfFoundsService);
//# sourceMappingURL=service.js.map