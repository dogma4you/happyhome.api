import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('contracts', table => {
        table.integer('totalSalesPrice').defaultTo(null).nullable()
        table.integer('estAvr').defaultTo(null).nullable()
        table.integer('estRentMo').defaultTo(null).nullable()
        table.integer('price').defaultTo(null).nullable()
        table.integer('estNetProfit').defaultTo(null).nullable()
        table.integer('estRepairCost').defaultTo(null).nullable()
        table.integer('buyersFee').defaultTo(null).nullable()
        table.integer('earnestMoneyDep').defaultTo(null).nullable()
        table.integer('totalAmount').defaultTo(null).nullable()

        table.string('asignmentContract').defaultTo(null).nullable()
        table.string('realEstatePurchseAgreement').defaultTo(null).nullable()
        table.string('competitiveMarketAnalisys').defaultTo(null).nullable()
        table.string('scopeOfWork').defaultTo(null).nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('contracts')
}

