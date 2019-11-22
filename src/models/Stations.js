"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Stations", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INT
    },
    long: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    lat: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    hostId: {
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
