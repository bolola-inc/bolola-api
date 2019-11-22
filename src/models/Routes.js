"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Routes", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INT
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(45)
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING(45)
    },
    deletedAt: {
      allowNull: false,
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
