import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateSubscriptionDto } from "src/appDto/subscriptions.dto";
import { SubscriptionRepository } from "src/repository/subscription.repository";
import { getResponse } from "src/types/response";

@Injectable()
export class SubscriptionService {
  @Inject()
  private repository: SubscriptionRepository;

  public async create(data: CreateSubscriptionDto) {
    const existsSubscriptions = await this.repository.getByEmail(data.email);
    const existsBelongins = existsSubscriptions.filter(x => x.subscription_to === data.subscription_to.toLowerCase())
    if (existsBelongins.length) return new BadRequestException('Subscription already created');
    await this.repository.create(data.email, data.subscription_to.toLowerCase());
    return getResponse(true, 'Subscription created')
  }

  public async getAll(data: { page: number, limit: number }, subscription_to: string) {
    const page = +data.page || 1, limit = +data.limit || 20;
    return this.repository.getAll(page, limit, subscription_to);
  }
}