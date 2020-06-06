const RoutesController = require("../controllers/RoutesController");

module.exports = async (router) => {
  router.get("/routes", RoutesController.GetRoutes);
  router.post("/routes", RoutesController.CreateRoutes);
  router.put("/routes/:id", RoutesController.UpdateRoutes);
  router.delete("/routes/:id", RoutesController.DeleteRoutes);
}
