import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { AdminCreatePayemtnInfo, AdminUpdateTransactionsStatusManualDto } from "src/appDto/address.dto";
import { AdminCreateEmployeeDto, AdminGetEmployeeDto, AdminGetOffersDto, AdminGetTransactionsDto, AdminGetUsersDto, AdminSendOfferRangeDto, AdminUpdateEmployeeDto, RefoundUsersCreditsBalanceDto, UpdateAdminUserDto, UpdateAppSettingsDto, UpdateContractByAdminDto, UpdateUserByAdminDto, UpdateUsersCreditbalanceDto } from "src/appDto/admin.dto";
import { GetContractsDto } from "src/appDto/contracts.dto";
import { CreateOfferDto, UpdateOfferBodyDto } from "src/appDto/offer.dto";
import { AdminProofOfFoundsDto } from "src/appDto/proof_of_founds.dto";
import { AdminEmployeeActionTypeEnum, ContractsStatusTypeEnum, NotificationCtxTypeEnum, OfferStatusEnum, ProofOfFoundsStatusEnum, TransactionsStatusEnum, TransactionsTypeEnum, UserActivityTypeEnum } from "src/constants/enum";
import { drive_fields_keys } from "src/constants/pipedrive.map";
import { Contract } from "src/models/contracts.model";
import { User } from "src/models/user.model";
import { AddressRepository } from "src/repository/address.repository";
import { AppSettingsRepository } from "src/repository/app.settings.repository";
import { BalanceRepository } from "src/repository/balance.repository";
import { ContractRepository } from "src/repository/contract.repository";
import { NotificationsRepository } from "src/repository/notifications.repository";
import { OffersRepository } from "src/repository/offers.repository";
import { PaymentInfoRepository } from "src/repository/payment_info.repository";
import { PaymentMethodsRepository } from "src/repository/payment_methods.repository";
import { PipedriveActionsRepository } from "src/repository/pipedrive.actions.repository";
import { ProofOfFoundsRepository } from "src/repository/proof_of_founds.repository";
import { PropertyConditionsRepository } from "src/repository/propertyConditions.repository";
import { PurchasedContractsRepository } from "src/repository/purchased.contracts.repostiory";
import { SubscriptionRepository } from "src/repository/subscription.repository";
import { TransactionsRepository } from "src/repository/transactons.repository";
import { UserRepository } from "src/repository/user.repository";
import { HashService } from "src/services/hash.service";
import { MailerService } from "src/services/mailer.service";
import { PipedriveService } from "src/services/pipedrive.service";
import { SocketService } from "src/services/socket.service";
import { getResponse } from "src/types/response";
import { generateTranssactionId } from "src/utils/uuid";

@Injectable()
export class AdminService {
    @Inject()
    private usersRepository: UserRepository;
    @Inject() 
    private transactionsRepository: TransactionsRepository;
    @Inject()
    private offersRepository: OffersRepository;
    @Inject()
    private notificationRepository: NotificationsRepository;
    @Inject()
    private contractRepository: ContractRepository;
    @Inject() 
    private addressRepo: AddressRepository;
    @Inject() 
    private propertyConditionsRepo: PropertyConditionsRepository;
    @Inject()
    private mailerService: MailerService;
    @Inject()
    private hashService: HashService;
    @Inject()
    private paymentMethodRepository: PaymentMethodsRepository;
    @Inject()
    private appSettingsRepository: AppSettingsRepository;
    @Inject()
    private balanceRepository: BalanceRepository;
    @Inject()
    private proofRepository: ProofOfFoundsRepository;
    @Inject()
    private payemntInfoRepository: PaymentInfoRepository;
    @Inject()
    private socketService: SocketService;
    @Inject()
    private purchasedContractsRepository: PurchasedContractsRepository;
    @Inject()
    private subscriptionRepository: SubscriptionRepository;
    @Inject()
    private pipedriveService: PipedriveService;
    @Inject()
    private pipedriveActionsRepository: PipedriveActionsRepository;

