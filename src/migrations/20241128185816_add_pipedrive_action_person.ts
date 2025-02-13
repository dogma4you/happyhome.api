import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('pipedrive_actions', table => {
    table.integer('person').nullable().defaultTo(null);
  })
}


export async function down(knex: Knex): Promise<void> {
}

