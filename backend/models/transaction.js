'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaction.init({
    transactiondate: DataTypes.DATE,
    month: DataTypes.STRING,
    transactiontype: DataTypes.STRING,
    fromaccount: DataTypes.STRING,
    toaccount: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    receipt: DataTypes.TEXT,
    notes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};