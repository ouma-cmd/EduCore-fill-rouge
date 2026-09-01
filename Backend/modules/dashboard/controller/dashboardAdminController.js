const dashboard = require("../services/dashbaordAdmin");

async function dashboardController(req, res) {
  const dash = await dashboard();
  if (!dash) {
    return res.json("not fond");
  }
  return res.json(dash);
}

module.exports = dashboardController;
