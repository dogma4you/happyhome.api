import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('property_conditions', table => {
        table.increments('id').primary()
        
        table.integer('roof_and_gutters').notNullable().defaultTo(0)
        table.integer('hvac').notNullable().defaultTo(0)
        table.integer('plumbing_and_gas').notNullable().defaultTo(0)
        table.integer('electrical').notNullable().defaultTo(0)
        table.integer('kitchen').notNullable().defaultTo(0)
        table.integer('bathrooms').notNullable().defaultTo(0)
        table.integer('windows').notNullable().defaultTo(0)
        table.integer('doors').notNullable().defaultTo(0)
        table.integer('water_heater').notNullable().defaultTo(0)
        table.integer('foundation').notNullable().defaultTo(0)
        table.integer('framing').notNullable().defaultTo(0)
        table.integer('dry_wall_and_paint').notNullable().defaultTo(0)
        table.integer('flooring').notNullable().defaultTo(0)
        table.integer('washer_and_dryer').notNullable().defaultTo(0)
        table.integer('siding_and_exterior_trim').notNullable().defaultTo(0)
        table.integer('patio_and_shed').notNullable().defaultTo(0)
        table.integer('landscaping').notNullable().defaultTo(0)
        table.integer('optional_features').notNullable().defaultTo(0)

        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at').defaultTo(null).nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
}

