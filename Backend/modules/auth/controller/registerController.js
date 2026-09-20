const registerService = require("../service/registerServices");

async function registerController(req, res, next) {
  try {
    const { username, email, password, role } = req.body;
    const userCreat = await registerService(email, password, username, role);

    res.json({
      userCreat,
    });
  } catch (error) {
    next(error);
  }
}
module.exports = registerController;
