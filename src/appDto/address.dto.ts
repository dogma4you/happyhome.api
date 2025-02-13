import { Injectable } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { TransactionsStatusEnum } from "src/constants/enum";

@Injectable()
export class CreateAddressDto {
    @ApiProperty()
    @IsString()
    public country: string
    @ApiProperty()
    @IsString()
    public city: string
    @ApiPropertyOptional()
    @IsString()
    public state: string
    @ApiPropertyOptional()
    @IsString()
    public postal_code: string
    @ApiProperty()
    @IsNumber()
    public lat: number
    @ApiProperty()
    @IsNumber()
    public lng: number
    @ApiPropertyOptional()
    public street: string;
    @ApiPropertyOptional()
    public formatted_address: string;
}

@Injectable()
export class AdminCreatePayemtnInfo {
    @ApiProperty()
    public recipient: string;
    @ApiProperty()
    public bank_name: string;
    @ApiProperty()
    public bank_address: string;
    @ApiProperty()
    public routing_number: string;
    @ApiProperty()
    public account_number: string;
    @ApiProperty()
    public account_type: string;
}

@Injectable()
export class AdminUpdateTransactionsStatusManualDto {
    @ApiProperty()
    public status: TransactionsStatusEnum;
}