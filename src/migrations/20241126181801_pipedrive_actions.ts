import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('pipedrive_actions', table => {
    table.increments('id').primary()
    table.integer('user').unsigned()
    table.foreign('user').references('id').inTable('users')

    table.integer('offer').nullable().defaultTo(null);
    table.integer('contract').nullable().defaultTo(null);
    table.integer('deal').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('updated_at').defaultTo(null).nullable()
  })
}


export async function down(knex: Knex): Promise<void> {
}

