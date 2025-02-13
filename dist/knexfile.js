"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    development: {
        client: 'pg',
        connection: {
            database: 'happy_home',
            user: 'postgres',
            password: '1111',
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations',
        },
        seeds: {
            directory: './seeds'
        }
    },
};
//# sourceMappingURL=knexfile.js.map