const config = require("./index");
module.exports = {
    test: {
        username: config.DB_USERNAME,
        password: config.DB_PASSWORD,
        database: config.DB_TEST_DATABASE,
        host: config.DB_HOST,
        port: config.DB_PORT,
        dialect: "mysql"
    },
    development: {
        username: config.DB_USERNAME,
        password: config.DB_PASSWORD,
        database: config.DB_DATABASE,
        host: config.DB_HOST,
        port: config.DB_PORT,
        dialect: "mysql"
    },
    local: {
        username: config.DB_USERNAME,
        password: config.DB_PASSWORD,
        database: config.DB_DATABASE,
        host: config.DB_HOST,
        port: config.DB_PORT,
        dialect: "mysql"
    },
    production: {
        username: config.DB_USERNAME,
        password: config.DB_PASSWORD,
        database: config.DB_DATABASE,
        host: config.DB_HOST,
        port: config.DB_PORT,
        dialect: "mysql"
    }
};