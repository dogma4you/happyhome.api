import { CreateOfferFeaturesDto } from "src/appDto/offer.dto";
import { OfferFeatures } from "src/models/offer.features";
export declare class OfferFeaturesRepository {
    private get model();
    create(data: object): Promise<OfferFeatures>;
    getById(id: number): Promise<OfferFeatures>;
    getOne(filter: object): Promise<OfferFeatures>;
    getByOffer(offer: number): Promise<OfferFeatures>;
    update(id: number, data: CreateOfferFeaturesDto): Promise<number>;
}
