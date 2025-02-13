import { Module } from "@nestjs/common";
import { AuthController } from "./controller";
import { AuthService } from "./service";
import { UserRepository } from "src/repository/user.repository";
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "src/services/jwt.service";
import { MailerService } from "src/services/mailer.service";
import { VerifyEmailRepository } from "src/repository/email.verification.repository";
import { HashService } from "src/services/hash.service";
import { UserSettingsRepository } from "src/repository/user_settings";
import { BalanceRepository } from "src/repository/balance.repository";
import { SavedListsRepository } from "src/repository/saved_lists.repository";
import { SocketService } from "src/services/socket.service";
import { NotificationsRepository } from "src/repository/notifications.repository";
import { EventsGateway } from "src/events/events.gateway";
import { PipedriveService } from "src/services/pipedrive.service";
import { PipedriveActionsRepository } from "src/repository/pipedrive.actions.repository";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
        }),
    ],
    controllers: [AuthController],
    providers: [
      AuthService,
      UserRepository,
      JwtStrategy,
      MailerService,
      VerifyEmailRepository,
      HashService,
      UserSettingsRepository,
      BalanceRepository,
      SavedListsRepository,
      SocketService,
      NotificationsRepository,
      EventsGateway,
      PipedriveService,
      PipedriveActionsRepository
    ]
})
export class AuthModule {}