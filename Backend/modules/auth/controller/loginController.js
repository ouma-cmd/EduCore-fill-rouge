const loginServices = require("../service/loginServices");

async function loginController(req, res) {
  const { email, password } = req.body;

  const token = await loginServices(email, password);

  res.json({
    token: token,
  });
}
module.exports = loginController;
