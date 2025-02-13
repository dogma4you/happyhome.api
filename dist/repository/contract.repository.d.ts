import { GetContractsDto } from "src/appDto/contracts.dto";
import { Contract } from "src/models/contracts.model";
import { UpdateContractByAdminDto } from "src/appDto/admin.dto";
import { Address } from "src/models/address.model";
export declare class ContractRepository {
    private payedContractsRepo;
    private addressRepo;
    private filesRepo;
    private get model();
    create(data: Contract): Promise<Contract>;
    getPayedContracts(user: number): Promise<Contract[]>;
    getContractsV2(filter: GetContractsDto, entityManager: any, saved: number[], unlocked: number[]): Promise<any>;
    getListedById(id: number, saved?: boolean, unlocked?: boolean): Promise<any>;
    getTotalCount(): Promise<Contract[]>;
    findByIds(idList: number[]): Promise<Contract[]>;
    getList(filter: GetContractsDto, userId: number, saved?: number[], unlocked?: number[]): Promise<{
        totalCount: number;
        data: any[];
    }>;
    private applyRangeFilter;
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
    purchase(id: number, purchasement: number): Promise<number>;
    getOne(id: number): Promise<Contract>;
    getAdminList(filter: GetContractsDto, userId: number): Promise<{
        totalCount: number;
        data: Contract[];
    }>;
    update(data: UpdateContractByAdminDto, id: number, user: number, address?: number, propertyCondition?: number): Promise<number>;
    getById(id: number): Promise<Contract>;
    delete(id: number): Promise<number>;
    publish(id: number): Promise<number>;
}
