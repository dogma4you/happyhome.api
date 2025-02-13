import { ForgotPasswordDto, UpdatePersonalInfoDto } from "src/appDto/user.dto";
import { UserTypeEnum } from "src/constants/enum";
import { User } from "src/models/user.model";
export declare class UserService {
    private userRepository;
    private userSettingsRepository;
    private hashService;
    private pipedriveService;
    private pipedriveActionsRepository;
    getSelf(user: User): Promise<import("src/types/response").ResponseModel<{
        settings: import("../../models/user_settings").UserSettings;
        id: number;
        avatar: string;
        type: UserTypeEnum;
        activity: import("src/constants/enum").UserActivityTypeEnum;
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
        $modelClass: import("objection").ModelClass<User>;
        QueryBuilderType: import("objection").QueryBuilder<User, User[]>;
    }>>;
    forgotPassword(body: ForgotPasswordDto, user: User): Promise<import("src/types/response").ResponseModel<unknown>>;
    updateInfo(user: User, body: UpdatePersonalInfoDto): Promise<import("src/types/response").ResponseModel<unknown>>;
}
