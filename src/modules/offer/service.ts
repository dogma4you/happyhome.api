import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateOfferDto, CreateOfferFeaturesDto, UpdateOfferBodyDto } from "src/appDto/offer.dto";
import { NotificationCtxTypeEnum, NotificationTypeEnum, UserTypeEnum } from "src/constants/enum";
import { drive_fields_keys } from "src/constants/pipedrive.map";
import { Offer } from "src/models/offer.model";
import { User } from "src/models/user.model";
import { AddressRepository } from "src/repository/address.repository";
import { AreasRepository } from "src/repository/areas.repository";
import { BalanceRepository } from "src/repository/balance.repository";
import { NotificationsRepository } from "src/repository/notifications.repository";
import { OfferFeaturesRepository } from "src/repository/offer.features.repository";
import { OffersRepository } from "src/repository/offers.repository";
import { PayedContractsRepository } from "src/repository/payed_contracts.repository";
import { PipedriveActionsRepository } from "src/repository/pipedrive.actions.repository";
import { PropertyConditionsRepository } from "src/repository/propertyConditions.repository";
import { PipedriveService } from "src/services/pipedrive.service";
import { SocketService } from "src/services/socket.service";
import { getResponse } from "src/types/response";

@Injectable()
export class OfferService {

    @Inject() 
    private addressRepo: AddressRepository
    @Inject() 
    private propertyConditionsRepo: PropertyConditionsRepository
    @Inject() 
    private offerRepository: OffersRepository
    @Inject()
    private payedContractsRepository: PayedContractsRepository;
    @Inject()
    private balanceRepository: BalanceRepository;
    @Inject()
    private areasRepository: AreasRepository;
    @Inject()
    private offerFeaturesRepository: OfferFeaturesRepository;
    @Inject()
    private socketSerivice: SocketService;
    @Inject()
    private notificationRepository: NotificationsRepository;
    @Inject()
    private pipedriveService: PipedriveService;
    @Inject()
    private pipedriveActionsRepository: PipedriveActionsRepository;
    
    public async createOffer(body: CreateOfferDto, user: number) {
        const [address, propertyTypes] = await Promise.all([
            this.addressRepo.create({
                ...body.address
            }, user),
            this.propertyConditionsRepo.create(body.property_condition)
        ])
        let areas = body.areas;
        delete body.areas;
        const offer = await this.offerRepository.create(body, address.id, propertyTypes.id, user)

        if (areas && areas.length) {
            areas.map(async item => this.areasRepository.create({
                ...item,
                offer: offer.id,
                contract: null,
                isOffer: 1
            }))
        }

        return getResponse<Offer>(true, 'Offer created!', offer)
    }

    public async initOffer(user: User) {
        const offer = await this.offerRepository.init(user.id)
        return getResponse(true, 'Offer', offer)
    }

