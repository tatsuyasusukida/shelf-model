module.exports = function (sequelize, DataTypes) {
  const admin = sequelize.define('shelfAdmin', {
    username: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
  }, {freezeTableName: true})

  return admin
}
