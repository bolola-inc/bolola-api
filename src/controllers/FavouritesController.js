const models = require("../models")

async function GetFavourites (req, res) {
  const favourites = await models.Favourites.findAll({
    where: {
      userId: req.user.id
    }
  })
  res.send(favourites)
}

async function CreateFavourites (req, res) {
  try {
    await models.Favourites.destroy({
      where: {
        id: req.body.id
      }
    })
  }
  catch (e) {
    console.warn(e);
  }
  const favourites = await models.Favourites.create({ ...req.body, userId: req.user.id })
  res.send(favourites)
}

async function DeleteFavourites (req, res) {
  await models.Favourites.destroy({
    where: {
      id: req.params.id
    }
  })

  res.send({ success: true })
}

module.exports = {
  GetFavourites,
  CreateFavourites,
  DeleteFavourites
}
