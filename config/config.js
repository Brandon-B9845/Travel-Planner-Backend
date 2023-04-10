

export default {
    username: "postgres",
    password: process.env.DATABASE_PASSWORD,
    database: "postgres",
    host: process.env.DATABASE,
    dialect: "postgres"

}
