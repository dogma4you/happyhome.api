import { Module } from "@nestjs/common";
import { CreditsController } from "./controller";
import { CreditsService } from "./service";

@Module({
    controllers: [CreditsController],
    providers: [CreditsService]
})
export class CreditsModule {}