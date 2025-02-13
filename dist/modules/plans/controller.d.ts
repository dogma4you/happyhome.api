import { IRequest } from "src/types/request";
export declare class PlansController {
    private service;
    getPlans(): Promise<import("../../types/response").ResponseModel<import("../../models/plans.model").Plans[]>>;
    create(body: any): Promise<import("../../types/response").ResponseModel<import("../../models/plans.model").Plans>>;
    update(req: IRequest): Promise<import("../../types/response").ResponseModel<unknown>>;
    delete(req: IRequest): Promise<import("../../types/response").ResponseModel<unknown>>;
}
