import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('balance_history', table => {
        table.increments('id').primary()
        table.integer('balance').unsigned()
        table.foreign('balance').references('id').inTable('balances')
        table.integer('transaction').unsigned()
        table.foreign('transaction').references('id').inTable('transactions')
        table.integer('action').notNullable()
        table.integer('value').notNullable()
        table.integer('balanceBefore').notNullable()
        table.integer('balanceAfter').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at').defaultTo(null).nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
}