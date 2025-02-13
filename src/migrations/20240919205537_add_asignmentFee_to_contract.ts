import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('contracts', table => {
        table.integer('asignmentFee').defaultTo(null).nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('contracts')
}

