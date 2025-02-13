import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('contracts', table => {
    table.integer('purchasement').unsigned()
    table.foreign('purchasement').references('id').inTable('purchased_contracts')
  })
}


export async function down(knex: Knex): Promise<void> {
}

