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
exports.PasswordGuard = void 0;
const common_1 = require("@nestjs/common");
const hash_service_1 = require("../services/hash.service");
let PasswordGuard = class PasswordGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const password = request.body.passwordNew;
        if (!user || !user.password) {
            throw new common_1.BadRequestException(`${!user.password ? 'Guest cant have a password' : 'User not found'}`);
        }
        return this.validatePassword(user.password, request.body.password);
    }
    async validatePassword(hash, password) {
        const isMatch = await this.hashService.compare(password, hash);
        if (!isMatch) {
            throw new common_1.BadRequestException('Invalid password');
        }
        return isMatch;
    }
};
exports.PasswordGuard = PasswordGuard;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", hash_service_1.HashService)
], PasswordGuard.prototype, "hashService", void 0);
exports.PasswordGuard = PasswordGuard = __decorate([
    (0, common_1.Injectable)()
], PasswordGuard);
//# sourceMappingURL=password.guard.js.map