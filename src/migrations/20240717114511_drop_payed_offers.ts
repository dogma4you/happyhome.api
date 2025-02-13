import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    knex.schema.dropTable('payed_offers')
}


export async function down(knex: Knex): Promise<void> {
}

