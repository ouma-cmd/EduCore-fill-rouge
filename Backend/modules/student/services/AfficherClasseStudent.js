const Student = require("../../admin/Models/Student");

async function AfficherClassesStudentServices(userId) {
  const findStudent = await Student.findOne({ user: userId });

  if (!findStudent) {
    return [];
  }
  await findStudent.populate("classes");
  return findStudent.classes;
}
module.exports = { AfficherClassesStudentServices };
