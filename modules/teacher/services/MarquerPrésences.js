const SchoolClass = require("../../admin/Models/SchoolClass");
const Attendance = require("../models/Attendance");

async function MarquerPrésences(classe, student, date, status) {
  const getClasse = await SchoolClass.findById(classe);
  if (!getClasse) {
    return null;
  }
  const getStuent = getClasse.students;
  if (getStuent.length === 0) {
    return null;
  }
  const exist = getStuent.includes(student);
  if (!exist) {
    return null;
  }
  const creatAttendence = await Attendance.create({
    classe: getClasse,
    student: student,
    date,
    status,
  });
  return creatAttendence;
}

module.exports = MarquerPrésences