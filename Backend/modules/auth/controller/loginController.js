const loginServices = require("../service/loginServices");

async function loginController(req, res) {
  const { email, password } = req.body;

  const credentials = await loginServices(email, password);
  if (!credentials) return res.json({ error: "invalid credentials" });
  res.json({
    ...credentials,
  });
}
module.exports = loginController;
