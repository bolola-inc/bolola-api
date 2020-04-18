"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("RouteStations", {
      routeId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      stationId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      order: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable("RouteStations");
  }
};
