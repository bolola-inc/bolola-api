const AuthController = require("../controllers/AuthController");

module.exports = async (router) => {
  router.get("/auth", AuthController.Login);
  router.get("/signUp", AuthController.SignUp);
};
