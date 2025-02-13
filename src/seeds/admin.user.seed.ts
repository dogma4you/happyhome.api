import type { Knex } from "knex";
import { SettingsModeTypeEnum, UserActivityTypeEnum, UserTypeEnum } from '../constants/enum';
import { HashService } from '../services/hash.service';

export async function seed(knex: Knex): Promise<void> {
  const tableName = 'users';
  const settingsTableName = 'user_settings';
  const hashService = new HashService();
  const existAdmin = await knex(tableName).where({ email: 'admin@gmail.com', type: UserTypeEnum.admin });
  if (!existAdmin.length) {
    const user: any = await knex(tableName).insert(
        {
            type: UserTypeEnum.admin,
            activity: UserActivityTypeEnum.hh_admin,
            email: 'admin@gmail.com',
            first_name: 'Admin',
            last_name: 'Admin',
            phone: '+1-777-77-7777',
            email_verified_at: new Date(),
            registration_date: new Date(),
            password: await hashService.hash('Password1/')
        }
      ).returning('id');
      await knex(settingsTableName).insert({
        user: user[0].id,
        mode: SettingsModeTypeEnum.light,
        push_notifications: true
      })
      console.log('SEED ','Admin user identified successful');
  }
  
}
