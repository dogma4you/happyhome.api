import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('app_settings', table => {
        table.integer('singleCreditPrice').defaultTo(0).nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('app_settings')
}

