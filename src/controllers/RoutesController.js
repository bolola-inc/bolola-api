const models = require("../models")

async function GetRoutes (req, res) {
  const routes = await models.Routes.findAll({
    where: {
      userId: req.user.id
    }
  })
  res.send(routes)
}

async function CreateRoutes (req, res) {
  const routes = await models.Routes.create({ ...req.body, id: req.params.id, createdAt: Date().toISOString() })
  res.send(routes)
}

async function UpdateRoutes (req, res) {
  await models.Routes.update(req.body, { where: { id: req.params.id }, updatedAt: Date().toISOString() })
  const routes = await models.Routes.findOne({ where: { id: req.params.id } })

  res.send(routes)
}

async function DeleteRoutes (req, res) {
    await models.Routes.destroy({
      where: {
        id: req.params.id
      }
    })
  
    res.send({ success: true })
  }

module.exports = {
  GetRoutes,
  CreateRoutes,
  UpdateRoutes,
  DeleteRoutes
}
