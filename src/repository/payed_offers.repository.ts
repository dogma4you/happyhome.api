import { Injectable } from "@nestjs/common";
import { PayedOffers } from "src/models/payed_offers.model";

@Injectable()
export class PayedOffersRepository {
    
    private get model() {
        return PayedOffers.query()
    }

    public async create(user: number, offer: number) {
        return this.model.insert({
            user, offer
        })
    }

    public async getUserPayedOffer(user: number, offer: number) {
        return this.model.findOne({ user, offer })
    }
}