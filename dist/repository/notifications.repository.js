"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsRepository = void 0;
const common_1 = require("@nestjs/common");
const enum_1 = require("../constants/enum");
const notification_model_1 = require("../models/notification.model");
const user_repository_1 = require("./user.repository");
let NotificationsRepository = class NotificationsRepository {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
    }
    get model() {
        return notification_model_1.Notification.query();
    }
    async create(data, user) {
        const ctx = JSON.stringify(data['ctx']);
        return this.model.insert({ ...data, ctx, user });
    }
    async createForAdmin(data) {
        const admin = await this.userRepository.getOne({ type: enum_1.UserTypeEnum.admin });
        const ctx = JSON.stringify(data['ctx']);
        return this.model.insert({ ...data, ctx, user: admin.id });
    }
    async getUserNotifications(user) {
        return this.model.where({ user, deleted: 0 }).orderBy('notifications.created_at', 'desc').select('*');
    }
    async markAsSeen(id, user) {
        return this.model.where({ id, user }).update({ seen: enum_1.NotificationSeenTypeEnum.seen, seen_at: new Date() });
    }
    async getDetails(id, user) {
        return this.model.findOne({ id, user }).select('*');
    }
    async deleteNotification(id, user) {
        return this.model.where({ id, user }).update({ deleted: 1 });
    }
};
exports.NotificationsRepository = NotificationsRepository;
exports.NotificationsRepository = NotificationsRepository = __decorate([
    (0, common_1.Injectable)()
], NotificationsRepository);
//# sourceMappingURL=notifications.repository.js.map