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
exports.SavedListService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const enum_1 = require("../../constants/enum");
const contract_repository_1 = require("../../repository/contract.repository");
const payed_contracts_repository_1 = require("../../repository/payed_contracts.repository");
const pipedrive_actions_repository_1 = require("../../repository/pipedrive.actions.repository");
const saved_contracts_repository_1 = require("../../repository/saved.contracts.repository");
const saved_lists_repository_1 = require("../../repository/saved_lists.repository");
const pipedrive_service_1 = require("../../services/pipedrive.service");
const response_1 = require("../../types/response");
let SavedListService = class SavedListService {
    async saveContract(id, user) {
        const contract = await this.contractsRepository.getOne(id);
        if (!contract)
            return new common_1.BadRequestException('Invalid contract');
        if (contract.deleted)
            return new common_1.BadRequestException('Contract has invalid state state');
        if (contract.status !== enum_1.ContractsStatusTypeEnum.published)
            return new common_1.BadRequestException('Invalid state of contract');
        if (!moment(contract.expire_at).isAfter(moment()))
            return new common_1.BadRequestException('Contract is expired');
        const savedList = await this.savedListRepository.getByUserId(user.id);
        const isContractSaved = await this.savedContractsRepository.isContractSaved(user.id, savedList.id, contract.id);
        if (isContractSaved)
            return new common_1.BadRequestException('Contract already added to saved list');
        await this.savedContractsRepository.create(user.id, savedList.id, contract.id);
        const action = await this.pipedriveActionRepository.getOne({
            user: user.id
        });
        await this.pipedriveService.createDeal({
            title: `${user.first_name} ${user.last_name} save the contract`,
            value: 0,
            currency: 'USD',
            stage_id: 33,
            person_id: action.person
        });
        return (0, response_1.getResponse)(true, 'Contract saved');
    }
    async deleteContract(id, user) {
        const contract = await this.contractsRepository.getOne(id);
        if (!contract)
            return new common_1.BadRequestException('Invalid contract');
        if (contract.deleted)
            return new common_1.BadRequestException('Contract has invalid state state');
        if (contract.status !== enum_1.ContractsStatusTypeEnum.published)
            return new common_1.BadRequestException('Invalid state of contract');
        if (!moment(contract.expire_at).isAfter(moment()))
            return new common_1.BadRequestException('Contract is expired');
        const savedList = await this.savedListRepository.getByUserId(user.id);
        const isContractSaved = await this.savedContractsRepository.isContractSaved(user.id, savedList.id, contract.id);
        if (!isContractSaved)
            return new common_1.BadRequestException('Contract dont saved');
        await this.savedContractsRepository.remove(user.id, savedList.id, contract.id);
        return (0, response_1.getResponse)(true, 'Contract deleted from saved list');
    }
    async getList(data, user) {
        const savedList = await this.savedListRepository.getByUserId(user.id);
        const savedContracts = await this.savedContractsRepository.getSavedContracts(savedList.id);
        const unlockedList = await this.payedContractsRepository.getUsersPayedContracts(user.id);
        const list = await this.savedContractsRepository.getPaginationResponse(data, savedList.id, unlockedList.map(item => item.contract));
        return (0, response_1.getResponse)(true, 'data', list);
    }
};
exports.SavedListService = SavedListService;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", saved_lists_repository_1.SavedListsRepository)
], SavedListService.prototype, "savedListRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", saved_contracts_repository_1.SavedContractsRepository)
], SavedListService.prototype, "savedContractsRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", contract_repository_1.ContractRepository)
], SavedListService.prototype, "contractsRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", payed_contracts_repository_1.PayedContractsRepository)
], SavedListService.prototype, "payedContractsRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", pipedrive_service_1.PipedriveService)
], SavedListService.prototype, "pipedriveService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", pipedrive_actions_repository_1.PipedriveActionsRepository)
], SavedListService.prototype, "pipedriveActionRepository", void 0);
exports.SavedListService = SavedListService = __decorate([
    (0, common_1.Injectable)()
], SavedListService);
//# sourceMappingURL=service.js.map