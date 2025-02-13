import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('transactions', table => {
    table.integer('credits').defaultTo(null).nullable();
    table.integer('plan').unsigned()
    table.foreign('plan').references('id').inTable('plans')
  })
}


export async function down(knex: Knex): Promise<void> {
}

