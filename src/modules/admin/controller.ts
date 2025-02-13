import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Req, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiQuery, ApiParam, ApiBody, ApiConsumes, ApiProperty } from "@nestjs/swagger";
import { AdminApproveOfferDto, AdminCancelOfferDto, AdminCreateEmployeeDto, AdminDeleteEmployeeParamsDto, AdminGetEmployeeDto, AdminGetOffersDto, AdminGetTransactionsDto, AdminGetUsersDto, AdminSendOfferRangeDto, AdminUpdateEmployeeActionParamsDto, AdminUpdateEmployeeDto, AdminUpdateEmployeeParamsDto, RefoundUsersCreditsBalanceDto, UpdateAdminUserDto, UpdateAppSettingsDto, UpdateContractByAdminDto, UpdatePaymentMethodsDto, UpdateUserByAdminDto, UpdateUsersCreditbalanceDto } from "src/appDto/admin.dto";
import { validationExeptionFactory } from "src/utils/exeption.factory";
import { AdminService } from "./service";
import { IRequest } from "src/types/request";
import { CreateOfferDto, UpdateOfferBodyDto } from "src/appDto/offer.dto";
import { GetContractsDto, IDeleteContractParams } from "src/appDto/contracts.dto";
import { FileService } from "../files/service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "src/constants/multer";
import { AdminProofOfFoundsDto } from "src/appDto/proof_of_founds.dto";
import { AdminCreatePayemtnInfo, AdminUpdateTransactionsStatusManualDto } from "src/appDto/address.dto";

@Controller('admin')
@ApiTags('Admin')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: validationExeptionFactory }))
@ApiBearerAuth('Authorization')
export class AdminController {
    @Inject()
    private service: AdminService;
    @Inject()
    private uploadService: FileService;
    
    @Get('users')
    @ApiQuery({ type: AdminGetUsersDto })
    public async getUsersList(@Query() query: any) {
        return this.service.getUsersList(query);
    }

    @Put('users/:id')
    @ApiParam({ type: String, name: 'id' })
    @ApiBody({ type: UpdateUserByAdminDto })
    public async updateOfferStatus(@Body() body: any, @Param() params: any) {
        return this.service.updateUserStatus(params.id, body);
    }

    @Put('user/credit/:id')
    @ApiParam({ type: String, name: 'id' })
    @ApiBody({ type: UpdateUsersCreditbalanceDto })
    public async userBalanceFill(@Body() body: any, @Param() params: any) {
        return this.service.userBalanceFill(params.id, body);
    }

    @Put('user/credit/refound/:id')
    @ApiParam({ type: String, name: 'id' })
    @ApiBody({ type: RefoundUsersCreditsBalanceDto })
    public async refoundUserBalance(@Body() body: any, @Param() params: any) {
        return this.service.refoundUserBalance(params.id, body);
    }

    @Put('user/proofs/:id')
    @ApiParam({ type: String, name: 'id' })
    @ApiBody({ type: AdminProofOfFoundsDto })
    public async userProofs(@Req() req: IRequest) {
        return this.service.userProofs(+req.params.id, req.body)
    }

    @Get('transactions')
    @ApiQuery({ type: AdminGetTransactionsDto })
    public async getTransactionsList(@Query() query: any) {
        return this.service.getTransactions(query)
    }

    @Put('transactions/:id')
    @ApiBody({ type: AdminUpdateTransactionsStatusManualDto })
    @ApiParam({ type: String, name: 'id' })
    public async updateTransactionStatus(@Req() req: IRequest) {
        return this.service.updateTransactionStatus(+req.params.id, req.body)
    }

    @Get('offers')
    @ApiQuery({ type: AdminGetOffersDto })
    public async getOffersList(@Query() query: any) {
        return this.service.getOffers(query);
    }

    @Get('offer/:id')
    @ApiParam({ type: Number, name: 'id' })
    public async getOfferById(@Param() params: { id: number }) {
        return this.service.getOfferById(params.id);
    }

    @Put('offer/:id')
    @ApiParam({ type: String, name: 'id' })
    public async updateOffer(@Body() body: any, @Param() params: any, @Req() req: IRequest) {
        return this.service.updateOffer(body, +params.id, req.admin);
    }

    // ToDo implement status changing
    @Put('offer/approve/:id')
    @ApiParam({ type: String, name: 'id' })
    public async approveOffer(@Param() params: AdminApproveOfferDto | any) {
        return this.service.approveOffer(params.id);
    }

    @Put('offer/cancel/:id')
    @ApiParam({ type: String, name: 'id' })
    public async cancelOffer(@Param() params: AdminCancelOfferDto | any) {
        return this.service.cancelOffer(params.id);
    }

    @Post('offer/send_range')
    @ApiBody({ type: AdminSendOfferRangeDto })
    public async sendOfferPriceRange(@Body() body: any, @Req() req: IRequest) {
        return this.service.sendOfferPriceRange(body, req.admin);
    }

    @Post('contract')
    public async createContract(@Body() body: CreateOfferDto, @Req() req: IRequest) {
        return this.service.createContract(body, req.user);
    }

