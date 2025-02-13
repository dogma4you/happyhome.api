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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const enum_1 = require("../../constants/enum");
const balance_repository_1 = require("../../repository/balance.repository");
const email_verification_repository_1 = require("../../repository/email.verification.repository");
const notifications_repository_1 = require("../../repository/notifications.repository");
const pipedrive_actions_repository_1 = require("../../repository/pipedrive.actions.repository");
const saved_lists_repository_1 = require("../../repository/saved_lists.repository");
const user_repository_1 = require("../../repository/user.repository");
const user_settings_1 = require("../../repository/user_settings");
const hash_service_1 = require("../../services/hash.service");
const jwt_service_1 = require("../../services/jwt.service");
const mailer_service_1 = require("../../services/mailer.service");
const pipedrive_service_1 = require("../../services/pipedrive.service");
const socket_service_1 = require("../../services/socket.service");
const response_1 = require("../../types/response");
const generator_1 = require("../../utils/generator");
let AuthService = class AuthService {
    constructor(jwtStrategy, verifyEmailRepo, hashService, mailer) {
        this.jwtStrategy = jwtStrategy;
        this.verifyEmailRepo = verifyEmailRepo;
        this.hashService = hashService;
        this.mailer = mailer;
    }
    async testPipedrive() {
        const fields = await this.pipedriveService.getDealFields();
        const deal = await this.pipedriveService.createDeal({
            title: 'test', value: 10, currency: 'USD'
        });
        return fields;
    }
    async createGuest() {
        const guest = await this.userRepo.createGuestUser();
        const payload = { id: guest.id, type: enum_1.UserTypeEnum.guest };
        const { token, refresh_token } = await this.jwtStrategy.signJwt(payload);
        return (0, response_1.getResponse)(true, 'guest', { token, refresh_token });
    }
    async refreshToken(data) {
        const verifiedUser = await this.jwtStrategy.verifyJwt(data.refresh_token);
        if (verifiedUser)
            return (0, response_1.getResponse)(true, 'updated tokens', await this.jwtStrategy.signJwt({ id: verifiedUser.id, type: verifiedUser.type }));
        else
            throw new common_1.UnauthorizedException();
    }
    async verifyEmail(data) {
        if (+data.type === enum_1.EmailValidationTypeEnum.register) {
            const existsUser = await this.userRepo.getOne({ email: data.email, type: enum_1.UserTypeEnum.user });
            if (existsUser)
                throw new common_1.BadRequestException('Email already exists. Please double check your email.');
        }
        const code = (0, generator_1.generateVerificationCode)();
        await Promise.all([
            this.verifyEmailRepo.create(code, data.email, data.type),
            this.mailer.sendMail(data.email, 'Happy Home Initiative', `Your verification code is ${code}`, null)
        ]);
        return (0, response_1.getResponse)(true, `Verification code send to email ${data.email}`);
    }
    async register(data, guestRef) {
        const guestUser = guestRef || await this.userRepo.createGuestUser();
        const existsUser = await this.userRepo.getOne({ email: data.email, type: enum_1.UserTypeEnum.user });
        if (existsUser)
            throw new common_1.BadRequestException('Invalid email. Email already exists');
        const verification = await this.verifyEmailRepo.getByEmail(data.email);
        if (!verification)
            throw new common_1.BadRequestException('Invalid verification code');
        const verificationExpireDate = moment(verification.created_at).add(1, 'days');
        if (verificationExpireDate.isBefore(moment()))
            throw new common_1.BadRequestException('Verification code expired');
        if (verification.code !== data.code)
            throw new common_1.BadRequestException(`Invalid verification code ${data.code}`);
        let guest;
        if (!guestUser.email || guestUser.email !== data.email) {
            const existsGuest = await this.userRepo.getOne({ email: data.email, type: enum_1.UserTypeEnum.guest });
            if (existsGuest)
                guest = existsGuest;
            else
                guest = guestUser;
        }
        else
            guest = guestUser;
        const password = await this.hashService.hash(data.password);
        await this.userRepo.mergeWithGuest(guest.id, data, password);
        const payload = { id: guest.id, type: enum_1.UserTypeEnum.user };
        const { token, refresh_token } = await this.jwtStrategy.signJwt(payload);
        await Promise.all([
            this.verifyEmailRepo.delete(verification.id),
            this.userSettingsRepo.create(guest.id),
            this.balanceRepository.craete(guest.id),
            this.savedListsRepository.create(guest.id)
        ]);
        try {
            const notification = await this.notificationRepository.createForAdmin({
                title: 'Client registration',
                description: `${data.first_name} ${data.last_name} finished registration`,
                ctx: {
                    type: enum_1.NotificationCtxTypeEnum.registration,
                    ref: guest.id
                }
            });
            await this.socketService.sendNotificationToAdmin(notification);
        }
        catch (error) {
            console.error('register', error.message);
        }
        try {
            const existAction = await this.pipedriveActionsRepository.getOne({
                user: guest.id
            });
            const personData = {
                "phone": [
                    {
                        "label": "",
                        "value": guest.phone || data.phone,
                        "primary": true
                    }
                ],
                "email": [
                    {
                        "label": "work",
                        "value": guest.email || data.email,
                        "primary": true
                    }
                ],
                name: `${guest.first_name || data.first_name} ${guest.last_name || data.last_name}`,
                label: enum_1.UserTypeEnum[guest.type]
            };
            if (existAction && existAction.person) {
                await this.pipedriveService.updatePerson(existAction.person, personData);
            }
            else {
                const person = await this.pipedriveService.createPerson({
                    "phone": [
                        {
                            "label": "",
                            "value": guest.phone || data.phone,
                            "primary": true
                        }
                    ],
                    "email": [
                        {
                            "label": "work",
                            "value": guest.email || data.email,
                            "primary": true
                        }
                    ],
                    name: `${guest.first_name || data.first_name} ${guest.last_name || data.last_name}`,
                    label: enum_1.UserTypeEnum[guest.type]
                });
                const deal = await this.pipedriveService.createDeal({
                    title: `${guest.first_name || data.first_name} ${guest.last_name || data.last_name} User`,
                    value: 0,
                    currency: 'USD',
                    stage_id: 14,
                    person_id: person.data.id
                });
                await this.pipedriveActionsRepository.create({
                    user: guest.id,
                    person: person.data.id,
                    deal: deal.data.id
                });
            }
        }
        catch (error) {
            console.log(error);
        }
        return (0, response_1.getResponse)(true, 'Registration done!', { token, refresh_token });
    }
    async login(data) {
        const user = await this.userRepo.getPlatformUser({ email: data.email });
        if (!user)
            throw new common_1.BadRequestException('Invalid email or password');
        if ([enum_1.UserActivityTypeEnum.banned_client, enum_1.UserActivityTypeEnum.inactive_client].includes(user.activity))
            throw new common_1.UnauthorizedException('Banned or Inactive user!');
        const isMatchPassword = await this.hashService.compare(data.password, user.password);
        if (!isMatchPassword)
            throw new common_1.BadRequestException('Invalid email or password');
        const payload = { id: user.id, type: user.type };
        const { token, refresh_token } = await this.jwtStrategy.signJwt(payload);
        return (0, response_1.getResponse)(true, 'Login done!', { token, refresh_token });
    }
    async loginAdmin(data) {
        const employee = await this.userRepo.getEmployee({ email: data.email });
        if (!employee)
            throw new common_1.BadRequestException('Invalid email or password');
        if (+employee.activity === enum_1.UserActivityTypeEnum.banned_employee) {
            throw new common_1.BadRequestException('Employee banned!');
        }
        if (+employee.activity === enum_1.UserActivityTypeEnum.inactive_employee) {
            throw new common_1.BadRequestException('Employee is inactive!');
        }
        const isMatchPassword = await this.hashService.compare(data.password, employee.password);
        if (!isMatchPassword)
            throw new common_1.BadRequestException('Invalid email or password');
        const payload = { id: employee.id, type: employee.type };
        const { token, refresh_token } = await this.jwtStrategy.signJwt(payload);
        return (0, response_1.getResponse)(true, 'Login done!', { token, refresh_token });
    }
    async getResetPasswordCode(data) {
        const user = await this.userRepo.getOne({ email: data.email });
        if (!user)
            throw new common_1.BadRequestException('User not found');
        const code = (0, generator_1.generateVerificationCode)();
        await Promise.all([
            this.verifyEmailRepo.create(code, data.email, enum_1.EmailValidationTypeEnum.resetPassword),
            this.mailer.sendMail(data.email, 'HH.api', `Your reset password code is ${code}`, null)
        ]);
        return (0, response_1.getResponse)(true, `Reset password code send to email ${data.email}`);
    }
    async resetPassword(data) {
        const user = await this.userRepo.getOne({ email: data.email });
        if (!user)
            throw new common_1.BadRequestException('User not found');
        const verification = await this.verifyEmailRepo.getByEmail(data.email);
        if (!verification)
            throw new common_1.BadRequestException('Invalid verification code');
        const verificationExpireDate = moment(verification.created_at).add(1, 'days');
        if (verificationExpireDate.isBefore(moment()))
            throw new common_1.BadRequestException('Verification code expired');
        if (await this.hashService.compare(user.password, data.password))
            throw new common_1.BadRequestException('Password mutch with current');
        const password = await this.hashService.hash(data.password);
        await Promise.all([
            this.userRepo.changePassword(user.id, password),
            this.verifyEmailRepo.delete(verification.id)
        ]);
        return (0, response_1.getResponse)(true, 'Password changed successfuly');
    }
    async resendVerificationCode(email) {
        const verification = await this.verifyEmailRepo.getByEmail(email);
        if (!verification)
            throw new common_1.BadRequestException('Verification code for given email doesnt exits');
        const code = (0, generator_1.generateVerificationCode)();
        await this.verifyEmailRepo.update(email, { code, created_at: new Date() });
        await this.mailer.sendMail(email, 'Happy Home Initiative', `Your reset password code is ${code}`, null);
        return (0, response_1.getResponse)(true, 'Verification code resent');
    }
    async delete(user, data) {
        await this.userRepo.block(user.id, data.deleted_by_reason);
        return (0, response_1.getResponse)(true, 'Account deleted');
    }
    async verify(body) {
        const verification = await this.verifyEmailRepo.getByEmail(body.email);
        if (!verification)
            throw new common_1.BadRequestException('Verification code for given email doesnt exits');
        if (verification.code !== body.code) {
            throw new common_1.BadRequestException(`Invalid verification code ${body.code}`);
        }
        return (0, response_1.getResponse)(true, 'Code verified');
    }
    async socialLogin(data) {
        const expireDate = '15d';
        const guest = await this.userRepo.getOne({ email: data.email });
        if (guest)
            return (0, response_1.getResponse)(true, 'Social login success', await this.jwtStrategy.signSocialJwt({ id: guest.id }, expireDate));
        else {
            const newUser = await this.userRepo.create({
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                phone: null,
                password: null,
                code: null
            }, null);
            return (0, response_1.getResponse)(true, 'Social login success', await this.jwtStrategy.signSocialJwt({ id: newUser.id }, expireDate));
        }
    }
};
exports.AuthService = AuthService;
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", user_repository_1.UserRepository)
], AuthService.prototype, "userRepo", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", user_settings_1.UserSettingsRepository)
], AuthService.prototype, "userSettingsRepo", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", balance_repository_1.BalanceRepository)
], AuthService.prototype, "balanceRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", saved_lists_repository_1.SavedListsRepository)
], AuthService.prototype, "savedListsRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", notifications_repository_1.NotificationsRepository)
], AuthService.prototype, "notificationRepository", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", socket_service_1.SocketService)
], AuthService.prototype, "socketService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", pipedrive_service_1.PipedriveService)
], AuthService.prototype, "pipedriveService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", pipedrive_actions_repository_1.PipedriveActionsRepository)
], AuthService.prototype, "pipedriveActionsRepository", void 0);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JwtStrategy,
        email_verification_repository_1.VerifyEmailRepository,
        hash_service_1.HashService,
        mailer_service_1.MailerService])
], AuthService);
//# sourceMappingURL=service.js.map