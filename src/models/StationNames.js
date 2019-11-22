"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("StationNames", {
    stationId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INT
    },
    placeNamesId: {
      allowNull: true,
      type: DataTypes.INT
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
