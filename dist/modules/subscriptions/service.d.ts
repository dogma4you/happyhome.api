import { BadRequestException } from "@nestjs/common";
import { CreateSubscriptionDto } from "src/appDto/subscriptions.dto";
export declare class SubscriptionService {
    private repository;
    create(data: CreateSubscriptionDto): Promise<BadRequestException | import("src/types/response").ResponseModel<unknown>>;
    getAll(data: {
        page: number;
        limit: number;
    }, subscription_to: string): Promise<{
        totalCount: number;
        data: import("../../models/subscriptions.model").Subscriptions[];
    }>;
}
