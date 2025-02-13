import { Body, Controller, Get, Inject, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiExcludeEndpoint, ApiParam, ApiTags } from "@nestjs/swagger";
import { validationExeptionFactory } from "src/utils/exeption.factory";
import { OfferService } from "./service";
import { CreateOfferDto, CreateOfferFeaturesDto, SubmitOfferParamsDto, UnlockOfferBodyDto, UpdateOfferBodyDto, UpdateOfferParamsDto } from "src/appDto/offer.dto";
import { IRequest } from "src/types/request";
import { JwtAuthGuard } from "src/guards/auth.guard";

@Controller('offer')
@ApiTags('Offer')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: validationExeptionFactory }))
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard)
export class OffersController {
    @Inject()
    private service: OfferService

    @Post()
    public async createOffer(@Body() body: CreateOfferDto, @Req() req: IRequest) {
        return this.service.createOffer(body, req.user.id)
    }

    @Get('init')
    @ApiExcludeEndpoint()
    public async initOffer(@Req() req: IRequest) {
        return this.service.initOffer(req.user)
    }

    @Put(':id')
    @ApiParam({ type: String, name: 'id' })
    @ApiBody({ type: UpdateOfferBodyDto })
    public async updateOffer(@Param() params: UpdateOfferParamsDto, @Body() body: any, @Req() req: IRequest) {
        return this.service.updateOffer(body, +params.id, req.user)
    }

    @Get('')
    public async getUsersLastOffer(@Req() req: IRequest) {
        return this.service.getUsersLastOffer(req.user)
    }

    @Post('unlock') //! need to remove and add to contracts api
    @ApiExcludeEndpoint()
    public async unlockOffer(@Req() req: IRequest, @Body() body: UnlockOfferBodyDto) {
        return this.service.unlockOffer(req.user, body)
    }

    @Put('submit/:id')
    @ApiParam({
        type: String,
        name: "id"
    })
    public async submit(@Req() req: IRequest, @Param() params: any) {
        return this.service.submit(+params.id, req.user || req.guest);
    }

    @Get('list')
    public async getUsersList(@Req() req: IRequest) {
        return this.service.getUsersList(req.user.id);
    }

    @Post('features/:id')
    @ApiParam({ type: String, name: 'id' })
    @ApiBody({ type: CreateOfferFeaturesDto })
    public async createOfferFeatures(@Body() body: any, @Param() params: any, @Req() req: IRequest) {
        return this.service.createOfferFeature(+params.id, body, req.user || req.guest)
    }
}