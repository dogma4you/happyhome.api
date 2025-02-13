import { Subscriptions } from "src/models/subscriptions.model";
export declare class SubscriptionRepository {
    private get model();
    create(email: string, subscription_to: string): Promise<Subscriptions>;
    getAll(page: number, limit: number, subscription_to: string): Promise<{
        totalCount: number;
        data: Subscriptions[];
    }>;
    getByEmail(email: string): Promise<Subscriptions[]>;
}
