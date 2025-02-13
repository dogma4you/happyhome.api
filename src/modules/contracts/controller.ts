import { Controller, Get, Inject, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiQuery, ApiBody, ApiParam } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { validationExeptionFactory } from "src/utils/exeption.factory";
import { ContractService } from "./service";
import { GetContractsDto, UnlockContractDto } from "src/appDto/contracts.dto";
import { IRequest } from "src/types/request";

@Controller('contracts')
@ApiTags('Contracts')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: validationExeptionFactory }))
export class ContractController {
    @Inject()
    private service: ContractService;

    @Get('')
    @ApiQuery({ type: GetContractsDto })
    public async getList(@Query() query: any, @Req() req: IRequest) {
        return this.service.getList(query, req.user);
    } 

    @Put('unlock')
    @ApiBody({ type: UnlockContractDto })
    public async unlock(@Req() req: IRequest) {
        return this.service.unlock(req.body, req.user);
    }

    @Get('/:id')
    @ApiParam({ type: String, name: 'id' })
    public async getListedById(@Req() req: IRequest) {
        return this.service.getListedById(+req.params.id, req.user);
    }

    @Put('purchase/:contract')
    @ApiParam({ type: String, name: 'contract' })
    public async purchase(@Req() req: IRequest) {
        return this.service.purchase(+req.params.contract, req.user);
    }

    @Get('purchase/list')
    public async getPurchasedList(@Req() req: IRequest) {
        return this.service.getPurchasedList(req.user);
    }
w
    @Get('/all/info')
    public async getContractsInfos(@Req() req: IRequest) {
        return this.service.getContractsInfos(req.user);
    }
}