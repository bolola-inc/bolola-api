const { authenticateToken } = require("../utils/jwtHelper")
const RouteController = require("../controllers/StationController")

module.exports = async (router) => {
  router.get('/station', authenticateToken, RouteController.GetStations)
  router.post('/station', authenticateToken, RouteController.CreateStation)
  router.put('/station/:id', authenticateToken, RouteController.UpdateStation)
  router.delete('/station/:id', authenticateToken, RouteController.DeleteStation)
}

