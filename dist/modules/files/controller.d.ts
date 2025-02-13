/// <reference types="multer" />
import { FileService } from "./service";
import { IRequest } from "src/types/request";
import { Response } from "express";
import { UserRepository } from "src/repository/user.repository";
import { FileRepository } from "src/repository/file.repository";
export declare class FilesController {
    private service;
    constructor(service: FileService);
    private jwtStrategy;
    userRepository: UserRepository;
    filesRepository: FileRepository;
    uploadFiles(files: Array<Express.Multer.File>, req: IRequest): Promise<import("../../types/response").ResponseModel<string>>;
    getFile(fileName: string, res: Response, req: IRequest): Promise<void>;
    getFilesDetails(req: IRequest): Promise<import("../../types/response").ResponseModel<import("../../models/files").Files[]>>;
}
