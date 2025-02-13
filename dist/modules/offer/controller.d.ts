import { CreateOfferDto, UnlockOfferBodyDto, UpdateOfferParamsDto } from "src/appDto/offer.dto";
import { IRequest } from "src/types/request";
export declare class OffersController {
    private service;
    createOffer(body: CreateOfferDto, req: IRequest): Promise<import("../../types/response").ResponseModel<import("../../models/offer.model").Offer>>;
    initOffer(req: IRequest): Promise<import("../../types/response").ResponseModel<import("../../models/offer.model").Offer>>;
    updateOffer(params: UpdateOfferParamsDto, body: any, req: IRequest): Promise<import("../../types/response").ResponseModel<number>>;
    getUsersLastOffer(req: IRequest): Promise<import("../../types/response").ResponseModel<any>>;
    unlockOffer(req: IRequest, body: UnlockOfferBodyDto): Promise<import("@nestjs/common").BadRequestException | import("../../types/response").ResponseModel<import("../../models/offer.model").Offer>>;
    submit(req: IRequest, params: any): Promise<import("@nestjs/common").BadRequestException | import("../../types/response").ResponseModel<unknown>>;
    getUsersList(req: IRequest): Promise<import("../../types/response").ResponseModel<{
        totalCount: number;
        data: import("../../models/offer.model").Offer[];
    }>>;
    createOfferFeatures(body: any, params: any, req: IRequest): Promise<import("../../types/response").ResponseModel<unknown>>;
}
