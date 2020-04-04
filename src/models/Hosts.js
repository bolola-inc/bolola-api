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
      type: DataTypes.STRING(199),
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(60)
    },
    rememberToken: {
      allowNull: true,
      type: DataTypes.STRING(60)
    },
    confirmedAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    confirmationCode: {
      allowNull: true,
      type: DataTypes.STRING(60)
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
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
