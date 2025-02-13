import { BadRequestException } from "@nestjs/common";
import { GetContractsDto, UnlockContractDto } from "src/appDto/contracts.dto";
import { User } from "src/models/user.model";
export declare class ContractService {
    private contractRepository;
    private payedContractsRepository;
    private balanceRepository;
    private savedContractRepoitory;
    private savedListRepository;
    private purchasedContractsRepository;
    private notificationRepository;
    private socketService;
    private proofOfFoundsRepository;
    private pipedriveService;
    private pipedriveActionsRepository;
    getList(data: GetContractsDto, user: User): Promise<{
        totalCount: number;
        data: any[];
    }>;
    getListedById(id: number, user: User): Promise<any>;
    getContractsInfos(user: User): Promise<import("src/types/response").ResponseModel<{
        unlocked: number;
        total: number;
        locked: number;
    }>>;
    getPurchasedList(user: User): Promise<import("src/types/response").ResponseModel<import("../../models/contracts.model").Contract[]>>;
    purchase(contractId: number, user: User): Promise<BadRequestException | import("src/types/response").ResponseModel<unknown>>;
    unlock(data: UnlockContractDto, user: User): Promise<BadRequestException | import("src/types/response").ResponseModel<import("../../models/contracts.model").Contract>>;
}
