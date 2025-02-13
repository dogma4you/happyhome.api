import { Model } from "objection";
import { UserActivityTypeEnum, UserTypeEnum } from "src/constants/enum";

export class User extends Model {
    public static tableName: string = 'users';

    public id: number;
    public avatar: string;
    public type: UserTypeEnum;
    public activity: UserActivityTypeEnum;
    public first_name: string;
    public last_name: string;
    public email: string;
    public email_verified_at: Date;
    public email_validation: string;
    public password: string;
    public last_password_changed: Date;
    public phone: string;
    public deleted?: boolean;
    public deleted_by_reason?: string;
    public registration_date: Date;
    public created_at: Date;
    public updated_at?: Date;
}