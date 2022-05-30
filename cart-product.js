module.exports = function (sequelize, DataTypes) {
  const cartProduct = sequelize.define('shelfCartProduct', {
    date: {type: DataTypes.DATE, allowNull: false},
  }, {freezeTableName: true})

  cartProduct.associate = function (model) {
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

    cartProduct.belongsTo(model.cart, options('cart'))
    cartProduct.belongsTo(model.product, options('product'))
  }

  return cartProduct
}
