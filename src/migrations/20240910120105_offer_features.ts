import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('offer_features', table => {
        table.increments('id').primary()
        table.integer('offer').unsigned();
        table.foreign('offer').references('id').inTable('offers');

        table.boolean('premium_handcape').defaultTo(false)
        table.boolean('luxury_flooring').defaultTo(false)
        table.boolean('custom_framing').defaultTo(false)
        table.boolean('other').defaultTo(false)
        table.string('description').defaultTo(null)

        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at').defaultTo(null).nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
}

