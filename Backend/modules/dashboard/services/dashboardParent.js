const parent = require("../../admin/Models/parent");
const Student = require("../../admin/Models/Student");
const Attendance = require("../../teacher/models/Attendance");
const Grade = require("../../teacher/models/Grade");

async function dashParent(id) {
  const parentId = await parent.findOne({ user: id });
  if (!parentId) {
    return null;
  }
  const studentf = parentId.students;
  const nomberStudent = await Student.countDocuments({
    _id: { $in: studentf },
  });

  const nomberAttendance = await Attendance.countDocuments({
    student: { $in: studentf },
  });

  const nomberGrade = await Grade.countDocuments({
    student: { $in: studentf },
  });

  return {
    student: nomberStudent,
    attendance: nomberAttendance,
    grade: nomberGrade,
  };
}

module.exports = dashParent;
