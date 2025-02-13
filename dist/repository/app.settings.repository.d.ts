import { AppSettings } from "src/models/app.settings.model";
export declare class AppSettingsRepository {
    private get model();
    update(body: object): Promise<number | AppSettings>;
    getOne(): Promise<AppSettings>;
    getSingleCreditPrice(): Promise<number>;
}
