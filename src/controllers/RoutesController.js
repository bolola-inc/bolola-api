const models = require("../models")

async function CreateRoutes (req, res) {
  const routes = await models.Routes.create({ ...req.body, id: req.params.id, createdAt: Date().toISOString() })
  res.send(routes)
}

async function UpdateRoutes (req, res) {
  await models.Routes.update(req.body, { where: { id: req.params.id }, updatedAt: Date().toISOString() })
  const routes = await models.Routes.findOne({ where: { id: req.params.id } })

  res.send(routes)
}

module.exports = {
  CreateRoutes,
  UpdateRoutes
}
