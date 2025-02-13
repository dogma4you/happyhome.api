import { Controller, Delete, Get, Inject, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiParam, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { validationExeptionFactory } from "src/utils/exeption.factory";
import { SavedListService } from "./service";
import { IRequest } from "src/types/request";
import { GetSavedListDto } from "src/appDto/saved.list.dto";

@Controller('saved_lists')
@ApiTags('Saved lists')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: validationExeptionFactory }))
export class SavedListsController {
  @Inject()
  private service: SavedListService;

  @Put('/:contract')
  @ApiParam({ type: String, name: 'contract' })
  public saveContract(@Req() req: IRequest) {
    return this.service.saveContract(+req.params.contract, req.user);
  }

  @Delete('/:contract')
  @ApiParam({ type: String, name: 'contract' })
  public async deleteFromSavedList(@Req() req: IRequest) {
    return this.service.deleteContract(+req.params.contract, req.user);
  }

  @Get('')
  @ApiQuery({ required: true, type: String, name: 'page' })
  @ApiQuery({ required: true, type: String, name: 'limit' })
  @ApiQuery({ required: false, type: String, name: 'dateFrom' })
  @ApiQuery({ required: false, type: String, name: 'dateTo' })
  @ApiQuery({ required: false, type: String, name: 'status' })
  @ApiQuery({ required: false, type: String, name: 'priceFrom' })
  @ApiQuery({ required: false, type: String, name: 'priceTo' })
  @ApiQuery({ required: false, type: String, name: 'sortBy' })
  @ApiQuery({ required: false, type: String, name: 'sortValue' })
  public async getSavedList(@Req() req: IRequest) {
    return this.service.getList(<GetSavedListDto><unknown>req.query, req.user);
  }

}