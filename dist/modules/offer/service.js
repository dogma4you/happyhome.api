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
exports.OfferService = void 0;
const common_1 = require("@nestjs/common");
const enum_1 = require("../../constants/enum");
const pipedrive_map_1 = require("../../constants/pipedrive.map");
const address_repository_1 = require("../../repository/address.repository");
const areas_repository_1 = require("../../repository/areas.repository");
const balance_repository_1 = require("../../repository/balance.repository");
const notifications_repository_1 = require("../../repository/notifications.repository");
const offer_features_repository_1 = require("../../repository/offer.features.repository");
const offers_repository_1 = require("../../repository/offers.repository");
const payed_contracts_repository_1 = require("../../repository/payed_contracts.repository");
const pipedrive_actions_repository_1 = require("../../repository/pipedrive.actions.repository");
const propertyConditions_repository_1 = require("../../repository/propertyConditions.repository");
const pipedrive_service_1 = require("../../services/pipedrive.service");
const socket_service_1 = require("../../services/socket.service");
const response_1 = require("../../types/response");
let OfferService = class OfferService {
    async createOffer(body, user) {
        const [address, propertyTypes] = await Promise.all([
            this.addressRepo.create({
                ...body.address
            }, user),
            this.propertyConditionsRepo.create(body.property_condition)
        ]);
        let areas = body.areas;
        delete body.areas;
        const offer = await this.offerRepository.create(body, address.id, propertyTypes.id, user);
        if (areas && areas.length) {
            areas.map(async (item) => this.areasRepository.create({
                ...item,
                offer: offer.id,
                contract: null,
                isOffer: 1
            }));
        }
        return (0, response_1.getResponse)(true, 'Offer created!', offer);
    }
    async initOffer(user) {
        const offer = await this.offerRepository.init(user.id);
        return (0, response_1.getResponse)(true, 'Offer', offer);
    }
    async updateOffer(body, id, user) {
        let address = null, propertyCondition = null;
        const existOffer = await this.offerRepository.findById(id);
        if (body.propertyType && !existOffer.propertyType) {
            try {
                const existsAction = await this.pipedriveActionsRepository.getOne({
                    user: user.id
                });
                const deal = await this.pipedriveService.createDeal({
                    "title": `Offer ${existOffer.id}`,
                    "value": 0,
                    "currency": "USD",
                    "stage_id": 15,
                    "person_id": existsAction.person
                });
                await this.pipedriveActionsRepository.create({
                    user: user.id,
                    offer: existOffer.id,
                    contract: null,
                    deal: deal.data.id,
                    person: existsAction.person
                });
            }
            catch (error) {
                console.log(error);
            }
        }
        if (body.areas) {
            const existAreas = [], newAreas = [], deletedAreas = [];
            const offerAreas = await this.areasRepository.getOfferAreas(existOffer.id);
            offerAreas.forEach(area => {
                if (!body.areas.filter(x => x.id === area.id).length) {
                    deletedAreas.push(area.id);
                }
            });
            if (deletedAreas.length) {
                await this.areasRepository.deleteAreas(deletedAreas);
            }
            body.areas.map(area => {
                if (area.id)
                    existAreas.push(area);
                else
                    newAreas.push(area);
            });
            newAreas.map(item => {
                const changed = {
                    ...item,
                    square_feet: item.square_feet,
                    offer: existOffer.id,
                    contract: null,
                    isOffer: 1
                };
                this.areasRepository.create(changed);
            });
            existAreas.map(area => {
                const id = area.id;
                delete area.id;
                this.areasRepository.update(id, area);
            });
            delete body.areas;
        }
        if (body.address) {
            const existAddress = await this.addressRepo.getOne({ formatted_address: body.address.formatted_address, user: user.id });
            if (existAddress) {
                await this.addressRepo.update(existAddress.id, {
                    ...body.address
                });
                address = existAddress;
            }
            else {
                address = await this.addressRepo.create(body.address, user.id);
            }
        }
        if (body.property_condition) {
            if (body.property_condition.id) {
                const exitsPropertyCondition = await this.propertyConditionsRepo.getById(body.property_condition.id);
                delete body.property_condition.id;
                await this.propertyConditionsRepo.update(exitsPropertyCondition.id, body.property_condition);
                propertyCondition = exitsPropertyCondition;
            }
            else {
                delete body.property_condition.id;
                propertyCondition = await this.propertyConditionsRepo.create(body.property_condition);
            }
            delete body.property_condition;
        }
        if (body.price) {
            const notification = await this.notificationRepository.createForAdmin({
                title: 'Offer',
                description: 'Offered price was set.',
                ctx: {
                    type: enum_1.NotificationCtxTypeEnum.offer,
                    ref: id
                }
            });
            await this.socketSerivice.sendNotificationToAdmin(notification);
            const action = await this.pipedriveActionsRepository.getOne({
                offer: existOffer.id
            });
            action && await this.pipedriveService.updateDeal(action.deal, {
                stage_id: 19,
                [pipedrive_map_1.drive_fields_keys.target_offer_amount]: body.price
            });
        }
        const updatedOffer = await this.offerRepository.update(body, id, user.id, address?.id, propertyCondition?.id);
        return (0, response_1.getResponse)(true, 'Offer updated', updatedOffer);
    }
    async getUsersLastOffer(user) {
        const offer = await this.offerRepository.getOffer(user.id);
        return (0, response_1.getResponse)(true, 'Offer', offer);
    }
    async unlockOffer(user, body) {
        const offer = await this.offerRepository.findById(body.offer);
        const isOfferPayed = await this.payedContractsRepository.getUserPayedOffer(user.id, offer.id);
        if (isOfferPayed)
            return new common_1.BadRequestException('Offer already unlocked');
        const balance = await this.balanceRepository.getBalance(user.id);
        if (balance.credits <= 0)
            return new common_1.BadRequestException('Invalid credit balance');
        await Promise.all([
            this.payedContractsRepository.create(user.id, offer.id),
            this.balanceRepository.updateCredits(offer.id, balance.credits - 1)
        ]);
        return (0, response_1.getResponse)(true, 'Offer unlocked', offer);
    }
    async submit(id, user) {
        const offer = await this.offerRepository.findById(id);
        if (!offer)
            return new common_1.BadRequestException('Invalid offer!');
        if (offer.user !== user.id)
            return new common_1.BadRequestException('Invalid offer identifier');
        const notification = await this.notificationRepository.createForAdmin({
            title: 'Submitted offer',
            description: `${user.first_name} ${user.last_name} submites offer by id ${id}`,
            seen: 0,
            type: enum_1.NotificationTypeEnum.info,
            ctx: {
                type: enum_1.NotificationCtxTypeEnum.offer,
                ref: offer.id
            }
        });
        await this.socketSerivice.sendNotificationToAdmin(notification);
        await this.offerRepository.submit(id);
        try {
            const action = await this.pipedriveActionsRepository.getOne({ offer: offer.id });
            await this.pipedriveService.updateDeal(action.deal, {
                stage_id: 26
            });
        }
        catch (error) {
            console.log(error);
        }
        return (0, response_1.getResponse)(true, 'Offer submitted');
    }
    async getUsersList(userId) {
        ;
        const data = await this.offerRepository.getUsersOffers(userId);
        return (0, response_1.getResponse)(true, 'Offers List', data);
    }
    async createOfferFeature(id, data, user) {
        if (data.id) {
            let id = data.id;
            delete data.id;
            await this.offerFeaturesRepository.update(id, data);
        }
        else {
            await this.offerFeaturesRepository.create({
                offer: id,
                ...data
            });
        }
        return (0, response_1.getResponse)(true, 'Features was set!');
    }
};
exports.OfferService = OfferService;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", address_repository_1.AddressRepository)
], OfferService.prototype, "addressRepo", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", propertyConditions_repository_1.PropertyConditionsRepository)
], OfferService.prototype, "propertyConditionsRepo", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", offers_repository_1.OffersRepository)
], OfferService.prototype, "offerRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", payed_contracts_repository_1.PayedContractsRepository)
], OfferService.prototype, "payedContractsRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", balance_repository_1.BalanceRepository)
], OfferService.prototype, "balanceRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", areas_repository_1.AreasRepository)
], OfferService.prototype, "areasRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", offer_features_repository_1.OfferFeaturesRepository)
], OfferService.prototype, "offerFeaturesRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", socket_service_1.SocketService)
], OfferService.prototype, "socketSerivice", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", notifications_repository_1.NotificationsRepository)
], OfferService.prototype, "notificationRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", pipedrive_service_1.PipedriveService)
], OfferService.prototype, "pipedriveService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", pipedrive_actions_repository_1.PipedriveActionsRepository)
], OfferService.prototype, "pipedriveActionsRepository", void 0);
exports.OfferService = OfferService = __decorate([
    (0, common_1.Injectable)()
], OfferService);
//# sourceMappingURL=service.js.map