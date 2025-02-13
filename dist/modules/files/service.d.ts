/// <reference types="multer" />
import { GetFilesDetailsDto } from "src/appDto/file.dto";
import { User } from "src/models/user.model";
export declare class FileService {
    private fileRepository;
    uploadMultiple(files: Array<Express.Multer.File>, fileName: string, user: User): Promise<import("src/types/response").ResponseModel<string>>;
    getFilesDetails(data: GetFilesDetailsDto, user: User): Promise<import("src/types/response").ResponseModel<import("../../models/files").Files[]>>;
}
