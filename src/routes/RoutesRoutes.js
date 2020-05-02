const RoutesController = require("../controllers/RoutesController");

module.exports = async (router) => {
  router.post("/routes", RoutesController.CreateRoutes);
  router.put("/routes/:id", RoutesController.UpdateRoutes);
};