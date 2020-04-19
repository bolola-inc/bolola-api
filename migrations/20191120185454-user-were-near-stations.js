"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("UserWereNearStations", {
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      stationId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      time: {
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
    return queryInterface.dropTable("UserWereNearStations");
  }
};
