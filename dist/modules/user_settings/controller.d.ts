import { IRequest } from "src/types/request";
export declare class UserSettingsController {
    private service;
    getSettings(req: IRequest): Promise<import("../../models/user_settings").UserSettings>;
    updateUserSettings(req: IRequest): Promise<import("../../types/response").ResponseModel<unknown>>;
}
