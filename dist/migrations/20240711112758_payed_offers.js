"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('payed_offers', table => {
        table.increments('id').primary();
        table.integer('user').unsigned();
        table.foreign('user').references('id').inTable('users');
        table.integer('offer').unsigned();
        table.foreign('offer').references('id').inTable('offers');
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(null).nullable();
    });
}
exports.up = up;
async function down(knex) {
}
exports.down = down;
//# sourceMappingURL=20240711112758_payed_offers.js.map