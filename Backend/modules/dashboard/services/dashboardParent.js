const parent = require("../../admin/Models/parent");
const Student = require("../../admin/Models/Student");
const Attendance = require("../../teacher/models/Attendance");
const Grade = require("../../teacher/models/Grade");

async function dashParent(id) {
  const parentId = await parent.findById(id);
  if (!parentId) {
    return null;
  }
  const studentf = parentId.students;
  const attendancef = parentId.attendance;
  const gradef = parentId.grade;

  const nomberStudent = await Student.countDocuments({
    _id: { $in: studentf },
  });
  const nomberAttendance = await Attendance.countDocuments(attendancef);
  const nomberGrade = await Grade.countDocuments(gradef);
  return {
    student: nomberStudent,
    attendance: nomberAttendance,
    grade: nomberGrade,
  };
}

module.exports = dashParent;
