import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('contracts', table => {
        table.increments('id').primary()
        
        table.integer('status').nullable().defaultTo(1)

        table.integer('address').unsigned()
        table.foreign('address').references('id').inTable('addresses')
        table.integer('offer').nullable().defaultTo(null)
        table.integer('propertyType').nullable()
        table.integer('descriptionType').nullable()
        table.integer('builtYear').nullable().defaultTo(null)
        table.integer('squareFeet').nullable()
        table.integer('bedrooms').nullable()
        table.integer('bathrooms').nullable()
        table.integer('heating').nullable()
        table.integer('airConditioning').nullable()
        table.integer('waterSupply').nullable()
        table.integer('sewer').nullable()
        table.integer('electricPanel').nullable()
        table.json('exteriorType').nullable().defaultTo([])
        table.integer('lotSize').nullable()
        table.integer('currentHOA').nullable()
        table.integer('deleted').defaultTo(0).notNullable
        table.integer('property_condition').unsigned()
        table.foreign('property_condition').references('id').inTable('property_conditions')
        
        table.jsonb('images').nullable().defaultTo([])
        table.jsonb('files').nullable().defaultTo([])

        table.timestamp('created_at').defaultTo(knex.fn.now()).nullable()
        table.timestamp('updated_at').defaultTo(null).nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
}

