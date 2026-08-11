const express = require("express");
const loginSchema = require("../middlewares/loginMiddleware");
const loginController = require("../controller/loginController");
const registerController = require("../controller/registerController");
const registerMiddleware = require("../middlewares/registerMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const profileController = require("../controller/profileController");
const logoutController = require("../controller/logoutController");
const changePasswordController = require("../controller/changePasswordController");

const router = express.Router();

router.post("/login", loginSchema, loginController);
router.post(
  "/register",
  AuthMiddleware,
  roleMiddleware,
  registerMiddleware,
  registerController,
);
router.get("/profile", AuthMiddleware, profileController);
router.post("/logout",AuthMiddleware, logoutController);
router.put("/change-password",AuthMiddleware, changePasswordController )

module.exports = router;