    public async getUsersList(data: AdminGetUsersDto) {
        let filter = {}, sort = { sortKey: 'created_at', sortValue: 'desc' };
        if (data.search) {
            filter['search'] = data.search;
        }

        if (data.sortKey && data.sortValue) {
            sort['sortKey'] = data.sortKey;
            sort['sortValue'] = data.sortValue;
        }

        return this.usersRepository.getListByPagination(filter, +data.page, +data.limit, sort);
    }

    public async updateUserStatus(id: number, data: UpdateUserByAdminDto) {
        await this.usersRepository.updateUserActivity(id, data.status);
        return getResponse(true, 'User status updated')
    }

    public async refoundUserBalance(id: number, data: RefoundUsersCreditsBalanceDto) {
        const userBalance = await this.balanceRepository.getBalance(id);
        if (data.credits <= 0) return new BadRequestException('Invalid credits count');
        if ((userBalance.credits - data.credits) < 0) return new BadRequestException('User credit balance less then' + ` ${data.credits}`);

        const updatedBalance = userBalance.credits - data.credits;
        await this.balanceRepository.updateCredits(userBalance.id, updatedBalance);

        const transactionId = generateTranssactionId();
        const trxData = {
            type: TransactionsTypeEnum.refundCreditByAdmin,
            status: TransactionsStatusEnum.received,
            user: id,
            credits: data.credits,
            transactionId,
            price: 0
        };
        await this.transactionsRepository.create(trxData);

        try {
            await this.notificationRepository.create({
                title: 'Credit balance updated',
                description: `Credit balance updated in transaction ${transactionId}`
            }, id);
            await this.socketService.emitUser('balances', id, { credit: updatedBalance });
        } catch (error) {
            console.error(error.message);
        }
        return getResponse(true, 'Clients credit balance updated')

    }

    public async userBalanceFill(id: number, data: UpdateUsersCreditbalanceDto) {
        const userBalance = await this.balanceRepository.getBalance(id);
        const updatedBalance = !userBalance.credits || isNaN(userBalance.credits) ? userBalance.credits = Number(data.credits) : userBalance.credits + Number(data.credits);
        await this.balanceRepository.updateCredits(userBalance.id, updatedBalance);
        const transactionId = generateTranssactionId();
        const trxData = {
            type: TransactionsTypeEnum.creditFillByAdmin,
            status: TransactionsStatusEnum.received,
            user: id,
            credits: data.credits,
            transactionId,
            price: 0
        };
        await this.transactionsRepository.create(trxData);
        try {
            await this.notificationRepository.create({
                title: 'Credit balance received',
                description: `Credit balance received in transaction ${transactionId}`
            }, id);
            await this.socketService.emitUser('balances', id, { credit: updatedBalance });
        } catch (error) {
            console.error(error.message);
        }
        return getResponse(true, 'Clients credit balance updated')
    }

    public async userProofs(user: number, data: AdminProofOfFoundsDto) {
        const proofs = await this.proofRepository.getUserProofs(user);
        let ctx = {  }
        if (data.expire_at) ctx['expire_at'] = data.expire_at
        if (data.status) ctx['status'] = data.status
        else ctx['status'] = ProofOfFoundsStatusEnum.pending
        if (data.files) ctx['files'] = JSON.stringify(data.files)
        await this.proofRepository.adminUpdate(proofs.id, ctx)

        try {
            if (data.status) {
                const action = await this.pipedriveActionsRepository.getOne({
                    user
                })
                if (data.status === ProofOfFoundsStatusEnum.approved) {
                    await this.pipedriveService.updateDeal(action.deal, {
                        title: `Approved proof of founds for user ${user}`,
                        stage_id: 22
                    })
                } else {
                    await this.pipedriveService.updateDeal(action.deal, {
                        title: `Rejected proof of founds for user ${user}`,
                        stage_id: 42
                    }) 
                }
            }
        } catch (error) {
            console.log(error);
        }

        return getResponse(true, 'User proofs updated')
    }

    public async getTransactions(data: AdminGetTransactionsDto) {
        const result = await this.transactionsRepository.getTransactions(+data.page, +data.limit);
        return getResponse(true, 'Transaction list', result);
    }

