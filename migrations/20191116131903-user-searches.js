"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("UsersSearches", {
      userId: {
        allowNull: false,
        type: Sequelize.INT
      },
      stationFromId: {
        unique: true,
        allowNull: false,
        type: Sequelize.INT
      },
      stationToId: {
        allowNull: false,
        type: Sequelize.INT
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
    return queryInterface.dropTable("UsersSearches");
  }
};
