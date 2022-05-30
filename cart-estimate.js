module.exports = function (sequelize, DataTypes) {
  const cartEstimate = sequelize.define('shelfCartEstimate', {
  }, {freezeTableName: true})

  cartEstimate.associate = function (model) {
    const options = (as) => process.env.DB_IS_VITESS === '1'
      ? {
        as,
        foreignKey: {allowNull: false},
        constraints: false,
      } : {
        as,
        foreignKey: {allowNull: false},
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }

    cartEstimate.belongsTo(model.cart, options('cart'))
    cartEstimate.belongsTo(model.estimate, options('estimate'))
  }

  return cartEstimate
}
