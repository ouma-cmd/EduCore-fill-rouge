const dashParent = require("../services/dashboardParent");

async function dashboardParentController(req, res) {
  const id = req.params.id;
  const parent = await dashParent(id);
  if (!parent) {
    return res.json("not fond");
  }
  return res.json(parent);
}
module.exports = dashboardParentController;
