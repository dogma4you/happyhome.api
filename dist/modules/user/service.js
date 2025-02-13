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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const enum_1 = require("../../constants/enum");
const pipedrive_actions_repository_1 = require("../../repository/pipedrive.actions.repository");
const user_repository_1 = require("../../repository/user.repository");
const user_settings_1 = require("../../repository/user_settings");
const hash_service_1 = require("../../services/hash.service");
const pipedrive_service_1 = require("../../services/pipedrive.service");
const response_1 = require("../../types/response");
let UserService = class UserService {
    async getSelf(user) {
        delete user.password;
        const settings = await this.userSettingsRepository.findByUser(user.id);
        return (0, response_1.getResponse)(true, 'User details', { ...user, settings });
    }
    async forgotPassword(body, user) {
        await this.userRepository.changePassword(user.id, await this.hashService.hash(body.passwordNew));
        return (0, response_1.getResponse)(true, 'Password changed successfuly');
    }
    async updateInfo(user, body) {
        if (body.email) {
            const existUser = await this.userRepository.getOne({ email: body.email });
            if (existUser)
                throw new common_1.BadRequestException('User with currnet email already exist.');
        }
        const updatePersonData = {};
        if (body.first_name && body.last_name)
            updatePersonData['name'] = `${body.first_name} ${body.last_name}`;
        if (body.phone)
            updatePersonData['phone'] = [
                {
                    "label": "work",
                    "value": body.phone,
                    "primary": true
                }
            ];
        if (body.email)
            updatePersonData['email'] = [
                {
                    "label": "",
                    "value": body.email,
                    "primary": true
                }
            ];
        const existPerson = await this.pipedriveActionsRepository.getOne({
            user: user.id
        });
        if (existPerson && existPerson.person) {
            console.log(existPerson.person);
            console.log(JSON.stringify(updatePersonData));
            await this.pipedriveService.updatePerson(existPerson.person, updatePersonData);
        }
        else {
            const person = await this.pipedriveService.createPerson({
                "phone": [
                    {
                        "label": "",
                        "value": body.phone || user.phone,
                        "primary": true
                    }
                ],
                "email": [
                    {
                        "label": "work",
                        "value": body.email || user.email,
                        "primary": true
                    }
                ],
                name: `${body.first_name || user.first_name} ${body.last_name || user.last_name}`,
                label: enum_1.UserTypeEnum[user.type]
            });
            const deal = await this.pipedriveService.createDeal({
                "title": `${body.first_name || user.first_name} ${body.last_name || user.last_name}`,
                "value": 0,
                "currency": "USD",
                "stage_id": 14,
                "person_id": person.data.id
            });
            await this.pipedriveActionsRepository.create({
                user: user.id,
                offer: null,
                contract: null,
                deal: deal.data.id,
                person: person.data.id
            });
        }
        await this.userRepository.update(user.id, body);
        return (0, response_1.getResponse)(true, 'Personal info updated');
    }
};
exports.UserService = UserService;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", user_repository_1.UserRepository)
], UserService.prototype, "userRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", user_settings_1.UserSettingsRepository)
], UserService.prototype, "userSettingsRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", hash_service_1.HashService)
], UserService.prototype, "hashService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", pipedrive_service_1.PipedriveService)
], UserService.prototype, "pipedriveService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", pipedrive_actions_repository_1.PipedriveActionsRepository)
], UserService.prototype, "pipedriveActionsRepository", void 0);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=service.js.map