    @Put('contract/:id')
    @ApiParam({ type: String, name: 'id' })
    public async updateContract(@Body() body: any, @Req() req: IRequest) {
        return this.service.updateContract(body, +req.params.id, req.admin);
    }

    @Get('contract/:id')
    @ApiParam({ type: String, name: 'id' })
    public async getContractById(@Req() req: IRequest) {
        return this.service.getContractById(+req.params.id, req.admin);
    }

    @Delete('contract/:id')
    @ApiParam({ type: String, name: 'id' })
    public async deleteContract(@Req() req: IRequest, @Param() params: IDeleteContractParams) {
        return this.service.deleteContract(params.id);
    }

    @Get('contracts')
    @ApiQuery({ type: GetContractsDto })
    public async getContracts(@Query() query: any, @Req() req: IRequest) {
        return this.service.getContracts(query, req.admin)
    }

    @Get('contracts/purchased')
    @ApiQuery({ type: String, name: 'page' })
    @ApiQuery({ type: String, name: 'limit' })
    public async getPurchasedContractList(@Req() req: IRequest) {
        return this.service.getPurchasedContractList(req.query);
    }

    @Put('contract/publish/:id')
    @ApiParam({ type: String, name: 'id', description: 'Contract id.' })
    public async publishContract(@Req() req: IRequest) {
        return this.service.publishContract(+req.params.id);
    }

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files', 10, multerOptions))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Upload multiple files',
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    })
    public async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Req() req: IRequest) {
        return this.uploadService.uploadMultiple(files, req.fileName, req.admin)
    }

    @Post('employee')
    @ApiBody({ type: AdminCreateEmployeeDto })
    public async createEmployee(@Body() body: any, @Req() req: IRequest) {
        return this.service.createEmployee(body, req.admin)
    }

    @Get('employee')
    @ApiQuery({ type: String, name: 'page' })
    @ApiQuery({ type: String, name: 'limit' })
    @ApiQuery({ type: String, name: 'search', required: false })
    public async getEmployeeList(@Query() query: any) {
        return this.service.getEmployeeList(query);
    }

    @Put('employee/:id')
    @ApiParam({ type: String, name: 'id' })
    @ApiBody({ type: AdminUpdateEmployeeDto })
    public async updateEmployee(@Body() body: any, @Param() params: any, @Req() req: IRequest) {
        return this.service.updateEmployee(body, +params.id, req.admin);
    }

    @Delete('employee/:id')
    @ApiParam({ type: String, name: 'id' })
    public async deleteEmployee(@Param() params: any, @Req() req: IRequest) {
        return this.service.deleteEmployee(+params.id, req.admin);
    }

    @Put('employee/action/:action/:id')
    @ApiParam({ type: String, name: 'id' })
    @ApiParam({ type: String, name: 'action' })
    public async blockEmployee(@Param() params: any, @Req() req: IRequest) {
        return this.service.actionEmployee(+params.id, params.action, req.admin);
    }

    @Get('payment_methods')
    public async getPaymentMethods() {
        return this.service.getPaymentMethods()
    }

    @Put('payment_method')
    @ApiBody({ type: UpdatePaymentMethodsDto })
    public async updatePaymentMethod(@Body() body: any) {
        return  this.service.updatePayementMethodStatus(body.id, body.status)
    }

    @Put('profile')
    @ApiBody({ type: UpdateAdminUserDto })
    public async updateAdminProfile(@Req() req: IRequest) {
        return this.service.updateAdminProfile(req.admin, req.body);
    }

    @Put('settings')
    @ApiBody({ type: UpdateAppSettingsDto })
    public async updateAppSettings(@Req() req: IRequest) {
        return this.service.updateAppSettings(req.body);
    }

    @Get('settings')
    public async getAppSettings() {
        return this.service.getAppSettings()
    }

    @Post('payment_info')
    @ApiBody({ type: AdminCreatePayemtnInfo })
    public async createPaymentInfo(@Req() req: IRequest) {
        return this.service.createPaymentInfo(req.body);
    }

    @Put('payment_info/:id')
    @ApiBody({ type: AdminCreatePayemtnInfo })
    @ApiParam({ type: String, name: 'id' })
    public async updatePaymentInfo(@Req() req: IRequest) {
        return this.service.updatePaymentInfo(+req.params.id, req.body);
    }

    @Delete('payment_info/:id')
    @ApiParam({ type: String, name: 'id' })
    public async deletePaymentInfo(@Req() req: IRequest) {
        return this.service.deletePaymentInfo(+req.params.id);
    }

    @Get('payment_info')
    public async getPaymentInfos() {
        return this.service.getPayemtnInfos();
    }

    @Get('subscriptions/:subscription_to')
    @ApiQuery({ type: String, name: 'page' })
    @ApiQuery({ type: String, name: 'limit' })
    @ApiParam({ type: String, name: 'subscription_to' })
    public async getSubscriptions(@Req() req: IRequest) {
        return this.service.getSubscriptions(req.query, req.params.subscription_to)
    }

}