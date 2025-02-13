export declare class PipedriveService {
    private axiosInstance;
    constructor();
    getDeals(): Promise<any>;
    getStages(): Promise<any>;
    getDealFields(): Promise<any>;
    createDeal(data: object): Promise<any>;
    updateDeal(dealId: number, updates: object): Promise<any>;
    deleteDeal(dealId: number): Promise<any>;
    createPerson(data: object): Promise<any>;
    updatePerson(id: number, data: object): Promise<any>;
}
