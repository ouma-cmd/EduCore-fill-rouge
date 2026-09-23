const SchoolClass = require("../../admin/Models/SchoolClass");
const Student = require("../../admin/Models/Student");
const subject = require("../../admin/Models/subject");
const teacher = require("../../admin/Models/teacher");

async function dashTeacher(id) {
  console.log("USER ID FROM JWT:", id);

  const teacherId = await teacher.findOne({ user: id });

  console.log("TEACHER FOUND:", teacherId);
  if (!teacherId) {
    return null;
  }

  const nomberClasse = await SchoolClass.countDocuments({
    teachers: teacherId._id,
  });
  const nomberStudent = await Student.countDocuments({
    teachers: teacherId._id,
  });
  const nomberSubject = teacherId.subjects.length;
  return {
    student: nomberStudent,
    classe: nomberClasse,
    subject: nomberSubject,
  };
}
module.exports = dashTeacher;
