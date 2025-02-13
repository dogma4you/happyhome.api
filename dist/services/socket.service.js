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
exports.SocketService = void 0;
const common_1 = require("@nestjs/common");
const enum_1 = require("../constants/enum");
const events_gateway_1 = require("../events/events.gateway");
const user_repository_1 = require("../repository/user.repository");
let SocketService = class SocketService {
    async sendNotificationToUser(id, notification) {
        this.eventsGateway.sendNotificationToUser(id, notification);
    }
    async sendNotificationToAdmin(notification) {
        const admin = await this.userRepository.getOne({ type: enum_1.UserTypeEnum.admin });
        this.eventsGateway.sendNotificationToUser(admin.id, notification);
    }
    async emitUser(event, user, data) {
        this.eventsGateway.emitUser(user, event, data);
    }
};
exports.SocketService = SocketService;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", events_gateway_1.EventsGateway)
], SocketService.prototype, "eventsGateway", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", user_repository_1.UserRepository)
], SocketService.prototype, "userRepository", void 0);
exports.SocketService = SocketService = __decorate([
    (0, common_1.Injectable)()
], SocketService);
//# sourceMappingURL=socket.service.js.map