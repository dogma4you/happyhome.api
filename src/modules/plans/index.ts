import { Module } from "@nestjs/common";
import { PlansController } from "./controller";
import { PlansService } from "./service";
import { PlansRepository } from "src/repository/plans.repository";

@Module({
    controllers: [PlansController],
    providers: [PlansService, PlansRepository]
})
export class PlansModule {}