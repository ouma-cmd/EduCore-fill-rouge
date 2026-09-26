const Student = require("../../admin/Models/Student");

async function AfficherSubjectStudentServices(userId) {
  const findTeacher = await Student.findOne({ user: userId });

  if (!findTeacher) {
    return [];
  }
  await findTeacher.populate("subjects");
  return findTeacher.subjects;
}
module.exports = { AfficherSubjectStudentServices };
