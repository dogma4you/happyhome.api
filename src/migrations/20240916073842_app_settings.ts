import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('app_settings', table => {
        table.integer('paymentFee').defaultTo(0).notNullable()
        table.integer('contractFee').defaultTo(0).notNullable()

        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at').defaultTo(null).nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
}

