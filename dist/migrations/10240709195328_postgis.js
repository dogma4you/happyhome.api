"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS postgis');
}
exports.up = up;
async function down(knex) {
    await knex.raw('DROP EXTENSION IF EXISTS postgis');
}
exports.down = down;
//# sourceMappingURL=10240709195328_postgis.js.map