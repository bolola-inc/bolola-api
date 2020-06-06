const express = require("express");
const router = express.Router();

const Auth = require("./AuthRoutes");
const AuthDevice = require("./DeviceAuthRoutes");
const HostRoutes = require("./HostRoutes");
const FindRoute = require("./FindRoute");
const FavouritesRoute = require("./FavouritesRoute");
const StationRoutes = require('./StationRoutes');

const registerRouters = async () => {
  await Auth(router);
  await AuthDevice(router);
  await HostRoutes(router);
  await FindRoute(router);
  await FavouritesRoute(router);
  await StationRoutes(router);

  return router;
};

module.exports = {
  registerRouters,
};
