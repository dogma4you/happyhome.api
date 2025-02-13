"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('email_verifications', table => {
        table.increments('id').primary();
        table.integer('type').notNullable().defaultTo(2);
        table.string('code').notNullable();
        table.string('email').notNullable().unique();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(null).nullable();
    });
}
exports.up = up;
async function down(knex) {
}
exports.down = down;
//# sourceMappingURL=20240518204414_email_verifications.js.map