export default ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DB_NAME', 'jugger'),
      user: env('DB_USER', 'user'),
      password: env('DB_PASS', 'pass'),
      ssl: env.bool('DATABASE_SSL', false)
    }
  }
})
