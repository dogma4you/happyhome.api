import { IRequest } from "src/types/request";
import { DeleteNotificationDto, GetNotificationDetailsDto, MarkAsSeenNotificationDto } from "src/appDto/notification.dto";
export declare class NotificationController {
    private service;
    getUserNotifications(req: IRequest): Promise<import("../../types/response").ResponseModel<import("../../models/notification.model").Notification[]>>;
    deleteNotification(params: DeleteNotificationDto, req: IRequest): Promise<import("../../types/response").ResponseModel<unknown>>;
    markAsSeen(params: MarkAsSeenNotificationDto, req: IRequest): Promise<import("../../types/response").ResponseModel<unknown>>;
    getDetails(params: GetNotificationDetailsDto, req: IRequest): Promise<import("../../types/response").ResponseModel<unknown>>;
}
