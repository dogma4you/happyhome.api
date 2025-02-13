import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('email_verifications', table => {
        table.increments('id').primary()
        table.integer('type').notNullable().defaultTo(2);
        table.string('code').notNullable()
        table.string('email').notNullable().unique()
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at').defaultTo(null).nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
}

