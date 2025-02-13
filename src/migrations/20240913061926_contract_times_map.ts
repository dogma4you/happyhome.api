import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('contracts', table => {
        table.timestamp('expire_at').defaultTo(null).nullable()
        table.timestamp('expire_at_updated_at').defaultTo(null).nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
}

