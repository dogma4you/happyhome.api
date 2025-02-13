import { Plans } from '../models/plans.model';
export declare class PlansRepository {
    private get model();
    seed(): Promise<Plans[]>;
    getById(id: number): Promise<Plans>;
    getPlans(): Promise<Plans[]>;
    getActivePlans(): Promise<Plans[]>;
    create(data: object): Promise<Plans>;
    update(id: number, data: object): Promise<number>;
    delete(id: number): Promise<number>;
}
