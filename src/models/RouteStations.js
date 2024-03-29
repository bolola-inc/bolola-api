"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("RouteStations", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    routeId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    stationId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    order: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.FLOAT
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
    }
  });
};
