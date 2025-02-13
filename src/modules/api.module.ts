import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth';
import { OffersModule } from './offer';
import { FilesModule } from './files';
import { UsersModule } from './user';
import { UserSettingsModule } from './user_settings';
import { NotificationsModule } from './notifications';
import { BalancesModule } from './balance';
import { PlansModule } from './plans';
import { TransactionsModule } from './transactions';
import { CreditsModule } from './credits';
import { BalanceHistoryModule } from './balance_history';
import { WebhookModule } from './webhook';
import { Authentication } from 'src/middleware/auth.middleware';
import { AdminAuthentication } from 'src/middleware/admin.middleware';
import { AdminModule } from './admin';
import { ContractsModule } from './contracts';
import { ProofOfFoundsModule } from './proof_of_founds';
import { PaymentInfosModule } from './payment_info';
import { SavedListsModule } from './saved_list';
import { SubscriptionsModule } from './subscriptions';

@Module({
  imports: [
    AuthModule,
    OffersModule,
    FilesModule,
    UsersModule,
    UserSettingsModule,
    NotificationsModule,
    BalancesModule,
    PlansModule,
    TransactionsModule,
    CreditsModule,
    BalanceHistoryModule,
    WebhookModule,
    AdminModule,
    ContractsModule,
    ProofOfFoundsModule,
    PaymentInfosModule,
    SavedListsModule,
    SubscriptionsModule
  ],
    controllers: [],
    providers: [],
})
export class ApiModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(Authentication)
        .exclude(
          { path: '/auth/guest', method: RequestMethod.GET },
          { path: '/auth/refresh_token', method: RequestMethod.POST },
          { path: '/auth/social_login', method: RequestMethod.POST },
          { path: '/auth/verify_email', method: RequestMethod.GET },
          { path: '/auth/login', method: RequestMethod.POST },
          { path: '/auth/register', method: RequestMethod.POST },
          { path: '/auth/employee/login', method: RequestMethod.POST },
          { path: '/auth/reset_verification', method: RequestMethod.GET },
          { path: '/auth/reset_password', method: RequestMethod.POST },
          { path: '/auth/reset_verification_code', method: RequestMethod.GET },
          { path: '/auth/verify', method: RequestMethod.PUT },
          { path: '/files/:fileName', method: RequestMethod.GET },
          { path: '/subsctiptions', method: RequestMethod.POST }
        )
        .forRoutes({ path: '*', method: RequestMethod.ALL })
        .apply(AdminAuthentication)
        .forRoutes({ path: '/admin/*', method: RequestMethod.ALL });
  }
};