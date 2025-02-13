import { BadRequestException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import * as moment from "moment";
import { AuthDeleteAcoountDto, LoginDto, RefreshTokenDto, RegistrationDto, ResetPasswordDto, SocialLoginDto, VerifyCodeDto, VerifyEmailDto } from "src/appDto/auth.dto";
import { EmailValidationTypeEnum, NotificationCtxTypeEnum, UserActivityTypeEnum, UserTypeEnum } from "src/constants/enum";
import { User } from "src/models/user.model";
import { BalanceRepository } from "src/repository/balance.repository";
import { VerifyEmailRepository } from "src/repository/email.verification.repository";
import { NotificationsRepository } from "src/repository/notifications.repository";
import { PipedriveActionsRepository } from "src/repository/pipedrive.actions.repository";
import { SavedListsRepository } from "src/repository/saved_lists.repository";
import { UserRepository } from "src/repository/user.repository";
import { UserSettingsRepository } from "src/repository/user_settings";
import { HashService } from "src/services/hash.service";
import { JwtStrategy } from "src/services/jwt.service";
import { MailerService } from "src/services/mailer.service";
import { PipedriveService } from "src/services/pipedrive.service";
import { SocketService } from "src/services/socket.service";
import { getResponse } from "src/types/response";
import { generateVerificationCode } from "src/utils/generator";

@Injectable()
export class AuthService {

    constructor(
        private jwtStrategy: JwtStrategy,
        private verifyEmailRepo: VerifyEmailRepository,
        private hashService: HashService,
        private mailer: MailerService) {}

    @Inject()
    private userRepo: UserRepository

    @Inject()
    private userSettingsRepo: UserSettingsRepository

    @Inject()
    private balanceRepository: BalanceRepository;

    @Inject()
    private savedListsRepository: SavedListsRepository;

    @Inject()
    private notificationRepository: NotificationsRepository;
    
    @Inject()
    private socketService: SocketService;

    @Inject()
    private pipedriveService: PipedriveService;
    
    @Inject()
    private pipedriveActionsRepository: PipedriveActionsRepository;

    public async testPipedrive() {
        const fields = await this.pipedriveService.getDealFields();
        const deal = await this.pipedriveService.createDeal({
            title: 'test', value: 10, currency: 'USD'
        })
        return fields
    }

    public async createGuest() {
        const guest = await this.userRepo.createGuestUser()
        const payload = { id: guest.id, type: UserTypeEnum.guest }
        const { token, refresh_token } = await this.jwtStrategy.signJwt(payload)
        return getResponse(true, 'guest', { token, refresh_token })
    }

    public async refreshToken(data: RefreshTokenDto) {
        const verifiedUser = await this.jwtStrategy.verifyJwt(data.refresh_token)
        if (verifiedUser) return getResponse(true, 'updated tokens', await this.jwtStrategy.signJwt({ id: verifiedUser.id, type: verifiedUser.type }))
        else throw new UnauthorizedException()
    }

    public async verifyEmail(data: VerifyEmailDto) {
        if (+data.type === EmailValidationTypeEnum.register) {
            const existsUser = await this.userRepo.getOne({ email: data.email })
            if (existsUser) throw new BadRequestException('Email already exists. Please double check your email.')
        }
        const code = generateVerificationCode()
        await Promise.all([
            this.verifyEmailRepo.create(code, data.email, data.type),
            this.mailer.sendMail(data.email, 'Happy Home Initiative', `Your verification code is ${code}`, null)
        ])
        return getResponse(true, `Verification code send to email ${data.email}`)
    }

    public async register(data: RegistrationDto, guestRef: User) {
        const guestUser = guestRef || await this.userRepo.createGuestUser();
        const existsUser = await this.userRepo.getOne({ email: data.email, type: UserTypeEnum.user })
        if (existsUser) throw new BadRequestException('Invalid email. Email already exists')

        const verification = await this.verifyEmailRepo.getByEmail(data.email)
        if (!verification) throw new BadRequestException('Invalid verification code')

        const verificationExpireDate = moment(verification.created_at).add(1, 'days')
        if (verificationExpireDate.isBefore(moment())) throw new BadRequestException('Verification code expired')

        if (verification.code !== data.code) throw new BadRequestException(`Invalid verification code ${data.code}`)

        let guest: User;

        if (!guestUser.email || guestUser.email !== data.email) {
            const existsGuest = await this.userRepo.getOne({ email: data.email, type: UserTypeEnum.guest })
            if (existsGuest) guest = existsGuest
            else guest = guestUser
        } else guest = guestUser
        const password = await this.hashService.hash(data.password)
        await this.userRepo.mergeWithGuest(guest.id, data, password)
        const payload = { id: guest.id, type: UserTypeEnum.user }
        const { token, refresh_token } = await this.jwtStrategy.signJwt(payload)
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
                    type: NotificationCtxTypeEnum.registration,
                    ref: guest.id
                }
            })
            await this.socketService.sendNotificationToAdmin(notification)
        } catch (error) {
            console.error('register', error.message)
        }

        try {
            const existAction = await this.pipedriveActionsRepository.getOne({
                user: guest.id
            })
    
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
                label: UserTypeEnum[guest.type]
            }
    
            if (existAction && existAction.person) {
                await this.pipedriveService.updatePerson(existAction.person, personData)
            } else {
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
                    label: UserTypeEnum[guest.type]
                })
    
                const deal = await this.pipedriveService.createDeal({
                    title: `${guest.first_name || data.first_name} ${guest.last_name || data.last_name} User`,
                    value: 0,
                    currency: 'USD',
                    stage_id: 14,
                    person_id: person.data.id
                })
    
                await this.pipedriveActionsRepository.create({
                    user: guest.id,
                    person: person.data.id,
                    deal: deal.data.id
                })
            }
        } catch (error) {
            console.log(error);
        }

        return getResponse(true, 'Registration done!', { token, refresh_token })
    }

    public async login(data: LoginDto) {
        const user = await this.userRepo.getPlatformUser({ email: data.email })
        if (!user) throw new BadRequestException('Invalid email or password')
        if ([ UserActivityTypeEnum.banned_client, UserActivityTypeEnum.inactive_client].includes(user.activity)) throw new UnauthorizedException('Banned or Inactive user!')
        const isMatchPassword = await this.hashService.compare(data.password, user.password) 
        if (!isMatchPassword) throw new BadRequestException('Invalid email or password')
        const payload = { id: user.id, type: user.type }
        const { token, refresh_token } = await this.jwtStrategy.signJwt(payload)
        return getResponse(true, 'Login done!', { token, refresh_token })
    }

    public async loginAdmin(data: LoginDto) {
        const employee = await this.userRepo.getEmployee({ email: data.email })
        if (!employee) throw new BadRequestException('Invalid email or password')
        if (+employee.activity === UserActivityTypeEnum.banned_employee) {
            throw new BadRequestException('Employee banned!')
        }

        if (+employee.activity === UserActivityTypeEnum.inactive_employee) {
            throw new BadRequestException('Employee is inactive!')
        }

        const isMatchPassword = await this.hashService.compare(data.password, employee.password) 
        if (!isMatchPassword) throw new BadRequestException('Invalid email or password')

        const payload = { id: employee.id, type: employee.type }
        const { token, refresh_token } = await this.jwtStrategy.signJwt(payload)
        return getResponse(true, 'Login done!', { token, refresh_token })

    }

    public async getResetPasswordCode(data: VerifyEmailDto) {
        const user = await this.userRepo.getOne({ email: data.email })
        if (!user) throw new BadRequestException('User not found')
        const code = generateVerificationCode()
        await Promise.all([
            this.verifyEmailRepo.create(code, data.email, EmailValidationTypeEnum.resetPassword),
            this.mailer.sendMail(data.email, 'HH.api', `Your reset password code is ${code}`, null)
        ])
        return getResponse(true, `Reset password code send to email ${data.email}`)
    }

    public async resetPassword(data: ResetPasswordDto) {
        const user = await this.userRepo.getOne({ email: data.email })
        if (!user) throw new BadRequestException('User not found')
        const verification = await this.verifyEmailRepo.getByEmail(data.email)
        if (!verification) throw new BadRequestException('Invalid verification code')

        const verificationExpireDate = moment(verification.created_at).add(1, 'days')
        if (verificationExpireDate.isBefore(moment())) throw new BadRequestException('Verification code expired')

        if (await this.hashService.compare(user.password, data.password)) throw new BadRequestException('Password mutch with current')

        const password = await this.hashService.hash(data.password)
        await Promise.all([
            this.userRepo.changePassword(user.id, password),
            this.verifyEmailRepo.delete(verification.id)
        ])
        return getResponse(true, 'Password changed successfuly')
    }

    public async resendVerificationCode(email: string) {
        const verification = await this.verifyEmailRepo.getByEmail(email)
        if (!verification) throw new BadRequestException('Verification code for given email doesnt exits')
        const code = generateVerificationCode()
        await this.verifyEmailRepo.update(email, { code, created_at: new Date() })
        await this.mailer.sendMail(email, 'Happy Home Initiative', `Your reset password code is ${code}`, null);
        return getResponse(true, 'Verification code resent')
    } 

    public async delete(user: User, data: AuthDeleteAcoountDto) {
        await this.userRepo.block(user.id, data.deleted_by_reason)
        return  getResponse(true, 'Account deleted')
    }

    public async verify(body: VerifyCodeDto) {
        const verification = await this.verifyEmailRepo.getByEmail(body.email)
        if (!verification) throw new BadRequestException('Verification code for given email doesnt exits')
        
        if (verification.code !== body.code) {
            throw new BadRequestException(`Invalid verification code ${body.code}`)
        }

        return getResponse(true, 'Code verified')
    }

    public async socialLogin(data: SocialLoginDto) {
        const expireDate = '15d'
        const guest = await this.userRepo.getOne({ email: data.email });
        if (guest) return getResponse(true, 'Social login success',  
            await this.jwtStrategy.signSocialJwt({ id: guest.id }, expireDate))
        else {
        const newUser = await this.userRepo.create({
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            phone: null,
            password: null,
            code: null
        }, null)
        return getResponse(true, 'Social login success',  
            await this.jwtStrategy.signSocialJwt({ id: newUser.id }, expireDate))
        }
    }
}