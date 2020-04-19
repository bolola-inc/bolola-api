const express = require("express");
const router = express.Router();

const Auth = require("./AuthRoutes");
const AuthDevice = require("./DeviceAuthRoutes");
const HostRoutes = require("./HostRoutes");
const FindRoute = require("./FindRoute");
const SearchRoute = require('./SearchRoutes');
const FavouritesRoute = require("./FavouritesRoute")

const registerRouters = async () => {
  await Auth(router);
  await AuthDevice(router);
  await HostRoutes(router);
  await FindRoute(router);
  await SearchRoute(router);
  await FavouritesRoute(router);

  return router;
};

module.exports = {
  registerRouters,
};
