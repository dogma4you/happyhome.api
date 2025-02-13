/// <reference types="multer" />
import { AdminApproveOfferDto, AdminCancelOfferDto } from "src/appDto/admin.dto";
import { IRequest } from "src/types/request";
import { CreateOfferDto } from "src/appDto/offer.dto";
import { IDeleteContractParams } from "src/appDto/contracts.dto";
export declare class AdminController {
    private service;
    private uploadService;
    getUsersList(query: any): Promise<{
        totalCount: any;
        data: import("../../models/user.model").User[];
    }>;
    updateOfferStatus(body: any, params: any): Promise<import("../../types/response").ResponseModel<unknown>>;
    userBalanceFill(body: any, params: any): Promise<import("../../types/response").ResponseModel<unknown>>;
    refoundUserBalance(body: any, params: any): Promise<import("@nestjs/common").BadRequestException | import("../../types/response").ResponseModel<unknown>>;
    userProofs(req: IRequest): Promise<import("../../types/response").ResponseModel<unknown>>;
    getTransactionsList(query: any): Promise<import("../../types/response").ResponseModel<{
        totalCount: number;
        data: import("../../models/transactions.model").Transactions[];
    }>>;
    updateTransactionStatus(req: IRequest): Promise<import("@nestjs/common").BadRequestException | import("../../types/response").ResponseModel<unknown>>;
    getOffersList(query: any): Promise<{
        totalCount: number;
        data: import("../../models/offer.model").Offer[];
    }>;
    getOfferById(params: {
        id: number;
    }): Promise<import("../../types/response").ResponseModel<any>>;
    updateOffer(body: any, params: any, req: IRequest): Promise<import("../../types/response").ResponseModel<unknown>>;
    approveOffer(params: AdminApproveOfferDto | any): Promise<import("../../types/response").ResponseModel<import("../../models/contracts.model").Contract>>;
    cancelOffer(params: AdminCancelOfferDto | any): Promise<import("../../types/response").ResponseModel<unknown>>;
    sendOfferPriceRange(body: any, req: IRequest): Promise<import("../../types/response").ResponseModel<unknown>>;
    createContract(body: CreateOfferDto, req: IRequest): Promise<import("../../types/response").ResponseModel<import("../../models/contracts.model").Contract>>;
    updateContract(body: any, req: IRequest): Promise<import("../../types/response").ResponseModel<number>>;
    getContractById(req: IRequest): Promise<import("../../types/response").ResponseModel<import("../../models/contracts.model").Contract>>;
    deleteContract(req: IRequest, params: IDeleteContractParams): Promise<import("../../types/response").ResponseModel<unknown>>;
    getContracts(query: any, req: IRequest): Promise<import("../../types/response").ResponseModel<{
        totalCount: number;
        data: import("../../models/contracts.model").Contract[];
    }>>;
    getPurchasedContractList(req: IRequest): Promise<import("../../types/response").ResponseModel<{
        totalCount: number;
        data: any[];
    }>>;
    publishContract(req: IRequest): Promise<import("../../types/response").ResponseModel<unknown>>;
    uploadFiles(files: Array<Express.Multer.File>, req: IRequest): Promise<import("../../types/response").ResponseModel<string>>;
    createEmployee(body: any, req: IRequest): Promise<import("../../types/response").ResponseModel<unknown>>;
    getEmployeeList(query: any): Promise<{
        totalCount: number;
        data: import("../../models/user.model").User[];
    }>;
    updateEmployee(body: any, params: any, req: IRequest): Promise<import("../../types/response").ResponseModel<unknown>>;
    deleteEmployee(params: any, req: IRequest): Promise<import("../../types/response").ResponseModel<unknown>>;
    blockEmployee(params: any, req: IRequest): Promise<import("../../types/response").ResponseModel<unknown>>;
    getPaymentMethods(): Promise<import("../../types/response").ResponseModel<import("../../models/payment_methods").PaymentMethods[]>>;
    updatePaymentMethod(body: any): Promise<import("../../types/response").ResponseModel<unknown>>;
    updateAdminProfile(req: IRequest): Promise<import("../../types/response").ResponseModel<unknown>>;
    updateAppSettings(req: IRequest): Promise<import("../../types/response").ResponseModel<unknown>>;
    getAppSettings(): Promise<import("../../types/response").ResponseModel<import("../../models/app.settings.model").AppSettings>>;
    createPaymentInfo(req: IRequest): Promise<import("../../types/response").ResponseModel<import("../../models/payment_info.model").PaymentInfo>>;
    updatePaymentInfo(req: IRequest): Promise<import("../../types/response").ResponseModel<unknown>>;
    deletePaymentInfo(req: IRequest): Promise<import("../../types/response").ResponseModel<unknown>>;
    getPaymentInfos(): Promise<import("../../types/response").ResponseModel<import("../../models/payment_info.model").PaymentInfo[]>>;
    getSubscriptions(req: IRequest): Promise<import("../../types/response").ResponseModel<{
        totalCount: number;
        data: import("../../models/subscriptions.model").Subscriptions[];
    }>>;
}
