/**
 * Auth Controller
 */
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const { sequelize } = require('../models/index');
const Hosts = sequelize.import('../models/Hosts.js');
const { v4: uuidv4 } = require('uuid');
function authenticateToken(req, res, next){
  const getTokenHeader = (header) => header.split(' ')[1];

  const authHeader = req.headers['authorization'] || req.headers['x-access-token'];
  const authToken = authHeader && getTokenHeader(authHeader);

  if (!authToken) return res.sendStatus(401);

  jwt.verify(authToken, process.env.APP_SECRET, (err, decode) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = decode;
    next();
  })
}


async function Login (req, res) {
  const body = req.body; //postmanov req em anum talis em arjeqnery
  const host = await Hosts.findOne({where: { email: body.email}}); //DB-ica nayum
  if (host == null){
    console.log("Wrong email!");
    return;
  }
  if (host.password == body.password){
  console.log("you successfully logged in!")
  jwt.sign(req.body, process.env.APP_SECRET, (err, token) => {
    if (err){
      console.log(err)
    }
    res.json({access_token: token});
  }, {expiresIn: "7d"});
}
else {
  console.log("Wrong password!")
}

}



async function SignUp (req, res) {
  console.log(req.body)
  try {
    const host = await Hosts.create(req.body)
      var token = uuidv4()
      console.log("uraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
     Hosts.findOne({ where: { email: host.email } })
  .on('success', function (host) {
    if (host) {
      host.update({
       confirmationCode: token
      })
      .success(function () {})
    }
  })
  var transporter = nodemailer.createTransport(smtpTransport({
    service: "gmail",
    auth: {
      user: "laavtxa@gmail.com",
      pass: process.env.EM_PASS
    }
  }));
  var info = await transporter.sendMail({
    from: "Admin",
    to: host.email,
    subject: "Verification",
    html: `<p>
    Click the link below to verify your account</p>
    <br><br><a href='http://localhost:3000/signUp/verify?token=${token}'>link</a>`
  })
  console.log("Message sent: %s", info.messageId);
  } catch (e) {
    res.send(e)
  }
}

async function Verify(req, res) {
  res.json()
}

module.exports = {
  authenticateToken,
  Login,
  SignUp,
  Verify
};
