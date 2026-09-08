const parent = require("../../admin/Models/parent");
const Attendance = require("../../teacher/models/Attendance");

async function consulterAbsence(id) {
  const idParent = await parent.findById(id);
  if (!idParent) {
    return null;
  }
  const idStudent = idParent.students;
  if (!idStudent) {
    return null;
  }
  const attendance = await Attendance.find({
    student: { $in: idStudent },
  });
  return attendance
}
module.exports = consulterAbsence;
