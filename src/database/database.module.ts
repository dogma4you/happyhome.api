
import { Module } from '@nestjs/common';
import * as Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../knexfile';

@Module({
  providers: [
    {
      provide: 'KnexConnection',
      useFactory: async () => {
        const knex = Knex(knexConfig.development);
        Model.knex(knex);
        return knex;
      },
    },
  ],
  exports: ['KnexConnection'],
})
export class DatabaseModule {}
