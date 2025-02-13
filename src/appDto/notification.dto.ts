import { Injectable } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { NotificationSeenTypeEnum } from "src/constants/enum";

@Injectable()
export class CreateNotificationDto {
    @ApiProperty()
    @IsString()
    public title: string

    @ApiProperty()
    @IsString()
    public description: string

    @ApiPropertyOptional()
    public ctx?: object;
}

@Injectable()
export class GetNotificationsDto {
    @ApiPropertyOptional()
    @IsEnum(NotificationSeenTypeEnum)
    public seen: NotificationSeenTypeEnum
}

@Injectable()
export class GetNotificationDetailsDto {
    @ApiProperty()
    @IsString()
    public id: number
}

@Injectable()
export class DeleteNotificationDto {
    @ApiProperty()
    @IsString()
    public id: number
}

@Injectable()
export class MarkAsSeenNotificationDto {
    @ApiProperty()
    @IsString()
    public id: number
}