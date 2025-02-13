import { Model } from "objection"
import { NotificationSeenTypeEnum, NotificationTypeEnum } from "src/constants/enum"

export class Notification extends Model {
    public static tableName: string = 'notifications'

    public id?: number
    public user: number
    public type: NotificationTypeEnum
    public title: string
    public description: string
    public seen: NotificationSeenTypeEnum
    public deleted: number
    public seen_at?: Date
    public ctx: string;
    public created_at: Date
    public updated_at: Date
}