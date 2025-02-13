import { BadRequestException, Controller, Get, Inject, Param, Post, Req, Res, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from "@nestjs/swagger";
import { validationExeptionFactory } from "src/utils/exeption.factory";
import { multerOptions } from "src/constants/multer";
import { FileService } from "./service";
import { IRequest } from "src/types/request";
import * as path from "path";
import { Response } from "express";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { JwtStrategy } from "src/services/jwt.service";
import { GetFilesDetailsDto, GetFilesDto } from "src/appDto/file.dto";
import { UserRepository } from "src/repository/user.repository";
import { UserTypeEnum } from "src/constants/enum";
import { FileRepository } from "src/repository/file.repository";
import * as fs from 'fs';

@Controller('files')
@ApiTags('Files')
@ApiBearerAuth('Authorization')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: validationExeptionFactory }))
export class FilesController {

    constructor(private service: FileService) {}

    @Inject()
    private jwtStrategy: JwtStrategy;
    @Inject()
    public userRepository: UserRepository;
    @Inject()
    public filesRepository: FileRepository;

    @Post('upload')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files', 10, multerOptions))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Upload multiple files',
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    })
    public async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Req() req: IRequest) {
        return this.service.uploadMultiple(files, req.fileName, req.user)
    }

    @Get(':fileName')
    @ApiQuery({ type: GetFilesDto })
    public async getFile(@Param('fileName') fileName: string, @Res() res: Response, @Req() req: IRequest) {
        const token = <string>req.query.token;
        const deeded = await this.jwtStrategy.verifyJwt(token)
        if (deeded.type === UserTypeEnum.admin || deeded.type === UserTypeEnum.employee) {
            const file = await this.filesRepository.getByName(fileName)
            if (!file) throw new BadRequestException('Invalid image name');
            let filePath = '';
            if (fileName.includes('_blured_')) {
                filePath = path.join(__dirname, '../../../', 'storage', `blured`, fileName)
            } else {
                if (fs.existsSync(path.join(__dirname, '../../../', 'storage', `user_${file.user}`, fileName))) {
                    filePath = path.join(__dirname, '../../../', 'storage', `user_${file.user}`, fileName);
                } else if (fs.existsSync(path.join(__dirname, '../../../', 'storage', `user_1`, fileName))) {
                    filePath = path.join(__dirname, '../../../', 'storage', `user_1`, fileName);
                } else {
                    filePath = path.join(__dirname, '../../../', 'storage', `user_${file.user}`, fileName);
                }
            }
            return res.sendFile(filePath);
        } else {
            let filePath = '';
            if (fileName.includes('_blured_')) {
                filePath = path.join(__dirname, '../../../', 'storage', `blured`, fileName)
            } else {
                if (fs.existsSync(path.join(__dirname, '../../../', 'storage', `user_${deeded.id}`, fileName))) {
                    filePath = path.join(__dirname, '../../../', 'storage', `user_${deeded.id}`, fileName);
                } else if (fs.existsSync(path.join(__dirname, '../../../', 'storage', `user_1`, fileName))) {
                    filePath = path.join(__dirname, '../../../', 'storage', `user_1`, fileName);
                } else {
                    filePath = path.join(__dirname, '../../../', 'storage', `user_${deeded.id}`, fileName);
                }
            }
            return res.sendFile(filePath);    
        }
        
    }

    @Post('details')
    @ApiBody({ type: GetFilesDetailsDto })
    public async getFilesDetails(@Req() req: IRequest) {
        return this.service.getFilesDetails(req.body, req.user || req.guest);
    }
}