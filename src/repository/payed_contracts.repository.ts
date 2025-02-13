import { Injectable } from "@nestjs/common";
import { PayedContracts } from "src/models/payed_contracts.model";

@Injectable()
export class PayedContractsRepository {
    
    private get model() {
        return PayedContracts.query()
    }

    public async create(user: number, contract: number) {
        return this.model.insert({
            user, contract
        })
    }

    public async getUsersPayedContracts(user: number) {
        return this.model.where({ user });
    }

    public async getUserPayedOffer(user: number, contract: number) {
        return this.model.findOne({ user, contract })
    }

    public async isUserPayedContract(user: number, contract: number) {
        return !!await this.model.where({ user, contract }).first();
    }

    public async getPayedContractsCount(user: number) {
        return this.model.where({ user }).count();
    }

    public async removeAll(contract: number) {
        return this.model.where({ contract }).delete()
    }
}