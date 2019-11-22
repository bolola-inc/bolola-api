const express = require("express");
const router = express.Router();

const Auth = require("./AuthRoutes");
const HostRoutes = require("./HostRoutes");

const registerRouters = async () => {
  await Auth(router);
  await HostRoutes(router);

  return router;
};

module.exports = {
  registerRouters,
};
