"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthentication = void 0;
const common_1 = require("@nestjs/common");
const enum_1 = require("../constants/enum");
let AdminAuthentication = class AdminAuthentication {
    use(req, res, next) {
        const user = req.admin;
        if (!user)
            throw new common_1.ForbiddenException('Permission denied.');
        if (+user.type !== enum_1.UserTypeEnum.admin)
            throw new common_1.ForbiddenException('Permission denied.');
        next();
    }
};
exports.AdminAuthentication = AdminAuthentication;
exports.AdminAuthentication = AdminAuthentication = __decorate([
    (0, common_1.Injectable)()
], AdminAuthentication);
//# sourceMappingURL=admin.middleware.js.map