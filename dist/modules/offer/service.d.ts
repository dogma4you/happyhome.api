import { BadRequestException } from "@nestjs/common";
import { CreateOfferDto, CreateOfferFeaturesDto, UpdateOfferBodyDto } from "src/appDto/offer.dto";
import { Offer } from "src/models/offer.model";
import { User } from "src/models/user.model";
export declare class OfferService {
    private addressRepo;
    private propertyConditionsRepo;
    private offerRepository;
    private payedContractsRepository;
    private balanceRepository;
    private areasRepository;
    private offerFeaturesRepository;
    private socketSerivice;
    private notificationRepository;
    private pipedriveService;
    private pipedriveActionsRepository;
    createOffer(body: CreateOfferDto, user: number): Promise<import("src/types/response").ResponseModel<Offer>>;
    initOffer(user: User): Promise<import("src/types/response").ResponseModel<Offer>>;
    updateOffer(body: UpdateOfferBodyDto, id: number, user: User): Promise<import("src/types/response").ResponseModel<number>>;
    getUsersLastOffer(user: User): Promise<import("src/types/response").ResponseModel<any>>;
    unlockOffer(user: User, body: {
        offer: number;
    }): Promise<BadRequestException | import("src/types/response").ResponseModel<Offer>>;
    submit(id: number, user: User): Promise<BadRequestException | import("src/types/response").ResponseModel<unknown>>;
    getUsersList(userId: number): Promise<import("src/types/response").ResponseModel<{
        totalCount: number;
        data: Offer[];
    }>>;
    createOfferFeature(id: number, data: CreateOfferFeaturesDto, user: User): Promise<import("src/types/response").ResponseModel<unknown>>;
}
