import { Injectable } from "@nestjs/common";
import { Subscriptions } from "src/models/subscriptions.model";

@Injectable()
export class SubscriptionRepository {
  private get model() {
    return Subscriptions.query();
  }

  public async create(email: string, subscription_to: string) {
    return this.model.insert({ email, subscription_to });
  }

  public async getAll(page: number, limit: number, subscription_to: string) {
    const offset = (page - 1) * limit;
    const [countResult, data] = await Promise.all([
      this.model
      .where({ subscription_to })
      .count('*'),
      this.model
      .where({ subscription_to })
      .orderBy('subsctiptions.created_at', 'desc')
      .offset(offset)
      .limit(limit)
    ])
    const totalCount = +countResult[0]['count'];
    return {
      totalCount,
      data,
    };
  }

  public async getByEmail(email: string) {
    return this.model.where({ email })
  }
}