import { IRequest } from "src/types/request";
export declare class ContractController {
    private service;
    getList(query: any, req: IRequest): Promise<{
        totalCount: number;
        data: any[];
    }>;
    unlock(req: IRequest): Promise<import("@nestjs/common").BadRequestException | import("../../types/response").ResponseModel<import("../../models/contracts.model").Contract>>;
    getListedById(req: IRequest): Promise<any>;
    purchase(req: IRequest): Promise<import("@nestjs/common").BadRequestException | import("../../types/response").ResponseModel<unknown>>;
    getPurchasedList(req: IRequest): Promise<import("../../types/response").ResponseModel<import("../../models/contracts.model").Contract[]>>;
    w: any;
    getContractsInfos(req: IRequest): Promise<import("../../types/response").ResponseModel<{
        unlocked: number;
        total: number;
        locked: number;
    }>>;
}
