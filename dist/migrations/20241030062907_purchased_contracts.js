"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('purchased_contracts', table => {
        table.increments('id').primary();
        table.integer('user').unsigned();
        table.foreign('user').references('id').inTable('users');
        table.integer('contract').unsigned();
        table.foreign('contract').references('id').inTable('contracts');
        table.integer('price').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(null).nullable();
    });
}
exports.up = up;
async function down(knex) {
}
exports.down = down;
//# sourceMappingURL=20241030062907_purchased_contracts.js.map