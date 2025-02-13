import { PipedriveActions } from "src/models/pipedrive.actions.model";
export declare class PipedriveActionsRepository {
    private get model();
    create(data: object): Promise<PipedriveActions>;
    getOne(filter: object): Promise<PipedriveActions>;
    updateOne(id: number, data: object): Promise<number>;
}
