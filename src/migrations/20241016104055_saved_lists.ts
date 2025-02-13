import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('saved_lists', table => {
    table.increments('id').primary()
    table.integer('user').unsigned()
    table.foreign('user').references('id').inTable('users')
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('updated_at').defaultTo(null).nullable()
  })
}


export async function down(knex: Knex): Promise<void> {
}

