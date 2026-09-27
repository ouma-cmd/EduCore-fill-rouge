const getNoteParent = require("../services/getNote");
const getSubjectParent = require("../services/getSubjectParent");

async function getNoteParentController(req, res) {
  const id = req.user.id;

  const getNoteController = await getNoteParent(id);

  if (getNoteController.length === 0) {
    return res.status(404).json("No children found");
  }

  return res.status(200).json(getNoteController);
}

module.exports = getNoteParentController;
