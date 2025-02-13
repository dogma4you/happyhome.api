import { Model } from "objection"
import { SettingsModeTypeEnum } from "src/constants/enum"

export class UserSettings extends Model {
    public static tableName: string = 'user_settings'

    public id?: number
    public user: number
    public mode: SettingsModeTypeEnum
    public push_notifications: boolean
    public created_at: Date
    public updated_at?: Date
}