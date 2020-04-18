const AuthController = require("../controllers/AuthController");

module.exports = async (router) => {
  router.post("/auth", AuthController.Login);
  router.post("/signUp", AuthController.SignUp);
  router.get("/signUp/verify", AuthController.Verify);
};
