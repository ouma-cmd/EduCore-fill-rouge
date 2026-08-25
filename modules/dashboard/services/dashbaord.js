const parent = require("../../admin/Models/parent");
const SchoolClass = require("../../admin/Models/SchoolClass");
const Student = require("../../admin/Models/Student");
const subject = require("../../admin/Models/subject");
const teacher = require("../../admin/Models/teacher");
const user = require("../../auth/Models/user");
const Attendance = require("../../teacher/models/Attendance");
const Grade = require("../../teacher/models/Grade");

async function dashboard() {
  const userCount = await user.countDocuments();
  const studentCount = await Student.countDocuments();
  const teacherCount = await teacher.countDocuments();
  const parentCount = await parent.countDocuments();
  const classeCount = await SchoolClass.countDocuments();
  const subjectCount = await subject.countDocuments();
  const AttendanceCount = await Attendance.countDocuments();
  const gradeCount = await Grade.countDocuments();

  return {
    users: userCount,
    student: studentCount,
    teacher: teacherCount,
    parent: parentCount,
    classe: classeCount,
    subject: subjectCount,
    Attendance: AttendanceCount,
    grade: gradeCount,
  };
}

module.exports = dashboard;
