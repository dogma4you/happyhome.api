"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractsModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const service_1 = require("./service");
const contract_repository_1 = require("../../repository/contract.repository");
const payed_contracts_repository_1 = require("../../repository/payed_contracts.repository");
const balance_repository_1 = require("../../repository/balance.repository");
const saved_contracts_repository_1 = require("../../repository/saved.contracts.repository");
const saved_lists_repository_1 = require("../../repository/saved_lists.repository");
const purchased_contracts_repostiory_1 = require("../../repository/purchased.contracts.repostiory");
const socket_service_1 = require("../../services/socket.service");
const notifications_repository_1 = require("../../repository/notifications.repository");
const events_gateway_1 = require("../../events/events.gateway");
const user_repository_1 = require("../../repository/user.repository");
const proof_of_founds_repository_1 = require("../../repository/proof_of_founds.repository");
const pipedrive_service_1 = require("../../services/pipedrive.service");
const pipedrive_actions_repository_1 = require("../../repository/pipedrive.actions.repository");
let ContractsModule = class ContractsModule {
};
exports.ContractsModule = ContractsModule;
exports.ContractsModule = ContractsModule = __decorate([
    (0, common_1.Module)({
        controllers: [controller_1.ContractController],
        providers: [
            service_1.ContractService,
            payed_contracts_repository_1.PayedContractsRepository,
            contract_repository_1.ContractRepository,
            payed_contracts_repository_1.PayedContractsRepository,
            balance_repository_1.BalanceRepository,
            saved_contracts_repository_1.SavedContractsRepository,
            saved_lists_repository_1.SavedListsRepository,
            purchased_contracts_repostiory_1.PurchasedContractsRepository,
            socket_service_1.SocketService,
            notifications_repository_1.NotificationsRepository,
            events_gateway_1.EventsGateway,
            user_repository_1.UserRepository,
            proof_of_founds_repository_1.ProofOfFoundsRepository,
            pipedrive_service_1.PipedriveService,
            pipedrive_actions_repository_1.PipedriveActionsRepository
        ]
    })
], ContractsModule);
;
//# sourceMappingURL=index.js.map