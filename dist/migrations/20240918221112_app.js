"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterTable('app_settings', table => {
        table.integer('singleCreditPrice').defaultTo(0).nullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('app_settings');
}
exports.down = down;
//# sourceMappingURL=20240918221112_app.js.map