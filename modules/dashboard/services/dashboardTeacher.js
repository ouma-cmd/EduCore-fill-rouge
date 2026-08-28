const SchoolClass = require("../../admin/Models/SchoolClass");
const Student = require("../../admin/Models/Student");
const subject = require("../../admin/Models/subject");
const teacher = require("../../admin/Models/teacher");

async function dashTeacher(id) {
  const teacherId = await teacher.findById(id);
  if (!teacherId) {
    return null;
  }
  const classe = teacherId.classes;
  const studentf = teacherId.students;
  const subjectf = teacherId.subjects;

  const nomberClasse = await SchoolClass.countDocuments(classe);
  const nomberStudent = await Student.countDocuments(studentf);
  const nomberSubject = await subject.countDocuments(subjectf);
  return {
    student: nomberStudent,
    classe: nomberClasse,
    subject: nomberSubject,
  };
}
module.exports = dashTeacher;
