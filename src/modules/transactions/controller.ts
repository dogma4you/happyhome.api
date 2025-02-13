import { Controller, Get, Inject, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { TransactionService } from "./service";
import { ApiTags, ApiBearerAuth, ApiParam, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { validationExeptionFactory } from "src/utils/exeption.factory";
import { IRequest } from "src/types/request";

@Controller('transactions')
@ApiTags('Transactions')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: validationExeptionFactory }))
export class TransactionsController {
    @Inject()
    private service: TransactionService

    @Get('')
    @ApiQuery({ type: String, name: 'page' })
    @ApiQuery({ type: String, name: 'limit' })
    public getUsersTransactions(@Req() req: IRequest) {
        return this.service.getUsersTransactions(req.user, +req.query.page, +req.query.limit)
    }
}