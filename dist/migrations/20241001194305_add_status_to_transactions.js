"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const enum_1 = require("../constants/enum");
async function up(knex) {
    return knex.schema.alterTable('transactions', table => {
        table.integer('status').defaultTo(enum_1.TransactionsStatusEnum.pending);
    });
}
exports.up = up;
async function down(knex) {
}
exports.down = down;
//# sourceMappingURL=20241001194305_add_status_to_transactions.js.map