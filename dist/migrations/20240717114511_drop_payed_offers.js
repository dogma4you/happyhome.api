"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    knex.schema.dropTable('payed_offers');
}
exports.up = up;
async function down(knex) {
}
exports.down = down;
//# sourceMappingURL=20240717114511_drop_payed_offers.js.map