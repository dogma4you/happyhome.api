"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterTable('users', table => {
        table.string('avatar').defaultTo(null).nullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('users');
}
exports.down = down;
//# sourceMappingURL=20240918212855_add_avatar_to_user.js.map