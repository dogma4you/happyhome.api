import { IRequest } from "src/types/request";
export declare class SubscriptionsController {
    private service;
    create(req: IRequest): Promise<import("@nestjs/common").BadRequestException | import("../../types/response").ResponseModel<unknown>>;
}
