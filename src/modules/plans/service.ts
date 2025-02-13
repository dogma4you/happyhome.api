import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreatePlanDto, UpdatePlanDto } from "src/appDto/plans.dto";
import { PlansRepository } from "src/repository/plans.repository";
import { getResponse } from "src/types/response";

@Injectable()
export class PlansService {
    @Inject()
    private repository: PlansRepository;
    public async runSeed() {
        return this.repository.seed();
    }   

    public async getPlans() {
        const plans = await this.repository.getPlans();
        return getResponse(true, 'Plans', plans)
    }

    public async create(data: CreatePlanDto) {
        const activePlans = await this.repository.getActivePlans()
        if (activePlans.length === 3) throw new BadRequestException('Maximum count of active plans is 3.')
        const plan = await this.repository.create(data)
        return getResponse(true, 'Plan created!', plan)
    }

    public async update(id: number, data: UpdatePlanDto) {
        if (data.published === true) {
            const activePlans = await this.repository.getActivePlans()
            if (activePlans.length === 3) throw new BadRequestException('Maximum count of active plans is 3.')
        }
        await this.repository.update(id, data);
        return getResponse(true, 'Plan updated!')
    }

    public async delete(id: number) {
        await this.repository.delete(id);
        return getResponse(true, 'Plan deleted!')
    }
}