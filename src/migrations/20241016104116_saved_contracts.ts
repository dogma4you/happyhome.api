import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('saved_contracts', table => {
    table.increments('id').primary()
    table.integer('user').unsigned()
    table.foreign('user').references('id').inTable('users')

    table.integer('saved_list').unsigned()
    table.foreign('saved_list').references('id').inTable('saved_lists')

    table.integer('contract').unsigned()
    table.foreign('contract').references('id').inTable('contracts')
    
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('updated_at').defaultTo(null).nullable()
  })
}


export async function down(knex: Knex): Promise<void> {
}

