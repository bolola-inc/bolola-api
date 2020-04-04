const express = require("express");
const router = express.Router();

const Auth = require("./AuthRoutes");
const HostRoutes = require("./HostRoutes");
const FindRoute = require("./FindRoute");
const FavouritesRoute = require("./FavouritesRoute")

const registerRouters = async () => {
  await Auth(router);
  await HostRoutes(router);
  await FindRoute(router);
  await FavouritesRoute(router);

  return router;
};

module.exports = {
  registerRouters,
};
