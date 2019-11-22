"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Countries", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INT
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(45)
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Countries");
  }
};
