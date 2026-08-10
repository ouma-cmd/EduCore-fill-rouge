const express = require("express");
const loginSchema = require("../middlewares/loginMiddleware");
const loginController = require("../controller/loginController");
const registerController = require("../controller/registerController");
const registerMiddleware = require("../middlewares/registerMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.post("/login", loginSchema, loginController);
router.post(
  "/register",
  AuthMiddleware,
  roleMiddleware,
  registerMiddleware,
  registerController,
);

module.exports = router;
