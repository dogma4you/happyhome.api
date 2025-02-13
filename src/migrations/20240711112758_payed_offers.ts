import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('payed_offers', table => {
        table.increments('id').primary()
        table.integer('user').unsigned()
        table.foreign('user').references('id').inTable('users')
        table.integer('offer').unsigned()
        table.foreign('offer').references('id').inTable('offers')
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at').defaultTo(null).nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
}

