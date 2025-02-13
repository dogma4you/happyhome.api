import { PayedOffers } from "src/models/payed_offers.model";
export declare class PayedOffersRepository {
    private get model();
    create(user: number, offer: number): Promise<PayedOffers>;
    getUserPayedOffer(user: number, offer: number): Promise<PayedOffers>;
}
