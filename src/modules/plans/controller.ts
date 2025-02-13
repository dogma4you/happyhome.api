import { Body, Controller, Delete, Get, Inject, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiExcludeEndpoint, ApiParam, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { validationExeptionFactory } from "src/utils/exeption.factory";
import { PlansService } from "./service";
import { CreatePlanDto, UpdatePlanDto } from "src/appDto/plans.dto";
import { IRequest } from "src/types/request";

@Controller('plans')
@ApiTags('Plans')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: validationExeptionFactory }))
export class PlansController {
    @Inject()
    private service: PlansService;
    
    // @Post('')
    // @ApiExcludeEndpoint()
    // public async seed() {
    //     return this.service.runSeed();
    // }
    @Get('')
    public async getPlans() {
        return this.service.getPlans();
    }

    @Post('')
    @ApiBody({ type: CreatePlanDto })
    public async create(@Body() body: any) {
        return this.service.create(body);
    }

    @Put('/:id')
    @ApiParam({ type: String, name: 'id' })
    @ApiBody({ type: UpdatePlanDto })
    public async update(@Req() req: IRequest) {
        return this.service.update(+req.params.id, req.body);
    }

    @Delete('/:id')
    @ApiParam({ type: String, name: 'id' })
    public async delete(@Req() req: IRequest) {
        return this.service.delete(+req.params.id);
    }

}