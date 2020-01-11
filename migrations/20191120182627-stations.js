"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Stations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTAGER
      },
      long: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      lat: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      hostId: {
        type: Sequelize.INTAGER
      },
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Stations");
  }
};
