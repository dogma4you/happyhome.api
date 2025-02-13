"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('areas', table => {
        table.increments('id').primary();
        table.integer('offer').unsigned();
        table.foreign('offer').references('id').inTable('offers');
        table.integer('contract').unsigned();
        table.foreign('contract').references('id').inTable('contracts');
        table.integer('isOffer').defaultTo(0);
        table.integer('square_feet').nullable();
        table.integer('bedrooms').nullable();
        table.integer('bathrooms').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(null).nullable();
    });
}
exports.up = up;
async function down(knex) {
}
exports.down = down;
//# sourceMappingURL=20240819054050_areas.js.map