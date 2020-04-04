const RouteController = require("../controllers/FavouritesController");

module.exports = async (router) => {
	router.get('/favourites', RouteController.GetFavourites);
};