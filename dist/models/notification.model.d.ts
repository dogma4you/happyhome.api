import { Model } from "objection";
import { NotificationSeenTypeEnum, NotificationTypeEnum } from "src/constants/enum";
export declare class Notification extends Model {
    static tableName: string;
    id?: number;
    user: number;
    type: NotificationTypeEnum;
    title: string;
    description: string;
    seen: NotificationSeenTypeEnum;
    deleted: number;
    seen_at?: Date;
    ctx: string;
    created_at: Date;
    updated_at: Date;
}
