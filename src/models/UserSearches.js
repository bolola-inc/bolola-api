"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("UserSearches", {
    userId: {
      allowNull: false,
      type: DataTypes.INT
    },
    stationFromId: {
      unique: true,
      allowNull: false,
      type: DataTypes.INT
    },
    stationToId: {
      allowNull: false,
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
