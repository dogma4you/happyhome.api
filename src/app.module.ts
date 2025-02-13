import { Module } from '@nestjs/common';
import { ApiModule } from 'src/modules/api.module';
import { DatabaseModule } from './database/database.module';
import { EventsGateway } from './events/events.gateway';

@Module({
  imports: [ApiModule, DatabaseModule],
  controllers: [],
  providers: [EventsGateway],
})
export class AppModule {}
