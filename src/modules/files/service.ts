import { Inject, Injectable } from "@nestjs/common";
import { GetFilesDetailsDto } from "src/appDto/file.dto";
import { FileTypeEnum } from "src/constants/enum";
import { User } from "src/models/user.model";
import { FileRepository } from "src/repository/file.repository";
import { getResponse } from "src/types/response";

@Injectable()
export class FileService {

    @Inject()
    private fileRepository: FileRepository;

    public async uploadMultiple(files: Array<Express.Multer.File>, fileName: string, user: User) {
        await Promise.all(files.map(file => this.fileRepository.create({
            user: user.id,
            belongs: user.id,
            originalName: file.originalname,
            name: fileName,
            type: FileTypeEnum.image,
            size: file.size,
            ext: file.mimetype,
        })));
        return getResponse(true, 'Upload success', fileName);
    }

    public async getFilesDetails(data: GetFilesDetailsDto, user: User) {
        const list = await this.fileRepository.getByNames(data.files, user.id);
        return getResponse(true, 'Files', list);
    }
}