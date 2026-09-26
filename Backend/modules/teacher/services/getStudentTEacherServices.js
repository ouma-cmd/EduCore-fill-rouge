const teacher = require("../../admin/Models/teacher");

async function AfficherStudentTeacherServices(userId) {
  const findTeacher = await teacher.findOne({ user: userId });

  if (!findTeacher) {
    return [];
  }

  await findTeacher.populate({
    path: "students",
    populate: [
      {
        path: "user",
      },
      {
        path: "parent",
        populate: {
          path: "user",
        },
      },
    ],
  });
  console.log("STUDENT USER:", findTeacher.students[0].user);
  console.log("STUDENT USERNAME:", findTeacher.students[0].user?.username);
  return findTeacher.students;
}

module.exports = { AfficherStudentTeacherServices };
