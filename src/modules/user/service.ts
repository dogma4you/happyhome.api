import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ForgotPasswordDto, UpdatePersonalInfoDto } from "src/appDto/user.dto";
import { UserTypeEnum } from "src/constants/enum";
import { User } from "src/models/user.model";
import { PipedriveActionsRepository } from "src/repository/pipedrive.actions.repository";
import { UserRepository } from "src/repository/user.repository";
import { UserSettingsRepository } from "src/repository/user_settings";
import { HashService } from "src/services/hash.service";
import { PipedriveService } from "src/services/pipedrive.service";
import { getResponse } from "src/types/response";

@Injectable()
export class UserService {
    @Inject()
    private userRepository: UserRepository

    @Inject()
    private userSettingsRepository: UserSettingsRepository

    @Inject()
    private hashService: HashService;

    @Inject()
    private pipedriveService: PipedriveService;

    @Inject()
    private pipedriveActionsRepository: PipedriveActionsRepository;

    public async getSelf(user: User) {
        delete user.password
        const settings = await this.userSettingsRepository.findByUser(user.id)
        return getResponse(true, 'User details', {...user, settings})
    }

    public async forgotPassword(body: ForgotPasswordDto, user: User) {
        await this.userRepository.changePassword(user.id, await this.hashService.hash(body.passwordNew))
        return getResponse(true, 'Password changed successfuly')
    }

    public async updateInfo(user: User, body: UpdatePersonalInfoDto) {
        if (body.email) {
            const existUser = await this.userRepository.getOne({ email: body.email });
            if (existUser) throw new BadRequestException('User with currnet email already exist.')
        }

        const updatePersonData = {}
        if (body.first_name && body.last_name) updatePersonData['name'] = `${body.first_name} ${body.last_name}`

        if (body.phone) updatePersonData['phone'] = [
            {
                "label": "work",
                "value": body.phone,
                "primary": true
            }
        ]

        if (body.email) updatePersonData['email'] = [
            {
                "label": "",
                "value": body.email,
                "primary": true
            }
        ]

            const existPerson = await this.pipedriveActionsRepository.getOne({
                user: user.id
            })

            if (existPerson && existPerson.person) {
                console.log(existPerson.person);
                console.log(JSON.stringify(updatePersonData));
                
                await this.pipedriveService.updatePerson(existPerson.person, updatePersonData);
            } else {
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
                    label: UserTypeEnum[user.type]
                })

                const deal = await this.pipedriveService.createDeal({
                    "title": `${body.first_name || user.first_name} ${body.last_name || user.last_name}`,
                    "value": 0,
                    "currency": "USD",
                    "stage_id": 14,
                    "person_id": person.data.id
                })

                await this.pipedriveActionsRepository.create({
                    user: user.id,
                    offer: null,
                    contract: null,
                    deal: deal.data.id,
                    person: person.data.id
                })
            }

        await this.userRepository.update(user.id, body)
        return getResponse(true, 'Personal info updated')
    }
}