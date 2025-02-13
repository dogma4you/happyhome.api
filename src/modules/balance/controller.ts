import { Body, Controller, Get, Inject, Post, Put, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { validationExeptionFactory } from "src/utils/exeption.factory";
import { IRequest } from "src/types/request";
import { BalanceService } from "./service";
import { FillBalanceDto, FillCreditBalanceDto } from "src/appDto/balance.dto";
import { Response } from "express";

@Controller('balance')
@ApiTags('Balance')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: validationExeptionFactory }))
export class BalanceController {
    @Inject()
    private service: BalanceService

    @Get('')
    public async getBalance(@Req() req: IRequest) {
        return this.service.getBalance(req.user)
    } 

    @Post('fill')
    @ApiBody({ type: FillBalanceDto })
    public async fillBalance(@Req() req: IRequest, @Body() body: any) {
        return this.service.fill(req.user, body);
    }

    @Post('credit')
    @ApiBody({ type: FillCreditBalanceDto })
    public async fillCreditBalance(@Req() req: IRequest, @Res() res: Response, @Body() body: any) {
        return this.service.fillCreditBalance(req.user, body, res);
    }
}
