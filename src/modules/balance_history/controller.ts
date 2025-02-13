import { Controller, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { validationExeptionFactory } from "src/utils/exeption.factory";
import { BalanceHistoryService } from "./service";

@Controller('notifications')
@ApiTags('Notifications')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: validationExeptionFactory }))
export class BalanceHistoryController {
    private service: BalanceHistoryService;
}