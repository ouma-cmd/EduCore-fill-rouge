const parent = require("../../admin/Models/parent");
const SchoolClass = require("../../admin/Models/SchoolClass");
const Student = require("../../admin/Models/Student");
const subject = require("../../admin/Models/subject");
const teacher = require("../../admin/Models/teacher");
const Attendance = require("../../teacher/models/Attendance");
const Grade = require("../../teacher/models/Grade");

async function dashStudent(id) {
  const idStudent = await Student.findById(id);
  if (!idStudent) {
    return null;
  }
  const classe = idStudent.classes;
  const teacherr = idStudent.teachers;
  const subjectt = idStudent.subjects;
  const parentt = idStudent.parent;
  const gradee = idStudent.grade;
  const attendancee = idStudent.attendance;

  const nomClasse = await SchoolClass.countDocuments({ _id: { $in: classe } });
  const nomTeacher = await teacher.countDocuments({ _id: { $in: teacherr } });
  const nomSubject = await subject.countDocuments({ _id: { $in: subjectt } });
  const nomParent = await parent.countDocuments(parentt);
  const nomGrad = await Grade.countDocuments({ _id: { $in: gradee } });
  const nomAttendenace = await Attendance.countDocuments({ _id: { $in: attendancee } });
  return {
    classe: nomClasse,
    teacher: nomTeacher,
    subject: nomSubject,
    parent: nomParent,
    grade: nomGrad,
    attendance: nomAttendenace,
  };
}
module.exports = dashStudent;
