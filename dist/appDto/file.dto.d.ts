import { FileTypeEnum } from "src/constants/enum";
export declare class CreateFileDto {
    user: number;
    belongs: number;
    originalName: string;
    name: string;
    type: FileTypeEnum;
    size: number;
    ext: string;
}
export declare class GetFilesDto {
    token: string;
}
export declare class GetFilesDetailsDto {
    files: string[];
}
