"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.integer('type').notNullable().defaultTo(2);
        table.integer('activity').notNullable().defaultTo(2);
        table.string('first_name').nullable().unique();
        table.string('last_name').nullable().unique();
        table.string('email').nullable().unique();
        table.date('email_verified_at').defaultTo(null);
        table.string('email_validation').defaultTo(null);
        table.string('password').nullable();
        table.date('last_password_changed').nullable().defaultTo(null);
        table.string('phone').defaultTo(null);
        table.boolean('deleted').defaultTo(false);
        table.text('deleted_by_reason').defaultTo(null);
        table.timestamp('registration_date').defaultTo(null).nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(null).nullable();
    });
}
exports.up = up;
async function down(knex) {
}
exports.down = down;
//# sourceMappingURL=20240514210423_create_users_table.js.map