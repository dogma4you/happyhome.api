import { Injectable } from "@nestjs/common";
import { CreateAreaDto } from "src/appDto/areas.dto";
import { Areas } from "src/models/areas.model";

@Injectable()
export class AreasRepository {

    private get model() {
        return Areas.query()
    }

    public async create(data: any) {
        return this.model.insert({ ...data })
    }

    public async update(id: number, data: object) {
        return this.model.where({ id }).update(data)
    }

    public async getOfferAreas(offer: number) {
        return this.model.where({ offer }).select('*')
    }

    public async deleteAreas(ids: number[]) {
        return this.model.whereIn('id', ids).delete();
    }
}