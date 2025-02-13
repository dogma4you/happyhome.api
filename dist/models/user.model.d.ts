import { Model } from "objection";
import { UserActivityTypeEnum, UserTypeEnum } from "src/constants/enum";
export declare class User extends Model {
    static tableName: string;
    id: number;
    avatar: string;
    type: UserTypeEnum;
    activity: UserActivityTypeEnum;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: Date;
    email_validation: string;
    password: string;
    last_password_changed: Date;
    phone: string;
    deleted?: boolean;
    deleted_by_reason?: string;
    registration_date: Date;
    created_at: Date;
    updated_at?: Date;
}
