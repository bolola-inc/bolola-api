"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("PlaceNames", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INT
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(200)
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
