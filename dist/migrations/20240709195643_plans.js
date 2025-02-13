"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('plans', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.integer('credits').notNullable();
        table.integer('price').notNullable();
        table.boolean('published').defaultTo(true);
        table.string('description').notNullable();
        table.integer('discount').nullable().defaultTo(null);
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(null).nullable();
    });
}
exports.up = up;
async function down(knex) {
}
exports.down = down;
//# sourceMappingURL=20240709195643_plans.js.map