"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("RouteStations", {
      routeId: {
        allowNull: false,
        type: Sequelize.INTAGER
      },
      stationId: {
        allowNull: false,
        type: Sequelize.INTAGER
      },
      order: {
        type: Sequelize.INTAGER
      },
      price: {
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable("RouteStations");
  }
};
