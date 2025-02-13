import { BadRequestException } from "@nestjs/common";
import { User } from "src/models/user.model";
export declare class PaymentInfoService {
    private paymentInfoRepository;
    private appSettingsRepository;
    private transactionRepository;
    private balanceRepository;
    private plansRepository;
    getAll(): Promise<import("src/types/response").ResponseModel<import("../../models/payment_info.model").PaymentInfo[]>>;
    getSingleCreditPrice(): Promise<import("src/types/response").ResponseModel<number>>;
    successTransaction(transactionId: string, user: User): Promise<BadRequestException | import("src/types/response").ResponseModel<unknown>>;
    paymentCancelCb(transactionId: string, user: User): Promise<BadRequestException | import("src/types/response").ResponseModel<unknown>>;
}
