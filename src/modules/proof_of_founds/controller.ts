import { Body, Controller, Get, Inject, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { IRequest } from "src/types/request";
import { validationExeptionFactory } from "src/utils/exeption.factory";
import { ProofOfFoundsService } from "./service";
import { ProofOfFoundsUpdateDto } from "src/appDto/proof_of_founds.dto";

@Controller('proof_of_founds')
@ApiTags('Proof_of_founds')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: validationExeptionFactory }))
export class ProofOfFoundsController {
    @Inject()
    private service: ProofOfFoundsService;

    @Get('')
    public async getUsersProofs(@Req() req: IRequest) {
        return this.service.getUserProofs(req.user);
    }
   
    @Put('')
    @ApiBody({ type: ProofOfFoundsUpdateDto })
    public async updateProofOfFounds(@Req() req: IRequest) {
        return this.service.updateProofOfFounds(req.body, req.user);
    }

}