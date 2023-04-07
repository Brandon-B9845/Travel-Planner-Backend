'use strict';

import fs from 'fs';
import path from 'path';
import process from 'process';
import { Sequelize } from 'sequelize-typescript';
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {} as any;

let sequelize;
console.log('about to make sequelize connection...')
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config) ;
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
console.log("connection made")
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
