import { Inject, Injectable } from "@nestjs/common";
import { UpdateUserSettingsDto } from "src/appDto/user_settings.dto";
import { User } from "src/models/user.model";
import { UserSettingsRepository } from "src/repository/user_settings";
import { getResponse } from "src/types/response";

@Injectable()
export class UserSettingsService {

    @Inject()
    private userSettingsRepository: UserSettingsRepository

    public async update(user: User, body: UpdateUserSettingsDto) {
        await this.userSettingsRepository.update(user.id, body)
        return getResponse(true, 'settings updated')
    }

    public async getSettings(user: number) {
        return this.userSettingsRepository.findByUser(user)
    }
}