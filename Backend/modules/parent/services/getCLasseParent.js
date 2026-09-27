const parent = require("../../admin/Models/parent");

async function AfficherClassesParentServices(userId) {
  const findParent = await parent.findOne({ user: userId });

  if (!findParent) {
    return [];
  }
  await findParent.populate({
    path: "students",
    populate: {
      path: "classes",
    },
  });
  const classes = findParent.students.flatMap((student) => student.classes);

  return classes;
}
module.exports = { AfficherClassesParentServices };
