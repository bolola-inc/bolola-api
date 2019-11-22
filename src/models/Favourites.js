"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Favourites", {
    userSearchesId: {
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
