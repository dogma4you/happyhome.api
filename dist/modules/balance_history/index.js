"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const service_1 = require("./service");
const balance_history_repository_1 = require("../../repository/balance_history.repository");
let BalanceHistoryModule = class BalanceHistoryModule {
};
exports.BalanceHistoryModule = BalanceHistoryModule;
exports.BalanceHistoryModule = BalanceHistoryModule = __decorate([
    (0, common_1.Module)({
        controllers: [controller_1.BalanceHistoryController],
        providers: [service_1.BalanceHistoryService, balance_history_repository_1.BalanceHistoryRepository]
    })
], BalanceHistoryModule);
//# sourceMappingURL=index.js.map