    public async updateTransactionStatus(id: number, data: AdminUpdateTransactionsStatusManualDto) {
        const transaction = await this.transactionsRepository.getById(id);
        if (!transaction) return new BadRequestException('Invalid transaction identifare');
        await this.transactionsRepository.updateTransactionStatus(transaction.id, +data.status);
        if (+data.status === TransactionsStatusEnum.received) {
            const userBalance = await this.balanceRepository.getBalance(transaction.user);
            const updatedBalance = !userBalance.balance || isNaN(userBalance.balance) ? userBalance.balance = transaction.price : userBalance.balance + transaction.price;
            await this.balanceRepository.updateBalance(userBalance.id, updatedBalance);
            const notification = await this.notificationRepository.create({
                title: 'Payment received',
                description: `Payment received in transaction ${transaction.transactionId}`,
                ctx: {
                    type: NotificationCtxTypeEnum.transaction,
                    ref: transaction.id
                }
            }, transaction.user);
            try {
                await this.socketService.sendNotificationToUser(transaction.user, notification);
                this.socketService.emitUser('balances', transaction.user, { balance: updatedBalance })
            } catch (error) {
                console.error('updateTransactionStatus', error.message)
            }
        } else {
            try {
                const notification = await this.notificationRepository.create({
                    title: 'Payment not received',
                    description: `Payment not received in transaction ${transaction.transactionId}`,
                    ctx: {
                        type: NotificationCtxTypeEnum.transaction,
                        ref: transaction.id
                    }
                }, transaction.user);
                await this.socketService.sendNotificationToUser(transaction.user, notification);
            } catch (error) {
                console.error('updateTransactionStatus', error.message)
            }
        }
        return getResponse(true, 'Transaction status updated');
    }

    public async getOffers(data: AdminGetOffersDto) {
        return this.offersRepository.getAdminOffers(data);
    }

    public async getOfferById(id: number) {
        const offer = await this.offersRepository.getById(id);
        return getResponse(true, 'Offer', offer);
    }

    public async updateOffer(data: any, id: number, admin: User) {
        const updateId = data.property_condition.id;
        delete data.property_condition.id;
        console.log(updateId, data.property_condition);
        
        await this.propertyConditionsRepo.update(updateId, data.property_condition);
        return getResponse(true, 'Offer updated');
    }

    public async approveOffer(id: number) {
        const offer = await this.offersRepository.findById(id);
        if (!offer) throw new BadRequestException('Invalid offer');
        if (offer.status !== OfferStatusEnum.onApproval) throw new BadRequestException('Offer not approved by client');
        if (!offer.price || !offer.price && !offer.estimated_by && !offer.estimated_date 
            && ((offer.price >= offer.estimated_lower_price) && (offer.price <= offer.estimated_higher_price)))
                throw new BadRequestException('Price of current offer is invalid.')

        const body = new Contract();
        body.status = ContractsStatusTypeEnum.approved,
        body.address = offer.address,
        body.propertyType = offer.propertyType,
        body.descriptionType = offer.descriptionType,
        body.builtYear = offer.builtYear,
        body.heating = offer.heating,
        body.airConditioning = offer.airConditioning,
        body.waterSupply = offer.waterSupply,
        body.sewer = offer.sewer,
        body.electricPanel = offer.electricPanel,
        body.exteriorType = JSON.stringify(offer.exteriorType),
        body.lotSize = offer.lotSize,
        body.currentHOA = offer.currentHOA,
        body.property_condition = offer.property_condition,
        body.images = JSON.stringify(offer.images)
        body.files = JSON.stringify(offer.files)
        body.offer = offer.id
        body.price = offer.price
        const contract = await this.contractRepository.create(body);
        await this.offersRepository.approve(offer.id);

        try {
            const notification = await this.notificationRepository.create({
                title: 'Offer',
                description: 'Your offer is approved',
                ctx: {
                    type: NotificationCtxTypeEnum.offer,
                    ref: id
                }
            }, offer.user);
            await this.socketService.sendNotificationToUser(offer.user, notification);
        } catch (error) {
            console.error('approveOffer', error.message);
        }

        const action = await this.pipedriveActionsRepository.getOne({
            offer: offer.id
        })

        await this.pipedriveService.updateDeal(action.deal, {
            stage_id: 28,
            [drive_fields_keys.contract_link]: `https://admin.happyhomeinitiative.com/contract/${contract.id}`,
            [drive_fields_keys.property_type]: contract.propertyType
        })

        await this.pipedriveActionsRepository.updateOne(action.id, {
            offer: null,
            contract: contract.id
        })

        return getResponse(true, 'Contract approved', contract);
    }


