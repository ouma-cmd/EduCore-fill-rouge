const {
  AfficherSubjectStudentServices,
} = require("../services/getSubjectStudent");

// afficher un class
async function afficherUnClasseStudentController(req, res) {
  const afficherUnClass = await AfficherSubjectStudentServices(req.user.id);
  if (afficherUnClass) {
    return res.status(200).json(afficherUnClass);
  }
  return res.status(400).json("class not fond");
}
module.exports = { afficherUnClasseStudentController };
