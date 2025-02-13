import type { Knex } from "knex";
import { OfferStatusEnum, SellerTypeEnum, PropertyTypeEnum, PropertyDescriptionTypeEnum, OfferParamsStatusEnum, ExteriorTypeEnum, HOATypeEnum } from "src/constants/enum";




export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user_settings', table => {
        table.increments('id').primary()
        
        table.integer('user').unsigned()
        table.foreign('user').references('id').inTable('users')

        table.integer('mode').notNullable().defaultTo(2)
        table.boolean('push_notifications').notNullable().defaultTo(true)

        table.timestamp('created_at').defaultTo(knex.fn.now()).nullable()
        table.timestamp('updated_at').defaultTo(null).nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
}

