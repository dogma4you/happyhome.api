"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterTable('contracts', table => {
        table.integer('totalSalesPrice').defaultTo(null).nullable();
        table.integer('estAvr').defaultTo(null).nullable();
        table.integer('estRentMo').defaultTo(null).nullable();
        table.integer('price').defaultTo(null).nullable();
        table.integer('estNetProfit').defaultTo(null).nullable();
        table.integer('estRepairCost').defaultTo(null).nullable();
        table.integer('buyersFee').defaultTo(null).nullable();
        table.integer('earnestMoneyDep').defaultTo(null).nullable();
        table.integer('totalAmount').defaultTo(null).nullable();
        table.string('asignmentContract').defaultTo(null).nullable();
        table.string('realEstatePurchseAgreement').defaultTo(null).nullable();
        table.string('competitiveMarketAnalisys').defaultTo(null).nullable();
        table.string('scopeOfWork').defaultTo(null).nullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('contracts');
}
exports.down = down;
//# sourceMappingURL=20240918223708_add_contract_prices.js.map