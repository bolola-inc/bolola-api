const express = require("express");
const router = express.Router();

const Auth = require("./AuthRoutes");
const AuthDevice = require("./DeviceAuthRoutes");
const HostRoutes = require("./HostRoutes");
const FindRoute = require("./FindRoute");
const FavouritesRoute = require("./FavouritesRoute");
const StationSearchRoutes = require('./StationSearchRoutes');
const StationsRoute = require('./StationsRoute');
const SearchRoute = require('./SearchRoutes');
const RoutesRoutes = require("./RoutesRoutes")

const registerRouters = async () => {
  await Auth(router);
  await AuthDevice(router);
  await HostRoutes(router);
  await FindRoute(router);
  await SearchRoute(router);
  await FavouritesRoute(router);
  await RoutesRoutes(router);
  await StationSearchRoutes(router);
  await StationsRoute(router);

  return router;
};

module.exports = {
  registerRouters,
};
