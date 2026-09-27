const {
  AfficherClassesParentServices,
} = require("../services/getCLasseParent");
const getDateParent = require("../services/getDate");

async function getDateParentController(req, res) {
  const id = req.user.id;

  const getDateController = await getDateParent(id);

  if (getDateController.length === 0) {
    return res.status(404).json("No children found");
  }

  return res.status(200).json(getDateController);
}

module.exports = getDateParentController;
