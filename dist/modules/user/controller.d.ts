import { IRequest } from "src/types/request";
export declare class UserController {
    private service;
    private socketService;
    getSelf(req: IRequest): Promise<import("../../types/response").ResponseModel<{
        settings: import("../../models/user_settings").UserSettings;
        id: number;
        avatar: string;
        type: import("../../constants/enum").UserTypeEnum;
        activity: import("../../constants/enum").UserActivityTypeEnum;
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
        $modelClass: import("objection").ModelClass<import("../../models/user.model").User>;
        QueryBuilderType: import("objection").QueryBuilder<import("../../models/user.model").User, import("../../models/user.model").User[]>;
    }>>;
    forgotPassword(req: IRequest, body: any): Promise<import("../../types/response").ResponseModel<unknown>>;
    updateInfo(req: IRequest, body: any): Promise<import("../../types/response").ResponseModel<unknown>>;
    getMessage(req: IRequest): Promise<void>;
}
