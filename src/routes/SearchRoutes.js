const SearchHistory = require('../controllers/SearchController')

module.exports = async (router) => {
    router.get('/search_history/:username', SearchHistory.GetSearchHistory);
}