import { Injectable } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { IsDifferent } from "src/utils/custom_validations";

@Injectable()
export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(16)
    public username: string

    @ApiProperty()
    @IsEmail()
    public email: string

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    public password: string;
}

@Injectable()
export class ForgotPasswordDto {
    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    public password: string;

    @ApiProperty()
    @IsString()
    @IsDifferent('password', { message: 'New password must be different from the old password.' })
    @MinLength(8)
    @MaxLength(20)
    public passwordNew: string;
}

@Injectable()
export class UpdatePersonalInfoDto {
    @ApiPropertyOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(16)
    public first_name: string

    @ApiPropertyOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(16)
    public last_name: string

    @ApiPropertyOptional()
    @IsEmail()
    public email: string

    @ApiPropertyOptional()
    @IsString()
    @MinLength(6)
    public phone: string;

    @ApiPropertyOptional()
    public avatar: string;
}