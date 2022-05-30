module.exports = function (sequelize, DataTypes) {
  const questionProduct = sequelize.define('shelfQuestionProduct', {
    sort: {type: DataTypes.INTEGER, allowNull: false},
  }, {freezeTableName: true})

  questionProduct.associate = function (model) {
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

    questionProduct.belongsTo(model.question, options('question'))
    questionProduct.belongsTo(model.product, options('product'))
  }

  return questionProduct
}
