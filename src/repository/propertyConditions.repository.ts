import { Injectable } from "@nestjs/common";
import { CreatePropertyConditionsDto } from "src/appDto/offer.dto";
import { PropertyConditions } from "src/models/property_conditions";

@Injectable()
export class PropertyConditionsRepository {
    private get model() {
        return PropertyConditions.query()
    }

    public async create(data: CreatePropertyConditionsDto) {
        return this.model.insert(data)
    }

    public async getById(id: number) {
        return this.model.where({ id }).first()
    }

    public async update(id: number, data: object) {
        return this.model.where({ id }).update(data)
    }

}