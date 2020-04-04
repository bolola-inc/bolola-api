"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Favourites", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userSearchesId: {
      allowNull: false,
      type: DataTypes.INTEGER
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
