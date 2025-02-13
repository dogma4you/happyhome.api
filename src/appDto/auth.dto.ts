import { Injectable } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString, Length, MaxLength, MinLength, isString } from "class-validator";
import { EmailValidationTypeEnum } from "src/constants/enum";

@Injectable()
export class RefreshTokenDto {
    @IsString()
    @MinLength(10)
    @ApiProperty()
    public refresh_token: string;
}

@Injectable()
export class VerifyEmailDto {
    @IsEmail({}, { message: 'Invalid email format' })
    public email: string;
    @IsString()
    public type: EmailValidationTypeEnum;
}

@Injectable()
export class RegistrationDto {
    @ApiProperty()
    @IsString()
    public first_name: string

    @ApiProperty()
    @IsString()
    public last_name: string

    @ApiProperty()
    @IsEmail()
    public email: string

    @ApiProperty()
    @IsString()
    public password: string;

    @ApiProperty()
    @IsString()
    public code: string;

    @ApiPropertyOptional()
    @IsString()
    public phone: string;
}

@Injectable()
export class LoginDto {
    @ApiProperty()
    @IsEmail({}, { message: 'Invalid email format' })
    public email: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    public password: string;
}

@Injectable()
export class ResetPasswordDto {
    @ApiProperty()
    @IsEmail()
    public email: string

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    public password: string;

    @ApiProperty()
    @IsString()
    @Length(6)
    public code: string;
}

export class VerifyCodeDto {
    @ApiProperty()
    @IsEmail()
    public email: string;

    @ApiProperty()
    @IsString()
    public code: string;
}

export class SocialLoginDto {
   @ApiProperty()
   @IsString()
   public email: string;

   @ApiPropertyOptional()
   @IsString()
   public first_name: string;

   @ApiPropertyOptional()
   @IsString()
   public last_name: string;

   @ApiPropertyOptional()
   @IsString()
   public avatar: string;
}

export class AuthDeleteAcoountDto {
    @ApiPropertyOptional()
    public deleted_by_reason: string;
}