import { IRequest } from "src/types/request";
import { Response } from "express";
export declare class BalanceController {
    private service;
    getBalance(req: IRequest): Promise<import("../../types/response").ResponseModel<import("../../models/balance.model").Balances>>;
    fillBalance(req: IRequest, body: any): Promise<import("@nestjs/common").BadRequestException | import("../../types/response").ResponseModel<unknown>>;
    fillCreditBalance(req: IRequest, res: Response, body: any): Promise<void | import("@nestjs/common").BadRequestException>;
}
