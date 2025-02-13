import { Controller, Get, Inject, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiQuery, ApiBody } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { validationExeptionFactory } from "src/utils/exeption.factory";
import { PaymentInfoService } from "./service";
import { IRequest } from "src/types/request";
import { SuccessTransactionDto } from "src/appDto/cb.dto";

@Controller('payment_infos')
@ApiTags('Payment_infos')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: validationExeptionFactory }))
export class PaymentsInfosController {
  
  @Inject()
  private service: PaymentInfoService;
  
  @Get('')
  public async getPaymentInfos() {
    return this.service.getAll();
  }

  @Get('single_credit_price')
  public async getSingleCreditPrice() {
    return this.service.getSingleCreditPrice();
  }

  @Post('payment-success')
  @ApiBody({ type: SuccessTransactionDto })
  public async paymentSuccessCb(@Req() req: IRequest) {
    return this.service.successTransaction(req.body.transaction, req.user);
  }

  @Post('payment-cancel')
  @ApiBody({ type: SuccessTransactionDto })
  public async paymentCancelCb(@Req() req: IRequest) {
    return this.service.paymentCancelCb(req.body.transaction, req.user);
  }
  
}
