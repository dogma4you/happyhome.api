export default {
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
  }