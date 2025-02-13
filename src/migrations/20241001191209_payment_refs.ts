import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('payment_infos', table => {
    table.increments('id').primary()
    
    table.string('recipient').notNullable();
    table.string('bank_name').notNullable();
    table.string('bank_address').notNullable();
    table.string('routing_number').notNullable();
    table.string('account_number').notNullable();
    table.string('account_type').notNullable();
    table.string('reference_number').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('updated_at').defaultTo(null).nullable()
})
}


export async function down(knex: Knex): Promise<void> {
}

