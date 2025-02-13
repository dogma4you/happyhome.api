import { EmailValidationTypeEnum } from "src/constants/enum";
export declare class RefreshTokenDto {
    refresh_token: string;
}
export declare class VerifyEmailDto {
    email: string;
    type: EmailValidationTypeEnum;
}
export declare class RegistrationDto {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    code: string;
    phone: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class ResetPasswordDto {
    email: string;
    password: string;
    code: string;
}
export declare class VerifyCodeDto {
    email: string;
    code: string;
}
export declare class SocialLoginDto {
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}
export declare class AuthDeleteAcoountDto {
    deleted_by_reason: string;
}
