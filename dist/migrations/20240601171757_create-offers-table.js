"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('offers', table => {
        table.increments('id').primary();
        table.integer('user').unsigned();
        table.foreign('user').references('id').inTable('users');
        table.integer('status').nullable().defaultTo(1);
        table.integer('sellerType').nullable().defaultTo(1);
        table.integer('address').unsigned();
        table.foreign('address').references('id').inTable('addresses');
        table.integer('propertyType').nullable();
        table.integer('descriptionType').nullable();
        table.date('builtYear').nullable().defaultTo(null);
        table.integer('heating').nullable();
        table.integer('airConditioning').nullable();
        table.integer('waterSupply').nullable();
        table.integer('sewer').nullable();
        table.integer('electricPanel').nullable();
        table.json('exteriorType').nullable().defaultTo([]);
        table.integer('lotSize').nullable();
        table.integer('currentHOA').nullable();
        table.integer('property_condition').unsigned();
        table.foreign('property_condition').references('id').inTable('property_conditions');
        table.boolean('isSentUploadLink').defaultTo(false);
        table.jsonb('images').nullable().defaultTo([]);
        table.jsonb('files').nullable().defaultTo([]);
        table.integer('price').nullable().defaultTo(null);
        table.integer('estimated_lower_price').nullable().defaultTo(null);
        table.integer('estimated_higher_price').nullable().defaultTo(null);
        table.timestamp('estimated_date').defaultTo(null).nullable();
        table.integer('estimated_by').unsigned();
        table.foreign('estimated_by').references('id').inTable('users');
        table.timestamp('created_at').defaultTo(knex.fn.now()).nullable();
        table.timestamp('updated_at').defaultTo(null).nullable();
    });
}
exports.up = up;
async function down(knex) {
}
exports.down = down;
//# sourceMappingURL=20240601171757_create-offers-table.js.map