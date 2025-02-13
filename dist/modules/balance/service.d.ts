import { BadRequestException } from "@nestjs/common";
import { FillBalanceDto, FillCreditBalanceDto } from "src/appDto/balance.dto";
import { User } from "src/models/user.model";
export declare class BalanceService {
    private balanceRepository;
    private paymentService;
    private plansRepository;
    private transactionService;
    private notificationRepository;
    private userRepository;
    private appSettingsRepository;
    private socketService;
    private pipedriveService;
    private pipedriveActionsRepository;
    getBalance(user: User): Promise<import("src/types/response").ResponseModel<import("../../models/balance.model").Balances>>;
    fill(user: User, data: FillBalanceDto): Promise<BadRequestException | import("src/types/response").ResponseModel<unknown>>;
    fillCreditBalanceByCount(credits: number, user: User, res: any): Promise<void | BadRequestException>;
    fillCreditBalanceByPlan(planId: number, user: User, res: any): Promise<void | BadRequestException>;
    fillCreditBalance(user: User, data: FillCreditBalanceDto, res: any): Promise<void | BadRequestException>;
}
