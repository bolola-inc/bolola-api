const { authenticateToken } = require("../utils/jwtHelper")
const RouteController = require("../controllers/StationController")

module.exports = async (router) => {
  router.get('/station', authenticateToken, RouteController.list)
  router.post('/station', authenticateToken, RouteController.create)
  router.get('/station/:id', authenticateToken, RouteController.getById)
  router.put('/station/:id', authenticateToken, RouteController.update)
  router.delete('/station/:id', authenticateToken, RouteController.destroy)
}

