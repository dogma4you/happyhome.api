import { Controller, Delete, Get, Inject, Param, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { validationExeptionFactory } from "src/utils/exeption.factory";
import { NotificationService } from "./service";
import { IRequest } from "src/types/request";
import { DeleteNotificationDto, GetNotificationDetailsDto, MarkAsSeenNotificationDto } from "src/appDto/notification.dto";

@Controller('notifications')
@ApiTags('Notifications')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: validationExeptionFactory }))
export class NotificationController {
    @Inject()
    private service: NotificationService

    @Get()
    @ApiQuery({ type: String, name: 'seen', required: false })
    public async getUserNotifications(@Req() req: IRequest) {
        return this.service.getUserNotifications(req.user)
    }

    @Delete(':id')
    @ApiParam({ type: String, name: 'id' })
    public async deleteNotification(@Param() params: DeleteNotificationDto, @Req() req: IRequest) {
        return this.service.deleteNotification(params, req.user)
    }

    @Put(':id')
    @ApiParam({ type: String, name: 'id' })
    public async markAsSeen(@Param() params: MarkAsSeenNotificationDto, @Req() req: IRequest) {
        return this.service.markAsSeen(params, req.user)
    }

    @Get(':id')
    @ApiParam({ type: String, name: 'id' })
    public async getDetails(@Param() params: GetNotificationDetailsDto, @Req() req: IRequest) {
        return this.service.getDetails(params, req.user)
    }

}
