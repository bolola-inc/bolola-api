const RouteController = require("../controllers/RouteController")
const { authenticateToken } = require("../utils/jwtHelper")

module.exports = async (router) => {
  router.get('/find_route', RouteController.FindRoute)
}
