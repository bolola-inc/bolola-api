const RouteController = require("../controllers/FavouritesController");

module.exports = async (router) => {
	router.get('/favourites', RouteController.GetFavourites);
	router.post('/favourites', RouteController.CreateFavourites);
	router.put('/favourites', RouteController.UpdateFavourites);
	router.delete('/favourites', RouteController.DeleteFavourites);
};