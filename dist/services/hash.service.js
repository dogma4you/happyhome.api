"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
let HashService = class HashService {
    constructor() {
        this.saltRounds = 10;
    }
    async hash(password) {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return bcrypt.hash(password, salt);
    }
    async compare(password, storedHash) {
        return bcrypt.compareSync(password, storedHash);
    }
    generate() {
        let result = '';
        const characters = '0123456789';
        const charactersLength = 8;
        for (let i = 0; i < charactersLength; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            result += characters[randomIndex];
        }
        return result;
    }
};
exports.HashService = HashService;
exports.HashService = HashService = __decorate([
    (0, common_1.Injectable)()
], HashService);
//# sourceMappingURL=hash.service.js.map