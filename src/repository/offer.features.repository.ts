import { Injectable, UseFilters } from "@nestjs/common";
import { CreateOfferFeaturesDto } from "src/appDto/offer.dto";
import { OfferFeatures } from "src/models/offer.features";
import { SqlExceptionFilter } from "src/utils/database";

@Injectable()
@UseFilters(SqlExceptionFilter)
export class OfferFeaturesRepository {

    private get model() {
        return OfferFeatures.query()
    }

    public async create(data: object) {
        return this.model.insert(data).returning('*')
    }

    public async getById(id: number) {
        return this.model.where({ id }).first();
    }

    public async getOne(filter: object) {
        return this.model.where(filter).first()
    }

    public async getByOffer(offer: number) {
        return this.model.where({ offer }).first()
    }

    public async update(id: number, data: CreateOfferFeaturesDto) {
        return this.model.where({ id }).update(data);
    }
}
