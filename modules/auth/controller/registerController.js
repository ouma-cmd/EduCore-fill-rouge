const registerService = require("../service/registerServices");

async function registerController(req, res, next) {
  try {
    const { username, email, password, role } = req.body;
    await registerService(email, password, username, role);

    res.json({
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
}
module.exports = registerController;
