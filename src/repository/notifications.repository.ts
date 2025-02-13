import { Inject, Injectable } from "@nestjs/common";
import { CreateNotificationDto } from "src/appDto/notification.dto";
import { NotificationSeenTypeEnum, UserTypeEnum } from "src/constants/enum";
import { Notification } from "src/models/notification.model";
import { UserRepository } from "./user.repository";

@Injectable()
export class NotificationsRepository {

    private get model() {
        return Notification.query()
    }

    private userRepository: UserRepository = new UserRepository();

    public async create(data: CreateNotificationDto, user: number) {
        const ctx = <string>JSON.stringify(data['ctx']);
        return this.model.insert({ ...data, ctx, user })
    }

    public async createForAdmin(data: object) {
        const admin = await this.userRepository.getOne({ type: UserTypeEnum.admin });
        const ctx = <string>JSON.stringify(data['ctx']);
        return this.model.insert({ ...data, ctx, user: admin.id });
    }

    public async getUserNotifications(user: number) {
        return this.model.where({ user, deleted: 0 }).orderBy('notifications.created_at', 'desc').select('*')
    } 

    public async markAsSeen(id: number, user: number) {
        return this.model.where({ id, user }).update({ seen: NotificationSeenTypeEnum.seen, seen_at: new Date() })
    }

    public async getDetails(id: number, user: number) {
        return this.model.findOne({ id, user }).select('*')
    }

    public async deleteNotification(id: number, user: number) {
        return this.model.where({ id, user }).update({ deleted: 1 })
    }

}