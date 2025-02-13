"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('proof_of_founds', table => {
        table.increments('id').primary();
        table.integer('user').unsigned();
        table.foreign('user').references('id').inTable('users');
        table.jsonb('files').nullable().defaultTo([]);
        table.integer('status').notNullable().defaultTo(1);
        table.timestamp('expire_at').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).nullable();
        table.timestamp('updated_at').defaultTo(null).nullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('proof_of_founds');
}
exports.down = down;
//# sourceMappingURL=20240918062857_proof_of_founds.js.map