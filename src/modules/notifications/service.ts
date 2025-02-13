import { Inject, Injectable } from "@nestjs/common";
import { DeleteNotificationDto, GetNotificationDetailsDto, MarkAsSeenNotificationDto } from "src/appDto/notification.dto";
import { Notification } from "src/models/notification.model";
import { User } from "src/models/user.model";
import { NotificationsRepository } from "src/repository/notifications.repository";
import { UserSettingsRepository } from "src/repository/user_settings";
import { getResponse } from "src/types/response";

@Injectable()
export class NotificationService {
 
    @Inject()
    private userSettingsRepository: UserSettingsRepository

    @Inject()
    private notificationsRepository: NotificationsRepository

    public async getUserNotifications(user: User) {
        let list: Notification[] = []
        const settings = await this.userSettingsRepository.findByUser(user.id)
        if (settings.push_notifications) {
            list = await this.notificationsRepository.getUserNotifications(user.id)
        }

        return getResponse(true, 'Notifications list', list)
    }


    public async deleteNotification(data: DeleteNotificationDto, user: User) {
        await this.notificationsRepository.deleteNotification(data.id, user.id)
        return getResponse(true, 'Notification deleted')
    }

    public async markAsSeen(data: MarkAsSeenNotificationDto, user: User) {
        await this.notificationsRepository.markAsSeen(data.id, user.id)
        return getResponse(true, 'Notification seen now')
    }

    public async getDetails(data: GetNotificationDetailsDto, user: User) {
        await this.notificationsRepository.getDetails(data.id, user.id)
        return getResponse(true, 'Notification detail')
    }

}