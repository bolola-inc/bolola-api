"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Users", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    deviceId: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING(199)
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
  });
};
