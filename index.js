'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const winston = require('winston');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};
const dialectOptions = process.env.DB_IS_SSL === '1'
  ? {
    ssl: {
      rejectUnauthorized: true,
    },
  } : {}

const sequelize = new Sequelize(process.env.DB_URL, {
  logging: message => winston.loggers.get('query').info(message),
  logQueryParameters: true,
  dialectOptions,
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[toModelName(file)] = model;
  });

function toModelName (file) {
  return path.basename(file, path.extname(file))
    .split('-')
    .map((piece, i) => {
      if (i === 0) {
        return piece
      } else {
        return piece[0].toUpperCase() + piece.slice(1)
      }
    })
    .join('')
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
