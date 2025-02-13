import { BadRequestException, Body, Controller, Delete, Get, Inject, Post, Put, Query, Req, Request, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./service";
import { ApiBearerAuth, ApiBody, ApiExcludeEndpoint, ApiQuery, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { AuthDeleteAcoountDto, LoginDto, RefreshTokenDto, RegistrationDto, ResetPasswordDto, SocialLoginDto, VerifyCodeDto, VerifyEmailDto } from "src/appDto/auth.dto";
import { IRequest } from "src/types/request";
import { validationExeptionFactory } from "src/utils/exeption.factory";
import axios from "axios";

@Controller('auth')
@ApiTags('Auth')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: validationExeptionFactory }))
export class AuthController {
    @Inject()
    private service: AuthService

    @Get('guest')
    public async getGuest() {
        return this.service.createGuest()
    }

    @Get('self')
    @ApiExcludeEndpoint()
    @ApiBearerAuth('Authorization')
    @UseGuards(JwtAuthGuard)
    public async self(@Request() req) {
        return req.user
    }

    @Get('pipedrive')
    @ApiBearerAuth('Authorization')
    public async testPipedrive() {
        return this.service.testPipedrive()
    }

    @Post('refresh_token')
    @ApiBody({ type: RefreshTokenDto })
    public async refreshToken(@Body() body: RefreshTokenDto) {
        return this.service.refreshToken(body)
    }

    @Get('verify_email')
    @ApiQuery({ name: 'email', required: false, description: 'Email' })
    @ApiQuery({ name: 'type', required: true, description: 'Type' })
    public async verifyEmail(@Query() query: VerifyEmailDto) {
        return this.service.verifyEmail(query)
    }

    @Post('register')
    @ApiBody({ type: RegistrationDto })
    @ApiBearerAuth('Authorization')
    public async register(@Body() body: RegistrationDto, @Req() req: IRequest) {
        return this.service.register(body, req.guest)
    }

    @Post('login')
    @ApiBody({ type: LoginDto })
    public async login(@Body() body: LoginDto) {
        return this.service.login(body)
    }

    @Post('employee/login')
    public async loginAdmin(@Body() body: LoginDto) {
        return this.service.loginAdmin(body)
    }

    @Get('reset_verification')
    @ApiQuery({ name: 'email', required: false, description: 'Email' })
    public async resetVerification(@Query() query: VerifyEmailDto) {
        return this.service.getResetPasswordCode(query)
    }

    @Post('reset_password')
    @ApiBody({ type: ResetPasswordDto })
    public async resetPassword(@Body() body: ResetPasswordDto) {
        return this.service.resetPassword(body)
    }

    @Get('resend_verification_code')
    @ApiQuery({ name: 'email', required: false, description: 'Email' })
    public async resendVerificationCode(@Query() query: VerifyEmailDto) {
        return this.service.resendVerificationCode(query.email)
    }

    @Put('verify')
    @ApiBody({ type: VerifyCodeDto })
    public async verifyCode(@Body() body: VerifyCodeDto) {
        return this.service.verify(body);
    }

    @Put('account')
    @ApiBearerAuth('Authorization')
    @ApiBody({ type: AuthDeleteAcoountDto })
    public async deleteAccount(@Req() req: IRequest) {
        return this.service.delete(req.user, req.body)
    }

    @Post('social_login')
    public async socialLogin(@Body() body: SocialLoginDto) {
        return this.service.socialLogin(body)
    }
}