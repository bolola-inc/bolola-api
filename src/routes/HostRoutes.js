const HostsController = require("../controllers/HostsController");

module.exports = async (router) => {
  router.post("/hosts", HostsController.CreateHost);
  router.get("/hosts", HostsController.GetHosts);
  router.get("/hosts/:id", HostsController.GetHostById);
  router.put("/hosts/:id", HostsController.UpdateHost);
  router.delete("/hosts/:id", HostsController.DeleteHost);
};
