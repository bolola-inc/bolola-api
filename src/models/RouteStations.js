"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("RouteStations", {
    routeId: {
      allowNull: false,
      type: DataTypes.INT
    },
    stationId: {
      allowNull: false,
      type: DataTypes.INT
    },
    order: {
      type: DataTypes.INT
    },
    price: {
      type: DataTypes.FLOAT
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
