"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.alterTable('contracts', table => {
        table.date('builtYear_temp');
    });
    await knex.raw(`
    UPDATE "contracts"
    SET "builtYear_temp" = to_date("builtYear"::text, 'YYYY');
  `);
    await knex.schema.alterTable('contracts', table => {
        table.dropColumn('builtYear');
    });
    await knex.schema.alterTable('contracts', table => {
        table.renameColumn('builtYear_temp', 'builtYear');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.alterTable('contracts', table => {
        table.integer('builtYear_temp');
    });
    await knex.raw(`
    UPDATE "contracts"
    SET "builtYear_temp" = extract(year from "builtYear");
  `);
    await knex.schema.alterTable('contracts', table => {
        table.dropColumn('builtYear');
    });
    await knex.schema.alterTable('contracts', table => {
        table.renameColumn('builtYear_temp', 'builtYear');
    });
}
exports.down = down;
//# sourceMappingURL=20240918210851_change_contract_built_year.js.map