import type { Knex } from "knex";
import { TransactionsStatusEnum } from "../constants/enum";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('transactions', table => {
    table.integer('status').defaultTo(TransactionsStatusEnum.pending);
  })
}


export async function down(knex: Knex): Promise<void> {
}

