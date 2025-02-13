import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import * as moment from "moment";
import { GetSavedListDto } from "src/appDto/saved.list.dto";
import { ContractsStatusTypeEnum } from "src/constants/enum";
import { User } from "src/models/user.model";
import { ContractRepository } from "src/repository/contract.repository";
import { PayedContractsRepository } from "src/repository/payed_contracts.repository";
import { PipedriveActionsRepository } from "src/repository/pipedrive.actions.repository";
import { SavedContractsRepository } from "src/repository/saved.contracts.repository";
import { SavedListsRepository } from "src/repository/saved_lists.repository";
import { PipedriveService } from "src/services/pipedrive.service";
import { getResponse } from "src/types/response";

@Injectable()
export class SavedListService {

  @Inject()
  private savedListRepository: SavedListsRepository;

  @Inject()
  private savedContractsRepository: SavedContractsRepository;

  @Inject()
  private contractsRepository: ContractRepository;

  @Inject()
  private payedContractsRepository: PayedContractsRepository;

  @Inject()
  private pipedriveService: PipedriveService;

  @Inject()
  private pipedriveActionRepository: PipedriveActionsRepository;

  public async saveContract(id: number, user: User) {
    const contract = await this.contractsRepository.getOne(id);
    if (!contract) return new BadRequestException('Invalid contract');
    if (contract.deleted) return new BadRequestException('Contract has invalid state state');
    if (contract.status !== ContractsStatusTypeEnum.published) return new BadRequestException('Invalid state of contract');
    if (!moment(contract.expire_at).isAfter(moment())) return new BadRequestException('Contract is expired');

    const savedList = await this.savedListRepository.getByUserId(user.id);

    const isContractSaved = await this.savedContractsRepository.isContractSaved(user.id, savedList.id, contract.id);
    if (isContractSaved) return new BadRequestException('Contract already added to saved list');

    await this.savedContractsRepository.create(user.id, savedList.id, contract.id);

    const action = await this.pipedriveActionRepository.getOne({
      user: user.id
    })

    await this.pipedriveService.createDeal({
      title: `${user.first_name} ${user.last_name} save the contract`,
      value: 0,
      currency: 'USD',
      stage_id: 33,
      person_id: action.person
    })

    return getResponse(true, 'Contract saved');
  }

  public async deleteContract(id: number, user: User) {
    const contract = await this.contractsRepository.getOne(id);
    if (!contract) return new BadRequestException('Invalid contract');
    if (contract.deleted) return new BadRequestException('Contract has invalid state state');
    if (contract.status !== ContractsStatusTypeEnum.published) return new BadRequestException('Invalid state of contract');
    if (!moment(contract.expire_at).isAfter(moment())) return new BadRequestException('Contract is expired');
    const savedList = await this.savedListRepository.getByUserId(user.id);
    const isContractSaved = await this.savedContractsRepository.isContractSaved(user.id, savedList.id, contract.id);
    if (!isContractSaved) return new BadRequestException('Contract dont saved');

    await this.savedContractsRepository.remove(user.id, savedList.id, contract.id);
    return getResponse(true, 'Contract deleted from saved list');
  }

  public async getList(data: GetSavedListDto, user: User) {
    const savedList = await this.savedListRepository.getByUserId(user.id);
    const savedContracts = await this.savedContractsRepository.getSavedContracts(savedList.id);
    const unlockedList = await this.payedContractsRepository.getUsersPayedContracts(user.id);
    const list = await this.savedContractsRepository.getPaginationResponse(data, savedList.id, unlockedList.map(item => item.contract));
    return getResponse(true, 'data', list);
  }

}