'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transactiondate: {
        type: Sequelize.DATE
      },
      month: {
        type: Sequelize.STRING
      },
      transactiontype: {
        type: Sequelize.STRING
      },
      fromaccount: {
        type: Sequelize.STRING
      },
      toaccount: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      receipt: {
        type: Sequelize.TEXT
      },
      notes: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};