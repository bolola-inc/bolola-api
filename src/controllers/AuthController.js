/**
 * Auth Controller
 */
const { ErrorHandler } = require("../utils/errorHandler")
const { getJwtToken } = require("../utils/jwtHelper")
const nodemailer = require("nodemailer")
const smtpTransport = require("nodemailer-smtp-transport")
const { sequelize } = require('../models/index')
const Hosts = sequelize.import('../models/Hosts.js')
const uuid = require('uuid')

async function Login (req, res) {
  const body = req.body
  const host = await Hosts.findOne({ where: { email: body.email } })
  if (host == null || host.password !== body.password) {
    throw new ErrorHandler(404, 'Wrong credentials')
  }
  const tokenData = await getJwtToken(req.body)

  res.send({ access_token: tokenData })
}

async function SignUp (req, res, next) {
  try {
    const confirmationCode = uuid.v4()

    await Hosts.create({ ...req.body, confirmationCode })

    const transporter = nodemailer.createTransport(smtpTransport({
      service: "gmail",
      auth: {
        user: "laavtxa@gmail.com",
        pass: process.env.EM_PASS
      }
    }))

    const info = await transporter.sendMail({
      from: "Admin",
      to: req.body.email,
      subject: "Verification",
      html: `<p>
    Click the link below to verify your account</p>
    <br><br><a href='http://localhost:3000/signUp/verify?token=${confirmationCode}'>link</a>`
    })
    console.log("Message sent: %s", info.messageId)

  } catch (e) {
    next(e)
  }
}

async function Verify (req, res) {
  const confirmationCode = req.query.token
  if (!confirmationCode) {
    throw new ErrorHandler(409, 'Missing token query parameter')
  }

  const host = await Hosts.findOne({ where: { confirmationCode: confirmationCode } })

  if (!host) {
    throw new ErrorHandler(404, 'Wrong credentials')
  }

  await Hosts.update({ confirmedAt: (new Date()).toISOString() }, { where: { confirmationCode: confirmationCode } })

  res.send({
    success: true
  })
}

module.exports = {
  Login,
  SignUp,
  Verify
}
