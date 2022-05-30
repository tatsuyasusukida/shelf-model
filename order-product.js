module.exports = function (sequelize, DataTypes) {
  const orderProduct = sequelize.define('shelfOrderProduct', {
    sort: {type: DataTypes.INTEGER, allowNull: false},
  }, {freezeTableName: true})

  orderProduct.associate = function (model) {
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

    orderProduct.belongsTo(model.order, options('order'))
    orderProduct.belongsTo(model.product, options('product'))
  }

  return orderProduct
}
