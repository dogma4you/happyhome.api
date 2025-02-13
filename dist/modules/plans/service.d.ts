import { CreatePlanDto, UpdatePlanDto } from "src/appDto/plans.dto";
export declare class PlansService {
    private repository;
    runSeed(): Promise<import("../../models/plans.model").Plans[]>;
    getPlans(): Promise<import("src/types/response").ResponseModel<import("../../models/plans.model").Plans[]>>;
    create(data: CreatePlanDto): Promise<import("src/types/response").ResponseModel<import("../../models/plans.model").Plans>>;
    update(id: number, data: UpdatePlanDto): Promise<import("src/types/response").ResponseModel<unknown>>;
    delete(id: number): Promise<import("src/types/response").ResponseModel<unknown>>;
}
