

export default {
  "development": {
    "username": "postgres",
    "password": process.env.DATABASE_PASSWORD,
    "database": "database_development",
    "host": process.env.DATABASE,
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": process.env.DATABASE_PASSWORD,
    "database": "database_test",
    "host": process.env.DATABASE,
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": process.env.DATABASE_PASSWORD,
    "database": "database_production",
    "host": process.env.DATABASE,
    "dialect": "postgres"
  }
}
