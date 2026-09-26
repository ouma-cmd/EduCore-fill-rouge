const teacher = require("../../admin/Models/teacher");

async function AfficherSabjectTeacherServices(userId) {
  const findTeacher = await teacher.findOne({ user: userId });

  if (!findTeacher) {
    return [];
  }
  await findTeacher.populate("subjects");
  return findTeacher.subjects;
}
module.exports = { AfficherSabjectTeacherServices };
