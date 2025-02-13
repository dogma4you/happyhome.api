import { Body, Controller, Get, Inject, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { validationExeptionFactory } from "src/utils/exeption.factory";
import { UserSettingsService } from "./service";
import { IRequest } from "src/types/request";
import { UpdateUserSettingsDto } from "src/appDto/user_settings.dto";

@Controller('settings')
@ApiTags('User settings')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: validationExeptionFactory }))
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard)
export class UserSettingsController {
    @Inject()
    private service: UserSettingsService

    @Get()
    public async getSettings(@Req() req: IRequest) {
        return this.service.getSettings(req.user.id)
    }

    @Put()
    @ApiBody({ type: UpdateUserSettingsDto })
    public async updateUserSettings(@Req() req: IRequest) {
        return this.service.update(req.user, req.body)
    }
}