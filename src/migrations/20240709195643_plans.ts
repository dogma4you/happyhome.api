import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('plans', table => {
        table.increments('id').primary()

        table.string('title').notNullable()
        table.integer('credits').notNullable()
        table.integer('price').notNullable()
        table.boolean('published').defaultTo(true)
        table.string('description').notNullable()
        table.integer('discount').nullable().defaultTo(null)

        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at').defaultTo(null).nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
}

