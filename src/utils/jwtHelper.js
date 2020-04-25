const jwt = require("jsonwebtoken")
const models = require("../models")

const getJwtToken = (body) => {
  return new Promise((resolve, reject) => {
    jwt.sign(body, process.env.APP_SECRET, (err, token) => {
      if (err) {
        reject(err)
      }
      resolve(token)
    }, { expiresIn: "7d" })
  })

}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.APP_SECRET, async (err, data) => {
      if (err) {
        return res.sendStatus(403)
      }
      const user = await models.Users.findOne({ where: { deviceId: data.deviceId } })
      req.user = user.get()
      next()
    })
  } else {
    res.sendStatus(401)
  }
}

module.exports = {
  getJwtToken,
  authenticateToken
}
