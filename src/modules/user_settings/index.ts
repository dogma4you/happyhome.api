import { Module } from "@nestjs/common";
import { UserSettingsController } from "./controller";
import { UserSettingsService } from "./service";
import { UserSettingsRepository } from "src/repository/user_settings";

@Module({
    controllers: [UserSettingsController],
    providers: [UserSettingsService, UserSettingsRepository]
})
export class UserSettingsModule {}