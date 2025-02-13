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
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const moment_1 = require("moment");
const passport_jwt_1 = require("passport-jwt");
const user_repository_1 = require("../repository/user.repository");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }
    async validate(payload) {
        if (!payload)
            return new common_1.UnauthorizedException();
        return await this.userRepo.getById(payload.id);
    }
    async verifyJwt(token) {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_SECRET
        }).then(data => data).catch(err => null);
        if (!payload)
            return null;
        const user = await this.userRepo.getById(payload.id);
        return user;
    }
    async signJwt(payload) {
        const [token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '1d'
            }),
            this.jwtService.sign(payload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '60d'
            })
        ]);
        return { token, refresh_token };
    }
    async signSocialJwt(payload, expiresIn) {
        const [token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn
            }),
            this.jwtService.sign(payload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn
            })
        ]);
        return { token, refresh_token };
    }
    calculateExpireDate(date) {
        const offsetDays = (0, moment_1.default)(date).day() - (0, moment_1.default)().day();
        return `${offsetDays}d`;
    }
};
exports.JwtStrategy = JwtStrategy;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", jwt_1.JwtService)
], JwtStrategy.prototype, "jwtService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", user_repository_1.UserRepository)
], JwtStrategy.prototype, "userRepo", void 0);
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], JwtStrategy);
//# sourceMappingURL=jwt.service.js.map