import { UpdateUserSettingsDto } from "src/appDto/user_settings.dto";
import { UserSettings } from "src/models/user_settings";
export declare class UserSettingsRepository {
    private get model();
    create(user: number): Promise<UserSettings>;
    update(user: number, body: UpdateUserSettingsDto): Promise<number>;
    findByUser(user: number): Promise<UserSettings>;
    delete(user: number): Promise<number>;
}
