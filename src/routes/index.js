const express = require("express");
const router = express.Router();

const Auth = require("./AuthRoutes");
const HostRoutes = require("./HostRoutes");
const FindRoute = require("./FindRoute");
const SearchRoute = require('./SearchRoutes');

const registerRouters = async () => {
  await Auth(router);
  await HostRoutes(router);
  await FindRoute(router);
  await SearchRoute(router);

  return router;
};

module.exports = {
  registerRouters,
};
