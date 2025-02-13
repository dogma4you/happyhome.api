import { PayedContracts } from "src/models/payed_contracts.model";
export declare class PayedContractsRepository {
    private get model();
    create(user: number, contract: number): Promise<PayedContracts>;
    getUsersPayedContracts(user: number): Promise<PayedContracts[]>;
    getUserPayedOffer(user: number, contract: number): Promise<PayedContracts>;
    isUserPayedContract(user: number, contract: number): Promise<boolean>;
    getPayedContractsCount(user: number): Promise<PayedContracts[]>;
    removeAll(contract: number): Promise<number>;
}
