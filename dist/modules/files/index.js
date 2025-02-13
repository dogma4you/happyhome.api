"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const service_1 = require("./service");
const jwt_service_1 = require("../../services/jwt.service");
const jwt_1 = require("@nestjs/jwt");
const user_repository_1 = require("../../repository/user.repository");
const file_repository_1 = require("../../repository/file.repository");
let FilesModule = class FilesModule {
};
exports.FilesModule = FilesModule;
exports.FilesModule = FilesModule = __decorate([
    (0, common_1.Module)({
        controllers: [controller_1.FilesController],
        providers: [service_1.FileService, jwt_service_1.JwtStrategy, jwt_1.JwtService, user_repository_1.UserRepository, file_repository_1.FileRepository]
    })
], FilesModule);
//# sourceMappingURL=index.js.map