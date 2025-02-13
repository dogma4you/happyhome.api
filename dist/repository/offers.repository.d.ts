import { CreateOfferDto } from "src/appDto/offer.dto";
import { Offer } from "src/models/offer.model";
import { AdminGetOffersDto } from "src/appDto/admin.dto";
export declare class OffersRepository {
    private jwtService;
    private get userModel();
    private get model();
    create(data: CreateOfferDto, address: number, propertyCondition: number, user: number): Promise<Offer>;
    init(userId: number): Promise<Offer>;
    update(data: CreateOfferDto, id: number, user: number, address?: number, propertyCondition?: number): Promise<number>;
    updatePricing(data: object, id: number, user: number): Promise<number>;
    cancel(id: number): Promise<number>;
    approve(id: number): Promise<number>;
    findById(id: number): Promise<Offer>;
    submit(id: number): Promise<number>;
    getById(id: number): Promise<any>;
    getAdminOffers(filter: AdminGetOffersDto): Promise<{
        totalCount: number;
        data: Offer[];
    }>;
    getUsersOffers(userId: number): Promise<{
        totalCount: number;
        data: Offer[];
    }>;
    getOffer(userId: number): Promise<any>;
    getPayedOffers(user: number): Promise<Offer[]>;
}
