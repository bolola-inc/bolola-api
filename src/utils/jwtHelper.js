const jwt = require("jsonwebtoken")

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

function authenticateToken (req, res, next) {
  const getTokenHeader = (header) => header.split(' ')[1]

  const authHeader = req.headers['authorization'] || req.headers['x-access-token']
  const authToken = authHeader && getTokenHeader(authHeader)

  if (!authToken) {
    return res.sendStatus(401)
  }

  jwt.verify(authToken, process.env.APP_SECRET, (err, decode) => {
    if (err) {
      return res.sendStatus(403)
    }

    req.user = decode
    next()
  })
}

module.exports = {
  getJwtToken,
  authenticateToken
}
