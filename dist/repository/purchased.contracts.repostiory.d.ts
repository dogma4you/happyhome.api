import { PurchasedContracts } from "src/models/purchased.contracts";
export declare class PurchasedContractsRepository {
    private get model();
    create(contract: number, user: number, price: number): Promise<PurchasedContracts>;
    getUserPurchasedContracts(user: number): Promise<PurchasedContracts[]>;
    isContractPurchasedByClient(contract: number, user: number): Promise<boolean>;
    getAdminList(page: number, limit: number): Promise<{
        totalCount: number;
        data: any;
    }>;
}
