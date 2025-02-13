"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterTable('pipedrive_actions', table => {
        table.integer('person').nullable().defaultTo(null);
    });
}
exports.up = up;
async function down(knex) {
}
exports.down = down;
//# sourceMappingURL=20241128185816_add_pipedrive_action_person.js.map