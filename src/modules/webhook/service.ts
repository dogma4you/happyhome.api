import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class WebhookService {
    public processPaymentNotification(notification: any) {
        if (notification.eventType === 'net.authorize.payment.authcapture.created') {
          const transactionId = notification.payload.id;
          const amount = notification.payload.amount;
          const invoiceNumber = notification.payload.order.invoiceNumber;
          
          Logger.log(`Payment received: ${amount} for invoice ${invoiceNumber}, transaction ID: ${transactionId}`);
        }
      }
}