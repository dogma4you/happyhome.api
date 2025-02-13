import { Knex } from 'knex';

export async function up(knex) {
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

export async function down(knex) {
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
