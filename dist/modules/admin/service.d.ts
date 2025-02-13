import { BadRequestException } from "@nestjs/common";
import { AdminCreatePayemtnInfo, AdminUpdateTransactionsStatusManualDto } from "src/appDto/address.dto";
import { AdminCreateEmployeeDto, AdminGetEmployeeDto, AdminGetOffersDto, AdminGetTransactionsDto, AdminGetUsersDto, AdminSendOfferRangeDto, AdminUpdateEmployeeDto, RefoundUsersCreditsBalanceDto, UpdateAdminUserDto, UpdateAppSettingsDto, UpdateContractByAdminDto, UpdateUserByAdminDto, UpdateUsersCreditbalanceDto } from "src/appDto/admin.dto";
import { GetContractsDto } from "src/appDto/contracts.dto";
import { CreateOfferDto } from "src/appDto/offer.dto";
import { AdminProofOfFoundsDto } from "src/appDto/proof_of_founds.dto";
import { AdminEmployeeActionTypeEnum } from "src/constants/enum";
import { Contract } from "src/models/contracts.model";
import { User } from "src/models/user.model";
export declare class AdminService {
    private usersRepository;
    private transactionsRepository;
    private offersRepository;
    private notificationRepository;
    private contractRepository;
    private addressRepo;
    private propertyConditionsRepo;
    private mailerService;
    private hashService;
    private paymentMethodRepository;
    private appSettingsRepository;
    private balanceRepository;
    private proofRepository;
    private payemntInfoRepository;
    private socketService;
    private purchasedContractsRepository;
    private subscriptionRepository;
    private pipedriveService;
    private pipedriveActionsRepository;
    getUsersList(data: AdminGetUsersDto): Promise<{
        totalCount: any;
        data: User[];
    }>;
    updateUserStatus(id: number, data: UpdateUserByAdminDto): Promise<import("src/types/response").ResponseModel<unknown>>;
    refoundUserBalance(id: number, data: RefoundUsersCreditsBalanceDto): Promise<BadRequestException | import("src/types/response").ResponseModel<unknown>>;
    userBalanceFill(id: number, data: UpdateUsersCreditbalanceDto): Promise<import("src/types/response").ResponseModel<unknown>>;
    userProofs(user: number, data: AdminProofOfFoundsDto): Promise<import("src/types/response").ResponseModel<unknown>>;
    getTransactions(data: AdminGetTransactionsDto): Promise<import("src/types/response").ResponseModel<{
        totalCount: number;
        data: import("../../models/transactions.model").Transactions[];
    }>>;
    updateTransactionStatus(id: number, data: AdminUpdateTransactionsStatusManualDto): Promise<BadRequestException | import("src/types/response").ResponseModel<unknown>>;
    getOffers(data: AdminGetOffersDto): Promise<{
        totalCount: number;
        data: import("../../models/offer.model").Offer[];
    }>;
    getOfferById(id: number): Promise<import("src/types/response").ResponseModel<any>>;
    updateOffer(data: any, id: number, admin: User): Promise<import("src/types/response").ResponseModel<unknown>>;
    approveOffer(id: number): Promise<import("src/types/response").ResponseModel<Contract>>;
    cancelOffer(id: number): Promise<import("src/types/response").ResponseModel<unknown>>;
    sendOfferPriceRange(body: AdminSendOfferRangeDto, admin: User): Promise<import("src/types/response").ResponseModel<unknown>>;
    createContract(body: CreateOfferDto, user: User): Promise<import("src/types/response").ResponseModel<Contract>>;
    getContractById(id: number, user: User): Promise<import("src/types/response").ResponseModel<Contract>>;
    updateContract(data: UpdateContractByAdminDto, id: number, user: User): Promise<import("src/types/response").ResponseModel<number>>;
    deleteContract(id: number): Promise<import("src/types/response").ResponseModel<unknown>>;
    getContracts(data: GetContractsDto, admin: User): Promise<import("src/types/response").ResponseModel<{
        totalCount: number;
        data: Contract[];
    }>>;
    getPurchasedContractList(data: {
        page?: number;
        limit?: number;
    }): Promise<import("src/types/response").ResponseModel<{
        totalCount: number;
        data: any[];
    }>>;
    publishContract(id: number): Promise<import("src/types/response").ResponseModel<unknown>>;
    createEmployee(data: AdminCreateEmployeeDto, admin: User): Promise<import("src/types/response").ResponseModel<unknown>>;
    getEmployeeList(data: AdminGetEmployeeDto): Promise<{
        totalCount: number;
        data: User[];
    }>;
    updateEmployee(data: AdminUpdateEmployeeDto, id: number, admin: User): Promise<import("src/types/response").ResponseModel<unknown>>;
    deleteEmployee(id: number, admin: User): Promise<import("src/types/response").ResponseModel<unknown>>;
    actionEmployee(id: number, type: AdminEmployeeActionTypeEnum, admin: User): Promise<import("src/types/response").ResponseModel<unknown>>;
    getPaymentMethods(): Promise<import("src/types/response").ResponseModel<import("../../models/payment_methods").PaymentMethods[]>>;
    updatePayementMethodStatus(id: number, status: number): Promise<import("src/types/response").ResponseModel<unknown>>;
    updateAdminProfile(admin: User, body: UpdateAdminUserDto): Promise<import("src/types/response").ResponseModel<unknown>>;
    updateAppSettings(body: UpdateAppSettingsDto): Promise<import("src/types/response").ResponseModel<unknown>>;
    getAppSettings(): Promise<import("src/types/response").ResponseModel<import("../../models/app.settings.model").AppSettings>>;
    createPaymentInfo(data: AdminCreatePayemtnInfo): Promise<import("src/types/response").ResponseModel<import("../../models/payment_info.model").PaymentInfo>>;
    updatePaymentInfo(id: number, data: AdminCreatePayemtnInfo): Promise<import("src/types/response").ResponseModel<unknown>>;
    deletePaymentInfo(id: number): Promise<import("src/types/response").ResponseModel<unknown>>;
    getPayemtnInfos(): Promise<import("src/types/response").ResponseModel<import("../../models/payment_info.model").PaymentInfo[]>>;
    getSubscriptions(data: any, type: string): Promise<import("src/types/response").ResponseModel<{
        totalCount: number;
        data: import("../../models/subscriptions.model").Subscriptions[];
    }>>;
}
