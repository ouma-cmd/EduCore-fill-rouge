const SchoolClass = require("../../admin/Models/SchoolClass");
const Attendance = require("../models/Attendance");

async function MarquerPrésences(classe, student, teacher, date, status) {
  const getClasse = await SchoolClass.findById(classe);
  if (!getClasse) {
    return null;
  }
  const getStuent = getClasse.students;
  if (getStuent.length === 0) {
    return null;
  }

  const exist = getStuent.some(
    (studentId) => studentId.toString() === student.toString(),
  );
  if (!exist) {
    return null;
  }
  const existTeacher = getClasse.teachers.some(
    (teacherId) => teacherId.toString() === teacher.toString(),
  );
  if (!existTeacher) {
    return null;
  }
  const creatAttendence = await Attendance.create({
    classe: getClasse,
    student: student,
    teacher,
    date,
    status,
  });
  return creatAttendence;
}

// afficher: Consulter l'historique des absences.
async function historAbsence(status) {
  const getAttendence = await Attendance.find({ status });
  if (!getAttendence) {
    return null;
  }
  return getAttendence;
}

module.exports = {
  MarquerPrésences,
  historAbsence,
};
