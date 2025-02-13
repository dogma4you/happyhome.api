import { Model } from "objection";
import { SettingsModeTypeEnum } from "src/constants/enum";
export declare class UserSettings extends Model {
    static tableName: string;
    id?: number;
    user: number;
    mode: SettingsModeTypeEnum;
    push_notifications: boolean;
    created_at: Date;
    updated_at?: Date;
}
