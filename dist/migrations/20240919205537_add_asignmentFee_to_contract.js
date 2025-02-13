"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterTable('contracts', table => {
        table.integer('asignmentFee').defaultTo(null).nullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('contracts');
}
exports.down = down;
//# sourceMappingURL=20240919205537_add_asignmentFee_to_contract.js.map