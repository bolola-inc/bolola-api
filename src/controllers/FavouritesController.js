const models = require("../models")

async function GetFavourites (req, res) {
  const favourites = await models.Favourites.findAll({
    where: {
      userId: req.user.deviceId
    }
  })
  res.send(favourites)
}

async function CreateFavourites (req, res) {
  const favourites = await models.Favourites.create({ ...req.body, userId: req.user.deviceId })
  res.send(favourites)
}

function DeleteFavourites () {

}

module.exports = {
  GetFavourites,
  CreateFavourites,
  DeleteFavourites
}
