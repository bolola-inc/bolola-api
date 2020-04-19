"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Hosts", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    countriesId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING(45)
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(199)
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(60)
    },
    rememberToken: {
      type: DataTypes.STRING(60)
    },
    confirmedAt: {
      type: DataTypes.DATE
    },
    confirmationCode: {
      type: DataTypes.STRING(60)
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
  });
};
