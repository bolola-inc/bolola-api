const models = require("../models");


async function GetFavourites(req, res) {
    const favourites = await models.Favourites.findAll();
    res.send(favourites)
}

async function CreateFavourites(req, res) {
    const favourites = await models.Favourites.create(req.body);
    res.send(favourites);
}

function UpdateFavourites() {
    
}

function DeleteFavourites() {
    
}


module.exports = {
    GetFavourites,
    CreateFavourites,
    UpdateFavourites,
    DeleteFavourites
}