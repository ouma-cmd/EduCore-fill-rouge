const MarquerTeacher = require("../services/MarquerPrésences");

async function MarquerPrésencesController(req, res) {
  const { classe, student,teacher, date, status } = req.body;
  const MarquerPrésencess = await MarquerTeacher.MarquerPrésences(
    classe,
    student,
    teacher,
    date,
    status,
  );
  if (!MarquerPrésencess) {
    return res.status(400).json("not fond");
  }
  return res.status(200).json(MarquerPrésencess);
}

async function historAbsenceController(req, res) {
  const status = req.params.status;
  const historiqueAbsence = await MarquerTeacher.historAbsence(status);
  if (!historiqueAbsence) {
    return res.status(400).json("not fond");
  }
  return res.status(200).json(historiqueAbsence);
}

module.exports = {
  MarquerPrésencesController,
  historAbsenceController,
};
