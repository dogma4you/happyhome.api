import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator"
import { FileTypeEnum } from "src/constants/enum"

export class CreateFileDto {
    @IsNumber()
    public user: number
    @IsNumber()
    public belongs: number
    @IsString()
    public originalName: string
    @IsString()
    public name: string
    @IsEnum(FileTypeEnum)
    public type: FileTypeEnum
    @IsNumber()
    public size: number
    @IsString()
    public ext: string
}

export class GetFilesDto {
    @ApiProperty()
    public token: string;
}

export class GetFilesDetailsDto {
    @ApiProperty()
    public files: string[];
}