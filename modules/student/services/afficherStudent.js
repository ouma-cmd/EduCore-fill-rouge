const Attendance = require("../../teacher/models/Attendance");
const Grade = require("../../teacher/models/Grade");

async function consulterNote(idStudent) {
  const findIdStudent = await Grade.find({ student: idStudent });
  if (findIdStudent.length === 0) {
    return null;
  }
  return findIdStudent;
}

async function consulterAbsence(studentId) {
  const findAbsence = await Attendance.find({ student: studentId });
  if (!findAbsence) {
    return null;
  }
  return findAbsence;
}

module.exports = {
  consulterNote,
  consulterAbsence,
};
