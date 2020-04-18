"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("UsersSearches", {
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      stationFromId: {
        unique: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      stationToId: {
        allowNull: false,
        type: Sequelize.INTEGER
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
