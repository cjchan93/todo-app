const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

const {
    host,
    port,
    username,
    password,
    database
} = require("../config/db")[env];

let db = {
    __assignModelFunctions: []
};

let sequelize = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: "mysql",
    logging: env === "development"
});

fs.readdirSync(__dirname)
    .filter(
        file =>
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
    )
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model; //changed model.name to file.slice(0, -3)
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
