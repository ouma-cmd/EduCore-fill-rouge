const { AfficherStudentTeacherServices } = require("../services/getStudentTEacherServices");

// afficher un student
async function afficherStudentsController(req, res) {
    
    const afficherStudent = await AfficherStudentTeacherServices(req.user.id);
  if (afficherStudent) {
    return res.status(200).json(afficherStudent);
  }
  return res.status(400).json("class not fond");
}
module.exports = { afficherStudentsController };
