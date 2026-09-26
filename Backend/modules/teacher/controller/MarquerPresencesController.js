const Teacher = require("../../admin/Models/teacher");
const MarquerTeacher = require("../services/MarquerPrésences");

async function MarquerPrésencesController(req, res) {
  const { classe, student, subjects, date, status } = req.body;
  const teacherUser = await Teacher.findOne({
    user: req.user.id,
  });

  if (!teacherUser) {
    return res.status(404).json("Teacher not found");
  }
  const MarquerPrésencess = await MarquerTeacher.MarquerPrésences(
    classe,
    student,
    teacherUser._id,
    subjects,
    date,
    status,
  );
  if (!MarquerPrésencess) {
    return res.status(400).json("not fond");
  }
  return res.status(200).json(MarquerPrésencess);
}

async function historAbsenceController(req, res) {
  const teacherUser = await Teacher.findOne({
    user: req.user.id,
  });
  console.log("REQ.USER:", req.user);
  const historiqueAbsence = await MarquerTeacher.historAbsence(teacherUser._id);
  if (!historiqueAbsence) {
    return res.status(400).json("not fond");
  }
  return res.status(200).json(historiqueAbsence);
}

module.exports = {
  MarquerPrésencesController,
  historAbsenceController,
};