    public async cancelOffer(id: number) {
        const offer = await this.offersRepository.getById(id);
        if (!offer) throw new BadRequestException('Invalid offer.');
        await this.offersRepository.cancel(offer.id);
        await this.notificationRepository.create({
            title: 'Offer',
            description: 'Your offer canceled'
        }, offer.user);

        try {
            const notification = await this.notificationRepository.create({
                title: 'Offer',
                description: 'Your offer canceled',
                ctx: {
                    type: NotificationCtxTypeEnum.offer,
                    ref: id
                }
            }, offer.user)
            await this.socketService.sendNotificationToUser(offer.user, notification);
        } catch (error) {
            console.error('cancelOffer', error.message);
        }

        return getResponse(true, 'Offer canceled!');
    }

    public async sendOfferPriceRange(body: AdminSendOfferRangeDto, admin: User) {
        if (body.from > body.to) throw new BadRequestException('Invalid price range, to must be > from')
        const offer = await this.offersRepository.getById(body.id);
        if (!offer) throw new BadRequestException('Invalid offer.')
        if (offer.status !== OfferStatusEnum.onApproval) throw new BadRequestException('Offer not submitted from client');

        const pricing = {
            estimated_lower_price: body.from,
            estimated_higher_price: body.to,
            estimated_date: new Date(),
            estimated_by: admin.id
        };

        await this.offersRepository.updatePricing(pricing, offer.id, offer.user.id);

        try {
            const notification = await this.notificationRepository.create({
                title: 'Offer',
                description: 'Offered pricing range.',
                ctx: {
                    type: NotificationCtxTypeEnum.offer,
                    ref: offer.id
                }
            }, offer.user.id);
    
            await this.socketService.sendNotificationToUser(offer.user, notification);
        } catch (error) {
            console.error('sendOfferPriceRange', error.message)
        }

        const action = await this.pipedriveActionsRepository.getOne({
            offer: offer.id
        })

        await this.pipedriveService.updateDeal(action.deal, {
            stage_id: 18
        })
        
        return getResponse(true, 'Offer sent.')
    }

    public async createContract(body: CreateOfferDto, user: User) {
        const [address, propertyTypes] = await Promise.all([
            this.addressRepo.create({
                ...body.address
            }, user.id),
            this.propertyConditionsRepo.create(body.property_condition)
        ])

        const contractData = new Contract();
        contractData.status = ContractsStatusTypeEnum.approved,
        contractData.property_condition = propertyTypes.id,
        contractData.address = address.id,
        contractData.propertyType = body.propertyType,
        contractData.descriptionType = body.descriptionType,
        contractData.builtYear =  body.builtYear,
        // contractData.squareFeet = body.squareFeet,
        // contractData.bedrooms = body.bedrooms,
        // contractData.bathrooms = body.bathrooms,
        contractData.heating = body.heating,
        contractData.airConditioning = body.airConditioning,
        contractData.waterSupply = body.waterSupply,
        contractData.sewer = body.sewer,
        contractData.electricPanel = body.electricPanel,
        contractData.exteriorType = JSON.stringify(body.exteriorType),
        contractData.lotSize = body.lotSize,
        contractData.currentHOA = body.currentHOA,
        contractData.images = JSON.stringify( body.images)

        const contract = await this.contractRepository.create(contractData);
        return getResponse(true, 'Contract created', contract);
    }

    public async getContractById(id: number, user: User) {
        const contract = await this.contractRepository.getOne(id)
        return getResponse(true, 'Contract detail', contract);
    }

