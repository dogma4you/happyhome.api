import { Injectable } from "@nestjs/common";
import { AppSettings } from "src/models/app.settings.model";

@Injectable()
export class AppSettingsRepository {
    private get model() {
        return AppSettings.query()
    }

    public async update(body: object) {
        const appSettings = await this.model.where({}).first()
        if (!appSettings) return await this.model.insert(body).returning(['*'])
        else return await this.model.where({}).update(body)
    }

    public async getOne() {
        const appSettings = await this.model.where({}).first()
        if (!appSettings) return await this.model.insert({}).returning(['*'])
        return appSettings
    }

    public async getSingleCreditPrice(): Promise<number> {
        const appSettings = await this.model.where({}).first()
        return appSettings ? appSettings.singleCreditPrice : 0;
    }
}