import { Body, Controller, Get, Inject, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { validationExeptionFactory } from "src/utils/exeption.factory";
import { UserService } from "./service";
import { IRequest } from "src/types/request";
import { ForgotPasswordDto, UpdatePersonalInfoDto } from "src/appDto/user.dto";
import { PasswordGuard } from "src/guards/password.guard";
import { EventsGateway } from "src/events/events.gateway";

@Controller('user')
@ApiTags('User')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: validationExeptionFactory }))
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard)
export class UserController {
    @Inject()
    private service: UserService

    @Inject()
    private socketService: EventsGateway

    @Get('self')
    public async getSelf(@Req() req: IRequest) {
        return this.service.getSelf(req.user)
    }

    @Put('forgot_password')
    @ApiBody({ type: ForgotPasswordDto })
    @UseGuards(PasswordGuard)
    public async forgotPassword(@Req() req: IRequest, @Body() body: any) {
        return this.service.forgotPassword(body, req.user)
    }

    @Put('personal_info')
    @ApiBody({ type: UpdatePersonalInfoDto })
    public async updateInfo(@Req() req: IRequest, @Body() body: any) {
        return await this.service.updateInfo(req.user || req.guest || req.admin, body)
    }


    @Post('message')
    @ApiExcludeEndpoint()
    public async getMessage(@Req() req: IRequest) {
        return this.socketService.sendNotificationToUser(req.user.id, { notification: true })
    }
}