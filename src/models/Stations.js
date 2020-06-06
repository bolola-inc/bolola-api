"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Stations", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
      type: DataTypes.INTEGER
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
