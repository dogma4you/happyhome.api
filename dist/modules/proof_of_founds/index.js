"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofOfFoundsModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const service_1 = require("./service");
const proof_of_founds_repository_1 = require("../../repository/proof_of_founds.repository");
const pipedrive_service_1 = require("../../services/pipedrive.service");
const pipedrive_actions_repository_1 = require("../../repository/pipedrive.actions.repository");
let ProofOfFoundsModule = class ProofOfFoundsModule {
};
exports.ProofOfFoundsModule = ProofOfFoundsModule;
exports.ProofOfFoundsModule = ProofOfFoundsModule = __decorate([
    (0, common_1.Module)({
        controllers: [controller_1.ProofOfFoundsController],
        providers: [
            service_1.ProofOfFoundsService,
            proof_of_founds_repository_1.ProofOfFoundsRepository,
            pipedrive_service_1.PipedriveService,
            pipedrive_actions_repository_1.PipedriveActionsRepository
        ]
    })
], ProofOfFoundsModule);
//# sourceMappingURL=index.js.map