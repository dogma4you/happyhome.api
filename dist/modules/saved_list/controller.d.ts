import { IRequest } from "src/types/request";
export declare class SavedListsController {
    private service;
    saveContract(req: IRequest): Promise<import("@nestjs/common").BadRequestException | import("../../types/response").ResponseModel<unknown>>;
    deleteFromSavedList(req: IRequest): Promise<import("@nestjs/common").BadRequestException | import("../../types/response").ResponseModel<unknown>>;
    getSavedList(req: IRequest): Promise<import("../../types/response").ResponseModel<{
        totalCount: number;
        data: any[];
    }>>;
}
