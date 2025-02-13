import { Body, Controller, Headers, Inject, Post } from "@nestjs/common";
import { ApiExcludeController } from "@nestjs/swagger";
import { WebhookService } from "./service";

@Controller('webhook')
@ApiExcludeController()
export class WebhookController {
    @Inject()
    private service: WebhookService

    @Post('payment')
    public paymentWebhook(@Body() body: any, @Headers('x-anet-signature') signature: string) {
        return this.service.processPaymentNotification(body);
    }
}