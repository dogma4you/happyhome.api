import { AuthDeleteAcoountDto, LoginDto, RefreshTokenDto, RegistrationDto, ResetPasswordDto, SocialLoginDto, VerifyCodeDto, VerifyEmailDto } from "src/appDto/auth.dto";
import { User } from "src/models/user.model";
import { VerifyEmailRepository } from "src/repository/email.verification.repository";
import { HashService } from "src/services/hash.service";
import { JwtStrategy } from "src/services/jwt.service";
import { MailerService } from "src/services/mailer.service";
export declare class AuthService {
    private jwtStrategy;
    private verifyEmailRepo;
    private hashService;
    private mailer;
    constructor(jwtStrategy: JwtStrategy, verifyEmailRepo: VerifyEmailRepository, hashService: HashService, mailer: MailerService);
    private userRepo;
    private userSettingsRepo;
    private balanceRepository;
    private savedListsRepository;
    private notificationRepository;
    private socketService;
    private pipedriveService;
    private pipedriveActionsRepository;
    testPipedrive(): Promise<any>;
    createGuest(): Promise<import("src/types/response").ResponseModel<{
        token: string;
        refresh_token: string;
    }>>;
    refreshToken(data: RefreshTokenDto): Promise<import("src/types/response").ResponseModel<{
        token: string;
        refresh_token: string;
    }>>;
    verifyEmail(data: VerifyEmailDto): Promise<import("src/types/response").ResponseModel<unknown>>;
    register(data: RegistrationDto, guestRef: User): Promise<import("src/types/response").ResponseModel<{
        token: string;
        refresh_token: string;
    }>>;
    login(data: LoginDto): Promise<import("src/types/response").ResponseModel<{
        token: string;
        refresh_token: string;
    }>>;
    loginAdmin(data: LoginDto): Promise<import("src/types/response").ResponseModel<{
        token: string;
        refresh_token: string;
    }>>;
    getResetPasswordCode(data: VerifyEmailDto): Promise<import("src/types/response").ResponseModel<unknown>>;
    resetPassword(data: ResetPasswordDto): Promise<import("src/types/response").ResponseModel<unknown>>;
    resendVerificationCode(email: string): Promise<import("src/types/response").ResponseModel<unknown>>;
    delete(user: User, data: AuthDeleteAcoountDto): Promise<import("src/types/response").ResponseModel<unknown>>;
    verify(body: VerifyCodeDto): Promise<import("src/types/response").ResponseModel<unknown>>;
    socialLogin(data: SocialLoginDto): Promise<import("src/types/response").ResponseModel<{
        token: string;
        refresh_token: string;
    }>>;
}