    public async updateOffer(body: UpdateOfferBodyDto, id: number,  user: User) {
        let address = null, propertyCondition = null
        const existOffer = await this.offerRepository.findById(id);

        if (body.propertyType && !existOffer.propertyType) {
           try {
            const existsAction = await this.pipedriveActionsRepository.getOne({
                user: user.id
            })

            const deal = await this.pipedriveService.createDeal({
                "title": `Offer ${existOffer.id}`,
                "value": 0,
                "currency": "USD",
                "stage_id": 15,
                "person_id": existsAction.person
              }
            );
            await this.pipedriveActionsRepository.create({
                user: user.id,
                offer: existOffer.id,
                contract: null,
                deal: deal.data.id,
                person: existsAction.person
            })
           } catch (error) {
                console.log(error);
           }
        }

        if (body.areas) {// delete area from list
            const existAreas = [], newAreas = [], deletedAreas = [];
            const offerAreas = await this.areasRepository.getOfferAreas(existOffer.id);

            offerAreas.forEach(area => {
                if (!body.areas.filter(x => x.id === area.id).length) {
                    deletedAreas.push(area.id);
                }
            })

            if (deletedAreas.length) {
                await this.areasRepository.deleteAreas(deletedAreas);
            }

            body.areas.map(area => {
                if (area.id) existAreas.push(area)
                else newAreas.push(area)
            })


            newAreas.map(item => {
                const changed = {
                    ...item,
                    square_feet: item.square_feet,
                    offer: existOffer.id,
                    contract: null,
                    isOffer: 1
                }
                this.areasRepository.create(changed)
            })

            existAreas.map(area => {
                const id = area.id;
                delete area.id;
                this.areasRepository.update(id, area);
            })
            delete body.areas;
        }

        if (body.address) {
            const existAddress = await this.addressRepo.getOne({ formatted_address: body.address.formatted_address, user: user.id })
            if (existAddress) {
                await this.addressRepo.update(existAddress.id, {
                    ...body.address
                })
                address = existAddress;
            } else {
                address = await this.addressRepo.create(body.address, user.id)
            }
        }

        if (body.property_condition) {
            if (body.property_condition.id) {
                const exitsPropertyCondition = await this.propertyConditionsRepo.getById(body.property_condition.id)
                delete body.property_condition.id
                await this.propertyConditionsRepo.update(exitsPropertyCondition.id, body.property_condition)
                propertyCondition = exitsPropertyCondition        
            } else {
                delete body.property_condition.id;
                propertyCondition = await this.propertyConditionsRepo.create(body.property_condition)
            }
            delete body.property_condition
        }

        if (body.price) {
            const notification = await this.notificationRepository.createForAdmin({
                title: 'Offer',
                description: 'Offered price was set.',
                ctx: {
                    type: NotificationCtxTypeEnum.offer,
                    ref: id
                }
            })
            await this.socketSerivice.sendNotificationToAdmin(notification);
            const action = await this.pipedriveActionsRepository.getOne({
                offer: existOffer.id
            })
            action && await this.pipedriveService.updateDeal(action.deal, {
                stage_id: 19,
                [drive_fields_keys.target_offer_amount]: body.price
            })
        }

        const updatedOffer = await this.offerRepository.update(body, id, user.id, address?.id, propertyCondition?.id)
        return getResponse(true, 'Offer updated', updatedOffer)
    }

    public async getUsersLastOffer(user: User) {
        const offer = await this.offerRepository.getOffer(user.id)
        return getResponse(true, 'Offer', offer)
    }

    public async unlockOffer(user: User, body: { offer: number }) {
        const offer = await this.offerRepository.findById(body.offer);
        const isOfferPayed = await this.payedContractsRepository.getUserPayedOffer(user.id, offer.id);
        if (isOfferPayed) return new BadRequestException('Offer already unlocked');

        const balance = await this.balanceRepository.getBalance(user.id);
        if (balance.credits <= 0) return new BadRequestException('Invalid credit balance')
        
        await Promise.all([
            this.payedContractsRepository.create(user.id, offer.id),
            this.balanceRepository.updateCredits(offer.id, balance.credits - 1)
        ])
        return getResponse(true, 'Offer unlocked', offer);
    }

    public async submit(id: number, user: User) {
        const offer = await this.offerRepository.findById(id);
        if (!offer) return new BadRequestException('Invalid offer!')
        if (offer.user !== user.id) return new BadRequestException('Invalid offer identifier');
        
        const notification = await this.notificationRepository.createForAdmin({
            title: 'Submitted offer',
            description: `${user.first_name} ${user.last_name} submites offer by id ${id}`,
            seen: 0,
            type: NotificationTypeEnum.info,
            ctx: {
                type: NotificationCtxTypeEnum.offer,
                ref: offer.id
            }
        })
        await this.socketSerivice.sendNotificationToAdmin(notification);
        await this.offerRepository.submit(id);

        try {
            const action = await this.pipedriveActionsRepository.getOne({ offer: offer.id });
            await this.pipedriveService.updateDeal(action.deal, {
                stage_id: 26
            })
        } catch (error) {
            console.log(error);
        }

        return getResponse(true, 'Offer submitted');        
    }

    public async getUsersList(userId: number) {;
        const data = await this.offerRepository.getUsersOffers(userId);
        return getResponse(true, 'Offers List', data);
    }

    public async createOfferFeature(id: number, data: CreateOfferFeaturesDto, user: User) {
        if (data.id) {
            let id = data.id
            delete data.id
            await this.offerFeaturesRepository.update(id, data)
        } else {
            await this.offerFeaturesRepository.create({
                offer: id,
                ...data
            })
        }

        return getResponse(true, 'Features was set!')
    }

}