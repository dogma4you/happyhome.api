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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const notifications_repository_1 = require("../../repository/notifications.repository");
const user_settings_1 = require("../../repository/user_settings");
const response_1 = require("../../types/response");
let NotificationService = class NotificationService {
    async getUserNotifications(user) {
        let list = [];
        const settings = await this.userSettingsRepository.findByUser(user.id);
        if (settings.push_notifications) {
            list = await this.notificationsRepository.getUserNotifications(user.id);
        }
        return (0, response_1.getResponse)(true, 'Notifications list', list);
    }
    async deleteNotification(data, user) {
        await this.notificationsRepository.deleteNotification(data.id, user.id);
        return (0, response_1.getResponse)(true, 'Notification deleted');
    }
    async markAsSeen(data, user) {
        await this.notificationsRepository.markAsSeen(data.id, user.id);
        return (0, response_1.getResponse)(true, 'Notification seen now');
    }
    async getDetails(data, user) {
        await this.notificationsRepository.getDetails(data.id, user.id);
        return (0, response_1.getResponse)(true, 'Notification detail');
    }
};
exports.NotificationService = NotificationService;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", user_settings_1.UserSettingsRepository)
], NotificationService.prototype, "userSettingsRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", notifications_repository_1.NotificationsRepository)
], NotificationService.prototype, "notificationsRepository", void 0);
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)()
], NotificationService);
//# sourceMappingURL=service.js.map