"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
let WebhookService = class WebhookService {
    processPaymentNotification(notification) {
        if (notification.eventType === 'net.authorize.payment.authcapture.created') {
            const transactionId = notification.payload.id;
            const amount = notification.payload.amount;
            const invoiceNumber = notification.payload.order.invoiceNumber;
            common_1.Logger.log(`Payment received: ${amount} for invoice ${invoiceNumber}, transaction ID: ${transactionId}`);
        }
    }
};
exports.WebhookService = WebhookService;
exports.WebhookService = WebhookService = __decorate([
    (0, common_1.Injectable)()
], WebhookService);
//# sourceMappingURL=service.js.map