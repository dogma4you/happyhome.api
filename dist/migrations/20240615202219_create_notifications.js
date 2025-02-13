"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('notifications', table => {
        table.increments('id').primary();
        table.integer('user').unsigned();
        table.foreign('user').references('id').inTable('users');
        table.integer('type').notNullable().defaultTo(1);
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.integer('seen').notNullable().defaultTo(2);
        table.date('seen_at').defaultTo(null);
        table.integer('deleted').defaultTo(0).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(null).nullable();
    });
}
exports.up = up;
async function down(knex) {
}
exports.down = down;
//# sourceMappingURL=20240615202219_create_notifications.js.map