import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('users', table => {
        table.dropUnique(['first_name']);
        table.dropUnique(['last_name']);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('users', table => {
        table.unique(['first_name']);
        table.unique(['last_name']);
    });
}
