import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import * as moment from "moment";
import { GetContractsDto, UnlockContractDto } from "src/appDto/contracts.dto";
import { ContractsStatusTypeEnum, NotificationCtxTypeEnum, ProofOfFoundsStatusEnum } from "src/constants/enum";
import { drive_fields_keys } from "src/constants/pipedrive.map";
import { User } from "src/models/user.model";
import { BalanceRepository } from "src/repository/balance.repository";
import { ContractRepository } from "src/repository/contract.repository";
import { NotificationsRepository } from "src/repository/notifications.repository";
import { PayedContractsRepository } from "src/repository/payed_contracts.repository";
import { PipedriveActionsRepository } from "src/repository/pipedrive.actions.repository";
import { ProofOfFoundsRepository } from "src/repository/proof_of_founds.repository";
import { PurchasedContractsRepository } from "src/repository/purchased.contracts.repostiory";
import { SavedContractsRepository } from "src/repository/saved.contracts.repository";
import { SavedListsRepository } from "src/repository/saved_lists.repository";
import { PipedriveService } from "src/services/pipedrive.service";
import { SocketService } from "src/services/socket.service";
import { getResponse } from "src/types/response";

@Injectable()
export class ContractService {
    @Inject()
    private contractRepository: ContractRepository;
    @Inject()
    private payedContractsRepository: PayedContractsRepository;
    @Inject()
    private balanceRepository: BalanceRepository;
    @Inject()
    private savedContractRepoitory: SavedContractsRepository;
    @Inject()
    private savedListRepository: SavedListsRepository;
    @Inject()
    private purchasedContractsRepository: PurchasedContractsRepository;
    @Inject()
    private notificationRepository: NotificationsRepository;
    @Inject()
    private socketService: SocketService;
    @Inject()
    private proofOfFoundsRepository: ProofOfFoundsRepository;
    @Inject()
    private pipedriveService: PipedriveService;
    @Inject()
    private pipedriveActionsRepository: PipedriveActionsRepository;

    public async getList(data: GetContractsDto, user: User) {
        // const user_proof_of_founds = await this.proofOfFoundsRepository.getUserProofs(user.id);
        // if (!user_proof_of_founds) throw new BadRequestException('Proof of founds does not exist');
        // if (!user_proof_of_founds.files.length) throw new BadRequestException('Invalid proof of founds')
        // if (user_proof_of_founds.status !== ProofOfFoundsStatusEnum.approved) {
        //     throw new BadRequestException('Proof of founds does not approved')
        // }
        // if (!user_proof_of_founds.expire_at || 
        //     moment(user_proof_of_founds.expire_at).isBefore(moment())
        // ) {
        //     throw new BadRequestException('Proof of founds are expired')
        // }

        const userSavedContracts = await this.savedListRepository.getByUserId(user.id);
        const [savedList, unlockedList] = await Promise.all([
            this.savedContractRepoitory.getSavedContracts(userSavedContracts.id),
            this.payedContractsRepository.getUsersPayedContracts(user.id)
        ])
        return this.contractRepository.getList(data, user.id, savedList.map(item => item.contract), unlockedList.map(item => item.contract));
    }

    public async getListedById(id: number, user: User) {
        const isUnlockedContract = await this.payedContractsRepository.isUserPayedContract(user.id, id);
        const userSavedContracts = await this.savedListRepository.getByUserId(user.id);
        const isSavedContract = await this.savedContractRepoitory.isContractSaved(user.id, userSavedContracts.id, id);
        return this.contractRepository.getListedById(id, isSavedContract, isUnlockedContract);
    }

    public async getContractsInfos(user: User) {
        const [unlocked, total, purchased] = await Promise.all([
            this.payedContractsRepository.getPayedContractsCount(user.id),
            this.contractRepository.getTotalCount(),
            this.purchasedContractsRepository.getUserPurchasedContracts(user.id)
        ])
        const unlocedCount = +unlocked[0]['count'];
        const totalCount = +total[0]['count'];
        const locked = totalCount - unlocedCount > 0 ? totalCount - unlocedCount : 0;
        return getResponse(true, 'list', { unlocked: unlocedCount, total: totalCount, locked })
    }

    public async getPurchasedList(user: User) {
        const list = await this.purchasedContractsRepository.getUserPurchasedContracts(user.id);
        const contracts = await this.contractRepository.findByIds(list.map(item => item.contract));
        return getResponse(true, 'Purchased list', contracts);
    }

