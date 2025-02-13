import { IRequest } from "src/types/request";
export declare class PaymentsInfosController {
    private service;
    getPaymentInfos(): Promise<import("../../types/response").ResponseModel<import("../../models/payment_info.model").PaymentInfo[]>>;
    getSingleCreditPrice(): Promise<import("../../types/response").ResponseModel<number>>;
    paymentSuccessCb(req: IRequest): Promise<import("@nestjs/common").BadRequestException | import("../../types/response").ResponseModel<unknown>>;
    paymentCancelCb(req: IRequest): Promise<import("@nestjs/common").BadRequestException | import("../../types/response").ResponseModel<unknown>>;
}
