import { GetSavedListDto } from "src/appDto/saved.list.dto";
import { Address } from "src/models/address.model";
import { Contract } from "src/models/contracts.model";
import { SavedContracts } from "src/models/saved.contracts.model";
export declare class SavedContractsRepository {
    private filesRepo;
    private get model();
    create(user: number, saved_list: number, contract: number): Promise<SavedContracts>;
    isContractSaved(user: number, saved_list: number, contract: number): Promise<boolean>;
    remove(user: number, saved_list: number, contract: number): Promise<number>;
    removeAll(contract: number): Promise<number>;
    getSavedContracts(saved_list: number): Promise<SavedContracts[]>;
    private applyRangeFilter;
    getPaginationResponse(filter: GetSavedListDto, saved_list: number, unlocked: number[]): Promise<{
        totalCount: number;
        data: any[];
    }>;
    formatData(data: Contract[] | any): Promise<any[]>;
    changeLocation(address: Address): {
        lat: number;
        lng: number;
        country: string;
        city: string;
        state: string;
        street: string;
    };
    getRandomOffset: (maxMeters: number) => {
        latOffset: number;
        lngOffset: number;
    };
}
