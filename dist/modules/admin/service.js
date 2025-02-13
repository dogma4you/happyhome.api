"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const enum_1 = require("../../constants/enum");
const pipedrive_map_1 = require("../../constants/pipedrive.map");
const contracts_model_1 = require("../../models/contracts.model");
const address_repository_1 = require("../../repository/address.repository");
const app_settings_repository_1 = require("../../repository/app.settings.repository");
const balance_repository_1 = require("../../repository/balance.repository");
const contract_repository_1 = require("../../repository/contract.repository");
const notifications_repository_1 = require("../../repository/notifications.repository");
const offers_repository_1 = require("../../repository/offers.repository");
const payment_info_repository_1 = require("../../repository/payment_info.repository");
const payment_methods_repository_1 = require("../../repository/payment_methods.repository");
const pipedrive_actions_repository_1 = require("../../repository/pipedrive.actions.repository");
const proof_of_founds_repository_1 = require("../../repository/proof_of_founds.repository");
const propertyConditions_repository_1 = require("../../repository/propertyConditions.repository");
const purchased_contracts_repostiory_1 = require("../../repository/purchased.contracts.repostiory");
const subscription_repository_1 = require("../../repository/subscription.repository");
const transactons_repository_1 = require("../../repository/transactons.repository");
const user_repository_1 = require("../../repository/user.repository");
const hash_service_1 = require("../../services/hash.service");
const mailer_service_1 = require("../../services/mailer.service");
const pipedrive_service_1 = require("../../services/pipedrive.service");
const socket_service_1 = require("../../services/socket.service");
const response_1 = require("../../types/response");
const uuid_1 = require("../../utils/uuid");
let AdminService = class AdminService {
    async getUsersList(data) {
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
    async updateUserStatus(id, data) {
        await this.usersRepository.updateUserActivity(id, data.status);
        return (0, response_1.getResponse)(true, 'User status updated');
    }
    async refoundUserBalance(id, data) {
        const userBalance = await this.balanceRepository.getBalance(id);
        if (data.credits <= 0)
            return new common_1.BadRequestException('Invalid credits count');
        if ((userBalance.credits - data.credits) < 0)
            return new common_1.BadRequestException('User credit balance less then' + ` ${data.credits}`);
        const updatedBalance = userBalance.credits - data.credits;
        await this.balanceRepository.updateCredits(userBalance.id, updatedBalance);
        const transactionId = (0, uuid_1.generateTranssactionId)();
        const trxData = {
            type: enum_1.TransactionsTypeEnum.refundCreditByAdmin,
            status: enum_1.TransactionsStatusEnum.received,
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
        }
        catch (error) {
            console.error(error.message);
        }
        return (0, response_1.getResponse)(true, 'Clients credit balance updated');
    }
    async userBalanceFill(id, data) {
        const userBalance = await this.balanceRepository.getBalance(id);
        const updatedBalance = !userBalance.credits || isNaN(userBalance.credits) ? userBalance.credits = Number(data.credits) : userBalance.credits + Number(data.credits);
        await this.balanceRepository.updateCredits(userBalance.id, updatedBalance);
        const transactionId = (0, uuid_1.generateTranssactionId)();
        const trxData = {
            type: enum_1.TransactionsTypeEnum.creditFillByAdmin,
            status: enum_1.TransactionsStatusEnum.received,
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
        }
        catch (error) {
            console.error(error.message);
        }
        return (0, response_1.getResponse)(true, 'Clients credit balance updated');
    }
    async userProofs(user, data) {
        const proofs = await this.proofRepository.getUserProofs(user);
        let ctx = {};
        if (data.expire_at)
            ctx['expire_at'] = data.expire_at;
        if (data.status)
            ctx['status'] = data.status;
        else
            ctx['status'] = enum_1.ProofOfFoundsStatusEnum.pending;
        if (data.files)
            ctx['files'] = JSON.stringify(data.files);
        await this.proofRepository.adminUpdate(proofs.id, ctx);
        try {
            if (data.status) {
                const action = await this.pipedriveActionsRepository.getOne({
                    user
                });
                if (data.status === enum_1.ProofOfFoundsStatusEnum.approved) {
                    await this.pipedriveService.updateDeal(action.deal, {
                        title: `Approved proof of founds for user ${user}`,
                        stage_id: 22
                    });
                }
                else {
                    await this.pipedriveService.updateDeal(action.deal, {
                        title: `Rejected proof of founds for user ${user}`,
                        stage_id: 42
                    });
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return (0, response_1.getResponse)(true, 'User proofs updated');
    }
    async getTransactions(data) {
        const result = await this.transactionsRepository.getTransactions(+data.page, +data.limit);
        return (0, response_1.getResponse)(true, 'Transaction list', result);
    }
    async updateTransactionStatus(id, data) {
        const transaction = await this.transactionsRepository.getById(id);
        if (!transaction)
            return new common_1.BadRequestException('Invalid transaction identifare');
        await this.transactionsRepository.updateTransactionStatus(transaction.id, +data.status);
        if (+data.status === enum_1.TransactionsStatusEnum.received) {
            const userBalance = await this.balanceRepository.getBalance(transaction.user);
            const updatedBalance = !userBalance.balance || isNaN(userBalance.balance) ? userBalance.balance = transaction.price : userBalance.balance + transaction.price;
            await this.balanceRepository.updateBalance(userBalance.id, updatedBalance);
            const notification = await this.notificationRepository.create({
                title: 'Payment received',
                description: `Payment received in transaction ${transaction.transactionId}`,
                ctx: {
                    type: enum_1.NotificationCtxTypeEnum.transaction,
                    ref: transaction.id
                }
            }, transaction.user);
            try {
                await this.socketService.sendNotificationToUser(transaction.user, notification);
                this.socketService.emitUser('balances', transaction.user, { balance: updatedBalance });
            }
            catch (error) {
                console.error('updateTransactionStatus', error.message);
            }
        }
        else {
            try {
                const notification = await this.notificationRepository.create({
                    title: 'Payment not received',
                    description: `Payment not received in transaction ${transaction.transactionId}`,
                    ctx: {
                        type: enum_1.NotificationCtxTypeEnum.transaction,
                        ref: transaction.id
                    }
                }, transaction.user);
                await this.socketService.sendNotificationToUser(transaction.user, notification);
            }
            catch (error) {
                console.error('updateTransactionStatus', error.message);
            }
        }
        return (0, response_1.getResponse)(true, 'Transaction status updated');
    }
    async getOffers(data) {
        return this.offersRepository.getAdminOffers(data);
    }
    async getOfferById(id) {
        const offer = await this.offersRepository.getById(id);
        return (0, response_1.getResponse)(true, 'Offer', offer);
    }
    async updateOffer(data, id, admin) {
        const updateId = data.property_condition.id;
        delete data.property_condition.id;
        console.log(updateId, data.property_condition);
        await this.propertyConditionsRepo.update(updateId, data.property_condition);
        return (0, response_1.getResponse)(true, 'Offer updated');
    }
    async approveOffer(id) {
        const offer = await this.offersRepository.findById(id);
        if (!offer)
            throw new common_1.BadRequestException('Invalid offer');
        if (offer.status !== enum_1.OfferStatusEnum.onApproval)
            throw new common_1.BadRequestException('Offer not approved by client');
        if (!offer.price || !offer.price && !offer.estimated_by && !offer.estimated_date
            && ((offer.price >= offer.estimated_lower_price) && (offer.price <= offer.estimated_higher_price)))
            throw new common_1.BadRequestException('Price of current offer is invalid.');
        const body = new contracts_model_1.Contract();
        body.status = enum_1.ContractsStatusTypeEnum.approved,
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
            body.images = JSON.stringify(offer.images);
        body.files = JSON.stringify(offer.files);
        body.offer = offer.id;
        body.price = offer.price;
        const contract = await this.contractRepository.create(body);
        await this.offersRepository.approve(offer.id);
        try {
            const notification = await this.notificationRepository.create({
                title: 'Offer',
                description: 'Your offer is approved',
                ctx: {
                    type: enum_1.NotificationCtxTypeEnum.offer,
                    ref: id
                }
            }, offer.user);
            await this.socketService.sendNotificationToUser(offer.user, notification);
        }
        catch (error) {
            console.error('approveOffer', error.message);
        }
        const action = await this.pipedriveActionsRepository.getOne({
            offer: offer.id
        });
        await this.pipedriveService.updateDeal(action.deal, {
            stage_id: 28,
            [pipedrive_map_1.drive_fields_keys.contract_link]: `https://admin.happyhomeinitiative.com/contract/${contract.id}`,
            [pipedrive_map_1.drive_fields_keys.property_type]: contract.propertyType
        });
        await this.pipedriveActionsRepository.updateOne(action.id, {
            offer: null,
            contract: contract.id
        });
        return (0, response_1.getResponse)(true, 'Contract approved', contract);
    }
    async cancelOffer(id) {
        const offer = await this.offersRepository.getById(id);
        if (!offer)
            throw new common_1.BadRequestException('Invalid offer.');
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
                    type: enum_1.NotificationCtxTypeEnum.offer,
                    ref: id
                }
            }, offer.user);
            await this.socketService.sendNotificationToUser(offer.user, notification);
        }
        catch (error) {
            console.error('cancelOffer', error.message);
        }
        return (0, response_1.getResponse)(true, 'Offer canceled!');
    }
    async sendOfferPriceRange(body, admin) {
        if (body.from > body.to)
            throw new common_1.BadRequestException('Invalid price range, to must be > from');
        const offer = await this.offersRepository.getById(body.id);
        if (!offer)
            throw new common_1.BadRequestException('Invalid offer.');
        if (offer.status !== enum_1.OfferStatusEnum.onApproval)
            throw new common_1.BadRequestException('Offer not submitted from client');
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
                    type: enum_1.NotificationCtxTypeEnum.offer,
                    ref: offer.id
                }
            }, offer.user.id);
            await this.socketService.sendNotificationToUser(offer.user, notification);
        }
        catch (error) {
            console.error('sendOfferPriceRange', error.message);
        }
        const action = await this.pipedriveActionsRepository.getOne({
            offer: offer.id
        });
        await this.pipedriveService.updateDeal(action.deal, {
            stage_id: 18
        });
        return (0, response_1.getResponse)(true, 'Offer sent.');
    }
    async createContract(body, user) {
        const [address, propertyTypes] = await Promise.all([
            this.addressRepo.create({
                ...body.address
            }, user.id),
            this.propertyConditionsRepo.create(body.property_condition)
        ]);
        const contractData = new contracts_model_1.Contract();
        contractData.status = enum_1.ContractsStatusTypeEnum.approved,
            contractData.property_condition = propertyTypes.id,
            contractData.address = address.id,
            contractData.propertyType = body.propertyType,
            contractData.descriptionType = body.descriptionType,
            contractData.builtYear = body.builtYear,
            contractData.heating = body.heating,
            contractData.airConditioning = body.airConditioning,
            contractData.waterSupply = body.waterSupply,
            contractData.sewer = body.sewer,
            contractData.electricPanel = body.electricPanel,
            contractData.exteriorType = JSON.stringify(body.exteriorType),
            contractData.lotSize = body.lotSize,
            contractData.currentHOA = body.currentHOA,
            contractData.images = JSON.stringify(body.images);
        const contract = await this.contractRepository.create(contractData);
        return (0, response_1.getResponse)(true, 'Contract created', contract);
    }
    async getContractById(id, user) {
        const contract = await this.contractRepository.getOne(id);
        return (0, response_1.getResponse)(true, 'Contract detail', contract);
    }
    async updateContract(data, id, user) {
        let address = data.address, propertyCondition = data.property_condition;
        if (data.address && !data.address['id']) {
            address = await this.addressRepo.create(data.address, user.id);
        }
        if (data.property_condition) {
            if (!data.property_condition['id']) {
                propertyCondition = await this.propertyConditionsRepo.create(data.property_condition);
            }
            else {
                let updateObj = data.property_condition;
                await this.propertyConditionsRepo.update(data.property_condition.id, updateObj);
            }
        }
        const updatedContract = await this.contractRepository.update(data, id, user.id, address?.id, propertyCondition?.id);
        if (data.status && data.status === enum_1.ContractsStatusTypeEnum.closed) {
            const action = await this.pipedriveActionsRepository.getOne({
                contract: id
            });
            if (action)
                await this.pipedriveService.updateDeal(action.deal, {
                    stage_id: 32
                });
        }
        return (0, response_1.getResponse)(true, 'Contract updated', updatedContract);
    }
    async deleteContract(id) {
        const contract = await this.contractRepository.getById(id);
        if (!contract)
            throw new common_1.BadRequestException('Invalid contract.');
        await this.contractRepository.delete(id);
        return (0, response_1.getResponse)(true, 'Contract deleted');
    }
    async getContracts(data, admin) {
        const list = await this.contractRepository.getAdminList(data, admin.id);
        return (0, response_1.getResponse)(true, 'Contracts list', list);
    }
    async getPurchasedContractList(data) {
        const page = +data.page || 1;
        const limit = +data.limit || 20;
        const formattedData = [];
        const purchased = await this.purchasedContractsRepository.getAdminList(page, limit);
        for (let i = 0; i < purchased.data.length; i++) {
            const item = purchased.data[i];
            const [contract, user] = await Promise.all([
                this.contractRepository.getOne(item.contract),
                this.usersRepository.getById(item.user)
            ]);
            formattedData.push({
                ...item,
                contract,
                user: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                }
            });
        }
        return (0, response_1.getResponse)(true, 'Purchased list', { totalCount: purchased.totalCount, data: formattedData });
    }
    async publishContract(id) {
        const contract = await this.contractRepository.getById(id);
        if (!contract)
            throw new common_1.BadRequestException('Invalid contract.');
        await this.contractRepository.publish(contract.id);
        const action = await this.pipedriveActionsRepository.getOne({
            contract: contract.id
        });
        await this.pipedriveService.updateDeal(action.deal, {
            stage_id: 30,
            [pipedrive_map_1.drive_fields_keys.property_photo]: `https://api.happyhomeinitiative.com/files/${contract.images[0] || ''}`,
            [pipedrive_map_1.drive_fields_keys.bathroom_count]: contract.bathrooms,
            [pipedrive_map_1.drive_fields_keys.bedroom_count]: contract.bedrooms,
            [pipedrive_map_1.drive_fields_keys.contract_listed]: new Date().toString()
        });
        return (0, response_1.getResponse)(true, 'Contract published successful');
    }
    async createEmployee(data, admin) {
        const pass = this.hashService.generate();
        const password = await this.hashService.hash(pass);
        console.log('Employee -- ', pass);
        const employee = await this.usersRepository.createEmployee(data, password);
        await this.mailerService
            .sendMail(employee.email, 'HHI.api', `Hello dear ${employee.first_name} ${employee.last_name}. You are registered as employee.\n
             Use your email and <b>${pass}</b> as password to login to system. Please change your password\n
             in your profile page.`);
        return (0, response_1.getResponse)(true, 'Employee created. Invitation sent to employee email!');
    }
    async getEmployeeList(data) {
        let filter = {};
        if (data.search) {
            filter['search'] = data.search;
        }
        return this.usersRepository.getEmployeeListByPagination(filter, +data.page, +data.limit);
    }
    async updateEmployee(data, id, admin) {
        const employee = await this.usersRepository.getEmployee({ id });
        if (!employee)
            throw new common_1.BadRequestException('Invalid employee');
        let updateBody = {};
        if (data.email)
            updateBody['email'] = data.email;
        if (data.first_name)
            updateBody['first_name'] = data.first_name;
        if (data.last_name)
            updateBody['last_name'] = data.last_name;
        if (data.phone)
            updateBody['phone'] = data.phone;
        if (data.status)
            updateBody['activity'] = data.status;
        await this.usersRepository.updateEmployee(employee.id, updateBody);
        return (0, response_1.getResponse)(true, 'Employee data updated');
    }
    async deleteEmployee(id, admin) {
        const employee = await this.usersRepository.getEmployee({ id });
        if (!employee)
            throw new common_1.BadRequestException('Invalid employee');
        await this.usersRepository.delete(employee.id);
        await this.mailerService.sendMail(employee.email, 'HHI.api', 'Your account in HHI was deleted permanently by admin.');
        return (0, response_1.getResponse)(true, 'Employee deleted');
    }
    async actionEmployee(id, type, admin) {
        const employee = await this.usersRepository.getEmployee({ id });
        if (!employee)
            throw new common_1.BadRequestException('Invalid employee');
        await this.usersRepository.updateUserActivity(employee.id, +type === enum_1.AdminEmployeeActionTypeEnum.block ? enum_1.UserActivityTypeEnum.banned_employee : enum_1.UserActivityTypeEnum.hh_employee);
        await this.mailerService.sendMail(employee.email, 'HHI.api', +type === enum_1.AdminEmployeeActionTypeEnum.block ? 'Your account in HHI was blocked by admin.' : 'Your account in HHI was unblocked by admin.');
        return (0, response_1.getResponse)(true, +type === enum_1.AdminEmployeeActionTypeEnum.block ? 'Employee banned!' : 'Employee unblocked!');
    }
    async getPaymentMethods() {
        const paymentMethods = await this.paymentMethodRepository.getList();
        return (0, response_1.getResponse)(true, 'ok', paymentMethods);
    }
    async updatePayementMethodStatus(id, status) {
        const paymentMethod = await this.paymentMethodRepository.getById(id);
        if (!paymentMethod)
            throw new common_1.BadRequestException('Invalid id');
        await this.paymentMethodRepository.updateStatus(paymentMethod.id, status);
        return (0, response_1.getResponse)(true, 'Status updated');
    }
    async updateAdminProfile(admin, body) {
        let updateBody = {};
        if (body.email)
            updateBody['email'] = body.email;
        if (body.first_name)
            updateBody['first_name'] = body.first_name;
        if (body.last_name)
            updateBody['last_name'] = body.last_name;
        if (body.phone)
            updateBody['phone'] = body.phone;
        if (body.password)
            updateBody['password'] = await this.hashService.hash(body.password);
        await this.usersRepository.updateAdminPersonalInfo(admin.id, updateBody);
        return (0, response_1.getResponse)(true, 'Ok');
    }
    async updateAppSettings(body) {
        let updateBody = {};
        if (body.paymentFee !== undefined)
            updateBody['paymentFee'] = body.paymentFee;
        if (body.contractFee !== undefined)
            updateBody['contractFee'] = body.contractFee;
        if (body.singleCreditPrice !== undefined)
            updateBody['singleCreditPrice'] = body.singleCreditPrice;
        await this.appSettingsRepository.update(updateBody);
        return (0, response_1.getResponse)(true, 'App settings upadted');
    }
    async getAppSettings() {
        const appSettings = await this.appSettingsRepository.getOne();
        return (0, response_1.getResponse)(true, 'App settings', appSettings);
    }
    async createPaymentInfo(data) {
        const paymentInfo = await this.payemntInfoRepository.create(data);
        return (0, response_1.getResponse)(true, 'Payment info created', paymentInfo);
    }
    async updatePaymentInfo(id, data) {
        await this.payemntInfoRepository.update(id, data);
        return (0, response_1.getResponse)(true, 'Payemnt info updated');
    }
    async deletePaymentInfo(id) {
        await this.payemntInfoRepository.delete(id);
        return (0, response_1.getResponse)(true, 'Payment info deleted');
    }
    async getPayemtnInfos() {
        const paymentInfos = await this.payemntInfoRepository.getAll();
        return (0, response_1.getResponse)(true, 'Payment info list', paymentInfos);
    }
    async getSubscriptions(data, type) {
        const list = await this.subscriptionRepository.getAll(data.page, data.limit, type);
        return (0, response_1.getResponse)(true, 'Subscriptions list', list);
    }
};
exports.AdminService = AdminService;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", user_repository_1.UserRepository)
], AdminService.prototype, "usersRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", transactons_repository_1.TransactionsRepository)
], AdminService.prototype, "transactionsRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", offers_repository_1.OffersRepository)
], AdminService.prototype, "offersRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", notifications_repository_1.NotificationsRepository)
], AdminService.prototype, "notificationRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", contract_repository_1.ContractRepository)
], AdminService.prototype, "contractRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", address_repository_1.AddressRepository)
], AdminService.prototype, "addressRepo", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", propertyConditions_repository_1.PropertyConditionsRepository)
], AdminService.prototype, "propertyConditionsRepo", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", mailer_service_1.MailerService)
], AdminService.prototype, "mailerService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", hash_service_1.HashService)
], AdminService.prototype, "hashService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", payment_methods_repository_1.PaymentMethodsRepository)
], AdminService.prototype, "paymentMethodRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", app_settings_repository_1.AppSettingsRepository)
], AdminService.prototype, "appSettingsRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", balance_repository_1.BalanceRepository)
], AdminService.prototype, "balanceRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", proof_of_founds_repository_1.ProofOfFoundsRepository)
], AdminService.prototype, "proofRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", payment_info_repository_1.PaymentInfoRepository)
], AdminService.prototype, "payemntInfoRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", socket_service_1.SocketService)
], AdminService.prototype, "socketService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", purchased_contracts_repostiory_1.PurchasedContractsRepository)
], AdminService.prototype, "purchasedContractsRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", subscription_repository_1.SubscriptionRepository)
], AdminService.prototype, "subscriptionRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", pipedrive_service_1.PipedriveService)
], AdminService.prototype, "pipedriveService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", pipedrive_actions_repository_1.PipedriveActionsRepository)
], AdminService.prototype, "pipedriveActionsRepository", void 0);
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)()
], AdminService);
//# sourceMappingURL=service.js.map