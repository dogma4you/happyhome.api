import { NotificationSeenTypeEnum } from "src/constants/enum";
export declare class CreateNotificationDto {
    title: string;
    description: string;
    ctx?: object;
}
export declare class GetNotificationsDto {
    seen: NotificationSeenTypeEnum;
}
export declare class GetNotificationDetailsDto {
    id: number;
}
export declare class DeleteNotificationDto {
    id: number;
}
export declare class MarkAsSeenNotificationDto {
    id: number;
}
