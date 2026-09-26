const teacher = require("../../admin/Models/teacher");

async function AfficherClassesTeacherServices(userId) {
  const findTeacher = await teacher.findOne({ user: userId });

  if (!findTeacher) {
    return [];
  }
  await findTeacher.populate("classe");
  return findTeacher.classe;
}
module.exports = { AfficherClassesTeacherServices };
