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

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate a user and return a JWT token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful or invalid credentials
 *       400:
 *         description: Validation error
 */
router.post("/login", loginSchema, loginController);
router.post(
  "/register",
  AuthMiddleware,
  roleMiddleware,
  registerMiddleware,
  registerController,
);
router.get("/profile", AuthMiddleware, profileController);
router.delete("/logout", AuthMiddleware, logoutController);
router.put("/change-password", AuthMiddleware, changePasswordController);

module.exports = router;
