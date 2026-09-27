const { AfficherChildrenParentServices } = require("../services/getChildren");

// afficher un student
async function getChildrenParentController(req, res) {
  const afficherStudent = await AfficherChildrenParentServices(req.user.id);
  if (afficherStudent) {
    return res.status(200).json(afficherStudent);
  }
  return res.status(400).json("class not fond");
}
module.exports = { getChildrenParentController };
