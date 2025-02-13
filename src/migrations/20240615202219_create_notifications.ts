import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('notifications', table => {
        table.increments('id').primary()
        table.integer('user').unsigned()
        table.foreign('user').references('id').inTable('users')
        table.integer('type').notNullable().defaultTo(1)
        table.string('title').notNullable()
        table.string('description').notNullable()
        table.integer('seen').notNullable().defaultTo(2)
        table.date('seen_at').defaultTo(null)
        table.integer('deleted').defaultTo(0).notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at').defaultTo(null).nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
}

