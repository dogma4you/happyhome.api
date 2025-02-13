import { Injectable, UseFilters } from "@nestjs/common";
import { UpdateUserSettingsDto } from "src/appDto/user_settings.dto";
import { UserSettings } from "src/models/user_settings";
import { SqlExceptionFilter } from "src/utils/database";

@Injectable()
@UseFilters(SqlExceptionFilter)
export class UserSettingsRepository {

    private get model() {
        return UserSettings.query()
    }

    public async create(user: number) {
        return this.model.insert({user}).returning('*')
    }

    public async update(user: number, body: UpdateUserSettingsDto) {
        return this.model.where({ user }).update(body)
    }

    public async findByUser(user: number) {
        const exists = await this.model.findOne({ user })
        if (exists) return exists
        else return this.create(user);
    }

    public async delete(user: number) {
        return this.model.where({ user }).delete()
    }
}
