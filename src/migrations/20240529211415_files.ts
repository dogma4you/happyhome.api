import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('files', table => {
        table.increments('id').primary()
        
        table.integer('user').unsigned()
        table.foreign('user').references('id').inTable('users')
        table.integer('belongs').nullable().defaultTo(null)
        table.string('originalName').defaultTo(null)
        table.string('name').notNullable().unique()
        table.integer('type').notNullable().defaultTo(1);
        table.integer('isPrimary').defaultTo(0)
        table.integer('size').notNullable()
        table.string('ext').notNullable()

        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at').defaultTo(null).nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
}

