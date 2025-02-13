"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('files', table => {
        table.increments('id').primary();
        table.integer('user').unsigned();
        table.foreign('user').references('id').inTable('users');
        table.integer('belongs').nullable().defaultTo(null);
        table.string('originalName').defaultTo(null);
        table.string('name').notNullable().unique();
        table.integer('type').notNullable().defaultTo(1);
        table.integer('isPrimary').defaultTo(0);
        table.integer('size').notNullable();
        table.string('ext').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(null).nullable();
    });
}
exports.up = up;
async function down(knex) {
}
exports.down = down;
//# sourceMappingURL=20240529211415_files.js.map