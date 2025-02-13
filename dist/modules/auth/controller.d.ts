import { LoginDto, RefreshTokenDto, RegistrationDto, ResetPasswordDto, SocialLoginDto, VerifyCodeDto, VerifyEmailDto } from "src/appDto/auth.dto";
import { IRequest } from "src/types/request";
export declare class AuthController {
    private service;
    getGuest(): Promise<import("../../types/response").ResponseModel<{
        token: string;
        refresh_token: string;
    }>>;
    self(req: any): Promise<any>;
    testPipedrive(): Promise<any>;
    refreshToken(body: RefreshTokenDto): Promise<import("../../types/response").ResponseModel<{
        token: string;
        refresh_token: string;
    }>>;
    verifyEmail(query: VerifyEmailDto): Promise<import("../../types/response").ResponseModel<unknown>>;
    register(body: RegistrationDto, req: IRequest): Promise<import("../../types/response").ResponseModel<{
        token: string;
        refresh_token: string;
    }>>;
    login(body: LoginDto): Promise<import("../../types/response").ResponseModel<{
        token: string;
        refresh_token: string;
    }>>;
    loginAdmin(body: LoginDto): Promise<import("../../types/response").ResponseModel<{
        token: string;
        refresh_token: string;
    }>>;
    resetVerification(query: VerifyEmailDto): Promise<import("../../types/response").ResponseModel<unknown>>;
    resetPassword(body: ResetPasswordDto): Promise<import("../../types/response").ResponseModel<unknown>>;
    resendVerificationCode(query: VerifyEmailDto): Promise<import("../../types/response").ResponseModel<unknown>>;
    verifyCode(body: VerifyCodeDto): Promise<import("../../types/response").ResponseModel<unknown>>;
    deleteAccount(req: IRequest): Promise<import("../../types/response").ResponseModel<unknown>>;
    socialLogin(body: SocialLoginDto): Promise<import("../../types/response").ResponseModel<{
        token: string;
        refresh_token: string;
    }>>;
}
