module.exports = function (sequelize, DataTypes) {
  const estimateProduct = sequelize.define('shelfEstimateProduct', {
    sort: {type: DataTypes.INTEGER, allowNull: false},
  }, {freezeTableName: true})

  estimateProduct.associate = function (model) {
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

    estimateProduct.belongsTo(model.estimate, options('estimate'))
    estimateProduct.belongsTo(model.product, options('product'))
  }

  return estimateProduct
}
