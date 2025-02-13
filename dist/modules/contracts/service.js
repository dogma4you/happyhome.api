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
exports.ContractService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const enum_1 = require("../../constants/enum");
const pipedrive_map_1 = require("../../constants/pipedrive.map");
const balance_repository_1 = require("../../repository/balance.repository");
const contract_repository_1 = require("../../repository/contract.repository");
const notifications_repository_1 = require("../../repository/notifications.repository");
const payed_contracts_repository_1 = require("../../repository/payed_contracts.repository");
const pipedrive_actions_repository_1 = require("../../repository/pipedrive.actions.repository");
const proof_of_founds_repository_1 = require("../../repository/proof_of_founds.repository");
const purchased_contracts_repostiory_1 = require("../../repository/purchased.contracts.repostiory");
const saved_contracts_repository_1 = require("../../repository/saved.contracts.repository");
const saved_lists_repository_1 = require("../../repository/saved_lists.repository");
const pipedrive_service_1 = require("../../services/pipedrive.service");
const socket_service_1 = require("../../services/socket.service");
const response_1 = require("../../types/response");
let ContractService = class ContractService {
    async getList(data, user) {
        const userSavedContracts = await this.savedListRepository.getByUserId(user.id);
        const [savedList, unlockedList] = await Promise.all([
            this.savedContractRepoitory.getSavedContracts(userSavedContracts.id),
            this.payedContractsRepository.getUsersPayedContracts(user.id)
        ]);
        return this.contractRepository.getList(data, user.id, savedList.map(item => item.contract), unlockedList.map(item => item.contract));
    }
    async getListedById(id, user) {
        const isUnlockedContract = await this.payedContractsRepository.isUserPayedContract(user.id, id);
        const userSavedContracts = await this.savedListRepository.getByUserId(user.id);
        const isSavedContract = await this.savedContractRepoitory.isContractSaved(user.id, userSavedContracts.id, id);
        return this.contractRepository.getListedById(id, isSavedContract, isUnlockedContract);
    }
    async getContractsInfos(user) {
        const [unlocked, total, purchased] = await Promise.all([
            this.payedContractsRepository.getPayedContractsCount(user.id),
            this.contractRepository.getTotalCount(),
            this.purchasedContractsRepository.getUserPurchasedContracts(user.id)
        ]);
        const unlocedCount = +unlocked[0]['count'];
        const totalCount = +total[0]['count'];
        const locked = totalCount - unlocedCount > 0 ? totalCount - unlocedCount : 0;
        return (0, response_1.getResponse)(true, 'list', { unlocked: unlocedCount, total: totalCount, locked });
    }
    async getPurchasedList(user) {
        const list = await this.purchasedContractsRepository.getUserPurchasedContracts(user.id);
        const contracts = await this.contractRepository.findByIds(list.map(item => item.contract));
        return (0, response_1.getResponse)(true, 'Purchased list', contracts);
    }
    async purchase(contractId, user) {
        const user_proof_of_founds = await this.proofOfFoundsRepository.getUserProofs(user.id);
        if (!user_proof_of_founds)
            throw new common_1.BadRequestException('Proof of founds does not exist');
        if (!user_proof_of_founds.files.length)
            throw new common_1.BadRequestException('Invalid proof of founds');
        if (user_proof_of_founds.status !== enum_1.ProofOfFoundsStatusEnum.approved) {
            throw new common_1.BadRequestException('Proof of founds does not approved');
        }
        if (!user_proof_of_founds.expire_at ||
            moment(user_proof_of_founds.expire_at).isBefore(moment())) {
            throw new common_1.BadRequestException('Proof of founds are expired');
        }
        const contract = await this.contractRepository.getOne(contractId);
        if (!contract)
            return new common_1.BadRequestException('Invalid contract identifare, contract not found');
        if (contract.status !== enum_1.ContractsStatusTypeEnum.published)
            return new common_1.BadRequestException('Invalid contract');
        if (contract.deleted)
            return new common_1.BadRequestException('Contract has invalid state state');
        const isPayedContract = await this.payedContractsRepository.isUserPayedContract(user.id, contract.id);
        if (!isPayedContract)
            return new common_1.BadRequestException('Contract not unlocked, first you need to unlock the contract');
        if (!contract.expire_at)
            return new common_1.BadRequestException('Contract not signed as available');
        if (!moment(contract.expire_at).isAfter(moment()))
            return new common_1.BadRequestException('Contract not available for purchase, contract is expired');
        const balance = await this.balanceRepository.getBalance(user.id);
        const purchasePrice = contract.buyersFee;
        if (!purchasePrice)
            return new common_1.BadRequestException('Contract is invalid, the deposit price is not set, origin buyers fee');
        if (balance.balance < purchasePrice)
            return (0, response_1.getResponse)(false, 'Insufficient funds, please fill your balance', { isBalanceError: true });
        if (contract.purchasement)
            return new common_1.BadRequestException('Contract already purchased');
        const purchase = await this.purchasedContractsRepository.create(contract.id, user.id, purchasePrice);
        await Promise.all([
            this.contractRepository.purchase(contract.id, purchase.id),
            this.payedContractsRepository.removeAll(contract.id),
            this.savedContractRepoitory.removeAll(contract.id)
        ]);
        try {
            const notification = await this.notificationRepository.createForAdmin({
                title: 'Contract purchase',
                description: `${user.first_name} ${user.last_name} purchase a contract.`,
                ctx: {
                    type: enum_1.NotificationCtxTypeEnum.purchase,
                    ref: contract.id
                }
            });
            await this.socketService.sendNotificationToAdmin(notification);
        }
        catch (error) {
            console.error('purchase', error.message);
        }
        try {
            const action = await this.pipedriveActionsRepository.getOne({
                contract: contract.id
            });
            await this.pipedriveService.updateDeal(action.deal, {
                stage_id: 31,
                [pipedrive_map_1.drive_fields_keys.buyers_name]: `${user.first_name} ${user.last_name}`
            });
        }
        catch (error) {
            console.log(error);
        }
        return (0, response_1.getResponse)(true, 'Contract already purchased');
    }
    async unlock(data, user) {
        const user_proof_of_founds = await this.proofOfFoundsRepository.getUserProofs(user.id);
        if (!user_proof_of_founds)
            throw new common_1.BadRequestException('Proof of founds does not exist');
        if (!user_proof_of_founds.files.length)
            throw new common_1.BadRequestException('Invalid proof of founds');
        if (user_proof_of_founds.status !== enum_1.ProofOfFoundsStatusEnum.approved) {
            throw new common_1.BadRequestException('Proof of founds does not approved');
        }
        if (!user_proof_of_founds.expire_at ||
            moment(user_proof_of_founds.expire_at).isBefore(moment())) {
            throw new common_1.BadRequestException('Proof of founds are expired');
        }
        const contract = await this.contractRepository.getOne(data.contract);
        if (!contract)
            return new common_1.BadRequestException('Invalid contract identifare');
        if (contract.status !== enum_1.ContractsStatusTypeEnum.published)
            return new common_1.BadRequestException('Invalid contract');
        if (contract.deleted)
            return new common_1.BadRequestException('Contract has invalid state state');
        const isPayedContract = await this.payedContractsRepository.isUserPayedContract(user.id, contract.id);
        if (isPayedContract)
            return new common_1.BadRequestException('Contract already unlocked');
        if (!contract.expire_at)
            return new common_1.BadRequestException('Contract not signed as available');
        if (!moment(contract.expire_at).isAfter(moment()))
            return new common_1.BadRequestException('Contract not available');
        const balance = await this.balanceRepository.getBalance(user.id);
        if (balance.credits < 1)
            return new common_1.BadRequestException('Please fill your credit balance');
        await this.payedContractsRepository.create(user.id, contract.id);
        await this.balanceRepository.updateCredits(balance.id, balance.credits - 1);
        try {
            const notification = await this.notificationRepository.createForAdmin({
                title: 'Unlock listings',
                description: `${user.first_name} ${user.last_name} unlocked listing.`,
                ctx: {
                    type: enum_1.NotificationCtxTypeEnum.unlockListings,
                    ref: contract.id
                }
            });
            await this.socketService.sendNotificationToAdmin(notification);
        }
        catch (error) {
            console.error('unlock', error.message);
        }
        return (0, response_1.getResponse)(true, 'Contract unlocked', contract);
    }
};
exports.ContractService = ContractService;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", contract_repository_1.ContractRepository)
], ContractService.prototype, "contractRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", payed_contracts_repository_1.PayedContractsRepository)
], ContractService.prototype, "payedContractsRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", balance_repository_1.BalanceRepository)
], ContractService.prototype, "balanceRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", saved_contracts_repository_1.SavedContractsRepository)
], ContractService.prototype, "savedContractRepoitory", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", saved_lists_repository_1.SavedListsRepository)
], ContractService.prototype, "savedListRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", purchased_contracts_repostiory_1.PurchasedContractsRepository)
], ContractService.prototype, "purchasedContractsRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", notifications_repository_1.NotificationsRepository)
], ContractService.prototype, "notificationRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", socket_service_1.SocketService)
], ContractService.prototype, "socketService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", proof_of_founds_repository_1.ProofOfFoundsRepository)
], ContractService.prototype, "proofOfFoundsRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", pipedrive_service_1.PipedriveService)
], ContractService.prototype, "pipedriveService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", pipedrive_actions_repository_1.PipedriveActionsRepository)
], ContractService.prototype, "pipedriveActionsRepository", void 0);
exports.ContractService = ContractService = __decorate([
    (0, common_1.Injectable)()
], ContractService);
//# sourceMappingURL=service.js.map