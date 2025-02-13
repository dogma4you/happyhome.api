"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterTable('contracts', table => {
        table.integer('purchasement').unsigned();
        table.foreign('purchasement').references('id').inTable('purchased_contracts');
    });
}
exports.up = up;
async function down(knex) {
}
exports.down = down;
//# sourceMappingURL=20241030063830_contract_purchasement.js.map