import { Injectable } from "@nestjs/common";
import { Plans } from '../models/plans.model';

@Injectable()
export class PlansRepository {
    private get model() {
        return Plans.query()
    }

    public async seed() {
        const models = [
            { name: "rookie plan", credits: 5, price: 450 },
            { name: "seasoned plan", credits: 10, price: 850 },
            { name: "professional plan", credits: 20, price: 1600 },
        ]
        return await this.model.insert(models);
    }

    public async getById(id: number) {
        return this.model.findById(id);
    }

    public async getPlans() {
        return this.model.where({}).returning('*')
    }

    public async getActivePlans() {
        return this.model.where({ published: true })
    }

    public async create(data: object) {
        return this.model.insert(data).returning('*')
    }

    public async update(id: number, data: object) {
        return this.model.where({ id }).update(data);
    }

    public async delete(id: number) {
        return this.model.deleteById(id)
    }
}