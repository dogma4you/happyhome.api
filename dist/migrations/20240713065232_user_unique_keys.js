"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterTable('users', table => {
        table.dropUnique(['first_name']);
        table.dropUnique(['last_name']);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.alterTable('users', table => {
        table.unique(['first_name']);
        table.unique(['last_name']);
    });
}
exports.down = down;
//# sourceMappingURL=20240713065232_user_unique_keys.js.map