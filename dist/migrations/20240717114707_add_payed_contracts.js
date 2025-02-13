"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('payed_contracts', table => {
        table.increments('id').primary();
        table.integer('user').unsigned();
        table.foreign('user').references('id').inTable('users');
        table.integer('contract').unsigned();
        table.foreign('contract').references('id').inTable('contracts');
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(null).nullable();
    });
}
exports.up = up;
async function down(knex) {
}
exports.down = down;
//# sourceMappingURL=20240717114707_add_payed_contracts.js.map