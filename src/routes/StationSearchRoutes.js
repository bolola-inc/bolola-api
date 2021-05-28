const StationController = require("../controllers/StationController");

module.exports = async (router) => {
    router.get('/search/station', StationController.GetStation);
};
