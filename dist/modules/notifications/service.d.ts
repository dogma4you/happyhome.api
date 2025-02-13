import { DeleteNotificationDto, GetNotificationDetailsDto, MarkAsSeenNotificationDto } from "src/appDto/notification.dto";
import { Notification } from "src/models/notification.model";
import { User } from "src/models/user.model";
export declare class NotificationService {
    private userSettingsRepository;
    private notificationsRepository;
    getUserNotifications(user: User): Promise<import("src/types/response").ResponseModel<Notification[]>>;
    deleteNotification(data: DeleteNotificationDto, user: User): Promise<import("src/types/response").ResponseModel<unknown>>;
    markAsSeen(data: MarkAsSeenNotificationDto, user: User): Promise<import("src/types/response").ResponseModel<unknown>>;
    getDetails(data: GetNotificationDetailsDto, user: User): Promise<import("src/types/response").ResponseModel<unknown>>;
}