    public async purchase(contractId: number, user: User) {

        const user_proof_of_founds = await this.proofOfFoundsRepository.getUserProofs(user.id);
        if (!user_proof_of_founds) throw new BadRequestException('Proof of founds does not exist');
        if (!user_proof_of_founds.files.length) throw new BadRequestException('Invalid proof of founds')
        if (user_proof_of_founds.status !== ProofOfFoundsStatusEnum.approved) {
            throw new BadRequestException('Proof of founds does not approved')
        }
        if (!user_proof_of_founds.expire_at || 
            moment(user_proof_of_founds.expire_at).isBefore(moment())
        ) {
            throw new BadRequestException('Proof of founds are expired')
        }


        const contract = await this.contractRepository.getOne(contractId);
        if (!contract) return new BadRequestException('Invalid contract identifare, contract not found');

        if (contract.status !== ContractsStatusTypeEnum.published) return new BadRequestException('Invalid contract');
        if (contract.deleted) return new BadRequestException('Contract has invalid state state');

        const isPayedContract = await this.payedContractsRepository.isUserPayedContract(user.id, contract.id);
        if (!isPayedContract) return new BadRequestException('Contract not unlocked, first you need to unlock the contract');

        if (!contract.expire_at) return new BadRequestException('Contract not signed as available');
        if (!moment(contract.expire_at).isAfter(moment())) return new BadRequestException('Contract not available for purchase, contract is expired');

        const balance = await this.balanceRepository.getBalance(user.id);
        
        const purchasePrice = contract.buyersFee;
        if (!purchasePrice) return new BadRequestException('Contract is invalid, the deposit price is not set, origin buyers fee')

        if (balance.balance < purchasePrice) return getResponse(false, 'Insufficient funds, please fill your balance', { isBalanceError: true })
        
        if (contract.purchasement) return new BadRequestException('Contract already purchased');

        const purchase = await this.purchasedContractsRepository.create(contract.id, user.id, purchasePrice);
        await Promise.all([
            this.contractRepository.purchase(contract.id, purchase.id),
            this.payedContractsRepository.removeAll(contract.id),
            this.savedContractRepoitory.removeAll(contract.id)
        ])
        try {
            const notification = await this.notificationRepository.createForAdmin({
                title: 'Contract purchase',
                description: `${user.first_name} ${user.last_name} purchase a contract.`,
                ctx: {
                    type: NotificationCtxTypeEnum.purchase,
                    ref: contract.id
                }
            })
            await this.socketService.sendNotificationToAdmin(notification)
        } catch (error) {
            console.error('purchase', error.message);
        }

        try {
            const action = await this.pipedriveActionsRepository.getOne({
                contract: contract.id
            })
    
            await this.pipedriveService.updateDeal(action.deal, {
                stage_id: 31,
                [drive_fields_keys.buyers_name]: `${user.first_name} ${user.last_name}`
            })
        } catch (error) {
            console.log(error)
        }

        return getResponse(true, 'Contract already purchased');
    } 

    public async unlock(data: UnlockContractDto, user: User) {

        const user_proof_of_founds = await this.proofOfFoundsRepository.getUserProofs(user.id);
        if (!user_proof_of_founds) throw new BadRequestException('Proof of founds does not exist');
        if (!user_proof_of_founds.files.length) throw new BadRequestException('Invalid proof of founds')
        if (user_proof_of_founds.status !== ProofOfFoundsStatusEnum.approved) {
            throw new BadRequestException('Proof of founds does not approved')
        }
        if (!user_proof_of_founds.expire_at || 
            moment(user_proof_of_founds.expire_at).isBefore(moment())
        ) {
            throw new BadRequestException('Proof of founds are expired')
        }

        const contract = await this.contractRepository.getOne(data.contract);
        if (!contract) return new BadRequestException('Invalid contract identifare');

        if (contract.status !== ContractsStatusTypeEnum.published) return new BadRequestException('Invalid contract');
        if (contract.deleted) return new BadRequestException('Contract has invalid state state');

        const isPayedContract = await this.payedContractsRepository.isUserPayedContract(user.id, contract.id);
        if (isPayedContract) return new BadRequestException('Contract already unlocked');
        if (!contract.expire_at) return new BadRequestException('Contract not signed as available');
        if (!moment(contract.expire_at).isAfter(moment())) return new BadRequestException('Contract not available');

        const balance = await this.balanceRepository.getBalance(user.id);
        if (balance.credits < 1) return new BadRequestException('Please fill your credit balance');

        await this.payedContractsRepository.create(user.id, contract.id);
        await this.balanceRepository.updateCredits(balance.id, balance.credits - 1);

        try {
            const notification = await this.notificationRepository.createForAdmin({
                title: 'Unlock listings',
                description: `${user.first_name} ${user.last_name} unlocked listing.`,
                ctx: {
                    type: NotificationCtxTypeEnum.unlockListings,
                    ref: contract.id
                }
            })
            await this.socketService.sendNotificationToAdmin(notification)
        } catch (error) {
            console.error('unlock', error.message)
        }

        return getResponse(true, 'Contract unlocked', contract); 
    }
}