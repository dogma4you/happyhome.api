import { Controller, Inject, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags, ApiBody } from "@nestjs/swagger";
import { IRequest } from "src/types/request";
import { validationExeptionFactory } from "src/utils/exeption.factory";
import { SubscriptionService } from "./service";
import { CreateSubscriptionDto } from "src/appDto/subscriptions.dto";

@Controller('subsctiptions')
@ApiTags('Subsctiptions')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: validationExeptionFactory }))
export class SubscriptionsController {
  @Inject()
  private service: SubscriptionService;

  @Post()
  @ApiBody({ type: CreateSubscriptionDto })
  public async create(@Req() req: IRequest) {
    return this.service.create(req.body);
  }
}
