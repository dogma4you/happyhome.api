import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { FillBalanceDto, FillCreditBalanceDto } from "src/appDto/balance.dto";
import { User } from "src/models/user.model";
import { BalanceRepository } from "src/repository/balance.repository";
import { PlansRepository } from "src/repository/plans.repository";
import { AuthorizeNetService } from "src/services/paymet.service";
import { TransactionService } from "../transactions/service";
import { NotificationCtxTypeEnum, NotificationTypeEnum, TransactionsTypeEnum, UserTypeEnum } from "src/constants/enum";
import { getResponse } from "src/types/response";
import { NotificationsRepository } from "src/repository/notifications.repository";
import { UserRepository } from "src/repository/user.repository";
import { AppSettingsRepository } from "src/repository/app.settings.repository";
import { generateTranssactionId } from "src/utils/uuid";
import { SocketService } from "src/services/socket.service";
import { PipedriveService } from "src/services/pipedrive.service";
import { PipedriveActionsRepository } from "src/repository/pipedrive.actions.repository";

@Injectable()
export class BalanceService {
    @Inject()
    private balanceRepository: BalanceRepository;
    @Inject()
    private paymentService: AuthorizeNetService;
    @Inject()
    private plansRepository: PlansRepository;
    @Inject()
    private transactionService: TransactionService;
    @Inject()
    private notificationRepository: NotificationsRepository;
    @Inject()
    private userRepository: UserRepository;
    @Inject()
    private appSettingsRepository: AppSettingsRepository;
    @Inject()
    private socketService: SocketService;
    @Inject()
    private pipedriveService: PipedriveService;
    @Inject()
    private pipedriveActionsRepository: PipedriveActionsRepository;

    public async getBalance (user: User) {
        return getResponse(true, 'User balance', await this.balanceRepository.getBalance(user.id))
    }

    public async fill(user: User, data: FillBalanceDto) {
        if (+data.price <= 0) return new BadRequestException('Price must be > then 0')
        // const trx = await this.paymentService.createPaymentTransaction(+data.price)
        const transactionId = generateTranssactionId();
        const trx = await this.transactionService.create({
            transactionId,
            user: user.id,
            price: +data.price,
            type: TransactionsTypeEnum.balanceFill
        })
        try {
            const notification = await this.notificationRepository.createForAdmin({
                title: 'Balance fill request!',
                description: `${user.first_name} ${user.last_name} sent balance fill request!`,
                ctx: {
                    type: NotificationCtxTypeEnum.transaction,
                    ref: trx.id
                }
            });
            await this.socketService.sendNotificationToAdmin(notification);
        } catch (error) {
            console.error('fill', error.message);
        }

        const action = await this.pipedriveActionsRepository.getOne({
            user: user.id
        })

        await this.pipedriveService.createDeal({
            title: `${user.first_name} ${user.last_name} create a balance fill request.`,
            value: data.price,
            currency: 'USD',
            stage_id: 34,
            person_id: action.person
        })

        return getResponse(true, 'Balance fill request created!');
    }

    public async fillCreditBalanceByCount(credits: number, user: User, res: any) {
        if (!credits || credits === 0) return new BadRequestException('Invalid credit count');
        const singleCreditPrice = await this.appSettingsRepository.getSingleCreditPrice();
        if (!singleCreditPrice || singleCreditPrice === 0) return new BadRequestException('Enable to by conuted credits, because single credit price dont set!')
        const price = singleCreditPrice * credits;
        const transactionId = generateTranssactionId();
        const trxData: any = {
            type: TransactionsTypeEnum.creditsFill,
            transactionId,
            user: user.id,
            price,
            credits
        }
        const transactionRef = await this.transactionService.create(trxData)
        const trx = await this.paymentService.createPayemtnTransactionRender(price, res, transactionId)
        try {
            const notification = await this.notificationRepository.createForAdmin({
                title: 'Credit fill',
                description: `${user.first_name} ${user.last_name} fills credit balance`,
                ctx: {
                    type: NotificationCtxTypeEnum.transaction,
                    ref: transactionRef.id
                }
            })
            await this.socketService.sendNotificationToAdmin(notification)
        } catch (error) {
            console.error('fillCreditBalanceByCount', error.message)
        }
        return trx;
    }

    public async fillCreditBalanceByPlan(planId: number, user: User, res: any) {
        const plan = await this.plansRepository.getById(planId);
        if (!plan) return new BadRequestException('Invalid plan id!')
        if (!plan.published) return new BadRequestException('Inposible to buy current plan!')
        const transactionId = generateTranssactionId();
        const trxData = {
            transactionId,
            user: user.id,
            price: plan.price,
            type: TransactionsTypeEnum.creditsFill,
            credits: plan.credits,
            plan: plan.id
        };
        const transaction = await this.transactionService.create(trxData);
        console.log(transaction, 'need to send to authorize.net')
        const trx = await this.paymentService.createPayemtnTransactionRender(+plan.price, res, transactionId)
        try {
            const notification = await this.notificationRepository.createForAdmin({
                title: 'Credit fill',
                description: `${user.first_name} ${user.last_name} fills credit balance`,
                ctx: {
                    type: NotificationCtxTypeEnum.transaction,
                    ref: transaction.id
                }
            })
            await this.socketService.sendNotificationToAdmin(notification)
        } catch (error) {
            console.error('fillCreditBalanceByPlan', error.message)
        }
        return trx;
    }

    public async fillCreditBalance(user: User, data: FillCreditBalanceDto, res: any) {
        if (!data.plan && !data.credits) return new BadRequestException('Credit info not found!');
        if (data.plan) return await this.fillCreditBalanceByPlan(data.plan, user, res);
        else return await this.fillCreditBalanceByCount(data.credits, user, res);
    }
}