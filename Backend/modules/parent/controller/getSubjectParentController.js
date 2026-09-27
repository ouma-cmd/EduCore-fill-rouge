const getSubjectParent = require("../services/getSubjectParent");

async function getSubjectParentController(req, res) {
  const id = req.user.id;

  const getSubjectController = await getSubjectParent(id);

  if (getSubjectController.length === 0) {
    return res.status(404).json("No children found");
  }

  return res.status(200).json(getSubjectController);
}

module.exports = getSubjectParentController;
