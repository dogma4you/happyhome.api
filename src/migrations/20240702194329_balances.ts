import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('balances', table => {
        table.increments('id').primary()
        table.integer('user').unsigned()
        table.foreign('user').references('id').inTable('users')
        table.integer('balance').notNullable().defaultTo(0)
        table.integer('credits').notNullable().defaultTo(0)
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at').defaultTo(null).nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
}

