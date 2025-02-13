import { Module } from "@nestjs/common";
import { NotificationController } from "./controller";
import { NotificationService } from "./service";
import { NotificationsRepository } from "src/repository/notifications.repository";
import { UserSettingsRepository } from "src/repository/user_settings";
@Module({
    controllers: [NotificationController],
    providers: [NotificationService, NotificationsRepository, UserSettingsRepository]
})
export class NotificationsModule {}