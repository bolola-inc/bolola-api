const RouteController = require("../controllers/RouteController");

module.exports = async (router) => {
	router.get('/find_route', RouteController)
};