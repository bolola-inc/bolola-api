"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Hosts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      countriesId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(45)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(199)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(60)
      },
      rememberToken: {
        type: Sequelize.STRING(60)
      },
      confirmedAt: {
        type: Sequelize.DATE
      },
      confirmationCode: {
        type: Sequelize.STRING(60)
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
    return queryInterface.dropTable("Hosts");
  }
};
