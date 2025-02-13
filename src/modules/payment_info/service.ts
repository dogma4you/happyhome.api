import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { TransactionsStatusEnum } from "src/constants/enum";
import { User } from "src/models/user.model";
import { AppSettingsRepository } from "src/repository/app.settings.repository";
import { BalanceRepository } from "src/repository/balance.repository";
import { PaymentInfoRepository } from "src/repository/payment_info.repository";
import { PlansRepository } from "src/repository/plans.repository";
import { TransactionsRepository } from "src/repository/transactons.repository";
import { SocketService } from "src/services/socket.service";
import { getResponse } from "src/types/response";

@Injectable()
export class PaymentInfoService {
  @Inject()
  private paymentInfoRepository: PaymentInfoRepository;
  @Inject()
  private appSettingsRepository: AppSettingsRepository;
  @Inject()
  private transactionRepository: TransactionsRepository;
  @Inject()
  private balanceRepository: BalanceRepository;
  @Inject()
  private plansRepository: PlansRepository;
  // @Inject()
  // private socketService: SocketService;

  public async getAll() {
    const data = await this.paymentInfoRepository.getAll();
    return getResponse(true, 'Payement infos', data);
  }

  public async getSingleCreditPrice() {
    const price = await this.appSettingsRepository.getSingleCreditPrice();
    return getResponse(true, 'Single credit price', price);
  }

  public async successTransaction(transactionId: string, user: User) {
    const trx = await this.transactionRepository.getByTrxId(transactionId);
    if (!trx) return new BadRequestException('Invalid transaction!');
    if (trx.user === user.id) {
    if (trx.plan) {
        const userBalance1 = await this.balanceRepository.getBalance(user.id);
        const plan = await this.plansRepository.getById(trx.plan);
        const updatedBalance = !userBalance1.balance || isNaN(userBalance1.credits) ? userBalance1.credits = plan.credits : userBalance1.credits + plan.credits;
        await this.balanceRepository.updateCredits(userBalance1.id, updatedBalance);
        // await this.socketService.emitUser('balances', trx.user, { credit: updatedBalance });
    } else {
        const userBalance = await this.balanceRepository.getBalance(user.id);
        const updatedBalance = !userBalance.balance || isNaN(userBalance.credits) ? userBalance.credits = trx.credits : userBalance.credits + trx.credits;
        await this.balanceRepository.updateCredits(userBalance.id, updatedBalance);
        // await this.socketService.emitUser('balances', trx.user, { credit: updatedBalance });
    }
    } else {
      await this.transactionRepository.updateTransactionStatus(trx.id, TransactionsStatusEnum.notReceived);
      return new BadRequestException('Invalid transaction identifere!')
    }
    await this.transactionRepository.updateTransactionStatus(trx.id, TransactionsStatusEnum.received);
    return getResponse(true, '')
  }

  public async paymentCancelCb(transactionId: string, user: User) {
    const trx = await this.transactionRepository.getByTrxId(transactionId);
    if (!trx) return new BadRequestException('Invalid transaction');
    if (trx.user !== user.id) {
      await this.transactionRepository.updateTransactionStatus(trx.id, TransactionsStatusEnum.notReceived);
      return new BadRequestException('Invalid transaction identifere!')
    }
    await this.transactionRepository.updateTransactionStatus(trx.id, TransactionsStatusEnum.notReceived);
    return getResponse(true, '')
  }
}