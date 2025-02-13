import { Module } from "@nestjs/common";
import { UserController } from "./controller";
import { UserService } from "./service";
import { HashService } from "src/services/hash.service";
import { UserRepository } from "src/repository/user.repository";
import { UserSettingsRepository } from "src/repository/user_settings";
import { EventsGateway } from "src/events/events.gateway";
import { PipedriveService } from "src/services/pipedrive.service";
import { PipedriveActionsRepository } from "src/repository/pipedrive.actions.repository";

@Module({
    controllers: [UserController],
    providers: [
        UserService,
        HashService,
        UserRepository,
        UserSettingsRepository,
        EventsGateway,
        PipedriveService,
        PipedriveActionsRepository
    ]
})
export class UsersModule {}