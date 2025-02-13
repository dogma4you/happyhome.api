"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('payment_infos', table => {
        table.increments('id').primary();
        table.string('recipient').notNullable();
        table.string('bank_name').notNullable();
        table.string('bank_address').notNullable();
        table.string('routing_number').notNullable();
        table.string('account_number').notNullable();
        table.string('account_type').notNullable();
        table.string('reference_number').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(null).nullable();
    });
}
exports.up = up;
async function down(knex) {
}
exports.down = down;
//# sourceMappingURL=20241001191209_payment_refs.js.map