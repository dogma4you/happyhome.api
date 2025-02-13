"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const enum_1 = require("../constants/enum");
const hash_service_1 = require("../services/hash.service");
async function seed(knex) {
    const tableName = 'users';
    const settingsTableName = 'user_settings';
    const hashService = new hash_service_1.HashService();
    const existAdmin = await knex(tableName).where({ email: 'admin@gmail.com', type: enum_1.UserTypeEnum.admin });
    if (!existAdmin.length) {
        const user = await knex(tableName).insert({
            type: enum_1.UserTypeEnum.admin,
            activity: enum_1.UserActivityTypeEnum.hh_admin,
            email: 'admin@gmail.com',
            first_name: 'Admin',
            last_name: 'Admin',
            phone: '+1-777-77-7777',
            email_verified_at: new Date(),
            registration_date: new Date(),
            password: await hashService.hash('Password1/')
        }).returning('id');
        await knex(settingsTableName).insert({
            user: user[0].id,
            mode: enum_1.SettingsModeTypeEnum.light,
            push_notifications: true
        });
        console.log('SEED ', 'Admin user identified successful');
    }
}
exports.seed = seed;
//# sourceMappingURL=admin.user.seed.js.map