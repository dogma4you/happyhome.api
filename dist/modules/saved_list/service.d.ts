import { BadRequestException } from "@nestjs/common";
import { GetSavedListDto } from "src/appDto/saved.list.dto";
import { User } from "src/models/user.model";
export declare class SavedListService {
    private savedListRepository;
    private savedContractsRepository;
    private contractsRepository;
    private payedContractsRepository;
    private pipedriveService;
    private pipedriveActionRepository;
    saveContract(id: number, user: User): Promise<BadRequestException | import("src/types/response").ResponseModel<unknown>>;
    deleteContract(id: number, user: User): Promise<BadRequestException | import("src/types/response").ResponseModel<unknown>>;
    getList(data: GetSavedListDto, user: User): Promise<import("src/types/response").ResponseModel<{
        totalCount: number;
        data: any[];
    }>>;
}
