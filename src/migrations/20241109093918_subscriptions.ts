import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('subsctiptions', (table) => {
    table.increments('id').primary()
    table.string('email').notNullable();
    table.string('subscription_to').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('updated_at').defaultTo(null).nullable()
  })
}


export async function down(knex: Knex): Promise<void> {
}

