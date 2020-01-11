"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("UserWereNearStations", {
      userId: {
        allowNull: false,
        type: Sequelize.INTAGER
      },
      stationId: {
        allowNull: false,
        type: Sequelize.INTAGER
      },
      time: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("UserWereNearStations");
  }
};