    public async updateContract(data: UpdateContractByAdminDto, id: number, user: User) {
        let address: any = data.address, propertyCondition = data.property_condition
        if (data.address && !data.address['id']) {
            address = await this.addressRepo.create(data.address, user.id)
        }

        if (data.property_condition) {
            if (!data.property_condition['id']) {
                propertyCondition = await this.propertyConditionsRepo.create(data.property_condition)
            } else {
                let updateObj = data.property_condition
                await this.propertyConditionsRepo.update(data.property_condition.id, updateObj)
            }
        }

        const updatedContract = await this.contractRepository.update(data, id, user.id, address?.id, propertyCondition?.id)
        if (data.status && data.status === ContractsStatusTypeEnum.closed) {
            const action = await this.pipedriveActionsRepository.getOne({
                contract: id
            })

            if (action) await this.pipedriveService.updateDeal(action.deal, {
                stage_id: 32
            })
        }
        return getResponse(true, 'Contract updated', updatedContract)
    }

    public async deleteContract(id: number) {
        const contract = await this.contractRepository.getById(id);
        if (!contract) throw new BadRequestException('Invalid contract.')
        await this.contractRepository.delete(id);
        return getResponse(true, 'Contract deleted');
    }

    public async getContracts(data: GetContractsDto, admin: User) {
        const list = await this.contractRepository.getAdminList(data, admin.id)
        return getResponse(true, 'Contracts list', list);
    }

    public async getPurchasedContractList(data: { page?: number, limit?: number }) {
        const page = +data.page || 1;
        const limit = +data.limit || 20;
        const formattedData = [];
        const purchased = await this.purchasedContractsRepository.getAdminList(page, limit);
        for (let i = 0; i < purchased.data.length; i++) {
            const item = purchased.data[i];
            const [contract, user] = await Promise.all([
                this.contractRepository.getOne(item.contract),
                this.usersRepository.getById(item.user)
            ])
            formattedData.push({
                ...item,
                contract,
                user: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                }
            })
        }

