import { Injectable } from "@nestjs/common";
import { Contract } from "src/models/contracts.model";
import { PurchasedContracts } from "src/models/purchased.contracts";

@Injectable()
export class PurchasedContractsRepository {
  private get model() {
    return PurchasedContracts.query()
  }

  public async create(contract: number, user: number, price: number) {
    return this.model.insert({ contract, user, price });
  }

  public async getUserPurchasedContracts(user: number) {
    return this.model.where({ user });
  }

  public async isContractPurchasedByClient(contract: number, user: number) {
    return !!this.model.where({ contract, user }).count('*').first();
  }

  public async getAdminList(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const [totalCount, data]: [any, any] = await Promise.all([
      this.model.where({}).count('*').first(),
      this.model
        .where({})
        .orderBy('purchased_contracts.created_at', 'desc')
        .offset(offset)
        .limit(limit)

    ])

    return { totalCount: +totalCount.count, data }; 
  }
}