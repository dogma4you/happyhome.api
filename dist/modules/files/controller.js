"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const exeption_factory_1 = require("../../utils/exeption.factory");
const multer_1 = require("../../constants/multer");
const service_1 = require("./service");
const path = require("path");
const auth_guard_1 = require("../../guards/auth.guard");
const jwt_service_1 = require("../../services/jwt.service");
const file_dto_1 = require("../../appDto/file.dto");
const user_repository_1 = require("../../repository/user.repository");
const enum_1 = require("../../constants/enum");
const file_repository_1 = require("../../repository/file.repository");
const fs = require("fs");
let FilesController = class FilesController {
    constructor(service) {
        this.service = service;
    }
    async uploadFiles(files, req) {
        return this.service.uploadMultiple(files, req.fileName, req.user);
    }
    async getFile(fileName, res, req) {
        const token = req.query.token;
        const deeded = await this.jwtStrategy.verifyJwt(token);
        if (deeded.type === enum_1.UserTypeEnum.admin || deeded.type === enum_1.UserTypeEnum.employee) {
            const file = await this.filesRepository.getByName(fileName);
            if (!file)
                throw new common_1.BadRequestException('Invalid image name');
            let filePath = '';
            if (fileName.includes('_blured_')) {
                filePath = path.join(__dirname, '../../../', 'storage', `blured`, fileName);
            }
            else {
                if (fs.existsSync(path.join(__dirname, '../../../', 'storage', `user_${file.user}`, fileName))) {
                    filePath = path.join(__dirname, '../../../', 'storage', `user_${file.user}`, fileName);
                }
                else if (fs.existsSync(path.join(__dirname, '../../../', 'storage', `user_1`, fileName))) {
                    filePath = path.join(__dirname, '../../../', 'storage', `user_1`, fileName);
                }
                else {
                    filePath = path.join(__dirname, '../../../', 'storage', `user_${file.user}`, fileName);
                }
            }
            return res.sendFile(filePath);
        }
        else {
            let filePath = '';
            if (fileName.includes('_blured_')) {
                filePath = path.join(__dirname, '../../../', 'storage', `blured`, fileName);
            }
            else {
                if (fs.existsSync(path.join(__dirname, '../../../', 'storage', `user_${deeded.id}`, fileName))) {
                    filePath = path.join(__dirname, '../../../', 'storage', `user_${deeded.id}`, fileName);
                }
                else if (fs.existsSync(path.join(__dirname, '../../../', 'storage', `user_1`, fileName))) {
                    filePath = path.join(__dirname, '../../../', 'storage', `user_1`, fileName);
                }
                else {
                    filePath = path.join(__dirname, '../../../', 'storage', `user_${deeded.id}`, fileName);
                }
            }
            return res.sendFile(filePath);
        }
    }
    async getFilesDetails(req) {
        return this.service.getFilesDetails(req.body, req.user || req.guest);
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", jwt_service_1.JwtStrategy)
], FilesController.prototype, "jwtStrategy", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", user_repository_1.UserRepository)
], FilesController.prototype, "userRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", file_repository_1.FileRepository)
], FilesController.prototype, "filesRepository", void 0);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, multer_1.multerOptions)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
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
    }),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "uploadFiles", null);
__decorate([
    (0, common_1.Get)(':fileName'),
    (0, swagger_1.ApiQuery)({ type: file_dto_1.GetFilesDto }),
    __param(0, (0, common_1.Param)('fileName')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "getFile", null);
__decorate([
    (0, common_1.Post)('details'),
    (0, swagger_1.ApiBody)({ type: file_dto_1.GetFilesDetailsDto }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "getFilesDetails", null);
exports.FilesController = FilesController = __decorate([
    (0, common_1.Controller)('files'),
    (0, swagger_1.ApiTags)('Files'),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: exeption_factory_1.validationExeptionFactory })),
    __metadata("design:paramtypes", [service_1.FileService])
], FilesController);
//# sourceMappingURL=controller.js.map