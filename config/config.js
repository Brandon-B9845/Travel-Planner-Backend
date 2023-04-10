import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
const username = process.env.SIGN_IN_NAME
const host = process.env.HOST
const databaseName = process.env.DATABASE
const password = process.env.PASSWORD

export default {
    username: username,
    password: password,
    database: databaseName,
    host: host,
    dialect: "postgres"

}
