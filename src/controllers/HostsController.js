const models = require("../models")

async function CreateHost (req, res) {
  const host = await models.Hosts.create(req.body)

  res.send(host)
}

async function UpdateHost (req, res) {
  await models.Hosts.update(req.body, { where: { id: req.params.id } })
  const host = await models.Hosts.findOne({ where: { id: req.params.id } })

  res.send(host)
}

async function GetHosts (req, res) {
  try{
    const hosts = await models.Hosts.findAll()

    res.send(hosts)
  }catch (e){
    console.log(e)

  }

}

async function GetHostById (req, res) {
  const hosts = await models.Hosts.findOne({ where: { id: req.params.id } })

  res.send(hosts)
}

async function DeleteHost (req, res) {

  await models.Hosts.destroy({
    where: {
      id: req.params.id
    }
  })

  res.send({ success: true })
}

module.exports = {
  CreateHost,
  UpdateHost,
  GetHosts,
  DeleteHost,
  GetHostById
}
