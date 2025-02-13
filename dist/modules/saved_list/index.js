"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedListsModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const service_1 = require("./service");
const saved_lists_repository_1 = require("../../repository/saved_lists.repository");
const contract_repository_1 = require("../../repository/contract.repository");
const saved_contracts_repository_1 = require("../../repository/saved.contracts.repository");
const payed_contracts_repository_1 = require("../../repository/payed_contracts.repository");
const pipedrive_service_1 = require("../../services/pipedrive.service");
const pipedrive_actions_repository_1 = require("../../repository/pipedrive.actions.repository");
let SavedListsModule = class SavedListsModule {
};
exports.SavedListsModule = SavedListsModule;
exports.SavedListsModule = SavedListsModule = __decorate([
    (0, common_1.Module)({
        controllers: [controller_1.SavedListsController],
        providers: [
            service_1.SavedListService,
            saved_lists_repository_1.SavedListsRepository,
            contract_repository_1.ContractRepository,
            saved_contracts_repository_1.SavedContractsRepository,
            saved_lists_repository_1.SavedListsRepository,
            payed_contracts_repository_1.PayedContractsRepository,
            pipedrive_service_1.PipedriveService,
            pipedrive_actions_repository_1.PipedriveActionsRepository
        ]
    })
], SavedListsModule);
//# sourceMappingURL=index.js.map