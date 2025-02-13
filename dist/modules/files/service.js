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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const enum_1 = require("../../constants/enum");
const file_repository_1 = require("../../repository/file.repository");
const response_1 = require("../../types/response");
let FileService = class FileService {
    async uploadMultiple(files, fileName, user) {
        await Promise.all(files.map(file => this.fileRepository.create({
            user: user.id,
            belongs: user.id,
            originalName: file.originalname,
            name: fileName,
            type: enum_1.FileTypeEnum.image,
            size: file.size,
            ext: file.mimetype,
        })));
        return (0, response_1.getResponse)(true, 'Upload success', fileName);
    }
    async getFilesDetails(data, user) {
        const list = await this.fileRepository.getByNames(data.files, user.id);
        return (0, response_1.getResponse)(true, 'Files', list);
    }
};
exports.FileService = FileService;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", file_repository_1.FileRepository)
], FileService.prototype, "fileRepository", void 0);
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)()
], FileService);
//# sourceMappingURL=service.js.map