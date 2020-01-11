"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("UsersSearches", {
      userId: {
        allowNull: false,
        type: Sequelize.INTAGER
      },
      stationFromId: {
        unique: true,
        allowNull: false,
        type: Sequelize.INTAGER
      },
      stationToId: {
        allowNull: false,
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
    return queryInterface.dropTable("UsersSearches");
  }
};
