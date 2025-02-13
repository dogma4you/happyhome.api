import { Injectable } from "@nestjs/common";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { SettingsModeTypeEnum } from "src/constants/enum";

@Injectable()
export class UpdateUserSettingsDto {
    @ApiPropertyOptional()
    public mode: SettingsModeTypeEnum

    @ApiPropertyOptional()
    public push_notifications: boolean
}