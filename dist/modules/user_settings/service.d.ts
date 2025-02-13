import { UpdateUserSettingsDto } from "src/appDto/user_settings.dto";
import { User } from "src/models/user.model";
export declare class UserSettingsService {
    private userSettingsRepository;
    update(user: User, body: UpdateUserSettingsDto): Promise<import("src/types/response").ResponseModel<unknown>>;
    getSettings(user: number): Promise<import("../../models/user_settings").UserSettings>;
}
