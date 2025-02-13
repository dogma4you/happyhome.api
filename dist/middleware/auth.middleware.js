"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const common_1 = require("@nestjs/common");
const passport = require("passport");
const enum_1 = require("../constants/enum");
const user_repository_1 = require("../repository/user.repository");
let Authentication = class Authentication {
    use(req, res, next) {
        const userRepository = new user_repository_1.UserRepository();
        return passport.authenticate('jwt', { session: false }, async (err, user, info) => {
            if (err || !user) {
                return res.status(401).json({ message: info?.message || 'Unauthorized' });
            }
            const ctx = await userRepository.getById(user.id);
            req[enum_1.UserTypeEnum[user.type]] = ctx;
            next();
        })(req, res, next);
    }
};
exports.Authentication = Authentication;
exports.Authentication = Authentication = __decorate([
    (0, common_1.Injectable)()
], Authentication);
//# sourceMappingURL=auth.middleware.js.map