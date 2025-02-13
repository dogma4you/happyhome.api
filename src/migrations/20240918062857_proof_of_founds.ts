import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('proof_of_founds', table => {
        table.increments('id').primary()
        table.integer('user').unsigned()
        table.foreign('user').references('id').inTable('users')
        table.jsonb('files').nullable().defaultTo([])
        table.integer('status').notNullable().defaultTo(1)
        table.timestamp('expire_at').nullable()
        table.timestamp('created_at').defaultTo(knex.fn.now()).nullable()
        table.timestamp('updated_at').defaultTo(null).nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('proof_of_founds')
}

