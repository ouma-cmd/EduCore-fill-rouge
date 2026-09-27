const {
  AfficherClassesParentServices,
} = require("../services/getCLasseParent");

async function getCLasseParentController(req, res) {
  const id = req.user.id;

  const getSubjectController = await AfficherClassesParentServices(id);

  if (getSubjectController.length === 0) {
    return res.status(404).json("No children found");
  }

  return res.status(200).json(getSubjectController);
}

module.exports = getCLasseParentController;
