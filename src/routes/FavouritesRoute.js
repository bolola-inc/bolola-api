const { authenticateToken } = require("../utils/jwtHelper")
const RouteController = require("../controllers/FavouritesController")

module.exports = async (router) => {
  router.get('/favourites', authenticateToken, RouteController.GetFavourites)
  router.post('/favourites', authenticateToken, RouteController.CreateFavourites)
  router.delete('/favourites/:id', authenticateToken, RouteController.DeleteFavourites)
}
