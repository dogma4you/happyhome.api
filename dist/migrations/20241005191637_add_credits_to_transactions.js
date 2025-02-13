"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterTable('transactions', table => {
        table.integer('credits').defaultTo(null).nullable();
        table.integer('plan').unsigned();
        table.foreign('plan').references('id').inTable('plans');
    });
}
exports.up = up;
async function down(knex) {
}
exports.down = down;
//# sourceMappingURL=20241005191637_add_credits_to_transactions.js.map