import { Module } from "@nestjs/common";
import { SubscriptionsController } from "./controller";
import { SubscriptionService } from "./service";
import { SubscriptionRepository } from "src/repository/subscription.repository";

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionService, SubscriptionRepository]
})
export class SubscriptionsModule {};