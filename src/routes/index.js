const express = require("express");
const router = express.Router();

const Auth = require("./AuthRoutes");
const HostRoutes = require("./HostRoutes");
const FindRoute = require("./FindRoute");

const registerRouters = async () => {
  await Auth(router);
  await HostRoutes(router);
  await FindRoute(router);

  return router;
};

module.exports = {
  registerRouters,
};
