"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('addresses', table => {
        table.increments('id').primary();
        table.integer('user').unsigned();
        table.foreign('user').references('id').inTable('users');
        table.string('country').nullable().defaultTo(null);
        table.string('city').nullable().defaultTo(null);
        table.string('state').nullable().defaultTo(null);
        table.string('street').nullable().defaultTo(null);
        table.string('postal_code').nullable().defaultTo(null);
        table.string('formatted_address').nullable().defaultTo(null);
        table.double('lat').nullable().defaultTo(null);
        table.double('lng').nullable().defaultTo(null);
        table.specificType('location', 'geometry(Point, 4326)').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(null).nullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('addresses');
}
exports.down = down;
//# sourceMappingURL=20240526124204_addresses.js.map