"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('balance_history', table => {
        table.increments('id').primary();
        table.integer('balance').unsigned();
        table.foreign('balance').references('id').inTable('balances');
        table.integer('transaction').unsigned();
        table.foreign('transaction').references('id').inTable('transactions');
        table.integer('action').notNullable();
        table.integer('value').notNullable();
        table.integer('balanceBefore').notNullable();
        table.integer('balanceAfter').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(null).nullable();
    });
}
exports.up = up;
async function down(knex) {
}
exports.down = down;
//# sourceMappingURL=20240709185751_balance_history.js.map