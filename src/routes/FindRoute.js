const RouteController = require("../controllers/RouteController");
const AuthController = require("../controllers/AuthController");
module.exports = async (router) => {
	router.get('/find_route',AuthController.authenticateToken, RouteController.FindRoute);
};
