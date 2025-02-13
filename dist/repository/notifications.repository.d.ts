import { CreateNotificationDto } from "src/appDto/notification.dto";
import { Notification } from "src/models/notification.model";
export declare class NotificationsRepository {
    private get model();
    private userRepository;
    create(data: CreateNotificationDto, user: number): Promise<Notification>;
    createForAdmin(data: object): Promise<Notification>;
    getUserNotifications(user: number): Promise<Notification[]>;
    markAsSeen(id: number, user: number): Promise<number>;
    getDetails(id: number, user: number): Promise<Notification>;
    deleteNotification(id: number, user: number): Promise<number>;
}
