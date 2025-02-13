"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('transactions', table => {
        table.increments('id').primary();
        table.integer('user').unsigned();
        table.foreign('user').references('id').inTable('users');
        table.string('transactionId').notNullable();
        table.integer('type').notNullable();
        table.integer('price').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(null).nullable();
    });
}
exports.up = up;
async function down(knex) {
}
exports.down = down;
//# sourceMappingURL=20240708194745_transactions.js.map