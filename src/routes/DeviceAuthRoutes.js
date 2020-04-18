const DeviceAuthController = require("../controllers/DeviceAuthController");

module.exports = async (router) => {
  router.post("/auth/device", DeviceAuthController.AuthDevice);
};