        return getResponse(true, 'Purchased list', { totalCount: purchased.totalCount, data: formattedData })
    }

    public async publishContract(id: number) {
        // prices and fees must be required
        const contract = await this.contractRepository.getById(id)
        if (!contract) throw new BadRequestException('Invalid contract.')
        await this.contractRepository.publish(contract.id)

        const action = await this.pipedriveActionsRepository.getOne({
            contract: contract.id
        });

        await this.pipedriveService.updateDeal(action.deal, {
            stage_id: 30,
            [drive_fields_keys.property_photo]: `https://api.happyhomeinitiative.com/files/${contract.images[0] || ''}`,
            [drive_fields_keys.bathroom_count]: contract.bathrooms,
            [drive_fields_keys.bedroom_count]: contract.bedrooms,
            [drive_fields_keys.contract_listed]: new Date().toString()
        })

        return getResponse(true, 'Contract published successful')
    }

    public async createEmployee(data: AdminCreateEmployeeDto, admin: User) {
        const pass = this.hashService.generate()
        const password = await this.hashService.hash(pass)
        console.log('Employee -- ', pass);
        const employee = await this.usersRepository.createEmployee(data, password);
        await this.mailerService
        .sendMail(
            employee.email,
            'HHI.api',
            `Hello dear ${employee.first_name} ${employee.last_name}. You are registered as employee.\n
             Use your email and <b>${pass}</b> as password to login to system. Please change your password\n
             in your profile page.`)
        
        return getResponse(true, 'Employee created. Invitation sent to employee email!')
    }

    public async getEmployeeList(data: AdminGetEmployeeDto) {
        let filter = {}
        if (data.search) {
            filter['search'] = data.search;
        }
        return this.usersRepository.getEmployeeListByPagination(filter, +data.page, +data.limit);
    }

    public async updateEmployee(data: AdminUpdateEmployeeDto, id: number, admin: User) {
        const employee = await this.usersRepository.getEmployee({ id })
        if (!employee) throw new BadRequestException('Invalid employee');
        let updateBody = {}
        if (data.email) updateBody['email'] = data.email
        if (data.first_name) updateBody['first_name'] = data.first_name
        if (data.last_name) updateBody['last_name'] = data.last_name
        if (data.phone) updateBody['phone'] = data.phone
        if (data.status) updateBody['activity'] = data.status
        await this.usersRepository.updateEmployee(employee.id, updateBody);
        return getResponse(true, 'Employee data updated')
    }

    public async deleteEmployee(id: number, admin: User) {
        const employee = await this.usersRepository.getEmployee({ id })
        if (!employee) throw new BadRequestException('Invalid employee');
        await this.usersRepository.delete(employee.id);
        await this.mailerService.sendMail(
            employee.email,
            'HHI.api',
            'Your account in HHI was deleted permanently by admin.')
        return getResponse(true, 'Employee deleted')
    }

    public async actionEmployee(id: number, type: AdminEmployeeActionTypeEnum, admin: User) {
        const employee = await this.usersRepository.getEmployee({ id })
        if (!employee) throw new BadRequestException('Invalid employee');
        await this.usersRepository.updateUserActivity(
            employee.id,
            +type === AdminEmployeeActionTypeEnum.block ? UserActivityTypeEnum.banned_employee : UserActivityTypeEnum.hh_employee);
        await this.mailerService.sendMail(
            employee.email,
            'HHI.api',
            +type === AdminEmployeeActionTypeEnum.block ? 'Your account in HHI was blocked by admin.' : 'Your account in HHI was unblocked by admin.')
        return getResponse(
            true,
             +type === AdminEmployeeActionTypeEnum.block  ? 'Employee banned!' : 'Employee unblocked!');
    }

    public async getPaymentMethods() {
        const paymentMethods = await this.paymentMethodRepository.getList();
        return getResponse(true, 'ok', paymentMethods);
    }

    public async updatePayementMethodStatus(id: number, status: number) {
        const paymentMethod = await this.paymentMethodRepository.getById(id)
        if (!paymentMethod) throw new BadRequestException('Invalid id')
        
        await this.paymentMethodRepository.updateStatus(paymentMethod.id, status);
        return getResponse(true, 'Status updated')
    }

    public async updateAdminProfile(admin: User, body: UpdateAdminUserDto) {
        let updateBody = {}
        if (body.email) updateBody['email'] = body.email;
        if (body.first_name) updateBody['first_name'] = body.first_name;
        if (body.last_name) updateBody['last_name'] = body.last_name;
        if (body.phone) updateBody['phone'] = body.phone;
        if (body.password) updateBody['password'] = await this.hashService.hash(body.password);
        await this.usersRepository.updateAdminPersonalInfo(admin.id, updateBody);
        return getResponse(true, 'Ok')
    }

    public async updateAppSettings(body: UpdateAppSettingsDto) {
        let updateBody = {}
        if (body.paymentFee !== undefined) updateBody['paymentFee'] = body.paymentFee
        if (body.contractFee !== undefined) updateBody['contractFee'] = body.contractFee
        if (body.singleCreditPrice !== undefined) updateBody['singleCreditPrice'] = body.singleCreditPrice
        await this.appSettingsRepository.update(updateBody);
        return getResponse(true, 'App settings upadted')
    }

    public async getAppSettings() {
        const appSettings = await this.appSettingsRepository.getOne()
        return getResponse(true, 'App settings', appSettings)
    }

    public async createPaymentInfo(data: AdminCreatePayemtnInfo) {
        const paymentInfo = await this.payemntInfoRepository.create(data);
        return getResponse(true, 'Payment info created', paymentInfo)
    }

    public async updatePaymentInfo(id: number, data: AdminCreatePayemtnInfo) {
        await this.payemntInfoRepository.update(id, data);
        return getResponse(true, 'Payemnt info updated');
    }

    public async deletePaymentInfo(id: number) {
        await this.payemntInfoRepository.delete(id);
        return getResponse(true, 'Payment info deleted');
    }

    public async getPayemtnInfos() {
        const paymentInfos = await this.payemntInfoRepository.getAll();
        return getResponse(true, 'Payment info list', paymentInfos);
    }

    public async getSubscriptions(data: any, type: string) {
        const list = await this.subscriptionRepository.getAll(data.page, data.limit, type);
        return getResponse(true, 'Subscriptions list', list)
    }
}