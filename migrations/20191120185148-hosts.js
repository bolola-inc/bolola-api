"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Hosts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTAGER
      },
      countriesId: {
        allowNull: false,
        type: Sequelize.INTAGER
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
        allowNull: false,
        type: Sequelize.STRING(60)
      },
      confirmedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      confirmationCode: {
        allowNull: false,
        type: Sequelize.STRING(60)
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Hosts");
  }
};
