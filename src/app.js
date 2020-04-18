"use strict"

const express = require("express")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const { registerRouters } = require("./routes")

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

const handleError = (err, res) => {
  const { statusCode, message } = err
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  })
}

async function init () {
  const router = await registerRouters()
  app.use('/', router)

  app.use((err, req, res, next) => {
    handleError(err, res)
  })

  return app
}

module.exports = init
