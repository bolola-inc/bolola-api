const models = require("../models")
const { getJwtToken } = require("../utils/jwtHelper")

async function AuthDevice (req, res) {

  const { deviceId } = req.body

  const user = await models.Users.findOne({ where: { deviceId } })
  console.log(user);

  if (!user) {
    await models.Users.create({
      deviceId,
      createdAt: new Date().toISOString()
    })
  }

  const token = await getJwtToken({ deviceId })

  res.send({ access_token: token })
}

module.exports = {
  AuthDevice
}
